import '../../styles/screens/MAuth.css'
import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { RiDoorLockLine } from 'react-icons/ri'
import { GrMapLocation } from 'react-icons/gr'
import { states } from '../../constants/States'
import * as api from '../../api'


const Register = () => {
    const history = useHistory()
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', state: ''
    })
    const [message, setMessage] = useState('')
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        const res = await api.post('/member/account/register', formData)
        if (res.status) {
            history.push('/')
        }
        else {
            setMessage(res.message)
        }
    }

    return (
        <div>
            <div className='row MAuth-logo'>
                <h1>Fitify</h1>
            </div>
            <div className='column MAuth-content'>
                {message && <p>{message}</p>}
                <form className='column MAuth-form' onSubmit={handleSubmit}>
                    <div className='row MAuth-input'>
                        <div className='row ai-icon'>
                            <FaRegUser size='20' />
                        </div>
                        <input
                            type='text'
                            placeholder='Enter your full name'
                            name='name'
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className='row MAuth-input'>
                        <div className='row ai-icon'>
                            <HiOutlineMail size='20' />
                        </div>
                        <input
                            type='email'
                            placeholder='Enter your email'
                            name='email'
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className='row MAuth-select'>
                        <div className='row ai-icon'>
                            <GrMapLocation size='20' />
                        </div>
                        <select name='state' required onChange={handleChange}>
                            <option selected>Choose your state</option>
                            {states.map(s => <option className='state-o' value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div className='row MAuth-input'>
                        <div className='row ai-icon'>
                            <RiDoorLockLine size='20' />
                        </div>
                        <input
                            type='password'
                            placeholder='Enter a password'
                            name='password'
                            required
                            onChange={handleChange}
                        />
                    </div>
                    {/* <div className='row MAuth-rm'>
                        <div className='row MAuth-checkbox'>
                            <input type="checkbox" name='agree' />
                        </div>
                        <p>Agree to terms and conditions</p>
                    </div> */}
                    <button className='MAuth-submit-btn'>Create Account</button>
                </form>
                <div className='row MAuth-bottom'>
                    <p>Have a account?</p>
                    <Link to='/member/account/login'>Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Register
