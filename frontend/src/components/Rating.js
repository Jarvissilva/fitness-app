import React from 'react'
import { AiFillStar } from 'react-icons/ai'

const Rating = () => {
    return (
        <div className='row rating'>
            <AiFillStar color='var(--rating-color)' />
            <AiFillStar color='var(--rating-color)' />
            <AiFillStar color='var(--rating-color)' />
            <AiFillStar color='var(--rating-color)' />
            <AiFillStar color='var(--rating-color)' />
        </div>
    )
}

export default Rating
