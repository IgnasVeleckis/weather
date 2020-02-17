async function getWeather(x) {
    let api_url = getData(x);

    const response = await fetch(api_url);
    const data = await response.json();

    const {
        name,
        weather,
        sys,
        id,
        main,
        visibility,
        wind
    } = data;

    document.querySelector("#city").textContent = name;
    document.querySelector("#weather").textContent = weather[0].description;
    document.querySelector("#country").textContent = sys.country;
    document.querySelector("#temp").textContent = Math.round(main.temp * 0.1);
    document.querySelector("#feels_like").textContent = Math.round(main.feels_like);
    document.querySelector("#humidity").textContent = main.humidity;
    document.querySelector("#visibility").textContent = visibility;
    document.querySelector("#wind_speed").textContent = wind.speed;
    document.querySelector("#pressure").textContent = main.pressure;


    /* console.log(id); */

    /* fahrenheit to celsius formula
    (x°F − 32) × 5/9 */

    getDate();
}

getWeather();

setInterval(function() {
    getWeather('x')
}, 2000);

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var citiesJson = JSON.parse(xhttp.responseText);
        let select = document.querySelector("#cities");

        for (let i = 0; i < citiesJson.length; i++) {
            let option = document.createElement("option");
            let toString = JSON.stringify(citiesJson[i]);
            if (i == 0) {
                option.setAttribute("selected", "selected");
            }
            option.value = toString;
            option.innerHTML = citiesJson[i].name;
            select.appendChild(option);
        }
        select.setAttribute("onchange", "getWeather('x')");
    }
};
xhttp.open("GET", "lt_city.json", true);
xhttp.send();

function getData(data) {
    if (data != undefined) {
        let val = document.querySelector("#cities").value;
        let obj = JSON.parse(val);
        let url = `http://api.openweathermap.org/data/2.5/weather?id=${obj.id}&APPID=9e5611ff118ef78fdef94d6d56582fa7`;

        return url;
    } else if (data == undefined) {
        let url =
            "http://api.openweathermap.org/data/2.5/weather?id=598392&APPID=9e5611ff118ef78fdef94d6d56582fa7";
        return url;
    }
}


function getDate() {
    let day = new Date()
    let h = day.getHours()
    let m = day.getMinutes()


    if (h > 10 && m > 10) {
        document.querySelector('.day_time').textContent = h + ':' + m;
    } else if (h < 10 && m > 10) {
        document.querySelector('.day_time').textContent = '0' + h + ':' + m;
    } else if (h > 10 && m < 10) {
        document.querySelector('.day_time').textContent = h + ':' + '0' + m;
    } else if (h < 10 && m < 10) {
        document.querySelector('.day_time').textContent = '0' + h + ':' + '0' + m;
    }

    if (day.getDay() == 1) {
        let a = 'Monday'
        document.querySelector('.week_day').textContent = a;
    } else if (day.getDay() == 2) {
        let a = 'Tuesday'
        document.querySelector('.week_day').textContent = a;
    } else if (day.getDay() == 3) {
        let a = 'Wednesday'
        document.querySelector('.week_day').textContent = a;
    } else if (day.getDay() == 4) {
        let a = 'Thursday'
        document.querySelector('.week_day').textContent = a;
    } else if (day.getDay() == 5) {
        let a = 'Friday'
        document.querySelector('.week_day').textContent = a;
    } else if (day.getDay() == 6) {
        let a = 'Saturday'
        document.querySelector('.week_day').textContent = a;
    } else if (day.getDay() == 7) {
        let a = 'Sunday'
        document.querySelector('.week_day').textContent = a;
    }


}