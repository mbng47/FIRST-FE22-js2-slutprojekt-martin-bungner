export { User, createUserObject };

class User {

    public username: string;
    public password: string;
    public img?: string;
    public posts?: object[];

    constructor(
        username: string,
        password: string,
        img?: string,
        posts?: object[],
    ) {
        this.username = username;
        this.password = password;
        this.img = img;
        this.posts = posts;
    }
}

function createUserObject(nameInput, passInput, picInput?): object {

    const username = (nameInput as HTMLInputElement).value;
    const password = (passInput as HTMLInputElement).value;
    let userObject: object;

    if (picInput) {
        const img = (picInput as HTMLInputElement).value;
        userObject = new User(username, password, img);
    }

    else {
        userObject = new User(username, password);
    }

    return userObject;
}