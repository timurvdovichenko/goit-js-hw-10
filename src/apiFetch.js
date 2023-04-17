const FETCH_URL = 'https://restcountries.com/v3.1/name';
const fields = 'name,capital,population,flags,languages';

import { Notify } from 'notiflix';

export default class ApiFetchService {
  constructor() {
    this.queryName = '';
    this.countryListData = '';
    this.countryInfoData = '';
  }

  fetchCountries() {
    return fetch(`${FETCH_URL}/${this.queryName}?fields=${fields}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('404');
        }
        return response.json();
      })
      .then(countries => {
        if (countries.length > 10) {
          //   console.log('numbers of countries', countries.length - 1);
          Notify.failure('Too many matches found. Please enter a more specific name.');
        } else if (countries.length > 1 && countries.length <= 10) {
          this.#onCountriesMarkupList(countries);
        } else if (countries.length === 1) {
          this.#onCountryMarkup(countries);
        }
      })
      .catch(err => {
        console.error(err), Notify.failure('Oops, there is no country with that name');
      });
  }
  get query() {
    return this.queryName;
  }
  set query(newQueryName) {
    this.queryName = newQueryName;
  }

  get countryList() {
    return this.countryListData;
  }
  set countryList(newCountryList) {
    this.countryListData = newCountryList;
  }

  get countryInfo() {
    return this.countryInfoData;
  }
  set countryInfo(newCountryInfo) {
    this.countryInfoData = newCountryInfo;
  }

  #onCountriesMarkupList(countries) {
    this.countryList.innerHTML = countries.reduce((acc, country) => {
      return countryListMarkup(country) + acc;
    }, '');

    function countryListMarkup({ flags, name }) {
      return `<li style="display: flex; align-items: center">
  <img src="${flags.svg}" alt="flag of contry ${name.official}" width="50" height="30"> 
  <p style="margin-left: 20px">${name.official}</p> 
  </li>`;
    }
  }

  #onCountryMarkup(countries) {
    this.countryInfo.innerHTML = countries.reduce((acc, country) => {
      return countryMarkup(country) + acc;
    }, '');

    function countryMarkup({ flags, name, capital, population, languages }) {
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
  }
}
