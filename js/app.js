window.onload = function() {
  const getWeather = function(){
    const url = "https://www.metaweather.com/api/location/";
    const woeid = "2295424";
    const date = "";
    const endPoint = url + woeid + '/' ;
    const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          let response = xhr.response.consolidated_weather;
          console.log(xhr.response);
          let structeredResponse = JSON.stringify(response).replace(/,/g, ", \n");
          let imgSrc = 'https://www.metaweather.com/static/img/weather/png/64/';
          let currentWeather;
          let printWeather = document.getElementById('weatherText');
          let imageElement = document.getElementById('weatherImage');
          let allWeatherStateArray = [];
          allWeatherStateArray.push(response[0].weather_state_abbr,response[1].weather_state_abbr,response[2].weather_state_abbr,response[3].weather_state_abbr,response[4].weather_state_abbr
          ,response[5].weather_state_abbr);
          
          if(allWeatherStateArray.toString().match(/t/g).length >= 3){
            weatherState = 't';
            currentWeather = "It will be thunder and rainy today. Keep yourself warm";
          }
          else if(allWeatherStateArray.toString().match(/sn/g).length >= 3){
            weatherState = 't';
            currentWeather = "Snowy Goovy day";
          }
          else if(allWeatherStateArray.toString().match(/sn/g).length >= 3){
            weatherState = 'hr';
            currentWeather = "Chance for heavy rain. did you bring your umberlla today ?";
          }
          else if(allWeatherStateArray.toString().match(/lr/g).length >= 3){
            weatherState = 'lr';
            currentWeather = "Light Drizzles. Enjoy the climate";
          }
          else if(allWeatherStateArray.toString().match(/c/g).length >= 3){
            weatherState = 'c';
            currentWeather = "Its clear sky. suryan koluthifying";
          }
          else if(allWeatherStateArray.toString().match(/lc/g).length >= 3){
            weatherState = 'lc';
            currentWeather = "Cloudy howdy day";
          }
          else if(allWeatherStateArray.toString().match(/hc/g).length >= 3){
            weatherState = 'hc';
            currentWeather = "Cloudy howdy day";
          }
          let fullImgSrc = imgSrc + weatherState + '.png';
          document.getElementById('weatherText').innerHTML = currentWeather;
          imageElement.setAttribute('src',fullImgSrc);
        }
      }
      xhr.open('GET', endPoint);
      xhr.send();
  };
  
  const setBackground = function(){
    let bgColors = ['#03a9f4','#f44336','#ff9800','#607d8b'];
    let min= 1; 
    let max= 4;  
    let random = Math.round(Math.random() * (+max - +min) + +min); 
    document.getElementById('body').style.background = bgColors[random];
  }
  
  const setTime = function(){
    let d = new Date().toLocaleTimeString(); // for now
    console.log(d);
    document.getElementById('time').innerHTML = d;
  }
  
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
  
  const getBgImage = function(){
    document.getElementById('body').style.backgroundImage = 'url("https://picsum.photos/1920/833/?random")' ;
  }


checkBg();
getWeather();
setTime();
setBgImage();

};




