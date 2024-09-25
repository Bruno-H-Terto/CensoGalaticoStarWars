const URL ='https://swapi.dev/api/planets/';

async function requestAPI() {
  const resp = await fetch(URL);
  const response = await resp.json();
  console.log(response.results);
}

requestAPI();