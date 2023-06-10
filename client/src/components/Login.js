import React, {useRef, useState, useEffect, useContext} from 'react'
import axios from '../api/axios'
import AuthContext from '../context/AuthProvider'

const LOGIN_URL = '/api/authorize'

const Login = () => {
    const { setAuth } = useContext(AuthContext)
    const emailRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, pwd])

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
            setAuth({ email, password: pwd, accessToken })
            setEmail('')
            setPwd('')
            setSuccess(true)
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

    // classes for css: errmsg, offscreen
    return (
    <>
        {success ? (
            <section>
                <h1>You are logged in!</h1>
                <br />
                <p>
                    <a href='#'>Go to Home</a>
                </p>
            </section>
        ) : (
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
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
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
            </form>
            <p>
                Need an Account <br />
                <span>
                    {/* React Router Link */}
                    <a href='#'>Sign up</a>
                </span>
            </p>
        </section> )}
    </>
    ) 
}

export default Login