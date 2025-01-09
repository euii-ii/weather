const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c", // Replace with your OpenWeatherMap API key
    base: "https://api.openweathermap.org/data/2.5/",
  };
  
  const searchBox = document.querySelector(".search-box");
  const cityElement = document.querySelector(".city");
  const dateElement = document.querySelector(".date");
  const tempElement = document.querySelector(".temp");
  const weatherElement = document.querySelector(".weather");
  const hiLowElement = document.querySelector(".hi-low");
  const animationContainer = document.querySelector(".weather-animation");
  
  searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      getWeather(searchBox.value);
    }
  });
  
  function getWeather(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then((response) => response.json())
      .then(updateUI);
  }
  
  function updateUI(weather) {
    cityElement.textContent = `${weather.name}, ${weather.sys.country}`;
    dateElement.textContent = new Date().toLocaleDateString();
    tempElement.textContent = `${Math.round(weather.main.temp)}°c`;
    weatherElement.textContent = weather.weather[0].main;
    hiLowElement.textContent = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  
    updateAnimation(weather.weather[0].main.toLowerCase());
  }
  
 
  function updateAnimation(weatherCondition) {
    // Clear previous animation
    animationContainer.innerHTML = "";
  
    let animationElement;
  
    if (weatherCondition.includes("clear") || weatherCondition.includes("sun")) {
      console.log("Sunny Weather Detected");
      // Create Sun Animation
      animationElement = document.createElement("div");
      animationElement.className = "sun";
    } else if (weatherCondition.includes("cloud")) {
      console.log("Cloudy Weather Detected");
      // Create Cloud Animation
      animationElement = document.createElement("div");
      animationElement.className = "cloud";
    } else if (weatherCondition.includes("rain")) {
      console.log("Rainy Weather Detected");
      // Create Rain Animation
      animationElement = document.createElement("div");
      animationElement.className = "rain";
    }
  
    // Append Animation to Container
    if (animationElement) {
      animationContainer.appendChild(animationElement);
    } else {
      console.error("No animation matched for the given weather condition:", weatherCondition);
    }
  }
  