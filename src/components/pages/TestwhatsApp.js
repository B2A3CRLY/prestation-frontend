import React from 'react';
import { WhatsappButton } from 'whatsapp-api-for-react';
export default function TestWhatsApp () {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                    marginLeft: '200px',
                    height: '5px',
                    size:'small',
                    width:'30px',
                    alignItems: 'center'
                }}>
                <WhatsappButton btnText="WhatsApp!"/>
            </div>
        </>
    );
};