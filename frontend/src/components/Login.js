import React from 'react';
import { AuthForm } from './AuthForm';

const Login = ({ handleLogin, navBarReg, formValue }) => {
  const navReg = () => { navBarReg() }
  
  return (
    <AuthForm
      name="login"
      title="Вход"
      buttonText="Войти"
      btnAriaLabel="Войти"
      handle={handleLogin}
      formValue={formValue}
      navBar={navReg}
    ></AuthForm>
  )

}

export default Login;