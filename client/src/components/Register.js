import '../styles/register.style.css'
import React, { useRef, useState, useEffect } from "react";
import {HashLink as Link} from 'react-router-hash-link'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from '../api/axios'
import Nav from './Nav';

const NAME_REGEX = /^[a-zA-Z]{3,24}$/
const DISPLAY_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{4,24}$/
const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const REGISTER_URL = '/api/register'

const Register = () => {
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const displayNameRef = useRef()
    const emailRef = useRef()
    const errRef = useRef()

    const [firstname, setFirstname] = useState('')
    const [validFirstname, setValidFirstname] = useState(false)
    const [firstnameFocus, setFirstnameFocus] = useState(false)

    const [lastname, setLastname] = useState('')
    const [validLastname, setValidLastname] = useState(false)
    const [lastnameFocus, setLastnameFocus] = useState(false)

    const [displayName, setDisplayName] = useState('')
    const [validDisplay, setValidDisplay] = useState(false)
    const [displayFocus, setDisplayFocus] = useState(false)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        firstNameRef.current.focus()
    }, [])

    useEffect(() => {
        const result = NAME_REGEX.test(firstname)
        console.log(result)
        console.log(firstname)
        setValidFirstname(result)
    }, [firstname])

    useEffect(() => {
        const result = NAME_REGEX.test(lastname)
        console.log(result)
        console.log(lastname)
        setValidLastname(result)
    }, [lastname])

    useEffect(() => {
        const result = DISPLAY_REGEX.test(displayName)
        console.log(result)
        console.log(displayName)
        setValidDisplay(result)
    }, [displayName])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        console.log(result)
        console.log(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(password)
        console.log(result)
        console.log(password)
        setValidPwd(result)
        const match = password === matchPwd
        setValidMatch(match)
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [firstname, lastname, email, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(lastname === '') {setLastname('DEFAULT')}
        const v1 = NAME_REGEX.test(firstname)
        const v2 = NAME_REGEX.test(lastname)
        const v3 = DISPLAY_REGEX.test(displayName)
        const v4 = EMAIL_REGEX.test(email)
        const v5 = PWD_REGEX.test(password)
        if(!v1 || !v2 || !v3 || !v4 || !v5) {
            setErrMsg('Invalid Entry')
            return
        }
        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({firstname, lastname, displayName, email, password}),
            {
                headers: { 'Content-Type' : 'application/json' },
                withCredentials: true
            }
            )
            setSuccess(true)
            // CLEAR INPUT FIELDS
            setFirstname('')
            setLastname('')
            setDisplayName('')
            setEmail('')
            setPassword('')
            setMatchPwd('')
        } catch (err) {
            if(!err?.response) {
                setErrMsg('No Server Response')
            } else if(err.response?.status === 409) {
                setErrMsg('Username Taken')
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus()
        }

    }

    //classes to create in CSS:
    // 'errmsg' 'offscreen' 'instructions' 'valid' 'hide' 'invalid'
    return (
        <section>
            <Nav />
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">
                    First Name:
                    <span className={validFirstname ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validFirstname || !firstname ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="text"
                    id="firstname"
                    ref={firstNameRef}
                    autoComplete="off"
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                    aria-invalid={validFirstname ? 'false' : 'true'}
                    aria-describedby="uidnote"
                    onFocus={() => setFirstnameFocus(true)}
                    onBlur={() => setFirstnameFocus(false)}
                />
                <p id="uidnote" className={firstnameFocus && firstname && !validFirstname ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon = { faInfoCircle } />
                    3 to 25 characters.<br/>
                    Only capitol, lowercase letters allowed.<br />
                </p>
                <label htmlFor="lastname">
                    Last Name:
                    {/* <span className={validLastname ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span> */}
                    <span className={validLastname || !lastname ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="text"
                    id="lastname"
                    ref={lastNameRef}
                    autoComplete="off"
                    onChange={(e) => setLastname(e.target.value)}
                    aria-invalid={validLastname ? 'false' : 'true'}
                    aria-describedby="uidnote"
                    onFocus={() => setLastnameFocus(true)}
                    onBlur={() => setLastnameFocus(false)}
                />
                <p id="uidnote" className={lastnameFocus && lastname && !validLastname ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon = { faInfoCircle } />
                    3 to 25 characters.<br/>
                    Only capitol, lowercase letters allowed.<br />
                </p>
                <label htmlFor="displayName">
                    Display Name:
                    <span className={validDisplay ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validDisplay || !displayName ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="text"
                    id="displayName"
                    ref={displayNameRef}
                    autoComplete="off"
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                    aria-invalid={validLastname ? 'false' : 'true'}
                    aria-describedby="uidnote"
                    onFocus={() => setDisplayFocus(true)}
                    onBlur={() => setDisplayFocus(false)}
                />
                <p id='uidnote' className={displayFocus && displayName && !validDisplay ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    5 to 25 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="email">
                    Email:
                    <span className={validEmail ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validEmail || !email? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="email"
                    id="email"
                    ref={emailRef}
                    autoComplete="on"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={validEmail ? 'false' : 'true'}
                    aria-describedby="uidnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                <p id='uidnote' className={emailFocus && email && !validEmail ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must be a valid email address.
                </p>

                <label htmlFor="password">
                    Password:
                    <span className={validPwd ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPwd || !password ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type='password'
                    id='password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-invalid={validPwd ? 'false' : 'true'}
                    aria-describedby='pwdnote'
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id='pwdnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters: <span aria-label='exclamation mark'>!</span> <span aria-label='at symbol'>@</span> <span aria-label='hashtag'>#</span> <span aria-label='dollarsign'>$</span> <span aria-label='percent symbol'>%</span>
                </p>
                <label htmlFor="confirm_pwd">
                    Confirm Password:
                    <span className={validMatch && matchPwd ? 'valid' : 'hide'}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validMatch || !matchPwd ? 'hide' : 'invalid'}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type='password'
                    id='confirm_pwd'
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? 'false' : 'true'}
                    aria-describedby='confirmnote'
                    onFocus={() => setMatchPwd(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id='confirmnote' className={matchFocus && !validPwd ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field.
                </p>

                <button disabled={!validFirstname || !validEmail || !validDisplay || !validPwd || !validMatch ? true : false }>Sign Up</button>
            </form>
            <p>
                Already registered?<br/>
                <span className='line'>
                    {/*put router link here*/}
                    <Link to='/login'>Sign In</Link>
                </span>
            </p>
        </section>
        )
};

export default Register;
