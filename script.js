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

function saveUserInfo() {
    const name = document.getElementById('name').value;
    const whatsapp = document.getElementById('whatsapp').value;
    const address = document.getElementById('address').value;

    if (name && whatsapp && address) {
        setCookie("name", name, 365);
        setCookie("whatsapp", whatsapp, 365);
        setCookie("address", address, 365);
        document.getElementById('userModal').style.display = 'none';
    } else {
        alert("Silakan masukkan semua informasi.");
    }
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function renderMenu(menuItems) {
    const menuGrid = document.getElementById('menuGrid');
    menuItems.forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <img src="./menu/${item.image}" alt="${item.name}" class="menu-image">
            <div class="menu-footer">
                <p class="price">Rp ${item.price.toLocaleString()}</p>
                <div class="quantity-controls">
                    <button type="button" class="qty-btn" onclick="changeQuantity('qty${item.id}', ${item.price}, -1)">-</button>
                    <input type="number" id="qty${item.id}" name="qty${item.id}" value="0" min="0" data-price="${item.price}" data-name="${item.name}" onchange="calculateTotal()">
                    <button type="button" class="qty-btn" onclick="changeQuantity('qty${item.id}', ${item.price}, 1)">+</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(menuItem);
    });
}




