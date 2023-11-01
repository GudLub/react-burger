import { TResponseBody, THeaders, TOrder, TUser, TRegisterPost, TResetPassword, TLogin, TIngredient } from "./types";

const serverUrl =  "https://norma.nomoreparties.space/api/";

const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: string) => Promise.reject(err));
};

export const request = <T>(endpoint: RequestInfo | URL, options?: RequestInit): Promise<T> => {
  return fetch(`${serverUrl}${endpoint}`, options)
  .then(checkResponse)
};

export const getDataFetch = (): Promise<TResponseBody<'data', TIngredient[]>> => {
  return request("ingredients");
};

export const dataPost = (ingredients: (TIngredient | undefined)[]): Promise<TResponseBody<'order', Readonly<TOrder>>> => {
  return request('orders', {
    method: "POST",
    headers: { "Content-Type": "application/json",
    authorization: localStorage.getItem('accessToken')
  } as (HeadersInit | undefined) & THeaders,
    body: JSON.stringify({
      ingredients: ingredients,
    }),
  });
};

export const refreshToken = (): Promise<TResponseBody> => {
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

export const fetchWithRefresh = async (endpoint: string, options: RequestInit & { headers: { authorization: string | null, "Content-Type": string } }
): Promise<TResponseBody<'user', Readonly<TUser>>> => {
  try {
    const res = await fetch(`${serverUrl}${endpoint}`, options);
    return await checkResponse(res);
  } catch (err: any) {
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

export const getUser = (): Promise<TResponseBody<'user', Readonly<TUser>>> =>  {
  return request('auth/user', {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem('accessToken'),
    } as (HeadersInit | undefined) & THeaders,
  })
}

export const registerPost = (obj: TRegisterPost): Promise<TResponseBody<'user', Readonly<TUser>>> => {
  return request('auth/register', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
};

export const currentMail = (email: string): Promise<TResponseBody<'password-reset', string>> => {
  return request('password-reset', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      email
    })
  })
}
export const resetPassword = (obj: TResetPassword): Promise<TResponseBody<'reset', string>> => {
  return request('password-reset/reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  })
}

export const login = (obj: TLogin): Promise<TResponseBody<'user', Readonly<TUser>>> => {
  return request('auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(obj)
  })
}

export const logout = (): Promise<TResponseBody> => {
  return request('auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    } as HeadersInit,
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    })
  })
}

export const patchUser = (obj: TUser) => {
  return fetchWithRefresh('auth/user', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: localStorage.getItem('accessToken')
    } as (HeadersInit | undefined) & THeaders,
    body: JSON.stringify(obj),
  });
};
