import React from 'react';

function Footer() {
  return (
    <footer className="bg-white text-center p-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 mb-4 mb-md-0">
            <a href="https://www.linkedin.com/in/daniel-susetio/" style={{ color: 'black', fontSize: 24}}>
              Developed by Daniel Susetio
            </a>
            <br></br>
            <a href="https://www.linkedin.com/in/daniel-susetio/" style={{ color: 'black', fontSize: 20, marginRight: '10px' }}>
              linkedin    
            </a>
            <a href="https://github.com/dsus87" style={{ color: 'black', fontSize: 20 }}>
              GitHub   
            </a>
      
         

            <p style={{ color: 'black', fontSize: 16 }}>This site is developed using the MERN stack (MongoDB, Express. js, React, and Node. js, is). 
           Intended for for educational purposes only.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
