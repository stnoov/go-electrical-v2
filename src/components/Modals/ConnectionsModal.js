import React from 'react';
import {Modal} from "react-bootstrap";
import Axios from "axios";
import HistoryIcon from "@material-ui/icons/History";
import Connections from "../Utils/Connections";

export default function ConnectionsModal(props) {

    const [currentConnections, getCurrentConnections] = React.useState()
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const updateConnections = () => {
        console.log('CONNECTIONS UPDATED')
        Axios.post('https://go-electrical-server.herokuapp.com/connections_data', {
            userId: props.loggedInUser.id
        }).then((response) => {
            getCurrentConnections(response.data)
        })
    }

    return (
        <>
            <li onClick={() => {handleShow()
                updateConnections()
            }}><HistoryIcon className='mr-2'/> <span className='desktop-only'>Connections</span></li>

            <Modal show={show} onHide={handleClose} size={"lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>Connections</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table style={{textAlign: 'center', width: '100%', marginTop: '20px'}}>
                        <thead>
                        <tr>
                            <th>Station ID:</th>
                            <th>Station Name:</th>
                            <th>Station Address:</th>
                            <th>Finished at:</th>
                            <th>Time active:</th>
                            <th>Bill:</th>
                            <th>Status:</th>
                        </tr>
                        </thead>
                        <tbody>
                        {currentConnections ?
                            <Connections
                                updateConnections={updateConnections}
                                currentConnections={currentConnections}
                                loggedInUser={props.loggedInUser}
                                NotificationSuccess={props.NotificationSuccess}
                                NotificationDanger={props.NotificationDanger}
                                setLoggedInUser={props.setLoggedInUser}
                                getStations={props.getStations}
                                stations={props.stations}
                            />
                            : null
                        }
                        </tbody>
                    </table>
                </Modal.Body>
            </Modal>
        </>
    );
}