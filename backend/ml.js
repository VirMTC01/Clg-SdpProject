const { createWorker } = require('tesseract.js');
const fs = require('fs');
const { fromPath } = require('pdf2pic');

// Path to the PDF file
const pdfPath = 'input.pdf';

// Path to store the extracted images
const outputDir = './output';
fs.existsSync(outputDir) || fs.mkdirSync(outputDir);

// Configuration for PDF to image conversion
const pdf2picOptions = {
    density: 300,            // output pixels per inch
    savename: 'output',      // output file name
    savedir: outputDir,      // output directory
    format: 'png',           // output file format
    size: '600x600'          // output size (width x height)
};

// Function to perform OCR on an image
async function performOCR(imagePath, worker) {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize(imagePath);
    console.log('Extracted text:', text);
    await worker.terminate();
}

// Function to convert PDF to images and perform OCR
async function convertPdfToImagesAndPerformOCR() {
    try {
        // Convert PDF to images
        const pdf2picInstance = new fromPath(pdfPath, pdf2picOptions);
        const outputImages = await pdf2picInstance.bulk(-1);

        // Create a Tesseract worker
        const worker = createWorker();

        // Perform OCR on each image
        for (const image of outputImages) {
            await performOCR(image.path, worker);
        }
    } catch (error) {
        console.error('Error converting PDF to images and performing OCR:', error);
    }
}

// Convert PDF to images and perform OCR
convertPdfToImagesAndPerformOCR();
