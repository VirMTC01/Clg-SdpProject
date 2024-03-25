
import React, { useState , useEffect } from 'react';
import axios from 'axios';
import './mainpage.css';



function mainpage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [text,setText]=useState('');
  const [result,setResult]=useState('');
  

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append('pdf', pdfFile);

      // Make a POST request to the backend
      const response = await axios.post('http://localhost:4000/data', formData
      // , {
      //   // headers: {
      //   //   'Content-Type': 'multipart/form-data'
      //   // }
      // }
      );
      if(response.data.success){
        setText(response.data.text);
        setResult(response.data.result);

        console.log('PDF uploaded successfully:', response.data.result);
      }

    } catch (error) {
      // setResult(response.data.result)

      console.error('Error uploading PDF:', error);
    }
  };

  return (
    <div id='box'>
      <div id='input'>
      {/* <form action='post'> */}
      <div id='in'>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={!pdfFile}>Upload PDF</button>
      {/* </form> */}
      </div>
      </div>
      <div id='output'>
        <h3>Scanned Text!</h3>
       {/* <textarea value={result}></textarea> */}
       <p>{text}</p>
       <h3>Summarized Output!</h3>
       <p>{result}</p>
      </div>
    </div>
  );
}

export default mainpage;



  
