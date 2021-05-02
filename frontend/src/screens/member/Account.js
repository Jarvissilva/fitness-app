import '../../styles/screens/MAccount.css'
import React from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import BottomNav from '../../components/BottomNav'
import { useHistory } from 'react-router'

const Account = () => {
    return (
        <div className='screen'>
            <div className='row ma-account-header'>
                <h1>My Account</h1>
            </div>
            <div className='column account-photo'>
                <img src='https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg' alt='profile-photo'/>
                <div className='row'>
                    <p>Jarvis Silva</p>
                </div>
            </div>
            <div className='column ma-acount-tabs'>
                <AccountTab icon={<FaRegEdit size='30'/>} title='Edit Account Details' to='/account/edit' />
                <AccountTab icon={<FaRegEdit size='30'/>} title='Privacy Policy' />
                <AccountTab icon={<FaRegEdit size='30'/>} title='Feedback' />
            </div>
            <BottomNav />
        </div>
    )
}

const AccountTab = props => {
    const history = useHistory()
    return (
        <div className='row ma-account-tab' onClick={() => history.push(props.to)}>
            <div className='row at-icon'>
                {props.icon}
            </div>
            <div className='row at-title'>
                <h1>{props.title}</h1>
            </div>
            <div className='row at-back'>
                <IoIosArrowForward size='30'/>
            </div>
        </div>
    )
}

export default Account
