import React from "react";
import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import mapStyles from "./mapStyles";


export default function Map() {

    const mapContainerStyle = {
        width: '100vw',
        height: '100vh'
    }

    const options = {
        styles: mapStyles,
        disableDefaultUI: true
    }

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
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={zoom}
            center={center}
            options={options}
        >
        </GoogleMap>
    )
}