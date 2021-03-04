import React from 'react'
import { Button } from '../../common/Button';
import { Link } from 'react-router-dom';
function Footer(props) {

    const instagram = () => {
        window.location.href = 'https://www.instagram.com/Kirikousystems/'
    }
    const facebook = () => {
        window.location.href = 'https://www.facebook.com/kirikousystems/'
    }
    const youtube = () => {
        window.location.href = 'https://www.youtube.com/channel/UCSFunfTgs_ZKEzKSODP36cw'
    }
    const linkedin = () => {
        window.location.href = 'https://www.linkedin.com/in/stephen-f-kadiona-61a6b8196/'
    }
    const twitter = () => {
        window.location.href = 'https://twitter.com/KirikouSystems'
    }
    const contactUs = () => {
        window.location.href = 'https://kirikousystems.com/contact/'
    }
    const aboutUs = () => {
        window.location.href = 'https://kirikousystems.com/qui-sommes-nous/'
    }
    const agricole = () => {
        window.location.href = 'https://www.youtube.com/watch?v=1HzxIwZPvPk'
    }
    const domestique = () => {
        window.location.href = 'https://www.youtube.com/watch?v=k8slqwtGkuE'
    }
    return (
        <div className="footer-container">
            <section className="footer-subscription">
                <p className="footer-subscription-heading">Joindre notre newsletters pour recevoir en premier les meilleures offres de Kirikou Systems</p>
                <p className="footer-subscription-text">Vous pouvez vous désabonner à tout moment !</p>
                <div className="input-areas">
                    <form className="alignItems">
                        <input type="email" name="email" placeholder="Votre email" className="footer-input"/>
                        <Button buttonStyle='btn--outline' buttonSize="btn--medium">Abonner</Button>
                    </form>
                </div>
            </section>
            <div className="footer-links">
                <div className='footer-link-wrapper'>
                    <div class='footer-link-items'>
                        <h2>About Us</h2>
                        <Link onClick={aboutUs}>How it works</Link>
                    </div>
                    <div class='footer-link-items'>
                        <h2>Contact Us</h2>
                        <Link onClick={contactUs}>Contact</Link>
                    </div>
                </div>
                <div className='footer-link-wrapper'>
                    <div class='footer-link-items'>
                        <h2>Videos</h2>
                        <Link onClick={agricole}>Agricole</Link>
                        <Link onClick={domestique}>Domestique</Link>
                    </div>
                    <div class='footer-link-items'>
                        <h2>Social Media</h2>
                        <Link onClick={instagram}>Instagram</Link>
                        <Link onClick={facebook}>Facebook</Link>
                        <Link onClick={youtube}>Youtube</Link>
                        <Link onClick={twitter}>Twitter</Link>
                        <Link onClick={linkedin}>LinkedIn</Link>
                        
                    </div>
                </div>
            </div>
            <section class='social-media'>
            <div class='social-media-wrap'>
                <div class='footer-logo'>
                    <Link className='social-logo' onClick={props.gotoElement}>
                    KIRIKOU PRESTATION
                    <i class="far fa-grin-stars ml-2"/>
                    </Link>
                </div>
                <small class='website-rights'>KIRIKOU PRESTATION © 2021</small>
                <div class='social-icons'>
                    <Link
                    class='social-icon-link facebook'
                    onClick={facebook}
                    aria-label='Facebook'
                    >
                    <i class='fab fa-facebook-f' />
                    </Link>
                    <Link
                    class='social-icon-link instagram'
                    onClick={instagram}
                    aria-label='Instagram'
                    >
                    <i class='fab fa-instagram' />
                    </Link>
                    <Link
                    class='social-icon-link youtube'
                    onClick={youtube}
                    aria-label='Youtube'
                    >
                    <i class='fab fa-youtube' />
                    </Link>
                    <Link
                    class='social-icon-link twitter'
                    onClick={twitter}
                    aria-label='Twitter'
                    >
                    <i class='fab fa-twitter' />
                    </Link>
                    <Link
                    class='social-icon-link linkedin'
                    onClick={linkedin}
                    aria-label='LinkedIn'
                    >
                    <i class='fab fa-linkedin' />
                    </Link>
                </div>
            </div>
            </section>
        </div>
    )
}

export default Footer
