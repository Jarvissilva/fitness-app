import '../styles/components/BackHeader.css'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { IoChevronBack } from 'react-icons/io5'

const BackHeader = props => {
    const history = useHistory()
    const goBack = () => history.goBack()
    return (
        <div className='row back-header'>
            <div className='row bh-back-btn'>
                <IoChevronBack size='35' color='#000' className='back-btn' onClick={goBack} />
            </div>
            <div className='row bh-text'>
                <h1>{props.title}</h1>
            </div>
        </div>
    )
}

export default BackHeader
