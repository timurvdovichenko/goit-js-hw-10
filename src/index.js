import './css/styles.css';

import { Notify } from 'notiflix';

import debounce from 'lodash.debounce';

import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
refs.input.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

console.log(refs.input);

function onSearchInput(evt) {
  evt.preventDefault();

  const inputCountryValue = evt.target.value.trim();

  if (inputCountryValue === '') {
    return;
  } else {
    fetchCountries(inputCountryValue)
      .then(countries => {
        if (countries.length > 10) {
          console.log('numbers of countries', countries.length - 1);
          Notify.failure('Too many matches found. Please enter a more specific name.');
          resetAllView();
        } else if (countries.length > 1 && countries.length <= 10) {
          const markup = countries.reduce((acc, country) => {
            return onCountriesMarkupList(country) + acc;
          }, '');
          updateCountryList(markup);
        } else {
          const markup = countries.reduce((acc, country) => {
            return onCountryMarkup(country) + acc;
          }, '');
          updateCountryCard(markup);
        }
      })
      .catch(err => {
        console.error(err), Notify.failure('Oops, there is no country with that name');
      });
  }
}

function onCountriesMarkupList({ flags, name }) {
  return `<li style="display: flex; align-items: center">
  <img src="${flags.svg}" alt="flag of contry ${name.official}" width="50" height="30"> 
  <p style="margin-left: 20px">${name.official}</p> 
  </li>`;
}

function onCountryMarkup({ flags, name, capital, population, languages }) {
  return `<div style="display: flex; align-items: center">
  <img src="${flags.svg}" alt="flag of contry ${name.official}" width="50" height="30"> 
  <h2 style="margin-left: 20px">${name.official}</h2> 
  </div>
  <div>
  <p><b style="margin-right: 10px">Capital:</b>${capital}</p>
  <p><b style="margin-right: 10px">Population:</b>${population}</p>
  <p><b style="margin-right: 10px">Languages:</b>${Object.values(languages)}</p>
  </div>`;
}

function updateCountryList(markupList) {
  refs.countryList.innerHTML = markupList;
  refs.countryInfo.innerHTML = '';
}

function updateCountryCard(markupList) {
  refs.countryInfo.innerHTML = markupList;
  refs.countryList.innerHTML = '';
}

function resetAllView() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
