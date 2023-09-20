import { login, setToken, token } from "./api.js";

export const renderLogin = ({ fetchAndRenderComments }) => {
    const appElement = document.getElementById("app");
    const loginHtml = `<div class="container">   
    <div id="form-id" class="add-form">
        <p>Форма входа</p>
        <input id="login-input" type="text" class="add-form-name2" placeholder="Введите логин" />
        <textarea id="password-input" type="textarea" class="add-form-login" placeholder="Введите пароль"></textarea>
        <div class="add-form-row2">
          <button id="login-button" class="add-form-button2">Войти</button>
        </div>
       <div class="registrationbutton"> <a class="loginbutton" href="registration.html">Зарегестрироваться</a> </div>
      </div>
    </div>`;

    appElement.innerHTML = loginHtml; 

const buttonElement = document.getElementById("login-button")
const loginInputElement = document.getElementById("login-input")
const passwordInputElement = document.getElementById("password-input")

buttonElement.addEventListener("click", () => {
login({
   login: loginInputElement.value,
   password: passwordInputElement.value,
}).then((responseData) => {
    console.log(token);
setToken(responseData.user.token);
console.log(token);
}).then(() => {
fetchAndRenderComments ();
});
});
};