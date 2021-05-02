import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import * as api from '../api'

const EmailVerify = () => {
    const { id, type } = useParams()
    const history = useHistory()
    
    const [message, setMessage] = useState('')

    useEffect(async () => {
        const res = await api.post(`/${type}/account/verify-email`, { id })
        console.log(res);
        if (res.status) {
            history.push(`/${type}/account/login`)
            setMessage('Verified Successfully')
        }
        else {
            setMessage('Email not verified')
        }
    }, [])
    
    return (
        <div>
            <h1>{message}</h1>
        </div>
    )
}

export default EmailVerify
