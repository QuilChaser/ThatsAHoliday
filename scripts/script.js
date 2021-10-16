// The Holiday API
// https://www.abstractapi.com/holidays-api

// The Image api
// https://www.pexels.com/api/documentation/#authorization

const month_list = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

import createClient from '/pexels/src/createClient.ts';

const client = createClient('563492ad6f91700001000001baf98844f777467692cd3fc4ccd23ad8');

function updateResults(holidayJson, imageJson) {
  let results = "";
  const day = document.getElementById("day").value;
  const month = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  if (holidayJson.length === 0) { // There is no holidays
    results += `<h2>There is no holiday on ${day}/${month}/${year}</h2>`;
    document.getElementById("results").innerHTML = results;
    return;
  }

  results += `<h2>Holidays on ${holidayJson[0].week_day}, ${day} ${month_list[parseInt(month)]} ${year} in the US:</h2>`;
  for (let i = 0; i < holidayJson.length; i++) {
    results += "<div class='holiday'>";
    results += `<h3>${holidayJson[i].name}</h3>`;
    results += `<h4>Recognized because of: ${holidayJson[i].name}</h4>`;
    results += "</div>";
  }
  document.getElementById("results").innerHTML = results;
}

async function getHolidaysAndImages(event) {
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

  const url = "https://holidays.abstractapi.com/v1/?api_key=effdd4458cac464698cb3c7c9eb78893&country=US&year=" + year + "&month=" + month + "&day=" + day;

  let response = await fetch(url);
  let json = await response.json;
  console.log(json);

  // Get images for the holidays
  let imageResults = []
  while (json.length != imageResults.length) {
    let holidayName = json[imageResults.length].name;
    const query = holidayName;
    let photos = "";
    try {
      let photos = await client.photos.search({ query, per_page: 1 });
      imageResults.append(photos);
    }
    catch {
      imageResults.append("");
    }
  }
  console.log(imageResults);
  updateResults(json, imageResults);
}

// httpGetAsync(url)



document.getElementById("submit").addEventListener("click", getHolidaysAndImages);
