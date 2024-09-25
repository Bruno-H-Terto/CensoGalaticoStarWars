window.onload = createBtnPlanet;

const URL = 'https://swapi.dev/api/planets/';
const list_planets = document.getElementById('list_planets');
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

  list.forEach(planet => {

    let btn = document.createElement('button');
    btn.textContent = planet.name;


    list_planets.appendChild(btn);
  });
}
