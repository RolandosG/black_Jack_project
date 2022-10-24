import React from 'react';
import { Link } from 'react-router-dom';

import {Logo} from '../components';
import main from '../assets/images/main.svg';

import Wrapper from '../assets/wrappers/LandingPage'
const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <Logo/>
        </nav>
        <div className='container page'>

            {/* info page */}
            <div className='info'>
                <h1>Gambling <span>web</span> app</h1>
                <p>
                   The Blackjack web app provides spare time entertainment. 
                   The project aims at every user who wants to play and spend their time for fun. 
                   Blackjack creates a safe environment for the user compatible with the others. 
                   Every user playing Blackjack must register an account to save their process.
                </p>
                <Link to="/register" className='btn btn-hero'>Login/Register</Link>
            </div>

            <img src={main} alt="black jack" className='img main-img'/>
        </div>
    </Wrapper>
  );
}

export default Landing;