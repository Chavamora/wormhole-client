
function fetchData() {
    var secret_token = Cookies.get('secret_token')
    var monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

    fetch(globalVars.apiEndPoint + '/user/publicaciones?secret_token=' + secret_token)


        .then(response => {
            console.log(response)
            if (!response.ok) {
                throw Error('ERROR')
            }
            return response.json()
        })



        .then(data => {

            console.log("DATA PUB", data)
            const html = data.map(publicacion => {

                const date = moment.tz(publicacion.createdAt, "America/Mexico_City");

                if (publicacion.url) {

                    return `
                        <div class="post" id="post-${publicacion._id}">
                            <div class="post-info">
                                <div class="user-picture" style="background-image:url('${publicacion.url_user}');"></div>
                                <div>
                                <div class="user-name">${publicacion.usuario}</div>
                                <p class="post-date">
                                ${moment(date, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(date, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}
                                </p>
                            </div>
                            </div>
                            <a href="/publicaciones/${publicacion._id}">
                            <div class="post-content">
                                ${publicacion.cuerpo}
                            </div>
                            </a>
                            <img src="${publicacion.url}" class="post-image">
                            <div class="post-buttons">
                                <a href="#" class="post-like-button post-like-button__like ${publicacion.user_action === 'like' ? 'post-like-button__active' : ''}" data-docid="${publicacion._id}" data-likedislike="like">
                                    <span class="post-like-button--count"> ${publicacion.likes} </span> like
                                </a>
                                <a href="#" class="post-like-button post-like-button__dislike ${publicacion.user_action === 'dislike' ? 'post-like-button__active' : ''}" data-docid="${publicacion._id}" data-likedislike="dislike">
                                    <span class="post-like-button--count"> ${publicacion.dislikes} </span> dislike
                                </a>
                                <a href="/publicaciones/${publicacion._id}">comentarios</a>
                            </div>
                        </div>
                    `


                } else {
                    return `
                        <div class="post"  id="post-${publicacion._id}">
                            <div class="post-info">
                                <div class="user-picture" style="background-image: url('${publicacion.url_user}'); "></div>
                                <div>
                                <div class="user-name">${publicacion.usuario}</div>
                                <p class="post-date">
                                ${moment(date, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD')} a las ${moment(date, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm')}
                                </p>
                            </div>
                            </div>
                            <div class="post-content">
                                ${publicacion.cuerpo}
                            </div>
                            <div class="post-buttons">
                            <a href="#" class="post-like-button post-like-button__like ${publicacion.user_action === 'like' ? 'post-like-button__active' : ''}" data-docid="${publicacion._id}" data-likedislike="like">
                                <span class="post-like-button--count"> ${publicacion.likes} </span> like
                            </a>
                            <a href="#" class="post-like-button post-like-button__dislike ${publicacion.user_action === 'dislike' ? 'post-like-button__active' : ''}" data-docid="${publicacion._id}" data-likedislike="dislike">
                                <span class="post-like-button--count"> ${publicacion.dislikes} </span> dislike
                            </a>
                                <a href="#">comentarios</a>
                            </div>
                        </div>
                    `
                }

            }).join("")
            console.log(html)
            document.querySelector('.all-posts-container')
                .insertAdjacentHTML('beforeend', html)

            likeDislikePost()


        })
        .catch(error => {
            console.log(error)
        })

}

function likeDislikePost() {
    console.log("ADDING EVENT LISTENER") 
    post_like_elements = document.querySelectorAll('.post-like-button');
    console.log(post_like_elements)

    post_like_elements.forEach(element => {
        element.addEventListener('click', (ev) => {
            ev.preventDefault();
            console.log("HEYHEYHEY")
            const postId =ev.target.dataset.docid
            const postLikeDislike = ev.target.dataset.likedislike

            let addElement, subtractElement;
            if (postLikeDislike === 'like') {
                addElement = document.querySelector(`#post-${postId} .post-like-button__like`)
                subtractElement = document.querySelector(`#post-${postId} .post-like-button__dislike`)
            } else {
                subtractElement = document.querySelector(`#post-${postId} .post-like-button__like`)
                addElement = document.querySelector(`#post-${postId} .post-like-button__dislike`)
            }

            /**
             * addElement is the button we're pressing, not necessarily means were adding 1 to the count, 
             * we might be removing a like without disliking
             */

            if (addElement.classList.contains('post-like-button__active')) {
                fetch(`${globalVars.apiEndPoint}/user/publicaciones/${postId}/like_dislike?secret_token=${secret_token}&like_dislike=${postLikeDislike}`, {
                    method: 'DELETE'
                }).then(res => {
                    if (res.status === 200) {
                        const countElement = addElement.querySelector(`.post-like-button--count`);
                        const newCount = parseInt(countElement.textContent);
                        countElement.textContent = newCount - 1    
                        addElement.classList.remove('post-like-button__active')
                    }
                }).catch(err => {
                    console.log("SAD SAD SAD MAMA", err)
                }) 

            } else {
                fetch(`${globalVars.apiEndPoint}/user/publicaciones/${postId}/like_dislike?secret_token=${secret_token}&like_dislike=${postLikeDislike}`, {
                    method: 'POST'
                }).then(res => {
                    console.log("HEYO", res)
    
                    if (res.status === 200) {
                        const countElement = addElement.querySelector(`.post-like-button--count`);
                        const newCount = parseInt(countElement.textContent);
                        countElement.textContent = newCount + 1
                        addElement.classList.add('post-like-button__active')
    
                        if (subtractElement.classList.contains('post-like-button__active')) {
                            const subtractCountElement = subtractElement.querySelector(`.post-like-button--count`);
                            const newSubtractedCount = parseInt(subtractCountElement.textContent)
                            subtractCountElement.textContent = newSubtractedCount > 0 ? newSubtractedCount - 1 : 0
                            addElement.classList.remove('button__active')
                        }
    
                        subtractElement.classList.remove('post-like-button__active')
    
    
                    }
                }).catch(err => {
                    console.log("SAD SAD SAD MAMA", err)
                }) 
            }
        })
    })
}

fetchData()