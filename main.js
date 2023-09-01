"use strict";

import { getComments } from "./api.js";
import { postComment } from "./api.js";

  const buttonElement = document.getElementById('add-button')
  const commentElement = document.getElementById('comment-id')
  const nameInputElement = document.getElementById('name-input')
  const commentInputElement = document.getElementById('comment-input')

  const listElement = document.getElementById("comment-id")

  let comments = [];

  const fetchAndRenderComments = () => {
    let div = document.querySelector('.hide');
    div.textContent = 'Комментарии загружаются';
    getComments().then((responseData) => {
        return comments = responseData.comments;
      }).then((commentsData) => {
        div.textContent = "";
        const appComments = commentsData.map((comment) => {
          return {
            name: comment.author.name,
            date: new Date(comment.date),
            text: comment.text,
            likes: comment.likes,
            isLiked: false,
          };
        });
        comments = appComments;
        renderComments();
      })
  };



  function initEventAnswers() {
    const commentElements = document.querySelectorAll(".comment");
    for (const commentElement of commentElements) {
      commentElement.addEventListener("click", () => {
        const index = commentElement.dataset.index;
        commentInputElement.value = `>${comments[index].text} \n ${comments[index].name}`
      })
    }
  };

  const initEventListeners = () => {
    const likesElements = document.querySelectorAll(".like-button");
    for (const likesElement of likesElements) {
      likesElement.addEventListener("click", (e) => {
        e.stopPropagation();
        const index = likesElement.dataset.index;
        if (comments[index].isLiked) {
          comments[index].isLiked = false;
          comments[index].likes--;
        } else {
          comments[index].isLiked = true;
          comments[index].likes++;
        }
        renderComments()
      })
    }
  };


  function formatDate(date) {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    let hh = date.getHours();
    if (hh < 10) hh = '0' + hh;

    let min = date.getMinutes();
    if (min < 10) min = '0' + min;

    return dd + '.' + mm + '.' + yy + ' ' + hh + ':' + min;
  }

  function renderComments() {
    const commentsHtml = comments.map((comment, index) => {
      return `<li class="comment" data-index="${index}">
          <div class="comment-header">
            <div> ${comment.name} </div>
            <div> ${comment.date} </div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes" data-like="${comment.likes}">
              <span class="likes-counter">${comment.likes}</span>
              <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
            </div>
          </div>
        </li>`;
    }).join('');
    listElement.innerHTML = commentsHtml;
    initEventListeners();
    initEventAnswers();
  }

  fetchAndRenderComments();

   
  const postComments = () => {
    let div2 = document.querySelector('.hideform');
    document.getElementById("form-id").style.display = "none";
    div2.textContent = 'Комментарий добавляется';
    postComment( { name: nameInputElement.value, text: commentInputElement.value } ).then((responseData) => {
      div2.textContent = "";
      return fetchAndRenderComments();
    })
    .then(() => {
      div2.textContent = "";
      document.getElementById("form-id").style.display = "initial";
      document.getElementById('name-input').value = '';
      document.getElementById('comment-input').value = '';
    })
    .catch((error) => {
      if (error.message === "Мало символов") return alert ('Введите больше 3-х символов')
      alert('Кажется, у вас сломался интернет, попробуйте позже');
      console.warn(error);
    });
  };

  buttonElement.addEventListener("click", () => {

    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");

    if (nameInputElement.value === "") {
      nameInputElement.classList.add("error");
      return;
    }
    if (commentInputElement.value === "") {
      commentInputElement.classList.add("error");
      return;
    }

    const newDate = new Date()
    postComments();
  });
