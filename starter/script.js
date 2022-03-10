'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//Call back hell

const renderHtml = function (data) {
  const country = `
    <article class="country">
        <img class="country__img" src="${data.flags.svg}" />
        <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} m people</p>
        <p class="country__row"><span>🗣️</span>${
          Object.entries(data.languages)[0][1]
        }</p>
        <p class="country__row"><span>💰</span>${
          Object.entries(data.currencies)[0][1].name
        }</p>
        </div>
    </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', country);
  //refactor  code below to have it in the .finally()
  // countriesContainer.style.opacity = 1; //For smooth transition
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //refactor  code below to have it in the .finally()
  // countriesContainer.style.opacity = 1; //For smooth transition
};

// const getCountry = function (countryName) {
//   const request = new XMLHttpRequest();
//   request.open('Get', `https://restcountries.com/v3.1/name/${countryName}`);
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     renderHtml(data);

//     const neighbours = data.borders;
//     if (!neighbours) {
//       return;
//     }

//     neighbours.forEach(countryCode => {
//       const requestNeigh = new XMLHttpRequest();
//       requestNeigh.open(
//         'Get',
//         `https://restcountries.com/v3.1/alpha/${countryCode}`
//       );
//       requestNeigh.send();

//       requestNeigh.addEventListener('load', function () {
//         const [dataNeigh] = JSON.parse(this.responseText);
//         renderHtml(dataNeigh);
//       });
//     });
//   });
// };

// getCountry('germany');

///////////////////////////////////////
// Promises. Fetch API

const countryName = 'kenya';
const request = fetch(`https://restcountries.com/v3.1/name/${countryName}`);

/*
.then() method is available to all promises
.json() method is availabe to all responses on the fetch method
        Its also an asynchronous function. It also returns a promise

*/

// const getCountry = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       // data passed in is an array with one object
//       [data] = data;
//       renderHtml(data);
//     });
// };

// same as above but with arrows
// const getCountry = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderHtml(data[0]);

//       const neighbours = data[0].borders;
//       if (!neighbours) return;

//       // UNABLE TO LOOP AND FETCH
//       // neighbours.forEach(countryCode => {
//       //   return fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
//       // });

//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbours[0]}`);
//     })
//     .then(response => response.json())
//     .then(data => renderHtml(data[0]))
//     .catch(err => {
//       console.log(`${err}`);
//       renderError(`Something went wrong ${err.message}`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// btn.addEventListener('click', function () {
//   getCountry('kenya');
// });

//Handling errors
//There are two ways of handling errors in the fetch API

// 1. Add another call back on the then method

// btn.addEventListener('click', function () {
//   fetch(`https://restcountries.com/v3.1/name/${countryName}`).then(
//     res => res.json().then(data => renderHtml(data[0])),
//     err => alert(err)
//   );
// });

// 2. Chain a catch method at the end

// btn.addEventListener('click', function () {
//   fetch(`https://restcountries.com/v3.1/name/${countryName}`)
//     .then(res => res.json())
//     .then(data => renderHtml(data[0]))
//     .catch(err => {
//       console.log(`${err}`);
//       renderError(`Something went wrong ${err.message}`);
//     });
// });

//Recap:
// .then() method is called if the promise is fulfilled
// .catch() method is called if the promise is rejected
// .finall() method is called whether promise is fullfilled or rejected

//Throwing errors manually

const getCountry = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      if (!response.ok) {
        //we create the error that will propagate down to the catch method
        throw new Error(`Page not found. (Error ${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      renderHtml(data[0]);

      const neighbours = data[0].borders;
      if (!neighbours) return;

      return fetch(`https://restcountries.com/v3.1/alpha/${neighbours[0]}`);
    })
    .then(response => response.json())
    .then(data => renderHtml(data[0]))
    .catch(err => {
      console.log(`${err}`);
      renderError(`Something went wrong ${err.message}`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', function () {
  getCountry('kekfjrfrkfnya'); //non-existent country
});
