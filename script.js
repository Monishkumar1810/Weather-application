const apiKey = "ec24d4a6ad0084570e983c2b3fc2f8b8";
const searchBtn = document.getElementById("searchBtn");
const locBtn = document.getElementById("locBtn");
const cityInput = document.getElementById("cityInput");
const weatherOutput = document.getElementById("weatherOutput");

async function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  return fetchWeather(url);
}

async function getWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  return fetchWeather(url);
}

async function fetchWeather(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (res.ok) displayWeather(data);
    else weatherOutput.innerHTML = `<p>Error: ${data.message}</p>`;
  } catch (err) {
    weatherOutput.innerHTML = `<p>Unable to fetch weather.</p>`;
    console.error(err);
  }
}

function displayWeather(data) {
  weatherOutput.innerHTML = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <p>${data.weather[0].main} — ${data.weather[0].description}</p>
    <ul>
      <li>Temp: ${data.main.temp} °C</li>
      <li>Feels like: ${data.main.feels_like} °C</li>
      <li>Humidity: ${data.main.humidity}%</li>
      <li>Wind Speed: ${data.wind.speed} m/s</li>
    </ul>
  `;
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeatherByCity(city);
});

locBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      pos => getWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
      () => weatherOutput.innerHTML = "<p>Location access denied.</p>"
    );
  } else {
    weatherOutput.innerHTML = "<p>Geolocation not supported.</p>";
  }
});

