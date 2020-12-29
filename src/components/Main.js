import React from "react";
import Map from "./Map/Map";
import AuthContent from "./Authentication/AuthContent";
import './Main.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationDanger from './Notifications/NotificationDanger'
import NotificationSuccess from "./Notifications/NotificationSuccess";




export default function Main() {

    const [loggedInUser, setLoggedInUser] = React.useState('')

    return (
        <div className='main-page'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <AuthContent
                setLoggedInUser={setLoggedInUser}
                loggedInUser={loggedInUser}
                NotificationDanger={NotificationDanger}
                NotificationSuccess={NotificationSuccess}
            />
            <Map />
        </div>
    )
}