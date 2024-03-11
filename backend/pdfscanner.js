const fs = require('fs-extra');
const { createWorker } = require('tesseract.js');
const { exec } = require('child_process');

// Input PDF file path
const pdfFilePath = 'input.pdf';

// Output directory for extracted images
const outputDir = './output';

// Ensure output directory exists
fs.ensureDir(outputDir)
    .then(() => {
        // Convert PDF to images and perform OCR
        convertPdfToImages();
    })
    .catch(error => {
        console.error('Error creating output directory:', error);
    });

// Function to convert PDF to images
function convertPdfToImages() {
    // Define the command to convert PDF to images using imagemagick
    const command = `convert -quality 90 ${pdfFilePath} ${outputDir}/output.png`;

    // Execute the command
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Error converting PDF to images:', error);
            return;
        }
        
        // Perform OCR on each image
        performOCR();
    });
}

// Function to perform OCR on images
async function performOCR() {
    const worker = createWorker();

    try {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');

        // Perform OCR on the image(s)
        const { data: { text } } = await worker.recognize(`${outputDir}/output.png`);
        console.log('Extracted text:');
        console.log(text);

        await worker.terminate();
    } catch (error) {
        console.error('Error performing OCR:', error);
    }
}
