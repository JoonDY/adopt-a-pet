import { API_KEY, API_SECRET} from './key.js';


const getToken = async () => {
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

const fetchData = async() => {
  const token = window.localStorage.getItem('token')
  const response = await fetch("https://api.petfinder.com/v2/animals", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();
  updateDOM(data.animals);
}

const updateDOM = (arr) => {
  arr.forEach((data) => {
    const results = document.getElementById('display-results');
    const div = document.createElement('div');
    div.classList.add('card')
    const result = createResult(data);
    const button = createLink(data);
    
    div.append(result);
    div.append(button);

    results.append(div)
  })
  
}

const createResult = (data) => {
  const div = document.createElement('div');
  div.classList.add('result');

  const resultText = createText(data);
  const resultIMG = createIMG(data);

  div.append(resultText);
  div.append(resultIMG);

  return div
}

const createText = (data) => {
  const div = document.createElement('div');
  div.classList.add('result-text')
  const resultTitle = createTitle(data);
  const resultContent = createDescription(data);

  div.append(resultTitle);
  div.append(resultContent);

  return div
}

const createTitle = (data) => {
  const title = document.createElement('h2');
  title.textContent = data.name
  return title
}

const createDescription = (data) => {
  const content = document.createElement('div');
  let output = {
    Type: data.type,
    Breed: data.breeds.primary,
    Status: data.status,
    Gender: data.gender,
    Age: data.age,
  };

  for (const key in output) {
    const p = document.createElement('p');
    p.textContent = `${key}: ${output[key]}`;
    content.append(p);
  };

  return content

}

const createIMG = (data) => {
  const div = document.createElement('div');
  div.classList.add('result-img');
  const img = document.createElement('img');

  if (data.photos[0]){
    img.src = data.photos[0].full;
  } else {
    img.src = '../img/placeholder.png'
  }

  div.append(img);
  return div
};

const createLink = (data) => {
  const link = document.createElement('a');
  link.classList.add('more-link')

  link.textContent = 'Get To Know Me'
  link.href = data.url;
  link.target = '_blank'
  return link
};

getToken();
fetchData();




 


