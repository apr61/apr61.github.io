import { data } from './data.js'

const currentUser = data['currentUser']
let comments = JSON.parse(localStorage.getItem('comments')) || data['comments']

const commentContainer = document.querySelector('[data-comment-container]')

let globalId = 5;

let glbCommentID;
let glbParentID;

commentContainer.addEventListener('click', (e) => {
    const reply = e.target.closest('[data-reply]')
    const commentCard = e.target.closest('.comment__card')
    const addCommentBtn = e.target.closest('[data-btn]')
    const delComment = e.target.closest('[data-del-comment]')
    const editComment = e.target.closest('[data-edit-comment]')
    const updateCommentBtn = e.target.closest('.comment__btn--update')
    const scorePlusBtn = e.target.closest('[data-score_plus]')
    const scoreMinusBtn = e.target.closest('[data-score_minus]')

    if (reply && !commentCard.nextElementSibling?.classList.contains('comment__add__form')) {
        let replyingTo = commentCard.parentNode?.querySelector('.comment__user__name').textContent||''
        commentCard.after(commentForm('reply', replyingTo));
    }
    if (addCommentBtn) {
        let commentBody = commentCard.querySelector('[data-comment-content]').value
        let replyingTo = commentBody.startsWith('@') ? 
                            commentBody.split(' ')[0].slice(1, commentBody.split(' ')[0].length) : null
        let parentId =  +commentCard.previousElementSibling?.dataset.par_id;
        let commentId = addCommentBtn.dataset.btn === 'send' ? 0 : +commentCard.previousElementSibling?.dataset.id;
        if(!commentBody.length) return
        addComment(commentBody.slice(replyingTo?.length+1, commentBody.length), parentId === 0 ? commentId : parentId, replyingTo);
    }
    if(delComment){
        modal.showModal();
        glbCommentID = +delComment.parentNode.parentNode.dataset.id;
        glbParentID = +delComment.parentNode.parentNode.dataset.par_id;
    }
    if(editComment){
        const commentMessage = commentCard.querySelector('.comment__message p')
        const textarea = document.createElement('textarea')
        textarea.setAttribute('class', 'comment__input__box');
        textarea.textContent = commentMessage.textContent.trim()
        commentMessage.replaceWith(textarea)
        commentCard.innerHTML+='<button class="comment__btn comment__btn--update">Update</button>'
    }
    if(updateCommentBtn){
        let commentBody = commentCard.querySelector('.comment__input__box').value
        let commentID = +commentCard.parentNode.dataset.id;
        let parentID = +commentCard.parentNode.dataset.par_id;
        let replyingTo = commentBody.startsWith('@') ? 
                            commentBody.split(' ')[0].slice(1, commentBody.split(' ')[0].length) : null
        updateComment(commentBody.slice(replyingTo?.length+1, commentBody.length),commentID, parentID, replyingTo)
    }

    if(scorePlusBtn){
        scoreFunctionality(+commentCard.dataset.par_id, +commentCard.dataset.id, 'plus')
    }
    if(scoreMinusBtn){
        scoreFunctionality(+commentCard.dataset.par_id, +commentCard.dataset.id, 'minus')
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


function addComment(commentBody, parentId=0, replyingTo) {
    let newComment = {
        "id": globalId++,
        "content": commentBody,
        "createdAt": new Date(),
        "score": 0,
        "user": currentUser,
        'replies': [],
        "parentId": parentId || 0,
        "replyingTo": replyingTo
    }
    if(isNaN(parentId) || parentId === 0){
        comments.push(newComment)
        displayComments()
        return
    }
    comments = comments.map(comment => {
        if(comment.id === parentId){
            comment['replies'].push(newComment)
        }
        return comment
    })  
    displayComments()
}

function deleteComment(replyID, parentId){
    if(parentId === 0){
        comments = comments.filter(comment => comment.id !== replyID)
    }else{
        comments = comments.filter(comment => {
            if(comment.id === parentId){
                comment['replies'] = comment['replies'].filter(reply => reply.id !== replyID)
            }
            return comment
        })
    }
    displayComments()
}

function updateComment(message, replyId, parentId, replyingTo){
    if(parentId === 0){
        comments = comments.map(comment => {
            if(comment.id === replyId){
                return {...comment, 'content' : message, 'replyingTo': replyingTo}
            }
            return comment
        })
    }else{
        comments = comments.map(comment => {
            if(comment.id === parentId){
                comment['replies'] = comment['replies'].map(reply => {
                    if(reply.id === replyId){
                        return {...reply, 'content':message, 'replyingTo': replyingTo}
                    }
                    return reply
                })
            }
            return comment
        })
    }
    displayComments()
}

function scoreFunctionality(parentId, commentId, functionality){
    if(parentId === 0){
        comments = comments.map(comment => {
            if(comment.id === commentId){
               functionality === 'plus'? comment['score'] += 1 : comment['score'] -= 1
            }
            return comment
        })
    }else{
        comments = comments.map(comment => {
            if(comment.id === parentId){
                comment['replies'] = comment['replies'].map(reply => {
                    if(reply.id === commentId){
                        functionality === 'plus'? reply['score'] += 1 : reply['score'] -= 1
                    }
                    return reply
                })
            }
            return comment
        })
    }
    displayComments()
}

function commentForm(value = 'send', replyingTo = '') {
    const div = document.createElement('div')
    div.setAttribute('class', 'comment__card comment__add__form')
    div.innerHTML = `
        <img src=${currentUser['image']['webp']} alt=${currentUser.username} class="comment__user__img">
        <textarea class="comment__input__box"
        placeholder="Add a comment..." data-comment-content row="30" id='content'>${replyingTo?`@${replyingTo}`:''}</textarea>
        <button class="comment__btn" data-btn=${value}>${value}</button>
    `
    return div;
}


function commentCard(comment) {
    return `
        <div class='comment__card' data-id=${comment.id} data-par_id=${comment.parentId}>
            <div class="comment__header">
                <img class="comment__user__img" src=${comment.user['image'].webp} alt=${comment.user['username']}>
                <h3 class="comment__user__name">${comment.user['username']}</h3>${comment.user['username'] === currentUser.username ? '<span class="current_user">you</span>' : ''}
                <p class="comment__createdat">${formatTimeAgo(new Date(comment.createdAt))}</p>
            </div>
            <article class="comment__message">
                <p>
                    ${comment['replyingTo'] ? `<span class='atrateuser'>@${comment['replyingTo']} </span>` + comment.content : comment.content}
                </p>
            </article>
            <div class="comment__score">
                <button class='comment__score__btn' data-score_plus><i class="fa-solid fa-plus"></i></button>
                <span class="score">${comment.score}</span>
                <button class='comment__score__btn'  data-score_minus><i class="fa-solid fa-minus"></i></button>
            </div>
            <div class="comment__controls">
            ${comment.user['username'] === currentUser.username ?
            '<button class="comment__btn controls__btn controls__btn--del" data-del-comment><i class="fa-solid fa-trash"></i>Delete</button>' +
            '<button class="comment__btn controls__btn" data-edit-comment><i class="fa-solid fa-pen"></i>Edit</button>'
            : '<button class="comment__btn controls__btn" data-reply><i class="fa-solid fa-reply"></i>Reply</button>'}
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

const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: 'auto'
})
  
const DIVISIONS = [
    { amount: 60, name: 'seconds' },
    { amount: 60, name: 'minutes' },
    { amount: 24, name: 'hours' },
    { amount: 7, name: 'days' },
    { amount: 4.34524, name: 'weeks' },
    { amount: 12, name: 'months' },
    { amount: Number.POSITIVE_INFINITY, name: 'years' }
]
  
function formatTimeAgo(date) {
    let duration = (date - new Date()) / 1000
  
    for (let i = 0; i <= DIVISIONS.length; i++) {
      const division = DIVISIONS[i]
      if (Math.abs(duration) < division.amount) {
        return formatter.format(Math.round(duration), division.name)
      }
      duration /= division.amount
    }
}

displayComments();

//modal

const modal = document.querySelector('#del-modal')
const closeModal = document.querySelector('.close__modal')
const delCmtYesBtn = document.querySelector('[data-del-cmt]')
closeModal.addEventListener('click', modalClose)

function modalClose(){
    modal.close()
}

delCmtYesBtn.addEventListener('click', deleteCommentFun)

function deleteCommentFun(){
    deleteComment(glbCommentID, glbParentID)
    modalClose()
}
