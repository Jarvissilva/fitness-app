import '../../styles/screens/BAuth.css'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import BackHeader from '../../components/BackHeader'
import * as api from '../../api'

const BRegister = () => {
    const history = useHistory()
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', owner: '', category: '', state: '', city: '', postalCode: '', address: '', contact_no: ''
    })
    const [message, setMessage] = useState('')
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        const res = await api.post('/business/account/register', formData)
        if (res.status) {
            history.push('/')
        }
        else {
            setMessage(res.message)
        }
    }

    return (
        <div>
            <BackHeader title='Business Register' />
            <div className='column b-auth-form'>
                <form className='column' onSubmit={handleSubmit}>
                    {message && <p>{message}</p>}
                    <div className='column b-auth-input'>
                        <label htmlFor='bo-email'>Email *</label>
                        <input type="email" id='bo-email' name='email' required onChange={handleChange} />
                    </div>
                    <div className='column b-auth-input'>
                        <label htmlFor='bo-password'>Password *</label>
                        <input type="password" id='bo-password' name='password' required onChange={handleChange} />
                    </div>
                    <div className='column b-auth-input'>
                        <label htmlFor='b-name'>Business name *</label>
                        <input type="text" id='b-name' name='name' required onChange={handleChange} />
                    </div>
                    <div className='column b-auth-input'>
                        <label htmlFor='bo-name'>Business owner name *</label>
                        <input type="text" id='bo-name' name='owner' required onChange={handleChange} />
                    </div>
                    <div className='column b-auth-input'>
                        <label htmlFor='b-contact'>Business contact no *</label>
                        <input type="text" id='b-contact' name='contact_no' required onChange={handleChange} />
                    </div>
                    <div className='column b-auth-input'>
                        <label htmlFor='b-address'>Business address *</label>
                        <input type="text" id='b-address' name='address' required onChange={handleChange} />
                    </div>
                    <div className='column b-auth-input'>
                        <label htmlFor='b-address'>Business Category *</label>
                        <input type="text" id='b-address' name='category' required onChange={handleChange} />
                    </div>
                    <div className='column b-auth-input'>
                        <label htmlFor='b-state'>Enter your state *</label>
                        <input type="text" id='b-state' name='state' required onChange={handleChange} />
                    </div>
                    <div className='column b-auth-input'>
                        <label htmlFor='b-pincode'>Enter your postalCode *</label>
                        <input type="text" id='b-pincode' name='postalCode' required onChange={handleChange} />
                    </div>
                    <div className='column b-auth-input'>
                        <label htmlFor='b-city'>Enter your city *</label>
                        <input type="text" id='b-city' name='city' required onChange={handleChange} />
                    </div>
                    <div className='row b-next-btn'>
                        <button type='submit'>Create Account</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default BRegister
