'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//Call back hell

const rendeHtml = function (data) {
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
  countriesContainer.style.opacity = 1; //For smooth transition
};

const getCountry = function (countryName) {
  const request = new XMLHttpRequest();
  request.open('Get', `https://restcountries.com/v3.1/name/${countryName}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    rendeHtml(data);

    const neighbours = data.borders;
    if (!neighbours) {
      return;
    }

    neighbours.forEach(coutryCode => {
      const requestNeigh = new XMLHttpRequest();
      requestNeigh.open(
        'Get',
        `https://restcountries.com/v3.1/alpha/${coutryCode}`
      );
      requestNeigh.send();

      requestNeigh.addEventListener('load', function () {
        const [dataNeigh] = JSON.parse(this.responseText);
        rendeHtml(dataNeigh);
      });
    });
  });
};

getCountry('germany');
