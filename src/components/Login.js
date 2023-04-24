import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Login = (props) => {
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onChange = (event) => {
        if (event.target.name === 'loginUsername') {
            setLoginUsername(event.target.value);
        } else if (event.target.name === 'loginPassword') {
            setLoginPassword(event.target.value);
        }
    }

    const accountLogin = async (event) => {
        event.preventDefault();
        // it would be slightly better to just pass this data in directly rather than storing it again. We could change our state above to be username and password if we want to still use shorthand syntax in our axios request
        let username = loginUsername;
        let password = loginPassword;

        try {
            const response = await axios.post('/api/users/login', {
                username,
                password
            })

            // do we need returns here?
            if (!response.data.success) {
                return setErrorMessage(response.data.message);
            } else {
                props.setUserToken(response.data.token);
                window.localStorage.setItem('token', `${response.data.token}`);
                return props.setIsLoggedIn(true);
            }

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container" id="loginform">
            <div id='login-container'>
                <div id='login'>
                    <h1>Login</h1>
                    <form>

                        <div className="form-floating mb-3" id='login-field'>
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                value={loginUsername}
                                onChange={onChange}
                                name='loginUsername'
                                placeholder="Username" />

                            <label htmlFor="floatingInput">Username</label>
                        </div>

                        <div className="form-floating" id='login-field'>
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                value={loginPassword}
                                onChange={onChange}
                                name='loginPassword'
                                placeholder="Password"></input>

                            <label htmlFor="floatingPassword">Password</label>
                        </div>

                        {props.isLoggedIn ? <Navigate to='/products' /> : <div className='text-danger'>{errorMessage}</div>}

                        <button
                            type="Login"
                            id='login-buttons'
                            className="btn btn-primary"
                            onClick={accountLogin}>
                            Login
                        </button>

                        <Link to='/register'>
                            <button
                                type="Login"
                                id='login-buttons'
                                className="btn btn-primary">
                                Register
                            </button>
                        </Link>

                    </form>
                </div>
            </div>
        </div> // empty line below, formatting

    )
}

export default Login;
