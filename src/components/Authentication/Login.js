import React from "react";
import './Auth.css'
import Axios from "axios";
import {useFormik} from "formik";

export default function Login() {

    const {handleSubmit, handleChange, values} = useFormik({
        initialValues: {
            loginEmail: '',
            loginPassword: ''
        },
        onSubmit: (loginEmail,loginPassword) => {
            Axios.post("https://go-electrical-server.herokuapp.com/login", {
                email: values.loginEmail,
                password: values.loginPassword
            })}})

    return (
        <div>
            <div className="auth_form">
                <form onSubmit={handleSubmit}>
                    <input
                        value={values.loginEmail}
                        onChange={handleChange}
                        id='loginEmail'
                        name='loginEmail'
                        placeholder='Phone or email'/>
                    <input
                        value={values.loginPassword}
                        onChange={handleChange}
                        id='loginPassword'
                        name='loginPassword'
                        type='password'
                        placeholder='Password'/>
                    <div className="loginButtons">
                        <button type='submit' className="auth_button" >Log in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}