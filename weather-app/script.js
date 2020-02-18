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
        /* visibility, */
        wind
    } = data;
    document.querySelector("#city").textContent = name;
    document.querySelector("#weather").textContent = weather[0].description;
    document.querySelector("#country").textContent = sys.country;
    document.querySelector("#temp").textContent = Math.round(main.temp * 0.1);
    document.querySelector("#feels_like").textContent = Math.round(main.feels_like);
    document.querySelector("#humidity").textContent = main.humidity;
    /* document.querySelector("#visibility").textContent = visibility; */
    document.querySelector("#wind_speed").textContent = wind.speed;
    document.querySelector("#pressure").textContent = main.pressure;

    let icon = document.querySelector('#weather_icon');
    let iconClass = icon.classList;


    /* NEEDS REFACTORING -------------------------------------------------------------*/

    if (weather[0].description == 'broken clouds' || weather[0].description == 'scattered clouds' || weather[0].description == 'few clouds' || weather[0].description == 'debesuota su pragiedruliais') {
        iconClass.value = ''
        icon.classList.add('fas')
        icon.classList.add('fa-cloud-sun')

    } else if (weather[0].description == 'heavy rain' || weather[0].description == 'lietus') {
        iconClass.value = ''
        icon.classList.add('fas')
        icon.classList.add('fa-cloud-showers-heavy')
    } else if (weather[0].description == 'overcast clouds' || weather[0].description == 'debesuota') {
        iconClass.value = ''
        icon.classList.add('fas')
        icon.classList.add('fa-cloud')
    } else if (weather[0].description == 'light rain' || weather[0].description == 'light intensity shower rain' || weather[0].description == 'lengvas lietus' || weather[0].description == 'mažo intensyvumo lietus') {
        iconClass.value = ''
        icon.classList.add('fas')
        icon.classList.add('fa-cloud-sun-rain')
    } else if (weather[0].description == 'clear sky') {
        iconClass.value = ''
        icon.classList.add('fas')
        icon.classList.add('fa-sun')

    } else {
        iconClass.value = ''
    }


    /* NEEDS REFACTORING -------------------------------------------------------------*/

    getDate();
}


function languageChange(current) {
    let element = document.querySelector(`.${current}`)
    element.classList.add('activeLanguage')
    if (current == 'lt') {
        element.classList.add('activeLanguage')
        document.querySelector('.en').classList.remove('activeLanguage')
        getWeather('x') //lt
    } else if (current == 'en') {
        element.classList.add('activeLanguage')
        document.querySelector('.lt').classList.remove('activeLanguage')
        getWeather('x') //en
    }

}

function unitChange(current) {
    let element = document.querySelector(`.${current}`)
    element.classList.add('activeUnits')
    if (current == 'f') {
        element.classList.add('activeUnits')
        document.querySelector('.c').classList.remove('activeUnits')
        getWeather('x') // Fahrenheit
    } else if (current == 'c') {
        element.classList.add('activeUnits')
        document.querySelector('.f').classList.remove('activeUnits')
        getWeather('x') // Metric
    }
}

getWeather();

setInterval(function() {
    getWeather('x')
}, 1000);

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


function getData(x) {
    if (x != undefined) {
        let valCity = document.querySelector("#cities").value;
        let obj = JSON.parse(valCity);
        let language = document.querySelector('.activeLanguage').value;
        let units = document.querySelector('.activeUnits').value;
        let url = `http://api.openweathermap.org/data/2.5/weather?id=${obj.id}&APPID=9e5611ff118ef78fdef94d6d56582fa7&units=${units}&lang=${language}`;
        return url;
    } else if (x == undefined) {
        let url =
            "http://api.openweathermap.org/data/2.5/weather?id=598392&APPID=9e5611ff118ef78fdef94d6d56582fa7&units=metric&lang=lt";
        return url;
    }
}




function popup() {
    document.querySelector('.xpopup').classList.toggle('disable')
}


