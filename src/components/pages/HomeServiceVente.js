import React from 'react';
import Hero from '../common/hero';
import Banner from '../common/banner';
import {Link} from 'react-router-dom'

export default function HomeServiceVente() {
    return (
        <>
        <Hero hero="defaultHeroHSVente">
            <Banner title="devis vente | liste ventes" subtitle="Cliquer pour créer un devis ou afficher la liste des devis">
                <Link to="/vente" className="mr-2 btn-error mbMobile">Créer Devis</Link>
                <Link to="/liste-devis-vente" className="btn-error">Afficher Liste Devis</Link>
            </Banner>
        </Hero>
        </>
    )
}
