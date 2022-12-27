import { data } from './data.js'

const currentUser = data['currentUser']
let comments = JSON.parse(localStorage.getItem('comments')) || data['comments']

const commentContainer = document.querySelector('[data-comment-container]')

let globalId = 5;

commentContainer.addEventListener('click', (e) => {
    const reply = e.target.closest('[data-reply]')
    const commentCard = e.target.closest('.comment__card')
    const addCommentBtn = e.target.closest('[data-btn]')
    if (reply && !commentCard.nextElementSibling?.classList.contains('comment__add__form')) {
        commentCard.after(commentForm('reply'));
    }
    if (addCommentBtn) {
        let commentBody = addCommentBtn.parentNode.querySelector('[data-comment-content]').value
        let parentId = +addCommentBtn.parentNode.previousElementSibling?.dataset.id;
        addComment(commentBody, parentId);
    }
})


function displayComments() {
    commentContainer.innerHTML = commentList(comments)
    commentContainer.appendChild(commentForm())
    localStorage.setItem('comments', JSON.stringify(comments))
}

function commentList(comments) {
    return comments.map(comment => (
        commentCard(comment)
    )).join('')
}

function addComment(commentBody, parentId=0) {
    let newComment = {
        "id": globalId++,
        "content": commentBody,
        "createdAt": 'now',
        "score": 0,
        "user": currentUser,
        'replies': []
    }
    if(isNaN(parentId)){
        comments.push(newComment)
        displayComments()
        return
    }
    comments = addingCommentsToData(comments, newComment, parentId)
    displayComments()
}

function addingCommentsToData(comments, newComment, parentId){
    return comments.map(comment => {
        if(comment.id === parentId){
            comment['replies'].push(newComment)
        }else{
            addingCommentsToData(comment['replies'], newComment, parentId)
        }
        return comment
    })  
}


function commentForm(value = 'send') {
    const div = document.createElement('div')
    div.setAttribute('class', 'comment__card comment__add__form')
    div.innerHTML = `
        <img src=${currentUser['image']['webp']} alt="juliusomo" class="comment__user__img">
        <textarea class="comment__input__box"
        placeholder="Add a comment..." data-comment-content row="20" id='content'></textarea>
        <button class="comment__btn" data-btn=${value}>${value}</button>
    `
    return div;
}


function commentCard(comment) {
    return `
        <div class='comment__card' data-id=${comment.id}>
            <div class="comment__header">
                <img class="comment__user__img" src=${comment.user['image'].webp} alt=${comment.user['username']}>
                <h3 class="comment__user__name">${comment.user['username']}</h3>${comment.user['username'] === currentUser.username ? '<span class="current_user">you</span>' : ''}
                <p class="comment__createdat">${comment.createdAt}</p>
            </div>
            <article class="comment__message">
                <p>
                    ${comment['replyingTo'] ? `<span class='atrateuser'>@${comment['replyingTo']} </span>` + comment.content : comment.content}
                </p>
            </article>
            <div class="comment__score">
                <img src="./images/icon-plus.svg" alt="plus">
                <span class="score">${comment.score}</span>
                <img src="./images/icon-minus.svg" alt="minus">
            </div>
            <div class="comment__controls">
            ${comment.user['username'] === currentUser.username ?
            '<button class="comment__btn controls__btn controls__btn--del"><img src="./images/icon-delete.svg" alt="delete">Delete</button>' +
            '<button class="comment__btn controls__btn"><img src="./images/icon-edit.svg" alt="edit">Edit</button>'
            : '<button class="comment__btn controls__btn" data-reply><img src="./images/icon-reply.svg" alt="reply">Reply</button>'}
            </div>
        </div>
        ${comment['replies']?.length > 0 ?
            `<div class='nested__comments__stack'>
                <button class='line'></button>
                <div class='nested__comments'>${commentList(comment['replies'])}
                </div>
            </div>`
            : ''}
    `
}


displayComments();