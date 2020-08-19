const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';
const postContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

async function getPost() {
    try {
        let res = await fetch(`${BASE_URL}?_limit=${limit}&_page=${page}`);
        res = await res.json();
        return res;
    } catch (error) {
        console.log(error.message);
    }
}

//show post in dom 
async function showPost(cb = () => { }) {
    const posts = await getPost();
    cb();
    posts.forEach(post => {
        let { id, body, title } = post;
        let item = document.createElement('div');
        item.classList.add('post');
        item.innerHTML = `
    <div class="number">${id}</div>
        <div class="post-info">
          <h2 class="post-title">
            ${title}
          </h2>
          <p>
            ${body}
          </p>
        </div>
    `;
        postContainer.appendChild(item);
    })
}

function showLoading() {
    loading.classList.add('show');
}

function closeLoading() {
    loading.classList.remove('show');
}

function filterPost(e) {
    let term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase();
        const body = post.querySelector('p').innerText.toUpperCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    })
}

showPost();

window.addEventListener('scroll', e => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
        page++;
        showLoading();
        showPost(() => closeLoading());
    }
})

filter.addEventListener('input', filterPost)