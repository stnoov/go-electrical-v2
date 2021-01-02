import React from "react";
import Registration from "./Registration";
import Login from "./Login";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
  
  
  .auth-content {
    display: flex;
    flex-direction: column;
    padding: 20px 50px;
  }
  
  .bring-up-button {
    display: none;
    margin-bottom: 10px;
    border-bottom: 1px solid #D3D9DE;
    padding: 0;
    width: 100%;
  }
  
  .auth_logo_block {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .hide-desktop {
    display: flex;
    justify-self: flex-end;
    align-self: flex-end;
    margin-top: 25px;
    margin-right: 20px;
    cursor: pointer;
  }
  
  .auth-mobile {
    display: none;
  }
  
  .login-register {
    display: none;
  }
  
  @media only screen and (max-width: 700px) {
      display: flex;
      position: fixed;
      bottom: 0;
      top: unset;
      width: 100%;
      height:  ${({ mobileMenu }) => mobileMenu ? '100%' : '6%'};
      align-items: center;
      transition-property: all;
      transition-duration: .5s;
      transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
    
    .auth-logo-block {
      margin-bottom: 10px;
    }
    
    .auth-desktop {
      display: none;
    }
    
    .auth-mobile {
      display: unset;
    }
    
    .login-register {
      display: flex;
      flex-direction: row;
      margin-bottom: 15px;
    }
    
    .login-register button {
      padding: 3px 25px;
      margin: 5px 30px;
      background-color: #5181B8;
      color: white;
      border: none;
      border-radius: 3px;
    }

    .login-register .login-section {
      background-color: ${({ currentSection }) => currentSection === 'login' ? '#1B6DD1' : '#5181B8'};
    }

    .login-register .register-section {
      background-color: ${({ currentSection }) => currentSection === 'register' ? '#1B6DD1' : '#5181B8'};
    }
    
    .bring-up-button {
      display: unset;
    }

    .hide-desktop {
      display: none;
    }
    
  }
`

export default function AuthContent(props) {

    const [mobileMenu, setMobileMenu] = React.useState(false)
    const [hideDesktop, setHideDesktop] = React.useState(false)
    const [currentSection, setCurrentSection] = React.useState('login')

    const screen = props.useWindowSize()

    return (
        <>
            <div className="show-desktop">
                <ArrowForwardIcon style={{position: "absolute", zIndex: "10", top: "1.5rem", left: "2rem", cursor: "pointer"}} onClick={() => {
                    setHideDesktop(!hideDesktop)
                }} />
            </div>
            <Auth mobileMenu={mobileMenu} hideDesktop={hideDesktop} currentSection={currentSection}>
                <div className='bring-up-button'>
                    {mobileMenu ?
                        <ExpandMoreIcon onClick={() => setMobileMenu(!mobileMenu)} />
                        : <KeyboardArrowUpIcon onClick={() => setMobileMenu(!mobileMenu)} />
                    }
                </div>
                <div className="hide-desktop">
                    <ArrowBackIcon onClick={() => setHideDesktop(!hideDesktop)}/>
                </div>
                <div className="auth-content">
                <div className="auth_logo_block">
                    <h2 className="logo">GoElectrical</h2>
                </div>
                <div className="login-register auth-mobile">
                    <button className='login-section' onClick={() =>
                    {setCurrentSection('login')
                        }}>Login</button>
                    <button className='register-section' onClick={() => setCurrentSection('register')}>Register</button>
                </div>
                    {screen.width > 700 ?
                        <div>
                            <Login
                                setLoggedInUser={props.setLoggedInUser}
                                loggedInUser={props.loggedInUser}
                                NotificationDanger={props.NotificationDanger}

                            />
                            <Registration
                                NotificationSuccess={props.NotificationSuccess}
                            />
                        </div>
                        :currentSection === 'login' ?
                            <Login
                                setLoggedInUser={props.setLoggedInUser}
                                loggedInUser={props.loggedInUser}
                                NotificationDanger={props.NotificationDanger}

                            />
                            :currentSection === 'register' ? <Registration
                                    NotificationSuccess={props.NotificationSuccess}
                                />
                                : <span />}

                </div>
            </Auth>
        </>
    )
}