// -6.342570951392105, 106.8047562554188
// a55338719ae4c11cc5b77ba8e40208fd
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
import { Text } from "@tremor/react";

async function getWeather(){
    const lat = "-6.342570951392105";
    const lon = "106.8047562554188";
    const appid = "a55338719ae4c11cc5b77ba8e40208fd"

    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`);
    if(data){
        // console.log(data)
        return data.json();
    }
    return false;
}

export default async function Weather(){
    const weather = await getWeather();
    // console.log("weather", weather);
    return(
        <>
        <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pt-16 sm:px-6 sm:pt-24 lg:max-w-7xl lg:px-8">
          
        <Text>Helo User,</Text>
        <Text>Today is {weather.weather[0].main} in {weather.name}</Text>
        <Text>provided by OpenWeatherMap</Text>
        </div>
        </div>
        </>
    );
}