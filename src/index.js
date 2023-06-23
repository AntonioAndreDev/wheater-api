const urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=rio%20branco&lang=pt&appid=8e5c7d9600f1f4c9a13bba5e6777ce6b&units=metric";

async function getWeather() {
  const req = await fetch(urlWeather);
  const res = await req.json();
  renderData(res);
}

async function getCoutries(codeCountry) {
  const urlCoutries = `https://restcountries.com/v3.1/alpha/${codeCountry}`;
  const req = await fetch(urlCoutries);
  const res = await req.json();
  renderImage(res);

  // document.querySelector("#infos").appendChild(image);
}

function renderImage(dataOfCountry) {
  console.log(dataOfCountry[0].flags.svg);
}

function renderData(city) {
  const currentTemp = city.main.temp;
  console.log("Temperatura atual: " + Math.round(currentTemp));
  const minTemp = city.main.temp_min;
  console.log("Temperatura minima: " + minTemp);
  const maxTemp = city.main.temp_max;
  console.log("Temperatura maxima: " + maxTemp);
  const feelsLike = city.main.feels_like;
  console.log(`Sensação termica: ${feelsLike}`);

  const country = city.sys.country;
  console.log(`Código do páis: ${country}`);
  getCoutries(country);

  const windSpeed = Math.round(city.wind.speed * 3.6);
  if (windSpeed === 0) console.log(`Não há vento agora.`);
  else console.log("Velocidade do vento: " + windSpeed + "km/h");

  const visibility = city.visibility;
  console.log("Visibilidade: " + visibility);

  const icon = city.weather[0].icon;
  console.log("Codigo do Icone: " + icon);
  const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  const imageIcon = document.createElement("img");
  imageIcon.src = iconURL;
  document.querySelector("#infos").appendChild(imageIcon);

  const descriptionOfWeather = city.weather[0].description;
  console.log("Descrição do tempo: " + _.startCase(descriptionOfWeather));

  const cityName = city.name;
  console.log(`Cidade: ${cityName}. País: ${country}`);

  const timestampSunrise = city.sys.sunrise;
  const sunrise = new Date(timestampSunrise * 1000);
  let hoursSunrise = sunrise.getHours();
  let minutesSunrise = sunrise.getMinutes();
  if (hoursSunrise >= 1 && hoursSunrise <= 9) hoursSunrise = `0${hoursSunrise}`;
  if (minutesSunrise >= 1 && minutesSunrise <= 9) minutesSunrise = `0${minutesSunrise}`;
  console.log(`${hoursSunrise}:${minutesSunrise}`);
  // document.querySelector("#infos").appendChild(createTemp);
}

getWeather();
