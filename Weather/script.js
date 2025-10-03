const apikey="6c169f9ef6c085abe0d20dd2ee00eb4c";
        const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
        const searchb=document.querySelector(".search input");
        const button=document.querySelector(".search button");
        const icon=document.querySelector(".weather-icon");
        async function weather(city)
        {
            const res=await fetch(apiurl+city+`&appid=${apikey}`);
            let data=await res.json();
            console.log(data);
            document.querySelector(".temp").innerHTML= Math.round(data.main.temp)+" °C";
            document.querySelector(".city").innerHTML=data.name;
            document.querySelector(".humidity").innerHTML=data.main.humidity+" %";
            document.querySelector(".wind").innerHTML=data.wind.speed+" Km/hr";
            if(data.weather[0].main=="Clouds")
            {
                icon.src="images/clouds.png";
            }
            else if(data.weather[0].main=="clear")
            {
                icon.src="images/clear.png";
            }
            else if(data.weather[0].main=="drizzle")
            {
                icon.src="images/drizzle.png";
            }
            else if(data.weather[0].main=="mist")
            {
                icon.src="images/mist.png";
            }
            else if(data.weather[0].main=="rain")
            {
                icon.src="images/rain.png";
            }
            else if(data.weather[0].main=="snow")
            {
                icon.src="images/snow.png";
            }
           
        }
        button.addEventListener("click",()=>{
            weather(searchb.value);
        })
        