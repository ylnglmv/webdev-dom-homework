import { registration, setToken, token } from "./api.js";


export const renderReg = ({ fetchAndRenderComments }) => {
    const regElement = document.getElementById("app");
    const regHtml = `<div class="container">
    <div id="form-id" class="add-form">
      <p>Форма регистрации</p>
      <input id="name-reg" type="text" class="add-form-name2" placeholder="Введите имя" />
      <textarea id="login-input2" type="textarea" class="add-form-login" placeholder="Введите логин"></textarea>
      <textarea id="password-input2" type="textarea" class="add-form-login" placeholder="Введите пароль"></textarea>
      <div class="add-form-row2">
        <button id="reg-button" class="add-form-button2">Зарегестрироваться</button>
      </div>
     <div class="registrationbutton"> <a class="loginbutton" href="login.html">Войти</a> </div>
    </div>
  </div>`;

    regElement.innerHTML = regHtml; 

const buttonElement = document.getElementById("reg-button")
const nameInputElement = document.getElementById("name-reg")
const loginInputElement = document.getElementById("login-input2")
const passwordInputElement = document.getElementById("password-input2")

buttonElement.addEventListener("click", () => {
  console.log(nameInputElement);
registration({
    name: nameInputElement.value,
   login: loginInputElement.value,
   password: passwordInputElement.value,
}).then((responseData) => {
    console.log(responseData);
setToken(responseData.user.token);
// console.log(token);
}).then(() => {
    fetchAndRenderComments ();
});
});
};