// // const express= require('express');
// // const app=express();
// // const port=4000;

// // app.get('/',(req,res)=>{
// //     res.end("<H1>Backend!</h1>");
// // })

// // app.listen(port,(req,res)=>{
// //     console.log("Server is running at http:/localhost:4000");
// // })

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();
// const port = 3001;

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // POST endpoint to receive data from the frontend
// app.post('/data', (req, res) => {
//   const inputData = req.body.inputData;
//   console.log('Received data:', inputData);
//   // Perform any backend processing here

//   // Respond with a success message
//   res.send({ message: 'Data received successfully' });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


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
 
let d='';
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

   


 pythonProcess.on('close', (code) => {
  console.log(`Python process exited with code ${code}`);
  // Send the OCR result back to the client
  res.json({ success: true, result: d });
});
  }

   

   


});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

