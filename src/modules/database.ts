export { fetchDB, userExists, loginUser, addNewUser, loggedInUser, deleteUser, addNewPost };


const baseURL = 'https://megameetings-4101b-default-rtdb.europe-west1.firebasedatabase.app/';

async function fetchDB(): Promise<any> {

    const url = baseURL + 'users.json';
    const response = await fetch(url);
    const users = await response.json();
    return users;
}

async function userExists(newUser): Promise<boolean> {

    let exists: boolean = false;
    const users = await fetchDB();



    for (const user of users) {
        if (user !== null) {
            if (user.username === newUser.username) {
                exists = true;
                break;
            }
        }
    }

    return exists;
}

async function loginUser(user): Promise<void> {

    const { username, password } = user;
    const dbUsers = await fetchDB();

    dbUsers.forEach((user) => {

        if (user.username == username) {
            if (user.password == password) {
                const jsonString = JSON.stringify(user);
                sessionStorage.setItem('activeUser', jsonString);
                window.location.assign('./html/feed.html');
            }
            else {
                alert('Wrong password');
            }
        }
    })
}

async function addNewUser(newUser): Promise<void> {

    const users = await fetchDB();
    const i = users.length;

    const init = {
        method: 'PUT',
        body: JSON.stringify(newUser),
        headers: {
            'Content-type': "application/json; charset=UTF-8"
        }
    }

    const url = `${baseURL}users/${i}.json`;
    const response = await fetch(url, init);
    await response.json();
}

async function loggedInUser(activeUserObj): Promise<void> {

    const { username, password } = activeUserObj;
    const dbUsers = await fetchDB();
    let index;

    dbUsers.forEach((user, i) => {
        if (user !== null) {

            if (user.username == username) {
                if (user.password == password) {
                    index = i;
                }
            }
        }
    })
    return index;
}


async function deleteUser(index): Promise<void> {
    const init = {
        method: 'DELETE',
        // body: JSON.stringify(newUser),
        headers: {
            'Content-type': "application/json; charset=UTF-8"
        }
    }

    const url = `${baseURL}users/${index}.json`;
    const response = await fetch(url, init);
    await response.json();
}


async function addNewPost(newPost, index) {

    console.log(`funkar, nu inne på användare med index ${index} i database`);
    console.log(`detta vill jag lägga till: ${newPost}`);

    const init = {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
            'Content-type': "application/json; charset=UTF-8"
        }
    }

    const url = `${baseURL}users/${index}/posts.json`;
    const response = await fetch(url, init);
    await response.json();
}
