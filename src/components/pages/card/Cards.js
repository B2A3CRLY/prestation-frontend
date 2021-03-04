import React from 'react'
import CardItem from './CardItem'
import house from '../../../images/kirikou.png';
import agricole from '../../../images/agricole.jpg';
import vente from '../../../images/vente.jpg';

function Cards() {
    return (
        <div className="cards">
            <h1>LES PRESTATIONS DE KIRIKOU</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards_items">
                        <CardItem
                            img={agricole}
                            text="Créer un devis agricole"
                            label="Devis agricole"
                            path="/agricole"
                        />
                        <CardItem
                            img={house}
                            text="Créer un devis domestique"
                            label="Devis domestique"
                            path="/domestique"
                        />
                        <CardItem
                            img={vente}
                            text="Créer un devis vente"
                            label="Devis vente"
                            path="/vente"
                        />
                        <CardItem
                            img={agricole}
                            text="Afficher liste agricole"
                            label="Liste agricole"
                            path="/liste-devis-agricole"
                        />
                        <CardItem
                            img={house}
                            text="Afficher liste domestique"
                            label="Liste domestique"
                            path="/liste-devis-domestique"
                        />
                        <CardItem
                            img={vente}
                            text="Afficher liste vente"
                            label="Liste vente"
                            path="/liste-devis-vente"
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards
