import { createUserObject } from "./user";
import { userExists, loginUser } from "./database";

const nameInput = document.getElementById('login-username') as HTMLInputElement;
const passInput = document.getElementById('login-password') as HTMLInputElement;
const loginForm = document.getElementById("login-form") as HTMLFormElement;

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (nameInput.value != undefined && nameInput.value != '' && nameInput.value != 'none' && passInput.value != undefined && passInput.value != '' && passInput.value != 'none') {

        const user = createUserObject(nameInput, passInput)
        const exists = await userExists(user);

        if (exists)
            loginUser(user);

        else
            alert(`Couldn't find user`);

    }

    else {
        alert('Name and password is required');
    }
})
