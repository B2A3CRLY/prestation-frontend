import React from 'react';
import Hero from '../common/hero';
import Banner from '../common/banner';
import {Link} from 'react-router-dom'


export default function HomeServiceList() {
    return (
        <>
            <Hero>
                <Banner title="devis agricole | devis domestique" subtitle="Cliquer pour afficher la liste">
                    <Link to="/liste-devis-agricole" className="mr-2 btn-error">Liste Agricole</Link>
                    <Link to="/liste-devis-domestique" className="btn-error">Liste Domestique</Link>
                </Banner>
            </Hero>
        </>
    )
}