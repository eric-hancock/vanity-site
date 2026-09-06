#!/usr/bin/env node

const baseUrl = process.argv[2];

if (!baseUrl) {
  console.error("Usage: node scripts/verify-deploy.mjs <base-url>");
  process.exit(1);
}

const normalizedBase = baseUrl.replace(/\/$/, "");

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

async function expectOkRandomImage() {
  const response = await fetch(`${normalizedBase}/api/random-image`);
  if (!response.ok) {
    fail(`/api/random-image returned ${response.status}`);
  }

  const data = await response.json();
  if (!data || typeof data.id !== "string" || typeof data.url !== "string") {
    fail("/api/random-image returned invalid payload shape");
  }

  console.log("PASS: /api/random-image payload shape is valid");
}

async function expectValidationErrorForBadContact() {
  const response = await fetch(`${normalizedBase}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "",
      email: "bad",
      message: "short",
      company: "",
    }),
  });

  if (response.status !== 400) {
    fail(`/api/contact invalid payload expected 400, got ${response.status}`);
  }

  console.log("PASS: /api/contact validation rejects invalid payload");
}

async function maybeRunRealContactCheck() {
  const enabled = process.env.VERIFY_CONTACT_SEND === "1";
  if (!enabled) {
    console.log(
      "SKIP: live contact send test (set VERIFY_CONTACT_SEND=1 and CONTACT_TEST_PAYLOAD_JSON)",
    );
    return;
  }

  const rawPayload = process.env.CONTACT_TEST_PAYLOAD_JSON;
  if (!rawPayload) {
    fail("VERIFY_CONTACT_SEND=1 requires CONTACT_TEST_PAYLOAD_JSON");
  }

  let payload;
  try {
    payload = JSON.parse(rawPayload);
  } catch {
    fail("CONTACT_TEST_PAYLOAD_JSON must be valid JSON");
  }

  const response = await fetch(`${normalizedBase}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const text = await response.text();
    fail(`/api/contact live send failed with ${response.status}: ${text}`);
  }

  console.log("PASS: /api/contact accepted live send payload");
}

async function run() {
  const homepage = await fetch(normalizedBase);
  if (!homepage.ok) {
    fail(`/ returned ${homepage.status}`);
  }
  console.log("PASS: homepage is reachable");

  await expectOkRandomImage();
  await expectValidationErrorForBadContact();
  await maybeRunRealContactCheck();

  console.log("All verification checks passed.");
}

run().catch((error) => {
  fail(error instanceof Error ? error.message : "Unknown verification failure");
});
