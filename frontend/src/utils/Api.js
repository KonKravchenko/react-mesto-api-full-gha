class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      console.log(res)
      return res.json();
    } else {
      console.log(res)
      return Promise.reject(`${res.status} ${res.statusText}`);
    }
  }

  getProfileData() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      credentials: 'include', // теперь куки посылаются вместе с запросом
      headers: this.headers,

    })
      .then(this._checkResponse);
  }

  setProfileData(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  setProfileAvatar({ avatar }) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
      body: JSON.stringify({ avatar })
    })
      .then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      method: 'GET',
      credentials: 'include', // теперь куки посылаются вместе с запросом
      headers: this.headers
    })
      .then(this._checkResponse);
  }

  setNewCard({ name, link }) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
      body: JSON.stringify({ name, link })
    })
      .then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
    })
      .then(this._checkResponse);
  }

  addLike(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
    })
      .then(this._checkResponse);
  }

  deleteLike(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
      credentials: 'include', // теперь куки посылаются вместе с запросом
    })
      .then(this._checkResponse);
  }
}


export const api = new Api({
  url: 'https://api.konkravchenko.nomoreparties.sbs',
  // url: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Credentials': 'true'
  },
});