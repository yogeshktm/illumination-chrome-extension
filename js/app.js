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
          let weatherState = response[0].weather_state_abbr;
          console.log(weatherState);
          
          let tText = "It will be thunder and rainy today. Keep yourself warm";
          let snText = "Snowy Goovy day";
          let slText = "Chance for a snowy rain";
          let hText = "Careful Pellets of rain may fall"
          let hrText = "Chance for heavy rain. did you bring your umberlla today ?";
          let lrText = "Light Drizzles. Enjoy the climate";
          let sText = "Chance for showers today";
          let cText = "Its clear sky. suryan koluthifying";
          let cdText = "Cloudy howdy day";
          
          const setWeatherState = function(state){
            switch(state){
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
          imageElement.setAttribute('src',fullImgSrc);
        }
      }
      xhr.open('GET', endPoint);
      xhr.send();
  };
  
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
    console.log(d);
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
getWeather();
setTime();
setBgImage();

};




