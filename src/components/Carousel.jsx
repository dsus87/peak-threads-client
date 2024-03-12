import React from 'react';
import { Carousel } from 'react-bootstrap';
import one from '../assets/one.jpg'
import two from '../assets/two.jpg'
import three from '../assets/three.jpg'

function MainCarousel() {
  return (
    <Carousel style={{ paddingTop: '20px' }} >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={three}  
         alt="First slide"
        />
        <Carousel.Caption>
          <h3>Nike ACG</h3>
          <p>SEARCH FOR SOMETHING</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={two}             
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>The North Face</h3>
          <p>NEVER STOP EXPLORING</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
               
          src={one}       
               alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MainCarousel;
