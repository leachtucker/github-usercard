// Import
import axios from 'axios';

// Const
const cardsContainer = document.querySelector('div.cards');
const followersArray = ['tetondan', 'jack'];

// >>>>>>>>>> Used httpie to review the data passed through the response

// Request's userdata for given username and then creates & appends a card to the DOM with data derived from a GET response
function getUser(username) {
    axios.get(`https://api.github.com/users/${username}`)
        .then(response => {
            // Success -- create and append the card derived from the userdata we recieved
            const userdata = response.data;
            const newCard = cardMaker(userdata);
            cardsContainer.append(newCard);
        })
        .catch(err => {
            console.log('There has been an error loading user data')
        });
}

// 1. Request my user data
getUser('leachtucker');

// 3b. Stretch -- Invoke our getFollowers function
getFollowers('leachtucker');

// 3a. Stretch -- Request the user's followers' data and add their usernames to the global array
function getFollowers(username) {
    axios.get([`https://api.github.com/users/${username}/followers`])
        .then(response => {
            // Success -- iterate through the data we recieved. Create & append a card for each passthrough
            response.data.forEach(follower => {
                followersArray.push(follower["login"]);
            })
            followersArray.forEach(username => {
                getUser(username);
            });
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