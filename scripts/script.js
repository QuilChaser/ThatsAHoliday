// The Holiday API
// https://www.abstractapi.com/holidays-api

// The Image api
// https://www.pexels.com/api/documentation/#authorization

const month_list = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function updateResults(holidayJson) {
  let results = "";
  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  if (holidayJson.length === 0) { // There is no holidays
    results += `<h2>There is no holiday on ${day}/${month}/${year}</h2>`;
    document.getElementById("results").innerHTML = results;
    return;
  }

  results += `<h2>Holidays on ${holidayJson[0].week_day}, ${day} ${month_list[month]} ${year} in the US:</h2>`;
  for (let i = 0; i < holidayJson.length; i++) {
    results += "<div class='holiday'>";
    results += `<h3>${holidayJson[i].name}</h3>`;
    results += `<h4>Recognized because of: ${holidayJson[i].name}</h4>`;
    results += "</div>";
  }
  document.getElementById("results").innerHTML = results;
}

// httpGetAsync(url)


document.getElementById("submit").addEventListener("click", function(event) {
  event.preventDefault();
  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  if (day === "" || month === "" || year === "")
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
