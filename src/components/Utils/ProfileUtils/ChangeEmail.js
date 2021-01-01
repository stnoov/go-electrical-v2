import React from "react";
import Axios from "axios";
import {useFormik} from "formik";
import * as Yup from "yup";
import ReportIcon from "@material-ui/icons/Report";
import './ChangeEmail.css'



export default function ChangeEmail(props) {

    const{handleSubmit, handleChange, values, touched, errors, handleBlur, resetForm} = useFormik({
        initialValues: {
            newEmail: ''
        },
        validationSchema: Yup.object({
            newEmail: Yup.string().email('Invalid email').max(250, 'Email is too long!').min(8, 'Email must be at least 8 characters!').required('This field is required')
        }),
        onSubmit: (values) => {
            Axios.post("https://go-electrical-server.herokuapp.com/user/{props.loggedInUser.id}/change_email", {
                email: props.loggedInUser.email,
                newEmail: values.newEmail
            }).then((response) => {
                if (response.data === false) {
                    props.NotificationDanger('Email is already in use')
                    resetForm()
                } else {
                    props.setLoggedInUser(response.data[0])
                    props.NotificationSuccess('Your email was changed!')
                    resetForm()
                }
            })
        }
    })

    return (
        <div>
            <form onSubmit={handleSubmit} className='change-email-content'>
                New email:<br/>
                <input type="text"
                       name='newEmail'
                       id='newEmail'
                       value={values.newEmail}
                       onChange={handleChange}
                       onBlur={handleBlur}
                />
                {touched.newEmail && errors.newEmail ? (
                    <div className='inputErrors'><ReportIcon className='sidebarIcons'/>{errors.newEmail}</div>
                ) : null }
                <br/>
                <button className='change-email-button save-button' type="submit">Save</button>
            </form>
        </div>
    )

}