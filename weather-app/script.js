const api_url = 'http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=9e5611ff118ef78fdef94d6d56582fa7'
async function getWeather() {
    const response = await fetch(api_url);
    const data = await response.json();

    const {
        name,
        weather,
        sys,
        id,
        main
    } = data

    document.querySelector('#city').textContent = name
    document.querySelector('#weather').textContent = weather[0].description
    document.querySelector('#country').textContent = sys.country;
    document.querySelector('#temp').textContent = main.temp
    document.querySelector('#feels_like').textContent = main.feels_like
    document.querySelector('#humidity').textContent = main.humidity

    console.log('country id: ' + id)




}

getWeather()

setInterval(getWeather, 50000)

fetch("./city.list.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
    })

function getCities() {

}