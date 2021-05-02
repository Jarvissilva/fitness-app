import '../styles/screens/Saved.css'
import React from 'react'
import BottomNav from '../components/BottomNav'

const Saved = () => {
    return (
        <div>
            <div className='row s-header'>
                <h1>Saved</h1>
            </div>
            <div className='column s-saved-businesses'>
                <div className='row s-s-business'>
                    <img src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg' />
                    <div className='column ssb-meta'>
                        <h1>Velsao super gym</h1>
                        <p>Margao, Goa</p>
                    </div>
                </div>
                <div className='row s-s-business'>
                    <img src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg' />
                    <div className='column ssb-meta'>
                        <h1>Velsao super gym</h1>
                        <p>Margao, Goa</p>
                    </div>
                </div>
                <div className='row s-s-business'>
                    <img src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg' />
                    <div className='column ssb-meta'>
                        <h1>Velsao super gym</h1>
                        <p>Margao, Goa</p>
                    </div>
                </div>
            </div>
            <BottomNav />
        </div>
    )
}

export default Saved
