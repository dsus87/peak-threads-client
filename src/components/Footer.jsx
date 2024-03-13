import React from 'react';

function Footer() {
  return (
    <footer className="bg-white text-center p-4">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 mb-4 mb-md-0">

          <a href="https://www.linkedin.com/in/daniel-susetio/"  style={{ color: 'black', fontSize: 20}}>
            Developed by Daniel Susetio
          </a>
           <br></br>
    
          <a href="https://www.linkedin.com/in/daniel-susetio/"  style={{ color: 'black', fontSize: 20}}>
         linkedin    
          </a> 

          <a href="https://github.com/dsus87"  style={{ color: 'black', fontSize: 20}}>
          GitHub   
          </a> 

          <p style={{ color: 'black', fontSize: 20}}>This site is built using the MERN stack for educational purposes only.</p>
        </div>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
