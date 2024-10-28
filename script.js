import { postJSON } from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/api.js';  // Sesuaikan path sesuai dengan lokasi file Anda
import {onClick} from 'https://cdn.jsdelivr.net/gh/jscroot/lib@0.0.4/element.js';


onClick('buttonsimpaninfouser',saveUserInfo);

document.addEventListener('DOMContentLoaded', function() {
    checkCookies();
    fetch('./data/menu.json')
        .then(response => response.json())
        .then(data => {
            renderMenu(data);
        })
        .catch(error => console.error('Error loading menu:', error));
});

function checkCookies() {
    const userName = getCookie("name");
    const userWhatsapp = getCookie("whatsapp");
    const userAddress = getCookie("address");

    if (!userName || !userWhatsapp || !userAddress) {
        document.getElementById('userModal').style.display = 'flex';
    } else {
        document.getElementById('userModal').style.display = 'none';
    }
}

