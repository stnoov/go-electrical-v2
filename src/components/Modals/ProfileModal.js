import React from 'react';
import {Modal, Button, Row, Col, Container} from "react-bootstrap";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ChangePassword from "../Utils/ProfileUtils/ChangePassword";
import ChangeEmail from "../Utils/ProfileUtils/ChangeEmail";
import './ProfileModal.css'

export default function ProfileModal(props) {

    const [show, setShow] = React.useState(false);
    const [section, changeSection] = React.useState('change-email');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <li onClick={handleShow}><AccountBoxIcon className='mr-2'/> <span className='desktop-only'>Profile</span></li>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>PROFILE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <h3>User info</h3>
                                <ul className='profile-user-info'>
                                    <li><b>Name:</b> {props.loggedInUser.first_name + " " + props.loggedInUser.last_name}</li>
                                    <li><b>Email:</b> {props.loggedInUser.email}</li>
                                    <li><b>Balance:</b> {props.loggedInUser.balance} <span style={{fontWeight: '600'}}>€</span></li>
                                    <li><b>Subscription type:</b> Basic</li>
                                </ul>
                            </Col>
                            <Col>
                                <div className='email-password'>
                                    <button className='change-email' onClick={() => changeSection('change-email')}>Change email</button>
                                    <button className='change-password' onClick={() => changeSection('change-password')}>Change password</button>
                                </div>
                                {section === 'change-email' ?
                                    <ChangeEmail
                                        loggedInUser={props.loggedInUser}
                                        setLoggedInUser={props.setLoggedInUser}
                                        NotificationDanger={props.NotificationDanger}
                                        NotificationSuccess={props.NotificationSuccess}
                                    />
                                : <ChangePassword
                                        loggedInUser={props.loggedInUser}
                                        setLoggedInUser={props.setLoggedInUser}
                                        NotificationDanger={props.NotificationDanger}
                                        NotificationSuccess={props.NotificationSuccess}
                                    />
                                }
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
}