// import services and utilities
import { getUser, signInUser, signUpUser } from '../fetch-utils.js';

// If on this /auth page but we have a user, it means
// user probably navigated here by the url.
// Send them back to home page (they need to sign out first!)

async function loadUser() {
    const user = await getUser();
    if (user) location.replace('/');
}
loadUser();

/* Get DOM (getElementById and friends)*/
const authForm = document.getElementById('auth-form');
const authHeader = authForm.querySelector('h2');
const authButton = authForm.querySelector('button');
const changeType = authForm.querySelector('a');
const errorDisplay = authForm.querySelector('.error');

/* let state */
let isSignIn = true;

/* Events */

window.addEventListener('load', () => {
    displayAuth();
});

changeType.addEventListener('click', (e) => {
    // using an <a> tag, don't let it actually
    // change the browser page
    e.preventDefault();

    // toggle the type (sign in vs up)
    isSignIn = !isSignIn;

    // redisplay the text in the header, button, and change type link
    displayAuth();
});

authForm.addEventListener('submit', async (e) => {
    // don't let the form submit the page
    e.preventDefault();

    // clear the error, and put the button in "loading state"
    errorDisplay.textContent = '';
    authButton.disabled = true;

    // get the form data with email and password
    const formData = new FormData(authForm);

    let response = null;

    if (isSignIn) {
        response = await signInUser(formData.get('email'), formData.get('password'));
    } else {
        response = await signUpUser(formData.get('email'), formData.get('password'));
        response = await signInUser(formData.get('email'), formData.get('password'));
    }

    const error = response.error;

    if (error) {
        // display the error and reset the button to be active
        errorDisplay.textContent = error;
        authButton.disabled = false;
    } else {
        // go back to wherever user came from...
        // check the query params for a redirect Url (page before auth redirect)
        const params = new URLSearchParams(location.search);
        const redirectUrl = params.get('redirectUrl') || '/';
        location.replace(redirectUrl);
    }
});

/* Display Functions */

function displayAuth() {
    // set the text display on the header, button, and change type link
    if (isSignIn) {
        authHeader.textContent = 'Sign in to your account';
        authButton.textContent = 'Sign In';
        changeType.textContent = 'Need to create an account?';
    } else {
        authHeader.textContent = 'Create a new account';
        authButton.textContent = 'Sign Up';
        changeType.textContent = 'Already have an account?';
    }
}
