async function getWeather() {
    
    let api_url = getData()  // cia reik paduot data kad gaut udateintus duomenis, bet promise pyksta
    console.log('!!!!!!!!!!!!!!!!!!!' + api_url)
    const response = await fetch(api_url);
    const data = await response.json();


    console.log(data)

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
}

getWeather()

/* setInterval(getWeather, 50000) */


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var citiesJson = JSON.parse(xhttp.responseText);
        let select = document.querySelector('#cities');

        for (let i = 0; i < citiesJson.length; i++) {   
            let option = document.createElement('option');
            let toString = JSON.stringify(citiesJson[i])
            if(i == 0){
                 option.setAttribute('selected', 'selected')
            }    
            option.value = toString;
            option.innerHTML = citiesJson[i].name;
            
            select.appendChild(option);
        }
        
        
        select.setAttribute("onchange","getWeather()");


    }
};
xhttp.open("GET", "lt_city.json", true);
xhttp.send();

function getData(data){

    if(data != undefined){
        let val = document.querySelector('#cities').value;
        let obj = JSON.parse(val)
        let url = `http://api.openweathermap.org/data/2.5/weather?id=${obj.id}&APPID=9e5611ff118ef78fdef94d6d56582fa7`
        console.log('cia kita data')
        return url;
    }else if(data == undefined){
        let url = 'http://api.openweathermap.org/data/2.5/weather?id=598392&APPID=9e5611ff118ef78fdef94d6d56582fa7'
        console.log('cia default')
        return url
    }
    
}




