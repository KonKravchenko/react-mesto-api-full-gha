import React from 'react';
import { ReactComponent as HeaderLogo } from '../images/__logo_white.svg';
import NavBar from './NavBar';

function Header({ isActive, navBarLog, navBarReg, loggedIn, setLoggedIn, loggedOut, isLoading }) {
  return (
    <header className="header">
      <HeaderLogo className="header__logo" />
      <NavBar
        isActive={isActive}
        navBarLog={navBarLog}
        navBarReg={navBarReg}
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        loggedOut={loggedOut}
        isLoading={isLoading} />
    </header>
  );
}

export default Header;