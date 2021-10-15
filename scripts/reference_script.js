// API Key: 65e5097fc146744c3150d0f16af9f546

let weather = 5;
let forecast_results = 5;

function showWeather(json) {
  weather = json;
  let results = "";
  results += '<h2>Weather in ' + json.name + "</h2>"
  results += '<h3 id="mainTemp">Currently: ' + Math.round(json.main.temp) + " &deg;F</h3>"
  results += '<h4>Feels like: ' + Math.round(json.main.feels_like) + " &deg;F</h4>"
  for (let i = 0; i < json.weather.length; i++) {
    results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
  }
  results += "<p>"
  for (let i = 0; i < json.weather.length; i++) {
    results += json.weather[i].description
    if (i !== json.weather.length - 1)
      results += ", "
  }
  results += "</p>";
  results += "<h5>More Info:</h5>";
  results += "<p>High: " + Math.round(json.main.temp_max) + " &deg;F</hp>";
  results += "<p>Low:  " + Math.round(json.main.temp_min) + " &deg;F</hp>";
  results += "<p>Sunrise: " + moment.unix(weather.sys.sunrise).format("h:mm a") + "</p>";
  results += "<p>Sunset:  " + moment.unix(weather.sys.sunset).format("h:mm a") + "</p>";
  document.getElementById("weatherResults").innerHTML = results;
}

function showForcast(json) {
  forecast_results = json;
  let forecast = "<h2 class='forecastPlace'>5 Day Forecast for " + json.city.name + "</h2>";
  forecast += "<div class='forecastDay row'>";
  forecast += "<h3 class='col-md-12'>" + moment(json.list[0].dt_txt).format('MMMM Do YYYY') + "</h3>";
  let day = json.list[0].dt_txt.slice(0, 10);
  for (let i = 0; i < (json.list.length); i++) {
    // Decide if it is a new day of data or not.
    if (day != json.list[i].dt_txt.slice(0, 10)) {
      forecast += "</div><div class='forecastDay row'>";
      forecast += "<h3 class='col-sm-12'>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY') + "</h3>";
      day = json.list[i].dt_txt.slice(0, 10);
    }
    forecast += "<div class='forecast_time col-3'>";
    forecast += "<h4>" + moment(json.list[i].dt_txt).format('h:mm a') + "</h4>";
    forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'

    forecast += "<h5>" + Math.round(json.list[i].main.temp) + " &deg;F</h5>";
    forecast += "<p>"
    for (let j = 0; j < json.list[i].weather.length; j++) {
      forecast += json.list[i].weather[j].description
      if (j !== json.list[i].weather.length - 1)
        forecast += ", "
    }
    forecast += "</p>";
    forecast += "<p>Feels Like: " + Math.round(json.list[i].main.feels_like) + " &deg;F</p>";
    forecast += "</div>";
  }
  forecast += "</div>";
  document.getElementById("forecastResults").innerHTML = forecast;
}

document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=65e5097fc146744c3150d0f16af9f546";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      showWeather(json);
      console.log(json);
    });

  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=65e5097fc146744c3150d0f16af9f546";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      showForcast(json);
      console.log(json);
    });
    document.getElementById("results").style.display = "flex";
});
