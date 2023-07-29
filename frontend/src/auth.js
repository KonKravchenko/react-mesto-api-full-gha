// const BASE_URL = 'https://api.konkravchenko.nomoreparties.sbs';
// const BASE_URL = 'http://localhost:3001'

class Auth {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }


  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка auth: ${res.status} ${res.statusText}`)
  };


  register({ password, email }) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ password, email })
    })
      .then(this._checkResponse)
  };


  authorize({ password, email }) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      credentials: 'include',// теперь куки посылаются вместе с запросом
      headers: this.headers,
      body: JSON.stringify({ password, email })
    })
      .then(this._checkResponse)
  };

  logOut({ email }) {
    return fetch(`${this.url}/logout`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
      body: JSON.stringify({ email })
    })
      .then(this._checkResponse)
  };
}

export const auth = new Auth({
  url: 'https://api.konkravchenko.nomoreparties.sbs',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true'
  },
});
