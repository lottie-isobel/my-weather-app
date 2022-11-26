let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDate = document.querySelector(".todaydate");
currentDate.innerHTML = `${day} ${hours}:${minutes}`;

function showCity(response) {
  document.querySelector("#weatherdescription").innerHTML =
    response.data.weather[0].main;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let searchTemperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchTemperature}°c`;
}

function getCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchInput").value;
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let cityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
  axios.get(cityApiUrl).then(showCity);
}

let form = document.querySelector("form");
form.addEventListener("submit", getCity);

function showLocation(response) {
  let currentLocation = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentLocation}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${currentTemperature}°c`;
}

function retrieveLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "58a6775f97527351bf6c6966e209be39";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocation);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveLocation);
}

let button = document.querySelector("button");
button.addEventListener("click", getPosition);
