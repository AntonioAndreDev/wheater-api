function showLoading() {
  const loadingElement = document.getElementById("loading");
  const loaderElement = document.getElementById("loader");
  loadingElement.style.display = "flex";
  loaderElement.style.display = "flex";
}

function hideLoading() {
  const loadingElement = document.getElementById("loading");
  const loaderElement = document.getElementById("loader");
  loadingElement.style.display = "none";
  loaderElement.style.display = "none";
}

async function getWeather(city) {
  try {
    showLoading();
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt&appid=8e5c7d9600f1f4c9a13bba5e6777ce6b&units=metric`;
    const req = await fetch(urlWeather);
    if (!req.ok) {
      throw new Error(`Por favor insira uma cidade válida. Por exemplo: Rio Branco`);
    }
    const res = await req.json();
    renderData(res);
  } catch (error) {
    alert("Ocorreu um erro! " + error.message);
  } finally {
    hideLoading();
  }
}

async function getCoutries(codeCountry) {
  try {
    showLoading();
    const urlCountries = `https://restcountries.com/v3.1/alpha/${codeCountry}`;
    const req = await fetch(urlCountries);
    if (!req.ok) {
      throw new Error("Erro ao bandeira do país");
    }
    const res = await req.json();
    renderImage(res);
  } catch (error) {
    alert("Ocorreu um erro: " + error.message);
  } finally {
    hideLoading();
  }
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
}

const searchIcon = document.getElementById("searchIcon");
searchIcon.addEventListener("click", () => {
  let city = document.getElementById("inputCity");
  getWeather(city.value);
  city.blur();
});

const input = document.getElementById("inputCity");
input.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    let city = document.getElementById("inputCity");
    getWeather(city.value);
    city.blur();
  }
});
