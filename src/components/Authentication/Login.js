import React from "react";
import './Auth.css'
import Axios from "axios";
import {useFormik} from "formik";

export default function Login(props) {

    const {handleSubmit, handleChange, values, resetForm} = useFormik({
        initialValues: {
            loginEmail: '',
            loginPassword: ''
        },
        onSubmit: () => {
            Axios.post("https://go-electrical-server.herokuapp.com/login", {
                email: values.loginEmail,
                password: values.loginPassword
            }).then((response) => {
                if(!response.data === false) {
                    props.setLoggedInUser(response.data[0])
                } else {
                    props.NotificationDanger('Wrong username or password')
                    console.log('ERROR')
                    resetForm()
                }
            })
        }})

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