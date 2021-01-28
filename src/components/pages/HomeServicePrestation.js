import React from 'react';
import Hero from '../common/hero';
import Banner from '../common/banner';
import {Link} from 'react-router-dom'

export default function HomeServicePrestation() {
    return (
        <>
        <Hero hero="defaultHeroHSPrestation">
            <Banner title="devis agricole | devis domestique" subtitle="Cliquer pour créer un devis">
                <Link to="/agricole" className="mr-2 btn-error">Agricole</Link>
                <Link to="/domestique" className="btn-error">Domestique</Link>
            </Banner>
        </Hero>
        </>
    )
}
