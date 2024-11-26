import React from 'react';
import './Footer.css';
import { Button } from './Button/Button';
import { Link } from 'react-router-dom';
import logowithtext from '../../assets/images/logowithtext.PNG';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
        We don’t just make pizza – we create fun, delicious moments with great taste and speedy service!
        </p>
        <p className='footer-subscription-text'>
        For any issues related to our store, please send it here!
        </p>
        <div className='input-areas'>
  <form>
    <input
        className='footer-input'
        name='email'
        type='email'
        placeholder='Your Email'
    />
    <textarea
        className='footer-input problem-input'
        name='problem'
        placeholder='Your Problem'
    ></textarea>
    <Button buttonStyle='btn--outline' className="footer-submit" to='/'>Submit</Button>
  </form>
</div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/sign-up'>How it works</Link>
            <Link to='/'>Testimonials</Link>
            <Link to='/'>Careers</Link>
            <Link to='/'>Investors</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact</Link>
            <Link to='/'>Support</Link>
            <Link to='/'>Destinations</Link>
            <Link to='/'>Sponsorships</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Recruitment</h2>
            <Link to='/'>Requirements</Link>
            <Link to='/'>Influencer</Link>
            <Link to='/'>Benefits</Link>
          </div>

          <div class='footer-link-items'>
            <h2>Recruitment</h2>
            <Link to='https://www.facebook.com/PizzWang' target="_blank">Instagram</Link>
            <Link to='https://www.facebook.com/PizzWang' target="_blank">Facebook</Link>
            <Link to='https://www.facebook.com/PizzWang' target="_blank">Youtube</Link>
          </div>

        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            <Link to='/' className='social-logo'>
               <img src={logowithtext} alt="Logo" className="social-logo__img"/>
            </Link>
          </div>
          <small class='website-rights'>PizzWang © 2024</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='https://www.facebook.com/PizzWang'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='https://www.facebook.com/PizzWang'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link youtube'
              to='https://www.facebook.com/PizzWang'
              target='_blank'
              aria-label='Youtube'
            >
              <i class='fab fa-youtube' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
