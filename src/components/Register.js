import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Register = (props) => {
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmRegisterPassword, setConfirmRegisterPassword] = useState('');
    const [registerPasswordsMatch, setRegisterPasswordsMatch] = useState(false);
    const [allFieldsComplete, setAllFieldsComplete] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(false);

    const onChange = (event) => {
        if (event.target.name === 'registerUsername') {
            setRegisterUsername(event.target.value);
        } else if (event.target.name === 'registerPassword') {
            setRegisterPassword(event.target.value);
        } else if (event.target.name === 'confirmRegisterPassword') {
            setConfirmRegisterPassword(event.target.value);
        }
    }

    useEffect(() => {
        if (registerPassword === confirmRegisterPassword) {
            setRegisterPasswordsMatch(true);
        } else {
            setRegisterPasswordsMatch(false);
        }

        if (registerUsername.length > 0 && (registerUsername === '' || registerPassword === '')) {
            setAllFieldsComplete(false)
        } else {
            setAllFieldsComplete(true);
        }
    }, [registerUsername, registerPassword, confirmRegisterPassword])

    const accountRegister = async (event) => {
        event.preventDefault();
        let username = registerUsername;
        let password = registerPassword;
        try {
            const response = await axios.post('/api/users/register', {
                username,
                password,
                isAdmin: false
            });

            if (!response.data.token) {
                setErrorMessage(response.data.error);
            } else {
                props.setUserToken(response.data.token);
                window.localStorage.setItem('token', `${response.data.token}`);
                props.setIsLoggedIn(true);
                return setIsRegistered(true);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container" id="loginform">
            <div id='login-container'>
                <div id='login'>
                    <h1>Register</h1>
                    <form>

                        <div className="form-floating mb-3" id='login-field'>
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                value={registerUsername}
                                onChange={onChange}
                                name='registerUsername'
                                placeholder="Username" />

                            <label htmlFor="floatingInput">Username</label>
                        </div>

                        <div className="form-floating" id='login-field'>
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                value={registerPassword}
                                onChange={onChange}
                                name='registerPassword'
                                placeholder="Password"></input>

                            <label htmlFor="floatingPassword">Password</label>
                        </div>

                        <div className="form-floating" id='login-field'>
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                value={confirmRegisterPassword}
                                onChange={onChange}
                                name='confirmRegisterPassword'
                                placeholder="Password"></input>

                            <label htmlFor="floatingPassword">Confirm Password</label>
                        </div>

                        {isRegistered ? <Navigate to='/products' /> : <div className='text-danger'>{errorMessage}</div>}

                        {registerPasswordsMatch ? null : <div className='text-danger'>The entered passwords do not match.</div>}

                        {allFieldsComplete ? null : <div className='text-danger'>All fields must be completed.</div>}

                        {registerPasswordsMatch && allFieldsComplete ?
                            <button
                                type="register"
                                className="btn btn-primary"
                                id='login-buttons'
                                onClick={accountRegister}>
                                Register
                            </button> :
                            <button
                                type="register"
                                className="btn btn-primary"
                                id='login-buttons'>
                                Register
                            </button>}

                    </form>
                    <small className="form-text text-muted">Already have an account? <Link to='/login'>Click Here.</Link></small>
                </div>
            </div>
        </div>
    )
}

export default Register;