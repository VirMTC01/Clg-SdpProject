import React from "react";
import './landingpage.css';
import { NavLink } from "react-router-dom";

function page() {

  return (
    <>
    {/* <h1>Homepage!!!!</h1> */}
     
       


       <div class="main">
         <div class="navbar">
           <div class="icon">
           <img src={ require('./images/logo.png') } />
    
           </div>

           <div class="menu">
             <ul>
               <li><a href="#">HOME</a></li>
               <li><a href="#">ABOUT</a></li>
               <li><a href="#">HELP</a></li>
               <li><a href="#">GUIDE</a></li>
               <li><a href="#">CONTACT</a></li>
             </ul>
           </div>

           <div class="search">
            <input class="srch" type="search" name="" placeholder="Type To text" />
             <a href="#"> <button class="btn">Search</button></a>
           </div>

         </div>
         <div class="content">
           <h1 >PDF<br /><span>Scanner</span> <br />Summarizer</h1>
         <p class="par">Lorem ipsum dolor sit amet, consectetur adipisicing elit.<br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, magnam? Lorem ipsum dolor sit amet.</p>

         <button class="cn"><a href="#">JOIN US</a></button>

         <div class="form">
           <h2>Login Here</h2>
           <input type="email" name="email" placeholder="Enter Email Here" />
           <input type="password" name="" placeholder="Enter Password Here" />
           <button class="btnn">
              <NavLink to={'/mainpage'}>Login</NavLink>
           </button>

           <p class="link">Don't have an account<br />
             <a href="#">Sign up  here</a></p>
           <p class="liw">Log in with</p>

           <div class="icons">
             <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
             <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
             <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
             <a href="#"><ion-icon name="logo-google"></ion-icon></a>
             <a href="#"><ion-icon name="logo-skype"></ion-icon></a>
           </div>

         </div>
       </div>
    
     </div>
     
    </>
  )
};

export default page;