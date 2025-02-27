document.getElementById("buttonGetWeather").addEventListener("click", function() {
  let inputCityNameElement = document.getElementById("inputCityName");
  let inputLatitudeElement = document.getElementById("inputLatitude");
  let inputLongitudeElement = document.getElementById("inputLongitude");
  let errorMessageElement = document.getElementById("errorMessage");
  let weatherResultElement = document.getElementById("weatherResult");
  let weatherCityNameElement = document.getElementById("weatherCityName");
  let weatherTemperatureElement = document.getElementById("weatherTemperature");
  let weatherHumidityElement = document.getElementById("weatherHumidity");
  let weatherWindSpeedElement = document.getElementById("weatherWindSpeed");
  let weatherPressureElement = document.getElementById("weatherPressure");
  let weatherUVIndexElement = document.getElementById("weatherUVIndex");
  let weatherIconElement = document.getElementById("weatherIcon");
  let loadingIndicatorElement = document.getElementById("loadingIndicator");
  let weatherWidgetContainer = document.getElementById("weatherWidgetContainer");

  errorMessageElement.style.display = "none";
  weatherResultElement.style.display = "none";
  loadingIndicatorElement.style.display = "block";

  let queryParameter = "";
  if (inputCityNameElement.value.trim() !== "") {
    queryParameter = inputCityNameElement.value.trim();
  } else if (inputLatitudeElement.value.trim() !== "" && inputLongitudeElement.value.trim() !== "") {
    queryParameter = inputLatitudeElement.value.trim() + "," + inputLongitudeElement.value.trim();
  } else {
    loadingIndicatorElement.style.display = "none";
    errorMessageElement.textContent = "Пожалуйста, введите название города или координаты (широта и долгота).";
    errorMessageElement.style.display = "block";
    return;
  }

  let weatherApiKey = "c9fedc81b8c84d7395d140549252702";
  let weatherApiUrl = "https://api.weatherapi.com/v1/current.json?key=" + weatherApiKey + "&q=" + encodeURIComponent(queryParameter) + "&lang=ru";

  let xhrWeatherRequest = new XMLHttpRequest();
  xhrWeatherRequest.open("GET", weatherApiUrl, true);
  xhrWeatherRequest.onreadystatechange = function() {
    if (xhrWeatherRequest.readyState === 4) {
      loadingIndicatorElement.style.display = "none";
      if (xhrWeatherRequest.status === 200) {
        try {
          let weatherData = JSON.parse(xhrWeatherRequest.responseText);
          weatherCityNameElement.textContent = "Город: " + weatherData.location.name;
          weatherTemperatureElement.textContent = "Температура: " + weatherData.current.temp_c + " °C";
          weatherHumidityElement.textContent = "Влажность: " + weatherData.current.humidity + " %";
          weatherWindSpeedElement.textContent = "Скорость ветра: " + weatherData.current.wind_kph + " км/ч";
          weatherPressureElement.textContent = "Давление: " + weatherData.current.pressure_mb + " мм рт. ст.";
          weatherUVIndexElement.textContent = "УФ-индекс: " + weatherData.current.uv;
          weatherIconElement.src = weatherData.current.condition.icon;
          weatherIconElement.alt = weatherData.current.condition.text;
          weatherResultElement.style.display = "block";

          let conditionText = weatherData.current.condition.text.toLowerCase();
          let currentTemperature = weatherData.current.temp_c;

        } catch (parsingError) {
          errorMessageElement.textContent = "Ошибка обработки данных от сервера.";
          errorMessageElement.style.display = "block";
        }
      } else {
        errorMessageElement.textContent = "Ошибка получения данных. Проверьте введенные данные или попробуйте позже.";
        errorMessageElement.style.display = "block";
      }
    }
  };

  xhrWeatherRequest.onerror = function() {
    loadingIndicatorElement.style.display = "none";
    errorMessageElement.textContent = "Ошибка соединения. Проверьте ваше интернет-соединение.";
    errorMessageElement.style.display = "block";
  };

  xhrWeatherRequest.send();
});
