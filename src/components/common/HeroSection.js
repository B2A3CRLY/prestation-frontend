import React from 'react'
import { Button } from '../common/Button';

function HeroSection() {
    return (
        <div className="hero-container">
            <video src="../../video/video-2.mp4" autoPlay loop />
            <h1>WELCOME TO KIRIKOU PRESTATION !</h1>
            <p>Un avenir brillant dont vous êtes le heros !</p>
            <div className="hero-btns">
                <Button
                    className="btns"
                    buttonStyle="btn--primary"
                    buttonSize="btn--large"
                >
                    START
                </Button>
            </div>
        </div>
    )
}

export default HeroSection
