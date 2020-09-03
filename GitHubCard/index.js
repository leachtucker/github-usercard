// Import
import axios from 'axios';

// Const
const cardsContainer = document.querySelector('div.cards');
const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

// >>>>>>>>>> Used httpie to review the data passed through the response

// Request's userdata for given username and then creates & appends a card to the DOM with data derived from a GET response
function getUser(username) {
    return axios.get(`https://api.github.com/users/${username}`)
        .then(response => {
            // Success -- create and append the card derived from the user data we recieved
            const userData = response.data;
            const newCard = cardMaker(userData);
            cardsContainer.append(newCard);
        })
        .catch(err => {
            console.log('There has been an error loading user data')
        });
}

// 1. Request my user data
getUser('leachtucker');

// 2. Request user data for each username in the array
followersArray.forEach(username => {
    getUser(username);
});

// 3. Stretch -- Request the user's followers' data
function getFollowers(user) {
    axios.get(user["followers_url"])
        .then(response => {
            // Success -- iterate through the data we recieved. Create & append a card for each passthrough
            response.data.forEach(follower => {
                console.log(follower);
                cardsContainer.append(cardMaker(follower));
            })
        })
        .catch(err => {
            console.log(`An error has occured retrieving the users followers: ${err}`);
        });
}


// Component
function cardMaker(user) {
    // Setting up the div.card element (the outer most element)
    const card = document.createElement('div');
    card.classList.add('card');

    // Setting up sub elements
    const avatarImg = document.createElement('img');
    avatarImg.setAttribute('src', user["avatar_url"]);

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('card-info');

    const nameH3 = document.createElement('h3');
    nameH3.classList.add('name');
    nameH3.textContent = user["name"];

    const usernameP = document.createElement('p');
    usernameP.classList.add('username');
    usernameP.textContent = user["login"];

    const locationP = document.createElement('p');
    locationP.textContent = user["location"];

    const profileP = document.createElement('p');
    const profileLink = document.createElement('a');
    profileP.appendChild(profileLink);
    profileLink.setAttribute('src', user["url"]);

    const followersP = document.createElement('p');
    followersP.textContent = user["followers"];

    const followingP = document.createElement('p');
    followingP.textContent = user["following"];

    const bioP = document.createElement('p');
    bioP.textContent = user["bio"];

    // Appending sub elements to their parent elements/containers
    infoDiv.append(nameH3, usernameP, locationP, profileP, followersP, followingP, bioP);
    card.append(avatarImg, infoDiv);

    // Return the created div.card
    return card;
}