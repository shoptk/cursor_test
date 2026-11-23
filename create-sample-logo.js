import sharp from 'sharp';

const size = 100;

const svgLogo = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#4A90D9"/>
  <circle cx="50" cy="50" r="35" fill="#ffffff"/>
  <text x="50" y="58" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#4A90D9" text-anchor="middle">L</text>
</svg>
`;

await sharp(Buffer.from(svgLogo))
  .png()
  .toFile('logo.png');

console.log('Sample logo created: logo.png');
