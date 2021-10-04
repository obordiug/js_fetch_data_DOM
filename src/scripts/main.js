'use strict';

const BASE_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';
const DETAILS_URL
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones/';
const logo = document.querySelector('.logo');
const list = document.createElement('ul');

const getPhones = () => {
  return fetch(BASE_URL)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => new Error(`${response.status}`), 5000);
      }

      return response.json();
    });
};

const getPhonesDetails = () => {
  const phonesId = [];

  getPhones()
    .then(phones => {
      phones.forEach(phone => phonesId.push(phone.id));

      const phonesDetails = phonesId.map(itemId =>
        fetch(`${DETAILS_URL}${itemId}.json`)
          .then(response => response.json()));

      Promise.all(phonesDetails)
        .then(details => details.forEach(phone => addPhoneToList(phone.name)));
    })
    .catch(error => new Error(error));
};

getPhonesDetails();

function addPhoneToList(phonesName) {
  list.insertAdjacentHTML('beforeend', `<li>${phonesName}</li>`);
};

logo.after(list);
