import React from 'react';
import defaultImg from "../../images/image-not-found.png"
export default function Image({ vente }) {
    console.log('Vente:', vente)
    const { designation, img, price, description } = vente
    console.log('designation:', designation)
    return (
        <article className="room">
            <div className="img-container">
            <img src={img || defaultImg} alt="url" />
                <div className="price-top">
                    <h6>${price}</h6>
                </div>
            </div>
            <p className="room-info">{description || designation}</p>
        </article>
    )
}
