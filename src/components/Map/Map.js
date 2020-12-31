import mapStyles from "./mapStyles";
import './Map.css';
import React, {useEffect, useState} from "react";
import {GoogleMap, InfoWindow, Marker, useLoadScript} from "@react-google-maps/api";
import chargingStationPicture from "../Images/charging_station.png";
import Axios from "axios";
import LoadingOverlay from 'react-loading-overlay';


const mapContainerStyle = {
    width: '100vw',
    height: '100vh'
}


const options = {
    styles: mapStyles,
    disableDefaultUI: true
}

const Map = (props) => {
    const [stations, setStations] = useState([]);
    useEffect(() => {
        Axios.get('https://go-electrical-server.herokuapp.com/stations_data').then((response) => {
            setStations(response.data);
        })
    }, [])
    const [center,setCenter] = React.useState({
        lat: 65.0121,
        lng: 25.4651
    })
    const [zoom, setZoom] = React.useState(10)
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API
    });
    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps"
    return (

        <div>
            <LoadingOverlay
                active={stations.length === 0}
                spinner
            >
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    zoom={zoom}
                    center={center}
                    options={options}
                >
                    {stations.length > 0 &&
                    stations.map((station, index) => <Marker
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