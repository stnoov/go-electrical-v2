import React from "react";
import Registration from "./Registration";
import Login from "./Login";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CropDinIcon from '@material-ui/icons/CropDin';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import styled from 'styled-components'

const Auth = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: ${({ hideDesktop }) => hideDesktop ? '-100%' : '0'};
  transition: all .75s ease;
  z-index: 10;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  background-color: #EDEEF0;
  padding: 20px 50px;

  .bring-up-button {
    display: none;
    margin-bottom: 10px;
  }
  
  .auth_logo_block {
    display: ${({ mobileMenu }) => mobileMenu ? 'none' : 'flex'};
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .hide-desktop {
    display: flex;
    justify-self: flex-end;
    align-self: flex-end;
    cursor: pointer;
  }
  
  @media only screen and (max-width: 700px) {
      display: flex;
      position: fixed;
      bottom: 0;
      top: ${({ mobileMenu }) => mobileMenu ? '0' : '85%'};
      width: 100%;
      align-items: center;
      transition-property: all;
      transition-duration: .5s;
      transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    
    .bring-up-button {
      display: unset;
    }

    .hide-desktop {
      display: none;
    }
    
  }
`

export default function AuthContent() {

    const [mobileMenu, setMobileMenu] = React.useState(false)
    const [hideDesktop, setHideDesktop] = React.useState(false)

    return (
        <>
            <div className="show-desktop">
                <ArrowForwardIcon style={{position: "absolute", zIndex: "10", top: "1.5rem", left: "2rem", cursor: "pointer"}} onClick={() => {
                    setHideDesktop(!hideDesktop)
                }} />
            </div>
            <Auth mobileMenu={mobileMenu} hideDesktop={hideDesktop}>
                <div className="hide-desktop">
                    <ArrowBackIcon onClick={() => setHideDesktop(!hideDesktop)}/>
                </div>

                <div className='bring-up-button'>
                    {mobileMenu ?
                        <ExpandMoreIcon onClick={() => setMobileMenu(!mobileMenu)} />
                        : <KeyboardArrowUpIcon onClick={() => setMobileMenu(!mobileMenu)} />
                    }
                    </div>
                <div className="auth_logo_block">
                    <CropDinIcon className="logoIcon" />
                    <h2 className="logo">| GoElectrical</h2>
                </div>
                <Login />
                <Registration />
            </Auth>
        </>
    )
}