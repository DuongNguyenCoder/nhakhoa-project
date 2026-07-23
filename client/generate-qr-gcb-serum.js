import fs from "node:fs";
import path from "node:path";
import QRCode from "qrcode";
import PDFDocument from "pdfkit";

/**
 * ========= CONFIG =========
 */

const CONFIG = {
  url: "https://drive.google.com/uc?export=download&id=1YIFa_gio1XvrJ5tBNy8CIQu8JqYVJZEb",

  fileName: "qr-download-gcb-serum",

  outputFolder: path.join(process.cwd(), "public", "qr"),

  qr: {
    errorCorrectionLevel: "H",
    margin: 4,

    color: {
      dark: "#000000",
      light: "#FFFFFF",
    },

    // PNG export quality
    pngWidth: 2000,

    // PDF print size
    printSizeMM: 35,
  },

  pdf: {
    pageSize: "A4",
    margin: 50,
    title: "QR PDF GIAY CONG BO",
    showUrl: true,
  },
};

/**
 * ========= HELPERS =========
 */

function mmToPt(mm) {
  return mm * 2.83465;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, {
    recursive: true,
  });
}

function getFilePaths() {
  const { outputFolder, fileName } = CONFIG;

  return {
    png: path.join(outputFolder, `${fileName}.png`),

    svg: path.join(outputFolder, `${fileName}.svg`),

    pdf: path.join(outputFolder, `${fileName}.pdf`),
  };
}

/**
 * ========= GENERATE PNG =========
 */

async function generatePNG(pathFile) {
  await QRCode.toFile(pathFile, CONFIG.url, {
    type: "png",
    width: CONFIG.qr.pngWidth,

    errorCorrectionLevel: CONFIG.qr.errorCorrectionLevel,

    margin: CONFIG.qr.margin,

    color: CONFIG.qr.color,
  });

  console.log("PNG generated:", pathFile);
}

/**
 * ========= GENERATE SVG =========
 */

async function generateSVG(pathFile) {
  const svg = await QRCode.toString(CONFIG.url, {
    type: "svg",

    errorCorrectionLevel: CONFIG.qr.errorCorrectionLevel,

    margin: CONFIG.qr.margin,

    color: CONFIG.qr.color,
  });

  fs.writeFileSync(pathFile, svg);

  console.log("SVG generated:", pathFile);
}

/**
 * ========= GENERATE PDF =========
 */

async function generatePDF({ pdfPath, pngPath }) {
  /**
   * Final print size
   * (includes white border from QR margin)
   */
  const qrSize = mmToPt(CONFIG.qr.printSizeMM);

  /**
   * PDF page size
   * exactly equal QR size
   */
  const doc = new PDFDocument({
    size: [qrSize, qrSize],

    margins: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  });

  const stream = fs.createWriteStream(pdfPath);

  doc.pipe(stream);

  /**
   * Draw QR full page
   *
   * QR image already
   * contains quiet zone
   * because margin: 4
   */
  doc.image(pngPath, 0, 0, {
    width: qrSize,
    height: qrSize,
  });

  doc.end();

  await new Promise((resolve, reject) => {
    stream.on("finish", resolve);

    stream.on("error", reject);
  });

  console.log("PDF generated:", pdfPath);
}

/**
 * ========= MAIN =========
 */

async function generateQR() {
  ensureDir(CONFIG.outputFolder);

  const paths = getFilePaths();

  // Generate assets
  await Promise.all([generatePNG(paths.png), generateSVG(paths.svg)]);

  // Generate PDF
  await generatePDF({
    pdfPath: paths.pdf,

    pngPath: paths.png,
  });

  console.log("\nQR generation completed.");
}

generateQR().catch(console.error);
