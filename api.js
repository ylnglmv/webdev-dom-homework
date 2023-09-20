const commentsURL = "https://wedev-api.sky.pro/api/v2/user/comments";
const userURL = "https://wedev-api.sky.pro/api/user/login";

export let token;

export const setToken = (newToken) => {
  token = newToken;
};

// export function getCommentsWithoutAuth() {
//  return fetch(commentsURL)
//       .then((response) => {
//         return response.json();
//       })
//     }


export function getComments() {
  const requestOptions = {
    method: "GET",
    headers: {}
  };
  if (token) {
    requestOptions.headers.Authorization = `Bearer ${token}`;
  }
  return fetch(commentsURL, requestOptions)
    .then((response) => {
      return response.json();
    })
}

export function postComment({ name, text }) {
  return fetch(commentsURL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: name.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      text: text.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
    }),
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        if (response.status === 400) throw new Error("Мало символов")
        if (response.status === 500) throw new Error("Сервер упал")
        throw new Error("Сломался интернет")
      }
    });
};

export function login({ login, password }) {
  return fetch(userURL, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  })
    .then((response) => {
      return response.json();
    });
};

export function registration({ name, login, password }) {
  return fetch('https://wedev-api.sky.pro/api/user', {
    method: "POST",
    body: JSON.stringify({
      name,
      login,
      password,
    }),
  })
    .then((response) => {
      return response.json();
    });
};