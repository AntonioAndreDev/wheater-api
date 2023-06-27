async function getWeather(city) {
  const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt&appid=8e5c7d9600f1f4c9a13bba5e6777ce6b&units=metric`;
  const req = await fetch(urlWeather);
  const res = await req.json();
  renderData(res);
}

async function getCoutries(codeCountry) {
  const urlCoutries = `https://restcountries.com/v3.1/alpha/${codeCountry}`;
  const req = await fetch(urlCoutries);
  const res = await req.json();
  renderImage(res);
}

function renderImage(dataOfCountry) {
  console.log(dataOfCountry[0].flags.svg);
  const countryHTML = document.getElementById("country");
  countryHTML.src = dataOfCountry[0].flags.svg;
}

function renderData(city) {
  const dataHTML = document.getElementsByClassName("visibilityToggle");
  for (let i = 0; i < dataHTML.length; i++) {
    dataHTML[i].style.display = "inline";
  }

  const curTemp = document.getElementById("curTemp");
  const currentTemp = city.main.temp;
  curTemp.innerText = `${Math.round(currentTemp)}°`;
  // console.log("Temperatura atual: " + Math.round(currentTemp));

  const min = document.getElementById("min");
  const minTemp = city.main.temp_min;
  min.innerText = `${Math.round(minTemp)}°`;
  console.log("Temperatura minima: " + minTemp);

  const maxHTML = document.getElementById("max");
  const maxTemp = city.main.temp_max;
  maxHTML.innerText = `${Math.round(maxTemp)}°`;
  console.log("Temperatura maxima: " + maxTemp);

  const feelsLike = city.main.feels_like;
  console.log(`Sensação termica: ${feelsLike}`);

  const country = city.sys.country;
  console.log(`Código do páis: ${country}`);
  getCoutries(country);

  const humidity = city.main.humidity;
  const humidityHTML = document.getElementById("humidity");
  humidityHTML.innerText = `${humidity}%`;

  const wind = document.getElementById("wind");
  const windSpeed = Math.round(city.wind.speed * 3.6);
  if (windSpeed === 0) wind.innerText = "Não há vento agora";
  else wind.innerText = `${windSpeed}km/h`;

  const visibilityHTML = document.getElementById("visibility");
  const visibility = city.visibility;
  console.log(visibility);
  visibilityHTML.innerText = `${visibility / 1000}km`;

  const iconHTML = document.getElementById("icon");
  const icon = city.weather[0].icon;
  console.log("Codigo do Icone: " + icon);
  const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  iconHTML.src = iconURL;

  const descWeather = document.getElementById("descriptionWeather");
  const descriptionOfWeather = city.weather[0].description;
  descWeather.innerText = _.startCase(descriptionOfWeather);
  // console.log("Descrição do tempo: " + _.startCase(descriptionOfWeather));

  const cityName = city.name;
  console.log(`Cidade: ${cityName}. País: ${country}`);

  const timestampSunrise = city.sys.sunrise;
  const sunrise = new Date(timestampSunrise * 1000);
  let hoursSunrise = sunrise.getHours();
  let minutesSunrise = sunrise.getMinutes();
  if (hoursSunrise >= 1 && hoursSunrise <= 9) hoursSunrise = `0${hoursSunrise}`;
  if (minutesSunrise >= 1 && minutesSunrise <= 9) minutesSunrise = `0${minutesSunrise}`;
  const sunriseHTML = document.getElementById("sunrise");
  sunriseHTML.innerText = `${hoursSunrise}:${minutesSunrise}`;
  console.log(`${hoursSunrise}:${minutesSunrise}`);

  const timestampSunset = city.sys.sunset;
  const Sunset = new Date(timestampSunset * 1000);
  let hoursSunset = Sunset.getHours();
  let minutesSunset = Sunset.getMinutes();
  if (hoursSunset >= 1 && hoursSunset <= 9) hoursSunset = `0${hoursSunset}`;
  if (minutesSunset >= 1 && minutesSunset <= 9) minutesSunset = `0${minutesSunset}`;
  const sunsetHTML = document.getElementById("sunset");
  sunsetHTML.innerText = `${hoursSunset}:${minutesSunset}`;
  console.log(`${hoursSunset}:${minutesSunset}`);
}

const searchIcon = document.getElementById("searchIcon");
searchIcon.addEventListener("click", () => {
  let city = document.getElementById("inputCity");
  getWeather(city.value);
});

const input = document.getElementById("inputCity");
input.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    let city = document.getElementById("inputCity");
    getWeather(city.value);
  }
});
