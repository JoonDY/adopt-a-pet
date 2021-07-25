export const updateDOM = (animals) => {
 const results = document.getElementById('display-results'); 
 clearResults(results);
 
 animals.forEach((data) => {
    const div = document.createElement('div');
    div.classList.add('card')
    const result = createResult(data);
    const button = createLink(data);

    div.append(result);
    div.append(button);

    
    results.append(div)
  })
  
}

const clearResults = (element) => {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
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