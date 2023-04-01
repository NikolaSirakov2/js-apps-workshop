class UserManager {

    loggedUser = null;

    constructor(){
        this.loggedUser 
    }


    register = (username, password) => {
        return makeAPICall('http://localhost:3030/users/register', {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        
    }

    logIn = (username, password) => {
        return easyFetch('http://localhost:3030/users/login', {
            method: "POST",
            headers: {
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        .then(({sessionId, username}) => {
                localStorage.setItem('loggedUser', JSON.stringify({sessionId, username}))
        })
    }

    logOut = (sessionId) => {

        localStorage.setItem('loggedUser', null);

        return makeAPICall("http://localhost:3030/users/logout", {
            method: "GET",
            headers: {
                "Content-type" : "application/json"
            },
            // body: JSON.stringify({
            //     id: sessionId
            // })
        })
        
    }
}