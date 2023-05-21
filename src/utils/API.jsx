const serverUrl = "https://norma.nomoreparties.space/api";

const checkResponse = (res) => { 
  if(res.ok) {
    return res.json();
  } else {
    return Promise.reject(res);
  }
}

export const getIngredients = async () => { 
  return await fetch(`${serverUrl}/ingredients`)
  .then((res) => 
    checkResponse(res)
  ) 
}

export const getPost = async ({ingredientId}) => { 
  return await fetch(`${serverUrl}/orders`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify({
      ingredients: ingredientId()
    })
  })
  .then((res) => checkResponse(res))
}