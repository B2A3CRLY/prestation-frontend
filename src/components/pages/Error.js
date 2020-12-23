import React from 'react'
import Banner from '../common/banner'
import Hero from '../common/hero'
import {Link} from 'react-router-dom'
export default function Error() {
    return (
        <Hero>
            <Banner title="404" subtitle="page not found">
                <Link to="/" className="btn-error">return home</Link>
            </Banner>
        </Hero>
    )
}

