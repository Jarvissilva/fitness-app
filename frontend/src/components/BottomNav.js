import '../styles/components/BottomNav.css'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { RiHomeSmile2Line } from 'react-icons/ri'
import { BiSearchAlt } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'
import { RiUser5Line } from 'react-icons/ri'

const BottomNav = () => {
    const history = useHistory()
    return (
        <div className='row bottomNav'>
            <div className='row bn-btn'>
                <RiHomeSmile2Line
                    size='35'
                    color='#000'
                    fill='black'
                    onClick={() => history.push('/')}
                />
            </div>
            <div className='row bn-btn'>
                <BiSearchAlt
                    size='35'
                    color='#000'
                    onClick={() => history.push('/search')}
                />
            </div>
            <div className='row bn-btn'>
                <AiOutlineHeart
                    size='35'
                    color='#000'
                    onClick={() => history.push('/saved')}
                />
            </div>
            <div className='row bn-btn'>
                <RiUser5Line
                    size='35'
                    color='#000'
                    onClick={() => history.push('/account')}
                />
            </div>
        </div>
    )
}

export default BottomNav
