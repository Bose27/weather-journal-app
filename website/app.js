/* Global Variables */
let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "8313a64fdf0f324a625ea7639a1215fe";
let country = "US";

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Container where the data will be updated on the UI
const containerDiv = document.querySelector("#entryHolder");

var el = document.querySelector("#generate");
document.addEventListener("DOMContentLoaded", function () {
  el.addEventListener("submit", performAction, false);
});

function performAction(e) {
  const zip = document.querySelector("#zip").value;
  const userInput = document.querySelector("#feelings").value;
  getWeather(baseURL, zip, apiKey)
    .then(function (data) {
      //add data to post request
      postData("/addWeather", {
        temp: data.main.temp,
        userInput: userInput,
        date: newDate,
      });
    })
    .then(() => updateUI());
}

const getWeather = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + ",us&appid=" + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.querySelector("#temp").innerHTML = "Temperature: " + allData.temp;
    document.querySelector("#content").innerHTML = "Feelings: " + allData.input;
    document.querySelector("div#date").innerHTML = "Date: " + allData.date;
  } catch (error) {
    console.log("error", error);
  }
};

function init() {
  // Clear forms here
  document.getElementById("user").value = "";
}
window.onload = init;
