import React from "react";
import styled from 'styled-components'
import CropDinIcon from "@material-ui/icons/CropDin";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import ProfileModal from "../Modals/ProfileModal";
import ConnectionsModal from "../Modals/ConnectionsModal";

const Nav = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  width: 350px;
  background-color: #EDEEF0;

  .nav_logo_block {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    padding: 20px 50px;
  }  
  .nav-links {
    list-style-type: none;
    font-size: 20px;
    text-align: left;
    padding-left: 20px;
    padding-inline-start: 0;
  }
  
  .nav-links li {
    display: flex;
    align-items: center;
    padding: 10px 20px;
  }

  .nav-links li:hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 700px) {
    display: flex;
    flex: 1;
    flex-direction: row;
    position: fixed;
    height: unset;
    bottom: 0;
    top: unset;
    width: 100%;
    justify-content: center;
    
    .nav_logo_block {
      display: none;
    }
    .nav-links {
      display: flex;
      flex-direction: row;
      flex-basis: 270px;
      align-items: center;
      margin-bottom: 0;
    }
    .nav-links li {
      padding: 15px 25px;
    }
  }
  
`

export default function Navigation() {

    return(
        <Nav>
            <div className="nav_logo_block">
                <CropDinIcon className="logoIcon" />
                <h2 className="logo ">| GoElectrical</h2>
            </div>
            <ul className="nav-links">
                <ProfileModal />
                <ConnectionsModal />
                <li><AccountBalanceWalletIcon className='mr-2'/> <span className='desktop-only'>Wallet</span></li>
                <li><ExitToAppIcon className='mr-2'/> <span className='desktop-only'>Logout</span></li>
            </ul>
        </Nav>
    )
}