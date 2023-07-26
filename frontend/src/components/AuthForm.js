import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm'

export const AuthForm = ({ handle, formValue, name, title, buttonText, btnAriaLabel, navBar }) => {

  const { values, handleChange } = useForm(formValue)
  React.useEffect(()=>{
    navBar() 
  })
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    handle(values)
  }

  return (
    <div className={`authForm ${name}`}>
      <form className="form form_black" onSubmit={handleSubmit} >
        <h2 className="form__title form__title_black">
          {`${title}`}
        </h2>
        <div className="form__input-container form__input-container_black">
          <input className="form__item form__item_black"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange} />

          <input className="form__item form__item_bottom form__item_black"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={values.password}
            onChange={handleChange} />
        </div>

        <button className="form__button form__button_white"
          type="submit"
          aria-label={`${btnAriaLabel}`}
          onSubmit={handleSubmit}>
          {`${buttonText}`}
        </button>
      </form>


      {name === "register" &&
        <div className="sign">
          <p className="sign__text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="sign__link">Войти</Link>
        </div>}

    </div>
  )
}