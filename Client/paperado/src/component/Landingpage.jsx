// import React from 'react'
import { Link } from 'react-router-dom'
import './Landingpage.css'
import butterfly from '../assets/butterfly.jpeg'
import insta from '../assets/insta.jpeg'
import github from '../assets/github.png'

export default function Landingpage() {
  return (
    <div>
      <nav>
        <p className='title'>Paperado</p>
        <div className='flex'>
        <ul>
            <li>Home</li>
            <li>About</li>
            <li>FAQ</li>
        </ul>
        <div className="top-bar">
            <Link to="/" className="login">Login</Link>
        </div>
        </div>
      </nav>
      <div className='desc'>
        <h1 className='create'>Unleash Your Creativity <br /> with Origami</h1>
        <div className='started' >
          <Link to="/" className="signup">Get Started</Link>
          </div >
          <div className='paradec'>
            <p>“Oru” in Japanese means ‘to fold’ and “Kami” in <br />
            Japanese means ‘Paper’, so it translates as <br />
            ‘To fold paper‘. Learn more about the <br />
            origins of origami here. <br /> <br />
            Please Login or signup to find the video for better <br />
            understanding how to make origami. <br /> <br />
            Enjoy folding!</p>
            <img className='image1' src={butterfly} alt="" />
          </div>
      </div>
      <div className='question'>
        <div className='common-questions'>
          <p className='faq'>FAQ</p>
          <p className='common'>Common questions</p>
          <p className='comque'>Here are some of the most common <br />questions that we get.</p>
        </div>
        <div className='question-no'>
          <p className='questions1'>What is origami?</p>
          <p className='answer'>Origami is the art of paper folding, which originated in Japan.</p>
          <p className='questions1'>Is origami suitable for beginners?</p>
          <p className='answer'>Yes, origami can be enjoyed by beginners as well as experienced folders. There are simple <br />designs for beginners to start with.</p>
          <p className='questions1'>What kind of paper is best for origami?</p>
          <p className='answer'>Thin and crisp paper such as origami paper or kami is ideal for origami projects.</p>
          <p></p>
        </div>
      </div>
      <div className='contact'>
        <p className='contactus'>Contact Us</p>
        <div className='logo'>
          <img src={insta} alt="" />
          <img src={github} alt="" />
        </div>
      </div>
      <hr />
      <footer>
        <p className='footer'>Copyright © 2024  Paperado - All Rights Reserved - </p>
      </footer>
    </div>
  )
}
