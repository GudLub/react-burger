const serverUrl =  "https://norma.nomoreparties.space/api";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

const checkSuccess = (res) => {
  if(res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
}

export const request = (url, options) => {
  return fetch(`${serverUrl}/${url}`, options)
  .then(checkResponse)
  .then(checkSuccess);
};

export const dataPost = (ingredients) => {
  return request('orders', {
    method: "POST",
    headers: { "Content-Type": "application/json",
    authorization: localStorage.getItem('accessToken')
  },
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  });
};

export const refreshToken = () => {
  return request('auth/token', {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  });
};

export const fetchWithRefresh = async (endpoint, options) => {
  try {
    const res = await fetch(`${serverUrl}${endpoint}`, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); 
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${serverUrl}${endpoint}`, options); 
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUser = () => {
  return request('auth/user', {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem('accessToken'),
    },
  })
}

export const registerPost = (name, email, password) => {
  return request('auth/register', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      "name": name,
      "email": email, 
      "password": password,       
    }),
  });
};

export const currentMail = (email) => {
  return request('password-reset', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "email": email
    })
  })
}
export const resetPassword = (password, token) => {
  return request('password-reset/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "password": password, 
      "token": token,
    })
  })
}

export const login = (email, password) => {
  return request('auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "email": email, 
      "password": password, 
    })
  })
}

export const logout = () => {
  return request('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    })
  })
}

export const patchUser = (email, password, name) => {
  return fetchWithRefresh('auth/user', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      "email": email, 
      "password": password, 
      "name": name,
    }),
  });
};