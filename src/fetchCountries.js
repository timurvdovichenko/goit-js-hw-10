const FETCH_URL = 'https://restcountries.com/v3.1/name';
const fields = 'name,capital,population,flags,languages';

import { Notify } from 'notiflix';

export default function fetchCountries(name) {
  return fetch(`${FETCH_URL}/${name}?fields=${fields}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
      //   return response.status;
    }
    //   console.log(response);
    return response.json();
  });
}

// export default { fetchCountries };
