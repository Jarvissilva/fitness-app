import '../../styles/screens/MAuth.css'
import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { HiOutlineMail } from 'react-icons/hi'
import { RiDoorLockLine } from 'react-icons/ri'
import * as api from '../../api'

const Login = () => {
    const history = useHistory()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [message, setMessage] = useState('')
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = async e => {
        e.preventDefault()
        const res = await api.post('/business/account/login', formData)
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
                <form className='column MAuth-form m-login' onSubmit={handleSubmit}>
                    {message && <p>{message}</p>}
                    <div className='row MAuth-input'>
                        <div className='row ai-icon'>
                            <HiOutlineMail size='20' />
                        </div>
                        <input
                            type='email'
                            placeholder='Enter your email'
                            name='email'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='row MAuth-input'>
                        <div className='row ai-icon'>
                            <RiDoorLockLine size='20' />
                        </div>
                        <input
                            type='password'
                            placeholder='Enter a password'
                            name='password'
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* <div className='row MAuth-rm'>
                        <div className='row MAuth-checkbox'>
                            <input type="checkbox" name='agree' />
                        </div>
                        <p>Agree to terms and conditions</p>
                    </div> */}
                    <button className='MAuth-submit-btn'>Login</button>
                </form>
                <div className='row MAuth-bottom'>
                    <p>Dont Have a account?</p>
                    <Link to='/business/account/register'>Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
