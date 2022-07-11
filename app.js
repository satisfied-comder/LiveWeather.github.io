let loc= document.getElementById("location");
let tempval = document.getElementById("temp-value");
let tempicon = document.getElementById("temp-icon");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input")
const searchbutton = document.getElementById("search-button")

searchbutton.addEventListener('click', (e) => {
  
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value = '';
})
const getWeather= async(city)=>{

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9edff634335e0be676221d9d8f24799a`, { mode: 'cors' }   )
        
        const weatherData = await response.json();
        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempval.textContent = Math.round(feels_like) - 273;

        if (id < 300 && id >= 200) {
            climate.textContent = "Thunderstorm"
            tempicon.src = "./icons/thunderstorm.svg";
        }
        if (id < 400 && id >= 300) {
            climate.textContent = "Drizzle";
            // tempicon.src = "./icons/thunderstorm.svg"
        }
        if (id < 600 && id >= 500) {
            climate.textContent = "Rain";
            tempicon.src = "./icons/rain.png"
        }
        if (id < 700 && id >= 600) {
            climate.textContent = "Snow";
            tempicon.src = "./icons/snowflake.png"
        }
        if (id == 800) {
            climate.textContent = "Clear ";;
        }
        if (id > 800) {
            climate.textContent = "Clouds";
            tempicon.src = "./icons/clouds.png  "

        }

        
    }
   
    catch (error) {
        alert('City not found')
        console.log(error)
        console.log('err occurred')
        
}

}





window.addEventListener('load', () => {
    let long; //longitude
    let lat; // latitude
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=9edff634335e0be676221d9d8f24799a  `


            fetch(api).then((response) => {

                return response.json();

    
            })
                .then(data => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];

                    loc.textContent = name;
                    climate.textContent = main;
                    tempval.textContent = Math.round(feels_like) - 273;
                     
                    if (id < 300 && id >= 200) {
                        climate.textContent = "Thunderstorm"
                        tempicon.src = "./icons/thunderstorm.svg";
                    }
                    if (id < 400 && id >= 300) {
                        climate.textContent = "Drizzle";
                        // tempicon.src = "./icons/thunderstorm.svg"
                    }
                    if (id < 600 && id >= 500) {
                        climate.textContent = "Rain";
                        tempicon.src = "./icons/rain.png"
                    }
                    if (id < 700 && id >= 600) {
                        climate.textContent = "Snow";
                        tempicon.src = "./icons/snowflake.png"
                    }
                    if (id == 800) {
                        climate.textContent = "Clear ";;
                    }
                    if (id > 800) {
                        climate.textContent = "Clouds";
                        tempicon.src = "./icons/clouds.png  "
                        
                    }
                })
        })

    }
})
