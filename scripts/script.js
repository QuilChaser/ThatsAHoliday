// The Holiday API
// https://www.abstractapi.com/holidays-api

// The Image api
// https://www.pexels.com/api/documentation/#authorization

function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
        callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}

var url = "https://holidays.abstractapi.com/v1/?api_key=effdd4458cac464698cb3c7c9eb78893&country=US&year=2020&month=12&day=25"

// httpGetAsync(url)


document.getElementById("submit").addEventListener("click", function(event) {
  event.preventDefault();
  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  if (day === "" ||  month === "" || year === "")
    return;

  const months_w_30_days = ['4', '6', '5', '9', '11'];

  if (month === 28 && day > 28) {
    console.error("February only has 28 days this year.");
    return;
  }
  if (months_w_30_days.includes(month) && day === 31) {
    console.error("That month only has 30 days.");
    return;
  }


  console.log(day + month + year);
  const url = "https://holidays.abstractapi.com/v1/?api_key=effdd4458cac464698cb3c7c9eb78893&country=US&year=" + year + "&month=" + month + "&day=" + day;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
    });

    // document.getElementById("results").style.display = "flex";
});
