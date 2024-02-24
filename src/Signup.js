import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handleLoginAction, handleSingUpAction, handleResetAction, changePasswordAction } from "./actions/AuthAction";
import { LOGIN_URL, SIGNUP_URL, RESET_PASSWORD, CHANGE_PASSWORD } from "./utils/URL";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData, resetUserData, changePassword } = useSelector((store) => store.AuthReducer);

    const [pageType, setPageType] = useState("sign_in");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    useEffect(() => {
        if (userData) {
            if (userData.data) {
                window.location.href = '/home';
            } else {
                alert(userData.message);
            }
        }
    }, [userData]);

    useEffect(() => {
        if (resetUserData) {
            if (resetUserData.data) {
                setPageType("change_password");
            } else {
                alert(resetUserData.message);
            }
        }
    }, [resetUserData]);

    useEffect(() => {
        if (changePassword) {
            if (changePassword.message == "success") {
                setPageType("sign_in");
            } else {
                alert("Please enter valid email address");
            }
        }
    }, [changePassword]);

    const handleSingUp = () => {
        if (password == confPassword) {
            let payload = {
                name: name,
                email: email,
                password: password
            }
            dispatch(handleSingUpAction(SIGNUP_URL, payload));
        } else {
            alert("Password and confirm password should be same !");
        }
    }

    const handleSingIn = () => {
        let payload = {
            email: email,
            password: password
        }
        dispatch(handleLoginAction(LOGIN_URL, payload));
    }

    const handleResetPassword = () => {
        dispatch(handleResetAction(RESET_PASSWORD, { email }));
    }

    const handleChangePassword = () => {
        if (password == confPassword) {
            let payload = {
                email: resetUserData.data,
                password: password
            }
            dispatch(changePasswordAction(CHANGE_PASSWORD, payload));
        } else {
            alert("Password and confirm password should be same !");
        }
    }

    const handleSwitchForm = (type) => {
        setPageType(type);
        setName("");
        setEmail("");
        setPassword("");
        setConfPassword("");
    }


    return (
        <div>
            {pageType == 'sign_up' &&
                <div className="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>

                    <label for="email"><b>Name</b></label>
                    <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />

                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <label for="psw-repeat"><b>Repeat Password</b></label>
                    <input type="password" placeholder="Repeat Password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />

                    <button type="submit" className="registerbtn" onClick={handleSingUp}>Register</button>

                    <div className="container signin">
                        <p>Already have an account? <a onClick={() => handleSwitchForm("sign_in")}>Sign in</a>.</p>
                    </div>
                </div>
            }
            {pageType == 'sign_in' &&
                <div className="container">
                    <h1>Login</h1>

                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />

                    <button type="button" className="registerbtn" onClick={handleSingIn}>Login</button>

                    <div className="container signin">
                        <p>Not an account? <a onClick={() => handleSwitchForm('sign_up')}>Sign up</a> now.</p>

                        <a onClick={() => handleSwitchForm('forgot_Password')}>Forgot password ?</a>
                    </div>
                </div>
            }
            {
                pageType == 'forgot_Password' &&
                <div className="container">
                    <h1>Forgot Password</h1>

                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />

                    <button type="button" className="registerbtn" onClick={handleResetPassword}>Reset Password</button>
                </div>
            }

            {
                pageType == "change_password" &&
                <div className="container">
                    <h1>change Password</h1>
                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <label for="psw-repeat"><b>Repeat Password</b></label>
                    <input type="password" placeholder="Repeat Password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />

                    <button type="submit" className="registerbtn" onClick={handleChangePassword}>Submit</button>

                </div>
            }

        </div>
    );
}

export default Signup;
