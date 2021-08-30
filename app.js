let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', function () {
    let searchInput = document.getElementById('searchInput');
    if (searchInput.value == '') {
        alert('Please Write a City Name');
        return false;
    } else {
        apis(searchInput.value);
    }
    // apis();
});

const apis = async (cityName) => {
    let keys = "60bbd59ec7556e88c0f6b5a2080aebaa";
    let res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys}`);
    let data = await res.json();
    loadUi(data);
}


const loadUi = (data) => {
    let locationCity = document.getElementById('location-city');
    locationCity.innerText = `City: ${data.name}, ${data.sys.country}`;

    tempDeg(data.main);
    tempRange(data.main);
    showLocalDate(data.dt);
    showTempareture(data.weather[0]);
}


const showLocalDate = x => {
    let locationDate = document.getElementById('location-date');
    let date = new Date(x * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();

    let formattedTime = 'Time: ' + hours + ':' + minutes.substr(-2);
    locationDate.innerText = formattedTime;
}

const showTempareture = (td) => {
    let temperatureType = document.getElementById('temperature-type');
    temperatureType.innerText = 'Weather: ' + td.description;
}

const tempDeg = (temp) => {
    let temperatureTemp = document.getElementById('temperature-temp');
    let totalTemp = temp.temp - 273.15;
    temperatureTemp.innerText = `Temp: ${totalTemp.toFixed(2)} deg `;
}

const tempRange = (tr) => {
    let temperatureRange = document.getElementById('temperature-range');
    let avgTemp = (tr.temp_max + tr.temp_min) / 2;
    let tempVal = avgTemp - 273.15;
    temperatureRange.innerText = `Avg Temp: ${tempVal.toFixed(2)} deg`;
}