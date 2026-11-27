import sharp from "sharp";

const W = 640;
const H = 900;
const size = 420;

// Favour upper body / face for a headshot crop from the waist-up portrait
const photoBuf = await sharp("public/speakers/thanishka.png")
  .resize(size, size, { fit: "cover", position: "north" })
  .png()
  .toBuffer();

const circle = Buffer.from(
  `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`,
);

const roundPhoto = await sharp(photoBuf)
  .composite([{ input: circle, blend: "dest-in" }])
  .png()
  .toBuffer();

const cardSvg = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1a1028"/>
      <stop offset="100%" stop-color="#12081c"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" rx="48" fill="url(#bg)"/>
  <circle cx="320" cy="310" r="216" fill="none" stroke="#9867e1" stroke-width="3" opacity="0.7"/>
  <text x="320" y="620" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#f8f8ff">Thanishka Yogesh</text>
  <text x="320" y="665" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#c9b8e0">Student Coordinator · IEEE TEMS</text>
  <text x="320" y="740" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" letter-spacing="4" fill="#9867e1">SPEAKER</text>
  <text x="320" y="775" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="#958e9d">MONOLITH 2026</text>
</svg>`);

await sharp(cardSvg)
  .composite([{ input: roundPhoto, top: 100, left: 110 }])
  .png()
  .toFile("public/speakers/thanishka-front.png");

console.log("wrote public/speakers/thanishka-front.png");
