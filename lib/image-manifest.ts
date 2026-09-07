export type GalleryImage = {
  id: string;
  filename: string;
  alt: string;
};

const IMAGE_MANIFEST: GalleryImage[] = [
  { id: "andys", filename: "andys.jpg", alt: "Photograph titled Andys" },
  { id: "angel", filename: "angel.jpg", alt: "Photograph titled Angel" },
  { id: "baloon", filename: "baloon.jpg", alt: "Photograph titled Baloon" },
  { id: "band", filename: "band.jpg", alt: "Photograph titled Band" },
  { id: "bills", filename: "bills.jpg", alt: "Photograph titled Bills" },
  { id: "boom", filename: "boom.jpg", alt: "Photograph titled Boom" },
  { id: "deitch", filename: "deitch.jpg", alt: "Photograph titled Deitch" },
  { id: "delacorte", filename: "delacorte.jpg", alt: "Photograph titled Delacorte" },
  { id: "ecko", filename: "ecko.jpg", alt: "Photograph titled Ecko" },
  { id: "ellis", filename: "ellis.jpg", alt: "Photograph titled Ellis" },
  {
    id: "first_snow",
    filename: "first_snow.jpg",
    alt: "Photograph titled First Snow",
  },
  {
    id: "footsteps",
    filename: "footsteps.jpg",
    alt: "Photograph titled Footsteps",
  },
  { id: "gate", filename: "gate.jpg", alt: "Photograph titled Gate" },
  { id: "gauche", filename: "gauche.jpg", alt: "Photograph titled Gauche" },
  { id: "ginko", filename: "ginko.jpg", alt: "Photograph titled Ginko" },
  { id: "grimace", filename: "grimace.jpg", alt: "Photograph titled Grimace" },
  {
    id: "hard_times",
    filename: "hard_times.jpg",
    alt: "Photograph titled Hard Times",
  },
  { id: "hi", filename: "hi.jpg", alt: "Photograph titled Hi" },
  {
    id: "highline_11th",
    filename: "highline_11th.jpg",
    alt: "Photograph titled Highline 11th",
  },
  { id: "hotel", filename: "hotel.jpg", alt: "Photograph titled Hotel" },
  { id: "jacket", filename: "jacket.jpg", alt: "Photograph titled Jacket" },
  { id: "lean", filename: "lean.jpg", alt: "Photograph titled Lean" },
  {
    id: "necessary_objects",
    filename: "necessary_objects.jpg",
    alt: "Photograph titled Necessary Objects",
  },
  { id: "news", filename: "news.jpg", alt: "Photograph titled News" },
  {
    id: "no_bills",
    filename: "no_bills.jpg",
    alt: "Photograph titled No Bills",
  },
  {
    id: "no_right",
    filename: "no_right.jpg",
    alt: "Photograph titled No Right",
  },
  { id: "nude", filename: "nude.jpg", alt: "Photograph titled Nude" },
  {
    id: "pale_flowers",
    filename: "pale_flowers.jpg",
    alt: "Photograph titled Pale Flowers",
  },
  {
    id: "question",
    filename: "question.jpg",
    alt: "Photograph titled Question",
  },
  { id: "rain_f", filename: "rain_f.jpg", alt: "Photograph titled Rain F" },
  { id: "reach", filename: "reach.jpg", alt: "Photograph titled Reach" },
  { id: "rest", filename: "rest.jpg", alt: "Photograph titled Rest" },
  { id: "sitting", filename: "sitting.jpg", alt: "Photograph titled Sitting" },
  { id: "sleep", filename: "sleep.jpg", alt: "Photograph titled Sleep" },
  { id: "space", filename: "space.jpg", alt: "Photograph titled Space" },
  { id: "sticks", filename: "sticks.jpg", alt: "Photograph titled Sticks" },
  { id: "swings", filename: "swings.jpg", alt: "Photograph titled Swings" },
  { id: "the_arm", filename: "the_arm.jpg", alt: "Photograph titled The Arm" },
  {
    id: "three_faces",
    filename: "three_faces.jpg",
    alt: "Photograph titled Three Faces",
  },
  {
    id: "trimmings",
    filename: "trimmings.jpg",
    alt: "Photograph titled Trimmings",
  },
  {
    id: "twentyseven",
    filename: "twentyseven.jpg",
    alt: "Photograph titled Twentyseven",
  },
  { id: "twigs", filename: "twigs.jpg", alt: "Photograph titled Twigs" },
  {
    id: "verticals",
    filename: "verticals.jpg",
    alt: "Photograph titled Verticals",
  },
];

export type RandomImageResponse = {
  id: string;
  url: string;
  alt: string;
};

export function getManifest(): GalleryImage[] {
  return IMAGE_MANIFEST;
}

function getNormalizedR2BaseUrl(): string | null {
  const raw = process.env.R2_PUBLIC_BASE_URL?.trim();

  if (!raw) {
    return null;
  }

  try {
    return new URL(raw).origin;
  } catch {
    try {
      return new URL(`https://${raw}`).origin;
    } catch {
      return null;
    }
  }
}

function getR2PathPrefix(): string {
  const raw = process.env.R2_PUBLIC_PATH_PREFIX?.trim();

  if (raw === undefined || raw === "") {
    return "assets";
  }

  return raw.replace(/^\/+|\/+$/g, "");
}

export function toImageUrl(filename: string): string {
  const baseUrl = getNormalizedR2BaseUrl();
  if (baseUrl) {
    const prefix = getR2PathPrefix();
    return prefix ? `${baseUrl}/${prefix}/${filename}` : `${baseUrl}/${filename}`;
  }

  // Local fallback for development if images are copied to public/assets.
  return `/assets/${filename}`;
}

export function getRandomImage(excludeId?: string): RandomImageResponse {
  const pool = excludeId
    ? IMAGE_MANIFEST.filter((image) => image.id !== excludeId)
    : IMAGE_MANIFEST;

  if (pool.length === 0) {
    throw new Error("No images available in manifest.");
  }

  const nextImage = pool[Math.floor(Math.random() * pool.length)];

  return {
    id: nextImage.id,
    url: toImageUrl(nextImage.filename),
    alt: nextImage.alt,
  };
}
