// import React, { useState } from 'react';
// import axios from 'axios';

// const mainpage= () => {
  //   const [inputData, setInputData] = useState('');
  
  //   const handleSubmit = async () => {
    //     try {
      //       // Make a POST request to the backend endpoint
//       const response = await axios.post('http://localhost:3001/data', { inputData });
//       console.log('Data sent successfully:', response.data);
//     } catch (error) {
//       console.error('Error sending data:', error);
//     }
//   };
//   return (
//       <>
//        {/* <h1>MainPage!</h1>  */}

//        <div id="box">
//         <div id="input">

//              <form >
//              {/* <p>Input!</p> */}
//                  <label>Upload your PDF File here!</label>
//                  <input type={'file'}
//                  value={inputData}
//                 onChange={(e) => setInputData(e.target.value)}/>
//                  <input type={'submit'} onClick={handleSubmit} />
//              </form>
//              </div>
//        <div id="output">
//         <h3 >Output!</h3>
//               <textarea value={'Text output'}></textarea>
//        </div>
//         </div >
//        </>

//   );
//   };

// export default mainpage;

import React, { useState , useEffect } from 'react';
import axios from 'axios';
import './mainpage.css';



function mainpage() {
  const [pdfFile, setPdfFile] = useState(null);
  const [result,setResult]=useState('');
  // useEffect(() => {
  //   // Make HTTP GET request to backend API endpoint
  //   fetch('http://localhost:4000/resdata')
  //     .then(responsere => {
  //       // Handle successful response
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       // Handle error
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

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
        setResult(response.data.result)
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
        <h3>Output!</h3>
       {/* <textarea value={result}></textarea> */}
       <p>{result}</p>
      </div>
    </div>
  );
}

export default mainpage;



  
