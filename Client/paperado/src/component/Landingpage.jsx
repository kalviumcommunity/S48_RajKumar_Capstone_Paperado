// import React from 'react'
import { Link } from 'react-router-dom'
import './Landingpage.css'

export default function Landingpage() {
  return (
    <div>
      <nav>
        <p>Paperado</p>
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
      </div>
      <p>Oru in Japanese means to fold and Kami in Japanese means Paper, so it translates as To fold paper.Learn more about the origins of origami here.</p>
      </div>
    </div>
  )
}
