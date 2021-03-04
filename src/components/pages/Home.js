import React, { Component, useRef} from 'react';
import { Link } from 'react-router-dom';
import Hero from '../common/hero';
import Banner from '../common/banner';
import Cards from './card/Cards';
import Footer from './footer/Footer';
import ScrollToTop  from './scrollToTop/index';

const Home = () => {
    const toElement = useRef(null);
    const gotoElement = () => {
        window.scrollTo({top: toElement.current.offsetTop, behavior:"smooth"})
    }
    const scrollToBottom = () => window.scrollTo({
        top:document.documentElement.scrollHeight, behavior:"smooth"
    })
    return (
        <>
           <ScrollToTop />
           <Hero hero="defaultHeroHome">
                <Banner title="KIRIKOU PRESTATION" subtitle="un avenir brillant dont vous êtes le heros ! ">
                    <Link className="btn-error mr-2 mbMobile" onClick={gotoElement}>Nos collections</Link>
                    <Link className="btn-error" onClick={scrollToBottom}>A propos !</Link>
                </Banner>
            </Hero>
            <div ref={toElement}>
                <Cards/>
            </div>
            <Footer gotoElement={gotoElement}/>

        </>
    )
     
}
export default Home;