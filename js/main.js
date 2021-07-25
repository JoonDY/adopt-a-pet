import { getToken, fetchData } from './getData.js';

document.addEventListener("readystatechange" , (event) => {
  if (event.target.readyState === "complete") 
  {
    initApp();
  }
});


const initApp = () => {
  getToken();
  const submit = document.getElementById('search-btn');
  submit.addEventListener('click', fetchData);
}





 


