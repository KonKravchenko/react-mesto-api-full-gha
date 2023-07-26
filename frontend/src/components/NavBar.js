import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function NavBar({ isActive, navBarLog, navBarReg, loggedIn, setLoggedIn, loggedOut, isLoading }) {

  const history = useNavigate();
  const currentUser = React.useContext(CurrentUserContext);

  function signOut() {
    setLoggedIn(false)
    loggedOut()
    history('/react-mesto-auth/sign-in');
    
  }

  const userEmailClass = !isLoading ? (`menu__item`) : (`menu__item hidden`)
  const buttonClass = !isLoading ? (`menu__button`) : (`menu__button hidden`)

  return (

    <nav className="menu">
      {isActive ? (
        !loggedIn && <NavLink to="/react-mesto-auth/sign-in" className="menu__link" onClick={navBarReg}>Войти</NavLink>
      ) : (
        !loggedIn && < NavLink to="/react-mesto-auth/sign-up" className="menu__link" onClick={navBarLog}>Регистрация</NavLink>
      )}
      {loggedIn &&
        <div className="menu__container">
          <p className={userEmailClass}>{`${currentUser.email}`}</p>
          <button type="button" onClick={signOut} className={buttonClass}>Выйти</button>
        </div>
      }
    </nav >
  );
}

export default NavBar;