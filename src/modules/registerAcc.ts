import { createUserObject } from "./user";
import { userExists, addNewUser } from "./database";


const nameInput = document.getElementById('reg-username') as HTMLInputElement;
const passInput = document.getElementById('reg-password') as HTMLInputElement;
const regForm = document.getElementById("register-form") as HTMLFormElement;

regForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (nameInput.value != undefined && nameInput.value != '' && nameInput.value != 'none' && passInput.value != undefined && passInput.value != '' && passInput.value != 'none') {

        const profilePic = document.querySelector('input[type = radio]:checked') as HTMLInputElement;
        const newUser = createUserObject(nameInput, passInput, profilePic);
        const exists = await userExists(newUser);

        if (!exists){
            await addNewUser(newUser);
            const jsonString = JSON.stringify(newUser);
            sessionStorage.setItem('activeUser', jsonString);
            window.location.assign('./feed.html');
        }

        else
            alert('Username already exists');
    }

    else {
        alert('Name, password and profile picture are mandatory');
    }
})

