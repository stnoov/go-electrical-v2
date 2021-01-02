import React, {useState} from "react";
import Map from "./Map/Map";
import AuthContent from "./Authentication/AuthContent";
import Axios from "axios";
import Navigation from "./Navigation/Navigation";
import './Main.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationDanger from './Notifications/NotificationDanger'
import NotificationSuccess from "./Notifications/NotificationSuccess";
import useWindowSize from "./Utils/WindowSize";




export default function Main() {

    const [loggedInUser, setLoggedInUser] = React.useState('');
    const [selectedStation, setSelectedStation] = React.useState(null);
    const [stations, setStations] = useState([]);

    const getStations = () => {
        Axios.get('https://go-electrical-server.herokuapp.com/stations_data').then((response) => {
            setStations(response.data);
        })
    }

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
            {loggedInUser === '' ? <AuthContent
                setLoggedInUser={setLoggedInUser}
                loggedInUser={loggedInUser}
                NotificationDanger={NotificationDanger}
                NotificationSuccess={NotificationSuccess}
                useWindowSize={useWindowSize}
            />
            : <Navigation
                    loggedInUser={loggedInUser}
                    setLoggedInUser={setLoggedInUser}
                    NotificationDanger={NotificationDanger}
                    NotificationSuccess={NotificationSuccess}
                    getStations={getStations}
                    stations={stations}
                />
            }
            <Map
                selectedStation={selectedStation}
                setSelectedStation={setSelectedStation}
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
                NotificationDanger={NotificationDanger}
                NotificationSuccess={NotificationSuccess}
                getStations={getStations}
                stations={stations}
            />
        </div>
    )
}