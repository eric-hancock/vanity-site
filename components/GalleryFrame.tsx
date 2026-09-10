"use client";

import { CSSProperties, useEffect, useMemo, useState } from "react";
import type { RandomImageResponse } from "@/lib/image-manifest";

type GalleryFrameProps = {
  initialImage: RandomImageResponse;
};

export function GalleryFrame({ initialImage }: GalleryFrameProps) {
  const [image, setImage] = useState<RandomImageResponse>(initialImage);
  const [prefetchedImage, setPrefetchedImage] = useState<RandomImageResponse | null>(
    null,
  );
  const [imageRatio, setImageRatio] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const title = useMemo(() => {
    return image.id.replaceAll("_", " ");
  }, [image.id]);

  useEffect(() => {
    let cancelled = false;

    async function prefetchNext() {
      try {
        const response = await fetch(`/api/random-image?exclude=${image.id}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const nextImage = (await response.json()) as RandomImageResponse;

        await new Promise<void>((resolve) => {
          const img = new globalThis.Image();
          img.src = nextImage.url;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });

        if (!cancelled) {
          setPrefetchedImage(nextImage);
        }
      } catch {
        // Prefetch failures should not interrupt the main flow.
      }
    }

    prefetchNext();

    return () => {
      cancelled = true;
    };
  }, [image.id]);

  async function fetchAndPreload(excludeId: string) {
    const response = await fetch(`/api/random-image?exclude=${excludeId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch next image.");
    }

    const nextImage = (await response.json()) as RandomImageResponse;

    await new Promise<void>((resolve) => {
      const img = new globalThis.Image();
      img.src = nextImage.url;
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });

    return nextImage;
  }

  async function showAnother() {
    try {
      setStatus("loading");
      const nextImage =
        prefetchedImage && prefetchedImage.id !== image.id
          ? prefetchedImage
          : await fetchAndPreload(image.id);

      setImage(nextImage);
      setImageRatio(null);
      setPrefetchedImage(null);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <figure className="gallery-frame" aria-live="polite" aria-busy={status === "loading"}>
      <div
        className={`gallery-image-wrap ${status === "loading" ? "is-loading" : ""}`}
        style={
          {
            "--image-ratio": imageRatio ?? 1.5,
          } as CSSProperties
        }
      >
        <img
          key={image.id}
          src={image.url}
          alt={image.alt}
          loading="eager"
          decoding="async"
          className="gallery-image"
          onLoad={(event) => {
            const { naturalHeight, naturalWidth } = event.currentTarget;

            if (naturalHeight > 0 && naturalWidth > 0) {
              setImageRatio(naturalWidth / naturalHeight);
            }
          }}
        />
      </div>

      <figcaption className="gallery-caption">
        <span>{title}</span>
        <button
          type="button"
          onClick={showAnother}
          disabled={status === "loading"}
          className="button button-ghost"
          aria-label="Show another photograph"
        >
          {status === "loading" ? "Loading" : "Show another"}
        </button>
      </figcaption>

      {status === "error" ? (
        <p className="gallery-status" role="status">
          Could not load another image. Please try again.
        </p>
      ) : null}
    </figure>
  );
}