function getDate() {
    let day = new Date()
    let h = day.getHours()
    let m = day.getMinutes()
    let lang = document.querySelector('.activeLanguage').value
    if (h > 10 && m > 10) {
        document.querySelector('.day_time').textContent = h + ':' + m;
    } else if (h < 10 && m > 10) {
        document.querySelector('.day_time').textContent = '0' + h + ':' + m;
    } else if (h > 10 && m < 10) {
        document.querySelector('.day_time').textContent = h + ':' + '0' + m;
    } else if (h < 10 && m < 10) {
        document.querySelector('.day_time').textContent = '0' + h + ':' + '0' + m;
    }




    /* NEEDS REFACTORING -------------------------------------------------------------*/



    if (day.getDay() == 1) {
        let a = 'Monday'
        let b = 'Pirmadienis'
        if (lang == 'en') {
            document.querySelector('.week_day').textContent = a;
        } else {
            document.querySelector('.week_day').textContent = b;
        }
    } else if (day.getDay() == 2) {
        let a = 'Tuesday'
        let b = 'Antradienis'
        if (lang == 'en') {
            document.querySelector('.week_day').textContent = a;
        } else {
            document.querySelector('.week_day').textContent = b;
        }
    } else if (day.getDay() == 3) {
        let a = 'Wednesday'
        let b = 'Trečiadienis'
        if (lang == 'en') {
            document.querySelector('.week_day').textContent = a;
        } else {
            document.querySelector('.week_day').textContent = b;
        }
    } else if (day.getDay() == 4) {
        let a = 'Thursday'
        let b = 'Ketvirtadienis'
        if (lang == 'en') {
            document.querySelector('.week_day').textContent = a;
        } else {
            document.querySelector('.week_day').textContent = b;
        }
    } else if (day.getDay() == 5) {
        let a = 'Friday'
        let b = 'Penktadienis'
        if (lang == 'en') {
            document.querySelector('.week_day').textContent = a;
        } else {
            document.querySelector('.week_day').textContent = b;
        }
    } else if (day.getDay() == 6) {
        let a = 'Saturday'
        let b = 'Šeštadienis'
        if (lang == 'en') {
            document.querySelector('.week_day').textContent = a;
        } else {
            document.querySelector('.week_day').textContent = b;
        }
    } else if (day.getDay() == 7) {
        let a = 'Sunday'
        let b = 'Sekmadienis'
        if (lang == 'en') {
            document.querySelector('.week_day').textContent = a;
        } else {
            document.querySelector('.week_day').textContent = b;
        }
    }

    if (lang == 'en') {
        document.querySelector('.humidity_text').textContent = 'Humidity';
        document.querySelector('.wind_speed_text').textContent = 'Wind speed';
        document.querySelector('.pressure_text').textContent = 'Pressure';
        /* document.querySelector('.visibility_text').textContent = 'Visibility'; */
        document.querySelector('.feels_like_text').textContent = 'Feels like';

        document.querySelector('.footer_link_api').textContent = 'API';
        document.querySelector('.footer_link_other').textContent = 'Other projects';
        document.querySelector('.footer_link_contact').textContent = 'Contacts';



        document.querySelector('.pupup_title').textContent = 'Info';
        document.querySelector('.pupup_text_link').textContent = 'API used:';
        document.querySelector('.pupup_text_me').textContent = 'This page was created by Ignas Veleckis';



    } else {
        document.querySelector('.humidity_text').textContent = 'Drėgmė';
        document.querySelector('.wind_speed_text').textContent = 'Vėjo greitis';
        document.querySelector('.pressure_text').textContent = 'Slėgis';
        /* document.querySelector('.visibility_text').textContent = 'Matomumas'; */
        document.querySelector('.feels_like_text').textContent = 'Juntama temperatūra';



        document.querySelector('.footer_link_api').textContent = 'API';
        document.querySelector('.footer_link_other').textContent = 'Kiti projektai';
        document.querySelector('.footer_link_contact').textContent = 'Kontaktai';


        document.querySelector('.pupup_title').textContent = 'Informacija';
        document.querySelector('.pupup_text_link').textContent = 'Naudojamas API:';
        document.querySelector('.pupup_text_me').textContent = 'Šį puslapį kūrė Ignas Veleckis';

    }
}

/* NEEDS REFACTORING -------------------------------------------------------------*/