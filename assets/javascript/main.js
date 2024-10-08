window.onload = createBtnPlanet;

const URL = 'https://swapi.dev/api/planets/';
const list_planets = document.getElementById('list_planets');
const details_planet = document.getElementById('details_planet');
let list = [];

function addAnimation(obj){
  obj.classList.add('loading');
  obj.textContent = 'Loading...';
}

function removeAnimation(obj){
  obj.classList.remove('loading');
  obj.textContent = '';
}

window.addEventListener('scroll', function() {
  let nav = document.querySelector('.header-bar');
  if (window.scrollY < 100) {
    nav.classList.add('visible');
  } else {
    nav.classList.remove('visible');
  }
});

async function requestAPI() {
  const data = await fetch(URL);
  const response = await data.json();
  const planets = response.results;
  console.log(planets);

  return planets;
}

async function createBtnPlanet() {
  addAnimation(list_planets);
  list = await requestAPI();
  removeAnimation(list_planets);

  list.forEach((planet, index) => {
    let btn = document.createElement('button');
    btn.textContent = planet.name;
    btn.setAttribute('onclick', `dataPlanet(${index})`);
    btn.className = `btn-planet ${planet.name}`;
    btn.style.backgroundImage = `url('assets/img/${planet.name}.jpeg')`;
    btn.style.backgroundSize = 'cover';

    list_planets.appendChild(btn);
  });
}

function capitalize(text){
  return text.charAt(0).toUpperCase() + text.slice(1);
}

async function dataPlanet(index) {
  details_planet.innerHTML = '';
  addAnimation(details_planet);

  document.querySelector('.query').scrollIntoView({ behavior: 'smooth' }); 
  let planet = list[index];
  let residents = planet.residents;

  let topic_list = document.createElement('ul');
  topic_list.className = 'details-planet';
  topic_list.innerHTML += `
    <li>${planet.name}</li>
    <li>${capitalize(planet.climate)}</li>
    <li>${planet.population} inhabitants</li>
    <li>${capitalize(planet.terrain)}</li>
  `;

  let residentsTable = document.createElement('table');
  residentsTable.innerHTML = `
    <caption>
      Notable residents of ${planet.name}
    </caption>
    <thead>
      <tr>
        <th>Name</th>
        <th>Birth Year</th>
      </tr>
    </thead>
    <tbody>
  `;

  if (residents && residents.length > 0) {

    const residentPromises = residents.map(async resident => {
      let data_resident = await fetch(resident);
      let response_resident = await data_resident.json();
      return `
        <tr>
          <td>${response_resident.name}</td>
          <td>${response_resident.birth_year}</td>
        </tr>
      `;
    });

    const residentRows = await Promise.all(residentPromises);
    residentsTable.innerHTML += residentRows.join('');
  } else {
    residentsTable.innerHTML += `
      <tr>
        <td>No records</td>
        <td>No records</td>
      </tr>
    `;
  }

  residentsTable.innerHTML += `
    </tbody>
  </table>
  `;

  removeAnimation(details_planet);
  details_planet.appendChild(topic_list);
  details_planet.appendChild(residentsTable);
}

function keypress(event){
  event.preventDefault();
  query();
}

function query(){
  let formData = new FormData(document.getElementById('form'));
  let q_planet = formData.get('search');
  details_planet.innerHTML = '';
  let result = list.filter((planet) => planet.name.toLowerCase().includes(q_planet.toLowerCase()));
  document.querySelector('.query').scrollIntoView({ behavior: 'smooth' }); 
  if (result.length > 1) {
    let msg = document.createElement('p');
    msg.textContent = `Results for: ${q_planet}`;
    details_planet.appendChild(msg);

    result.forEach(r => {
      let div = document.createElement('div');
      div.className = "list-results";
      let btn = document.createElement('button');
      btn.textContent = r.name;
      btn.onclick = () => querySelection(r);
      div.appendChild(btn);
      details_planet.appendChild(div);
    });
  } else if(result.length == 1){
    dataPlanet(list.indexOf(result[0]));
  } else {
    let msg = document.createElement('p');
    msg.textContent = `No results found for: ${q_planet}`;
    details_planet.append(msg);
  }
}

function querySelection(selection){
  dataPlanet(list.indexOf(selection));
}
