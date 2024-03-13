import React from "react";
import './mainpage.css';

function mainpage(){

  return (
      <>
       {/* <h1>MainPage!</h1>  */}
              
       <div id="box">
        <div id="input">
         
             <form >
             {/* <p>Input!</p> */}
                 <label>Upload your PDF File here!</label>
                 <input type={'file'}/>
                 <input type={'submit'}/>
             </form>
             </div>
       <div id="output">
        <h3 >Output!</h3>
              <textarea value="Text output"></textarea>
       </div>
        </div >
       </>
    
  );
};

export default mainpage;