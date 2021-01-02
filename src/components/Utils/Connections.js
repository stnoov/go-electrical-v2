import Moment from "react-moment";
import moment from "moment";
import React from "react";
import Axios from "axios";

import './Connections.css'


export default function Connections(props) {

    const stopCharging = (active_con, bill) => {
        Axios.post('https://go-electrical-server.herokuapp.com/user/{props.loggedInUser.id}/station/{props.selectedStation.station_id}/stop_charging', {
            userId: props.loggedInUser.id,
            userEmail: props.loggedInUser.email,
            activeCon: active_con,
            finishedAt: moment().toDate(),
            bill: bill
        }).then(
            (response) => {
                props.setLoggedInUser(response.data[0])
            }
        )
        props.updateConnections()
        props.getStations()
        props.NotificationSuccess('Charging has been stopped')
    }


    return (
        props.currentConnections.map((connection, index) =>
            <tr key={index}>
                <td>{connection.station_id}</td>
                <td>{connection.station_name}</td>
                <td>{connection.station_address}</td>
                <td>{connection.finished_at == null ? 'In progress' : <Moment format="YYYY/MM/DD HH:MM">
                    {connection.finished_at}
                </Moment>}</td>
                <td>
                    {connection.finished_at == null ? <Moment fromNow ago>{connection.started_at}</Moment> : moment.duration(moment(connection.finished_at).diff(moment(connection.started_at))).minutes() + " min" }
                </td>
                <td>{connection.is_over !== 1 ? 'In progress' :
                    Math.round(moment.duration(moment(connection.finished_at).diff(moment(connection.started_at))).minutes() * connection.price ) + '€'
                }

                </td>
                <td>{connection.is_over === 1 ? 'Ended' : <button onClick={() =>  {
                    stopCharging(connection.connection_id, Math.round(moment.duration(moment(moment().toDate()).diff(moment(connection.started_at))).minutes() * connection.price ))
                }} className='stop-charging'>Stop</button>}</td>
            </tr>
        )
    )

}