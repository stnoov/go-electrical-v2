import React from 'react';
import {Modal} from "react-bootstrap";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import Axios from "axios";
import './WalletModal.css'

export default function WalletModal(props) {

    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let loggedInEmail = props.loggedInUser.email

    function addBalance() {
        Axios.post("https://go-electrical-server.herokuapp.com/user/{props.loggedInUser.id}/add_balance", {
            email: loggedInEmail
        }).then((response) => {
            props.setLoggedInUser(response.data[0]);
            props.NotificationSuccess('Balance has been updated!')
            handleClose()
        })
    }

    return (
        <>
            <li onClick={handleShow}><AccountBalanceWalletIcon className='mr-2'/> <span className='desktop-only'>Wallet</span></li>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>WALLET</Modal.Title>
                </Modal.Header>
                <Modal.Body className='wallet-modal'>
                    <p className='balance-text'>* This section is still in development mode, by clicking the button below, you will receive an extra <span style={{fontWeight: '700'}}>100€</span> to your balance for testing purposes</p>
                    <button className='addBalanceButton' onClick={addBalance}> ADD BALANCE </button>
                </Modal.Body>
            </Modal>
        </>
    );
}