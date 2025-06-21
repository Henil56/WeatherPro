const locationButton = document.getElementById("getlocation");
const searchButton = document.getElementById("searchButton");
const input = document.getElementById("city");
const cityname = document.getElementById("cname");
const cityTime = document.getElementById("ctime");
const cityTemp = document.getElementById("ctemp");
const searchName = document.getElementById("sname");
const searchTime = document.getElementById("stime");
const searchTemp = document.getElementById("stemp");
const searchfeelTemp = document.getElementById("sftemp");
const cityfeelTemp = document.getElementById("cftemp");

async function getData(lat, long) {
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=c7a3e596210441a2b4e202719250404&q=${lat},${long}&aqi=yes`);
    return await promise.json();
}

async function getDataByCity(cityname) {
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=c7a3e596210441a2b4e202719250404&q=${cityname}&aqi=yes`);
    return await promise.json();
}

async function pass(position) {
    const result = await getData(position.coords.latitude, position.coords.longitude);
    cityname.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
    cityTime.innerText ="Current Time : "+ result.location.localtime;
    cityTemp.innerText ="Current Temperature : "+ result.current.temp_c + " °C";
    cityfeelTemp.innerText="Feels-Like Temperature : "+result.current.feelslike_c+" °C";
}

function failed() {
    console.log("There was some issue retrieving your location.");
}

locationButton.addEventListener("click", async () => {
    navigator.geolocation.getCurrentPosition(pass, failed);
});

searchButton.addEventListener('click', async () => {
    const value = input.value;
    const result = await getDataByCity(value);
    searchName.innerText = `${result.location.name}, ${result.location.region} - ${result.location.country}`;
    searchTime.innerText = "Current Time : "+result.location.localtime;
    searchTemp.innerText ="Current Temperature : "+ result.current.temp_c + " °C";
    searchfeelTemp.innerText="Feels-Like Temperature : "+result.current.feelslike_c+" °C";
});