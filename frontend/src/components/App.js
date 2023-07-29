import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';

import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from '../auth';


function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(false);

  const [isInfoTooltipData, setInfoTooltipData] = useState({});

  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState([]);

  const [formValue, setFormValue] = useState({
    password: '',
    email: ''
  })

  const [isLoading, setIsLoading] = useState(true)

  function handleApi() {
    Promise.all([
      api.getProfileData(),
      api.getInitialCards()
    ])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData)
        setCards(cardsData.card)
        setIsLoading(false) //Загрузка в протектед роутер
      })
      .catch((err) => {
        setLoggedIn(false)
        console.log(`Ошибка handleApi: ${err}`)
        setIsLoading(false)
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setSelectedCard({})
    setInfoTooltip(false)
  }

  function handleCardLike(card) {

    const isLiked = card.likes.some(item => item === currentUser._id);

    if (!isLiked) {
      console.log('app addLike', card._id)
      api.addLike(card._id)
        .then((newCard) => {
          console.log('app addLike newCard', card._id)
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        });
    } else {
      console.log('app deleteLike', card._id)
      api.deleteLike(card._id)
        .then((newCard) => {
          console.log('app deleteLike', newCard)
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`)
        });
    }
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((newCard) => {
        console.log(newCard)
        setCards(cards.filter(function item(c) { if (c._id !== card._id) { return c } }))
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }

  function handleUpdateUser(data) {
    api.setProfileData(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }

  function handleUpdateAvatar(data) {
    api.setProfileAvatar(data)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }

  function handleAddPlaceSubmit(data) {
    console.log('handleAddPlace', data)
    api.setNewCard(data)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      });
  }

  function handleRegister(formValue) {
    auth.register(formValue)
      .then((res) => {
        setInfoTooltipData(res)
        setInfoTooltip(true)
        navigate('https://konkravchenko.nomoreparties.sbs/sign-in', { replace: true });
      })
      .catch(err => {
        setInfoTooltipData(err)
        setInfoTooltip(true)
      });
  }


  // Новый логин
  function handleLogin(formValue, event) {
    auth.authorize(formValue)
      .then((data) => {
        console.log(data)
        setIsLoading(true)
        handleApi()
        setFormValue({ password: '', email: '' });
        setLoggedIn(true);
        navigate("https://konkravchenko.nomoreparties.sbs/main", { replace: true })
       
      })
      .catch((err) => {
        setInfoTooltipData(err)
        setInfoTooltip(true)
        console.log(`Ошибка handleLogin: ${err}`)
      })
  }

  function handleIn() {
    setIsLoading(true)
    handleApi()
    navigate("https://konkravchenko.nomoreparties.sbs/main", { replace: true })
    setLoggedIn(true);
  }

  React.useEffect(() => {
    handleIn()
  }, [])

  function handleLogout() {

    auth.logOut(currentUser)
      .then((res) => {
        setLoggedIn(false);
        navigate('https://konkravchenko.nomoreparties.sbs/sign-in', { replace: true });

      }
      )
      .catch(err => {
        console.log(`Ошибка handleLogout: ${err}`)
      });

  }

  function handleNavBarLogin() {
    setIsActive(true)
  }

  function handleNavBarReg() {
    setIsActive(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <div className="page">

          <Header
            isActive={isActive}
            navBarLog={handleNavBarLogin}
            navBarReg={handleNavBarReg}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            loggedOut={handleLogout}
            isLoading={isLoading} />

          <Routes>

            <Route path="/*" element={loggedIn ? <Navigate to="https://konkravchenko.nomoreparties.sbs/main" replace /> : <Navigate to="https://konkravchenko.nomoreparties.sbs/sign-in" replace />} />
            <Route path="/" element={loggedIn ? <Navigate to="https://konkravchenko.nomoreparties.sbs/main" replace /> : <Navigate to="https://konkravchenko.nomoreparties.sbs/sign-in" replace />} />

            <Route path="https://konkravchenko.nomoreparties.sbs/sign-up" element={<Register
              handleRegister={handleRegister}
              navBarLog={handleNavBarLogin}
              formValue={formValue}
              setFormValue={setFormValue}
            />} />
            <Route path="https://konkravchenko.nomoreparties.sbs/sign-in" element={<Login
              handleLogin={handleLogin}
              navBarReg={handleNavBarReg}
              formValue={formValue}
              setFormValue={setFormValue} />} />

            <Route path="https://konkravchenko.nomoreparties.sbs/main" element={<ProtectedRouteElement isLoading={isLoading} element={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              loggedIn={loggedIn}
            />} />
          </Routes>
          {loggedIn && <ImagePopup
            cardData={selectedCard}
            onClose={closeAllPopups}
          />}

          {loggedIn && <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />}

          {loggedIn && <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />}

          {loggedIn && <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            handleApi={handleApi}
          />}

          <InfoTooltip
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
            infoTooltipData={isInfoTooltipData}
          />

          <Footer />
        </div>
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

