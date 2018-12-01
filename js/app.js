window.onload = function() {
    //GET Current Location
    const getCurrentLocation = function(p) {
        const latitude = p.coords.latitude;
        const longitude = p.coords.longitude;
        // GETTING LAT AND LON AND MAKE REQUEST GET woeid OF CITY 
        // changing the XMLHttpRequest to Fetch_API as promise (For 2 API calls)
        fetch('https://www.metaweather.com/api/location/search/?lattlong=' + latitude + ',' + longitude)
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject({
                        status: response.status,
                        statusText: response.statusText
                    });
                }
            })
            .then(function(data) {
                console.log('success', data);
                // GOT woeid AND AGAIN CALL THAT ENDPOINT WITH woeid TO GET consolidated_weather
                return fetch('https://www.metaweather.com/api/location/' + data[0]['woeid']);
            })
            .then(function(response) {
                return response.json();
            })
            .then(function(lastReport) {
                let response = lastReport.consolidated_weather;
                let structeredResponse = JSON.stringify(response).replace(/,/g, ", \n");
                let imgSrc = 'https://www.metaweather.com/static/img/weather/png/64/';
                let currentWeather;
                let printWeather = document.getElementById('weatherText');
                let imageElement = document.getElementById('weatherImage');
                let weatherState = response[0].weather_state_abbr;

                let tText = "It will be thunder and rainy today. Keep yourself warm";
                let snText = "Snowy Goovy day";
                let slText = "Chance for a snowy rain";
                let hText = "Careful Pellets of rain may fall"
                let hrText = "Chance for heavy rain. did you bring your umberlla today ?";
                let lrText = "Light Drizzles. Enjoy the climate";
                let sText = "Chance for showers today";
                let cText = "Its clear sky. suryan koluthifying";
                let cdText = "Cloudy howdy day";

                const setWeatherState = function(state) {
                    switch (state) {
                        case 'sn':
                            currentWeather = snText;
                            break;
                        case 't':
                            currentWeather = tText;
                            break;
                        case 'sl':
                            currentWeather = slText;
                            break;
                        case 'h':
                            currentWeather = hText;
                            break;
                        case 'hr':
                            currentWeather = hrText;
                            break;
                        case 'lr':
                            currentWeather = lrText;
                            break;
                        case 's':
                            currentWeather = sText;
                            break;
                        case 'c':
                            currentWeather = cText;
                            break;
                        case 'lc':
                            currentWeather = cdText;
                            break;
                        case 'hc':
                            currentWeather = cdText;
                            break;
                    }
                }
                setWeatherState(weatherState);
                let fullImgSrc = imgSrc + weatherState + '.png';
                document.getElementById('weatherText').innerHTML = currentWeather;
                imageElement.setAttribute('src', fullImgSrc);
            })
            .catch(function(error) {
                console.log('error', error);
            });
    }    
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
  
  // SET BACKGORUND COLOR 
  const setBackground = function(){
    let bgColors = ['#03a9f4','#f44336','#ff9800','#607d8b'];
    let min= 1; 
    let max= 4;  
    let random = Math.round(Math.random() * (+max - +min) + +min); 
    document.getElementById('body').style.background = bgColors[random];
  }
  
  // SET TIME 
  const setTime = function(){
    let d = new Date().toLocaleTimeString(); // for now
    // console.log(d);
    document.getElementById('time').innerHTML = d;
  }
  
  // CHECK BACKGROUND IMAGE OPTED FROM localstorage value
  const checkBg = function(){
    let isBgImageOpted = localStorage.getItem('bgImage');
    let bgInput = document.getElementById('bg-check');
    if(isBgImageOpted === 'yes'){
       bgInput.checked = true;
       getBgImage();
    }
    else{
      bgInput.checked = false;
      setBackground();
    }
  }
  
  // SET BACKGROUND IMAGE 
  const setBgImage = function(){
    let bgInput = document.getElementById('bg-check');
    bgInput.addEventListener('change', (event) => {
      if (event.target.checked) {
        localStorage.setItem("bgImage", "yes");
        getBgImage();
      }
      else{
        localStorage.removeItem("bgImage");
        setBackground();
      } 
    })
  }
  
  // GET BACKGROUND IMAGE FROM PICSUM 
  const getBgImage = function(){
    document.getElementById('body').style.backgroundImage = 'url("https://picsum.photos/1920/833/?random")' ;
  }
  
checkBg();
setTime();
setBgImage();
};




