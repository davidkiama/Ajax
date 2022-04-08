'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//Call back hell

const renderHtml = function (data, className = '') {
  const country = `
    <article class="country ${className}">
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
  countriesContainer.style.opacity = 1; //For smooth transition
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //refactor  code below to have it in the .finally()
  countriesContainer.style.opacity = 1; //For smooth transition
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
// const request = fetch(`https://restcountries.com/v3.1/name/${countryName}`);

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
// .finally() method is called whether promise is fullfilled or rejected

//Throwing errors manually

// const getCountry = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       if (!response.ok) {
//         //we create the error that will propagate down to the catch method
//         throw new Error(`Page not found. (Error ${response.status})`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderHtml(data[0]);

//       const neighbours = data[0].borders;
//       if (!neighbours) return;

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

//Use of a helper function

// const getJSON = function (url, errorMsg = 'Country not found') {
//   return fetch(url).then(response => {
//     if (!response.ok) {
//       //we create the error that will propagate down to the catch method
//       throw new Error(`${errorMsg}. (Error ${response.status})`);
//     }
//     return response.json();
//   });
// };

// const getCountry = function (country) {
//   getJSON(`https://restcountries.com/v3.1/name/${country}`)
//     .then(data => {
//       renderHtml(data[0]);

//       const neighbours = data[0].borders;

//       //create a specific error if country has no neighbours
//       if (!neighbours) throw new Error('No neighbour for this one');

//       // return getJSON(`https://restcountries.com/v3.1/alpha/rfrfrfsd`); Will catch this error too
//       return getJSON(`https://restcountries.com/v3.1/alpha/${neighbours[0]}`);
//     })
//     .then(data => renderHtml(data[0], 'neighbour'))
//     .catch(err => {
//       console.log(`${err}`);
//       renderError(`Something went wrong ${err.message}`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// btn.addEventListener('click', function () {
//   getCountry('Kenya'); //non-existent country
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude 
  value (lat) and a longitude value (lng) (these are GPS 
  coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse 
  geocoding means to convert coordinates to a meaningful location, 
  like a city and country name. Use this API to do reverse geocoding: 
  https://geocode.xyz/api.
  The AJAX call will be done to a URL with this format: 
  https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API 
  and promises to get the data. Do NOT use the getJSON function we 
  created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see 
  all the attributes that you recieved about the provided location. 
  Then, using this data, log a messsage like this to the console: 
  'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and 
    log errors to the console
5. This API allows you to make only 3 requests per second. If 
    you reload fast, you will get this error with code 403. 
    This is an error with the request. Remember, fetch() does 
    NOT reject the promise in this case. So create an error to 
    reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. 
    So take the relevant attribute from the geocoding API result, 
    and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done 
    in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/

// const getJSON = function (url, errorMsg = 'Country not found') {
//   return fetch(url).then(response => {
//     if (!response.ok) {
//       //we create the error that will propagate down to the catch method
//       throw new Error(`${errorMsg}. (Error ${response.status})`);
//     }
//     return response.json();
//   });
// };

// const getCountry = function (country) {
//   getJSON(`https://restcountries.com/v3.1/name/${country}`)
//     .then(data => {
//       renderHtml(data[0]);

//       const neighbours = data[0].borders;

//       //create a specific error if country has no neighbours
//       if (!neighbours) throw new Error('No neighbour for this one');

//       // return getJSON(`https://restcountries.com/v3.1/alpha/rfrfrfsd`); Will catch this error too
//       return getJSON(`https://restcountries.com/v3.1/alpha/${neighbours[0]}`);
//     })
//     .then(data => renderHtml(data[0], 'neighbour'))
//     .catch(err => {
//       console.log(`${err}`);
//       renderError(` ${err.message}`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// //Solution
// let auth = '55452033286555294869x94399';
// const whereAmI = function (lat, lng) {
//   fetch(`https://geocode.xyz/${lat},${lng}}?geoit=json&`)
//     .then(response => {
//       if (!response.ok) throw new Error('Too many requests. \n');
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return data.country;
//     })
//     .catch(err => {
//       renderError(`${err.message}`);
//       return;
//     })
//     .then(country => getCountry(country));
// };

// whereAmI(19.037, 72.873);

//Event loop in practice

// console.log('Test start');
// setTimeout(console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise').then(res => console.log(res));
// console.log('Test end');

//Creating a Promise

// const lotteryPromise = new Promise(function (resolve, reject) {
//   if (Math.random() >= 0.5) {
//     resolve('You WON');
//   } else {
//     reject('You LOST');
//   }
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// //The code above is not asynchroneous.
// //To make it asynchroneous, we can add a timer
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Draw happening now');
//   setTimeout(() => {
//     if (Math.random() >= 0.5) {
//       resolve('You WON');
//     } else {
//       reject(new Error('You LOST'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// //Promisyfying- Convert callback based asynchronous behavior to a promise based

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, 2000);
//   });
// };

// wait(2)
//   .then(() => {
//     console.log('I waited for 2 seconds');
//     return wait(1);
//   })
//   .then(() => console.log('I waited for 1 second'));

// // Created a fullfilled or rejected promise immediately
// Promise.resolve('Resolved value').then(res => console.log(res));
// Promise.reject(new Error('Rejected error')).catch(res => console.error(res));

// Promisifying the Geolocation API
// navigator.geolocation.getCurrentPosition(
//   location => console.log(location),
//   err => console.error(err)
// );

// const getLoc = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(
//       location => resolve(location),
//       err => reject(err)
//     );
//   });
// };

// //The above can be written as
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// // getPosition().then(res => console.log(res));

// const getCountry = function (country) {
//   getJSON(`https://restcountries.com/v3.1/name/${country}`)
//     .then(data => {
//       renderHtml(data[0]);

//       const neighbours = data[0].borders;

//       //create a specific error if country has no neighbours
//       if (!neighbours) throw new Error('No neighbour for this one');

//       // return getJSON(`https://restcountries.com/v3.1/alpha/rfrfrfsd`); Will catch this error too
//       return getJSON(`https://restcountries.com/v3.1/alpha/${neighbours[0]}`);
//     })
//     .then(data => renderHtml(data[0], 'neighbour'))
//     .catch(err => {
//       console.log(`${err}`);
//       renderError(` ${err.message}`);
//     })
//     .finally(() => (countriesContainer.style.opacity = 1));
// };

// ///////////////////////////////////////
// // Promises. Fetch API

// const whereAmI = function () {
//   getPosition()
//     .then(res => {
//       const { latitude: lat, longitude: lng } = res.coords;

//       return fetch(`https://geocode.xyz/${lat},${lng}}?geoit=json&`);
//     })

//     .then(response => {
//       if (!response.ok) throw new Error('Too many requests. \n');
//       return response.json();
//     })
//     .then(data => {
//       console.log(`You are in ${data.city}, ${data.country}`);
//       return data.country;
//     })
//     .catch(err => {
//       renderError(`${err.message}`);
//       return;
//     })
//     .then(country => getCountry(country));
// };

// btn.addEventListener('click', whereAmI);

///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out 
some stuff on your own. Pretend you're working on your own 😉

PART 1
1. Create a function 'createImage' which receives imgPath as an input. 
This function returns a promise which creates a new image 
(use document.createElement('img')) and sets the .src attribute to 
the provided image path. When the image is done loading, append it 
to the DOM element with the 'images' class, and resolve the promise. 
The fulfilled value should be the image element itself. In case there 
is an error loading the image ('error' event), reject the promise.

If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Consume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using 
the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (
  set display to 'none'), and load a second image (HINT: Use the 
    image element returned by the createImage promise to hide the current 
    image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong 
image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, 
otherwise images load too fast.

GOOD LUCK 😀
*/

// // Solution
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
// const images = document.querySelector('.images');

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     let imgElement = document.createElement('img');
//     imgElement.src = imgPath;

//     imgElement.addEventListener('load', function () {
//       images.insertAdjacentElement('beforeend', imgElement);

//       resolve(imgElement);
//     });

//     imgElement.addEventListener('error', function () {
//       reject(new Error('Image NOT found'));
//     });
//   });
// };

// let currentImg;
// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     return wait(2);
//   })
//   .then(() => {
//     currentImg.style.display = 'None';
//     return createImage('img/img-2.jpg');
//   })

//   .catch(err => console.error(err));

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Consuming Promises with async await
// const whereAmI = async function () {
//   // get position
//   const pos = await getPosition();
//   const { latitude: lat, longitude: lng } = pos.coords;

//   // get country
//   const geoRes = await fetch(`https://geocode.xyz/${lat},${lng}}?geoit=json&`);
//   const geoData = await geoRes.json();
//   console.log(geoData);

//   // render country
//   const res = await fetch(
//     `https://restcountries.com/v3.1/name/${geoData.country}`
//   );
//   const data = await res.json();
//   renderHtml(data[0]);
// };

// // Under the hood we are actually consuming the promise
// // with .then() method

// whereAmI();

//Error handling when using async await using try catch
const whereAmI = async function () {
  try {
    // get position
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // get country
    const geoRes = await fetch(
      `https://geocode.xyz/${lat},${lng}}?geoit=json&`
    );
    //fetch does reject 404, 403. We need to handle that
    if (!geoRes.ok) throw new Error('Could not get location');
    const geoData = await geoRes.json();

    // render country
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${geoData.country}`
    );
    //fetch does reject 404, 403. We need to handle that
    if (!res.ok) throw new Error('Could not get country');

    const data = await res.json();
    renderHtml(data[0]);
  } catch (err) {
    console.log(err);
    renderError(err.message);
  }
};

// Under the hood we are actually consuming the promise
// with .then() method

whereAmI();
