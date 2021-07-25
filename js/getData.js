import { updateDOM } from "./searchResults.js";
import { API_KEY, API_SECRET} from './key.js';

export const getToken = async () => {
  const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
  body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  method: "POST",
  });
  const data = await response.json();
  window.localStorage.setItem('token', data.access_token);
}

const getFetchURL = (
  type = '',
  age = '',
  gender = '',
  size = '',
) => {
  const url = `https://api.petfinder.com/v2/animals?type=${type}`
  return url
}

export const fetchData = async() => {
  const token = window.localStorage.getItem('token')
  const url = getFetchURL();
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();
  updateDOM(data.animals);
}