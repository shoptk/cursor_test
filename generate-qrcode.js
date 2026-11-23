import QRCode from 'qrcode';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate a QR code with a centered logo
 * @param {Object} options - Configuration options
 * @param {string} options.text - The text/URL to encode in the QR code
 * @param {string} options.logoPath - Path to the logo image
 * @param {string} options.outputPath - Path for the output QR code image
 * @param {number} [options.qrSize=400] - Size of the QR code in pixels
 * @param {number} [options.logoSizeRatio=0.25] - Logo size as a ratio of QR code size (0.2-0.3 recommended)
 * @param {string} [options.qrColor='#000000'] - QR code color
 * @param {string} [options.backgroundColor='#ffffff'] - Background color
 * @param {number} [options.margin=2] - QR code margin
 * @param {string} [options.errorCorrectionLevel='H'] - Error correction level (L, M, Q, H)
 */
async function generateQRCodeWithLogo(options) {
  const {
    text,
    logoPath,
    outputPath,
    qrSize = 400,
    logoSizeRatio = 0.25,
    qrColor = '#000000',
    backgroundColor = '#ffffff',
    margin = 2,
    errorCorrectionLevel = 'H'
  } = options;

  if (!text) {
    throw new Error('Text is required');
  }

  if (!logoPath) {
    throw new Error('Logo path is required');
  }

  if (!outputPath) {
    throw new Error('Output path is required');
  }

  console.log(`Generating QR code for: "${text}"`);
  console.log(`Logo: ${logoPath}`);
  console.log(`Output: ${outputPath}`);

  const qrBuffer = await QRCode.toBuffer(text, {
    errorCorrectionLevel,
    type: 'png',
    width: qrSize,
    margin,
    color: {
      dark: qrColor,
      light: backgroundColor
    }
  });

  const logoSize = Math.floor(qrSize * logoSizeRatio);

  const logoBuffer = await sharp(logoPath)
    .resize(logoSize, logoSize, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .toBuffer();

  const logoWithBackground = await sharp({
    create: {
      width: logoSize + 10,
      height: logoSize + 10,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    }
  })
    .composite([
      {
        input: logoBuffer,
        gravity: 'center'
      }
    ])
    .png()
    .toBuffer();

  const qrMetadata = await sharp(qrBuffer).metadata();
  const logoWithBgMetadata = await sharp(logoWithBackground).metadata();

  const left = Math.floor((qrMetadata.width - logoWithBgMetadata.width) / 2);
  const top = Math.floor((qrMetadata.height - logoWithBgMetadata.height) / 2);

  await sharp(qrBuffer)
    .composite([
      {
        input: logoWithBackground,
        left,
        top
      }
    ])
    .toFile(outputPath);

  console.log(`QR code with logo saved to: ${outputPath}`);
  return outputPath;
}

async function main() {
  const text = process.argv[2] || 'https://example.com';
  const logoPath = process.argv[3] || path.join(__dirname, 'logo.png');
  const outputPath = process.argv[4] || path.join(__dirname, 'qrcode-output.png');

  try {
    await generateQRCodeWithLogo({
      text,
      logoPath,
      outputPath,
      qrSize: 400,
      logoSizeRatio: 0.25,
      errorCorrectionLevel: 'H'
    });
  } catch (error) {
    console.error('Error generating QR code:', error.message);
    process.exit(1);
  }
}

main();

export { generateQRCodeWithLogo };
