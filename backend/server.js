
const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { spawn } = require('child_process');
const bodyParser=require("body-parser");

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyDYVBxKM3d0AtWG0xlgKNpENjsdiLVp2k8";


async function runChat() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  });
  
 

  const result = await chat.sendMessage("Provide me Summary in English Language of following : " + d);
  const response = result.response;
  console.log(response.text());
  let op=response.text()
  return op;
}

let d='';

// Endpoint for handling PDF uploads
app.post('/data', upload.single('pdf'), (req, res) => {
  const pdfFile = req.file;
  if (!pdfFile) {
    res.status(400).send('No PDF file uploaded');
    res.json({success:false ,result:'Pdf file Not Uploaded'});

  }
 else{

   console.log("PDF Uploaded Successfully");


  //processing
 // Path to Python OCR script
 const pythonScriptPath = 'pdf_ocr_script.py';
  
 // Path to PDF file for OCR
 const pdfPath = pdfFile.path;
 
 // Spawn Python process
 const pythonProcess = spawn('python', [pythonScriptPath, pdfPath]);
 
 pythonProcess.stdout.on('data', (data) => {
   console.log(`OCR Result: ${data}`);
   d=`${data}`;
   console.log("")
 });
 
 pythonProcess.stderr.on('data', (data) => {
   console.error(`Python stderr: ${data}`);
 });
 
 pythonProcess.on('close', (code) => {
   console.log(`Python process exited with code ${code}`);
 });
 

 // app.get('http://localhost:4000/resdata',(req,res)=>{
 //   res.json({
 //      text:`${data}`
 //   });
 //   // console.log("a"+result);
 // })

   


 pythonProcess.on('close', async (code) => {
  console.log(`Python process exited with code ${code}`);
  // Send the OCR result back to the client
  
const op = await runChat(d);

  res.json({ success: true,text:d, result: op });
});
  }

   

   


});




app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

