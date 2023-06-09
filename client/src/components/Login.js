import React, {useRef, useState, useEffect} from 'react'
import useAuth from '../hooks/useAuth'
import { HashLink as Link } from 'react-router-hash-link'
import {useNavigate, useLocation} from 'react-router-dom'
import useInput from '../hooks/useInput'
import useToggle from '../hooks/useToggle'

import axios from '../api/axios'
const LOGIN_URL = '/api/authorize'


const Login = () => {
    const { setAuth } = useAuth()
    
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const emailRef = useRef()
    const errRef = useRef()

    const [email, resetEmail, emailAttribs] = useInput('email', '') //useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [check, toggleCheck] = useToggle('persist', false)


    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, pwd])

    //peristCheck

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({email, password: pwd}),
                {
                    headers: {'Content-Type' : 'application/json'},
                    withCredentials: true
                }
            )
            const accessToken = response?.data?.accessToken
            
            setAuth({ email, accessToken })
            resetEmail() // setEmail('')
            setPwd('')
            navigate(from, {replace: true})
        } catch (err) {
            if(!err?.response) {
                setErrMsg('No Server Response')
            } else if(err.response?.status === 400) {
                setErrMsg('Missing Email or Password')
            } else if(err.response?.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }
            errRef.current.focus()
        }

    }

    // const togglePersist = () => {
    //     setPersist(prev => !prev)
    // }

    // useEffect(() => {
    //     localStorage.setItem('persist', persist)
    // }, [persist])

    // classes for css: errmsg, offscreen
    return (
        <section>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor='email'> Email: </label>
                <input
                    type='text' 
                    id='email'
                    ref={emailRef}
                    autoComplete='off'
                    {...emailAttribs}
                    required
                />

                <label htmlFor='password'> Password: </label>
                <input
                    type='password' 
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />

                <button>Sign In</button>
                <div className='persistCheck'>
                    <input
                        type='checkbox'
                        id='persist'
                        onChange = {toggleCheck}
                        checked={check}
                    />
                    <label htmlFor='persist'>Trust this device</label>
                </div>
            </form>
            <p>
                Need an Account <br />
                <span>
                    <Link to='/'>Sign Up</Link>
                </span>
            </p>
        </section> 
    )
}

export default Login