import React from 'react';
import {Modal} from "react-bootstrap";
import Axios from "axios";
import HistoryIcon from "@material-ui/icons/History";
import Connections from "../Utils/Connections";
import ConnectionsMobile from "../Utils/ConnectionsMobile";

export default function ConnectionsModal(props) {


    const [show, setShow] = React.useState(false);

    const screen = props.useWindowSize()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [currentConnections, getCurrentConnections] = React.useState()

    const updateConnections = async () => {
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
                        {currentConnections && screen.width > 1000 ?
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
                            : currentConnections && screen.width < 1000 ?
                                <ConnectionsMobile
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
                </Modal.Body>
            </Modal>
        </>
    );
}