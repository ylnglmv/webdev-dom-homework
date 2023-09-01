export function getComments() {
 return fetch(" https://wedev-api.sky.pro/api/v1/:yuliana-gal/comments",
      {
        method: "GET",
      })
      .then((response) => {
        return response.json();
      })
    }

export function postComment({ name, text }) {
return fetch("https://wedev-api.sky.pro/api/v1/:yuliana-gal/comments",
    {
      method: "POST",
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
      throw new Error ("Сломался интернет")
    }
  })
}