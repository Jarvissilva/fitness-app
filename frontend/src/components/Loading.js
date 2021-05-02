import React from 'react'
import LoadingIcon from '../assets/icons/Loading.svg'

const Loading = () => {
    return (
        <div className='row loading-screen'>
            <img src={LoadingIcon} alt='Loading...' />
        </div>
    )
}

export default Loading
