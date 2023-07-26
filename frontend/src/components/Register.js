import React from 'react';
import { AuthForm } from './AuthForm';

const Register = ({ handleRegister, navBarLog, formValue }) => {
  const navLog=() => {navBarLog()}
 

  return (
    <AuthForm
      name="register"
      title="Регистрация"
      buttonText="Зарегистрироваться"
      btnAriaLabel="Зарегистрироваться"
      handle={handleRegister}
      formValue={formValue}
      navBar={navLog}
    ></AuthForm>
  )

}

export default Register;