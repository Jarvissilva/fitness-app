import '../../styles/screens/MAuth.css'
import { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
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
        const res = await api.post('/member/account/login', formData)
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
                {message && <h1>{message}</h1>}
                <form className='column MAuth-form m-login' onSubmit={handleSubmit}>
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
                    <button className='MAuth-submit-btn'>Login</button>
                </form>
                <div className='row MAuth-bottom'>
                    <p>Dont Have a account?</p>
                    <Link to='/member/account/register'>Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
