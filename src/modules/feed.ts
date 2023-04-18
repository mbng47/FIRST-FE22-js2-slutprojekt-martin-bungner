import { fetchDB, deleteUser, loggedInUser, addNewPost } from "./database";

const jsonString: any = sessionStorage.getItem("activeUser");
const activeUserObj = JSON.parse(jsonString);
const activeUserHeading = document.getElementById('activeuser-h') as HTMLHeadingElement;
activeUserHeading.innerText = activeUserObj.username;

// Profile pictures saved to variables because of problems finding relative paths through parcel
const punk: HTMLImageElement = document.createElement('img')
const punkUrl = new URL('../images/punk.png', import.meta.url);
punk.src = punkUrl.href;

const sweater: HTMLImageElement = document.createElement('img')
const sweaterUrl = new URL('../images/sweater.png', import.meta.url);
sweater.src = sweaterUrl.href;

const jester: HTMLImageElement = document.createElement('img')
const jesterUrl = new URL('../images/jester.png', import.meta.url);
jester.src = jesterUrl.href;

const conductor: HTMLImageElement = document.createElement('img')
const conductorUrl = new URL('../images/conductor.png', import.meta.url);
conductor.src = conductorUrl.href;
// ----------------------------------------------------------------


fetchDB()
    .then(getUsersList)

// ---------------------------------------------------------------- List of users

function getUsersList(usersDB) {

    // ((document.getElementById('users-ul')) as HTMLUListElement).innerHTML = '';

    usersDB.forEach((user) => {

        if(user !== null){

            const liUser: HTMLLIElement = document.createElement('li');
            liUser.innerText = user.username;
            ((document.getElementById('users-ul')) as HTMLUListElement).append(liUser);
    
            liUser.addEventListener('click', () => {
                displayUser(user);
            })
    
            if (user.username == activeUserObj.username) {
                displayUser(user);
            }

        }


    });
}

async function displayUser(user) {
    const userInfo = document.getElementById('user-info') as HTMLElement;
    userInfo.innerHTML = '';
    const postsContainer = document.getElementById('posts-output-container') as HTMLElement;
    postsContainer.innerHTML = '';

    if (user.img == 'punk') userInfo.append(punk);
    else if (user.img == 'sweater') userInfo.append(sweater);
    else if (user.img == 'jester') userInfo.append(jester);
    else if (user.img == 'conductor') userInfo.append(conductor);

    const name = document.createElement('h2') as HTMLHeadElement;
    name.innerText = user.username;
    userInfo.appendChild(name);

    const postBtn = document.getElementById('post-btn') as HTMLButtonElement;
    postBtn.style.visibility = 'hidden';
    if (user.username == activeUserObj.username) {
        postBtn.style.visibility = 'visible';
    }

    const { posts } = user;
    if (posts !== undefined) {
        const userPosts = Object.values(posts);
        userPosts.forEach(post => {
            const postElement: any = document.createElement('h3');
            postElement.innerText = post;
            postsContainer.append(postElement);
        })
    }
}

// ---------------------------------------------------------------- Sign out & delete user

const signOutBtn = document.getElementById('signout-btn') as HTMLButtonElement;
signOutBtn.addEventListener('click', () => {
    sessionStorage.clear();
    window.location.assign('../index.html');
})

const deleteAccBtn = document.getElementById('deleteaccount-btn') as HTMLButtonElement;
deleteAccBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    loggedInUser(activeUserObj)
        .then(deleteUser)

    setTimeout(() => {
        sessionStorage.clear();
        window.location.assign('../index.html');
    }, 2000);

})


// ----------------------------------------------------------------

const postInput = document.getElementById('post-input') as HTMLInputElement;
const postForm = document.getElementById('post-form') as HTMLFormElement;
postForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newPost = postInput.value;
    const index = await loggedInUser(activeUserObj);
    addNewPost(newPost, index);
    postInput.value = '';

    setTimeout(() => {
        window.location.reload();
    }, 1000);

})

