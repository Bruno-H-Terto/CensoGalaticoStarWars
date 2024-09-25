window.onload = createBtnPlanet;

const URL = 'https://swapi.dev/api/planets/';
const list_planets = document.getElementById('list_planets');
const details_planet = document.getElementById('details_planet');
let list = [];

async function requestAPI() {
  const data = await fetch(URL);
  const response = await data.json();
  const planets = response.results;
  console.log(planets);

  return planets;
}

async function createBtnPlanet() {
  list = await requestAPI();
  let i = 0;

  list.forEach(planet => {

    let btn = document.createElement('button');
    btn.textContent = planet.name;
    btn.setAttribute('onclick', `dataPlanet(${i})`);


    list_planets.appendChild(btn);
    i++;
  });
}

function dataPlanet(index){
  details_planet.innerHTML = '';

  let topic_list = document.createElement('ul');
  topic_list.innerHTML = `
    <li>${list[index].name}</li>
    <li>${list[index].climate}</li>
    <li>${list[index].population}</li>
    <li>${list[index].terrain}</li>
  
  `;

  details_planet.appendChild(topic_list);
}
