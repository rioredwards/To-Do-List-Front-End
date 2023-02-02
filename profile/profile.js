/* Imports */
// this will check if we have a user and set signout link if it exists
import '../auth/user.js';
import { getUser } from '../fetch-utils.js';

/* Get DOM Elements */
const profileList = document.getElementById('profile-container');
/* State */

/* Events */
async function loadProfile() {
    const profile = await getUser();
    const div = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    h3.textContent = profile.email;
    p.textContent = 'This is my page!';
    div.append(h3, p);
    profileList.append(div);
}
loadProfile();

/* Display Functions */
