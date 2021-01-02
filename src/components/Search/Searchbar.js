import React from "react";
import Autosuggest from 'react-autosuggest'
import Axios from "axios";
import './Searchbar.css'

export default function Searchbar(props) {

    const [station, setStation] = React.useState('')
    const [suggestion, setSuggestions] = React.useState([])

    return (
        <div className='headerSearch'>
            <Autosuggest inputProps={{
                placeholder: "Search for a station",
                autoComplete: false,
                name: "stations",
                id: "searchStations",
                value: station,
                onChange: (_event, {newValue}) => {
                    setStation(newValue)
                }
            }}
                         suggestions={suggestion}
                         onSuggestionsFetchRequested={async ({value}) => {
                             if (!value) {
                                 setSuggestions([])
                             }
                             try {
                                 const response = await Axios.get(
                                     'https://go-electrical-server.herokuapp.com/stations_data'
                                 )
                                 const result = response.data.filter((row) => {
                                     return row.station_name.toLowerCase().includes(value.toLowerCase())
                                 })
                                 setSuggestions(
                                     result.map((row) => ({
                                         name: row.station_name,
                                         address: row.station_address,
                                         lat: row.lat,
                                         lng: row.lng
                                     }))
                                 )

                             } catch (e) {
                                 setSuggestions([])
                             }
                         }}
                         onSuggestionsClearRequested={() => {
                             setSuggestions([])
                         }}
                         onSuggestionSelected={(event, {suggestion, method}) => {
                             props.setCenter({
                                 lat: suggestion.lat,
                                 lng: suggestion.lng
                             })
                             props.setZoom(18)

                         }}
                         getSuggestionValue={(suggestion) => suggestion.name}
                         renderSuggestion={suggestion => <div>{suggestion.name}</div>}
            />
        </div>
    )
}