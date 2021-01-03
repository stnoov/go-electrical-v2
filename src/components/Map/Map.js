import mapStyles from "./mapStyles";
import './Map.css';
import React, {useEffect} from "react";
import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api";
import chargingStationPicture from "../Images/charging_station.png";
import SearchBar from "../Search/Searchbar";

import Axios from "axios";
import LoadingOverlay from 'react-loading-overlay';
import moment from "moment";


const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}


const options = {
    styles: mapStyles,
    disableDefaultUI: true
}

const Map = (props) => {

    useEffect(() => {
        props.getStations()
    }, [])

    const [center,setCenter] = React.useState({
        lat: 65.0121,
        lng: 25.4651
    })
    const [zoom, setZoom] = React.useState(10)
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API
    });

    const startCharging = () => {
        if (props.loggedInUser.balance <= 0) {
            props.NotificationDanger('Please, add balance first')
        } else {
            Axios.post('https://go-electrical-server.herokuapp.com/user/{props.loggedInUser.id}/station/{props.selectedStation.station_id}/start_charging', {
                userId: props.loggedInUser.id,
                stationId: props.selectedStation.station_id,
                started_at: moment().toDate()
            }).then((response) => {
                props.NotificationSuccess('Charging has been started')
                props.getStations()
            })
        }
    }

    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps"
    return (

        <div>
            <LoadingOverlay
                active={props.stations.length === 0}
                spinner
            >
                <SearchBar
                    setCenter={setCenter}
                    setZoom={setZoom}
                    selectedStation = {props.selectedStation}
                    setSelectedStation={props.setSelectedStation}
                />
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={zoom}
                    center={center}
                    options={options}
                >
                    {props.stations.length > 0 &&
                    props.stations.map((station, index) => <Marker
                            key={index}
                            onClick={() => {props.setSelectedStation(station)}}
                            position={{lat: station.lat, lng: station.lng}}
                            icon={{
                                url: chargingStationPicture,
                                scaledSize: new window.google.maps.Size(25, 25)
                            }}
                        />
                    )
                    }
                    }

                    {props.selectedStation ? (<InfoWindow position={{lat: props.selectedStation.lat, lng: props.selectedStation.lng}} onCloseClick={() => {
                        props.setSelectedStation(null)
                    }}>
                        <div>
                            <span style={{fontSize: '18px', fontWeight: '600'}}>{props.selectedStation.station_name}</span><br/>
                            <span style={{fontSize: '14px', fontWeight: '400'}}>{props.selectedStation.station_address}</span>
                            <div>
                                <ul className='station-description'>
                                    <li>{props.selectedStation.power}, {props.selectedStation.station_type}</li>
                                    <li>{props.selectedStation.is_taken !== 0 ? <span className='danger_text'>Station is taken</span> : <></>}</li>
                                    <li>
                                        {props.selectedStation.price === '0' ? <h4>Free</h4>
                                        : <h4>{props.selectedStation.price}€/minute</h4> }
                                        </li>
                                    {props.selectedStation.is_taken === 0 && props.loggedInUser !== '' ?
                                    <div className='description-button'><button className='button-charge' onClick={() => {startCharging()}}>Charge</button></div>
                                        : null }
                                </ul>
                            </div>
                        </div>
                    </InfoWindow>) : null}
                </GoogleMap>
            </LoadingOverlay>
        </div>
    );
}

export default Map;