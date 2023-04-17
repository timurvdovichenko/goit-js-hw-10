import './css/styles.css';

// import { Notify } from 'notiflix';

import debounce from 'lodash.debounce';

// import fetchCountries from './fetchCountries';

// import ApiFetchService from './apiFetch';
import ApiFetchService from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
refs.input.addEventListener('input', debounce(onSearchInput, DEBOUNCE_DELAY));

// console.log(refs.input);
const apiFetchService = new ApiFetchService();

function onSearchInput(evt) {
  evt.preventDefault();
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';

  //   const inputCountryValue = evt.target.value.trim();

  apiFetchService.query = evt.target.value.trim();
  apiFetchService.countryList = refs.countryList;
  apiFetchService.countryInfo = refs.countryInfo;

  if (apiFetchService.queryName === '') {
    return;
  } else {
    apiFetchService.fetchCountries();
    //  apiFetchService.onCountriesMarkupList();
  }
}
