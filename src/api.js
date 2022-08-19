import { DateTime } from "luxon";
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "f8880c3cd731c53f6f921fbc9c371709";

// https://api.openweathermap.org/data/2.5/onecall?lat=48.8534&lon=2.3488&exclude=current,minutely,hourly,alerts&appid=1fa9ff4126d95b8db54f3897a208e91c&units=metric

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(WEATHER_API_URL + "/" + infoType)
    url.search = new URLSearchParams({ ...searchParams, appid: WEATHER_API_KEY });

    return fetch(url)
        .then((res) => res.json())
        .then((data) => data);
};

const formatCurrentWeather = (data) => {
    const {
        coord: { lat, lon },
        main: { temp, feels_like, temp_min, temp_max, humidity },
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: { speed }
    } = data

    const { main: details, icon } = weather[0]

    return {
        lat,
        lon,
        temp, 
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        dt,
        country,
        sunrise,
        sunset,
        details,
        icon,
        speed
    };
};

const formatForecastWeather = (data) => {
    let {timezone, daily, hourly} = data;
    daily = daily.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon,
        }
    });

    hourly = hourly.slice(1, 6).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            icon: d.weather[0].icon,
        }
    });
    
return {timezone, daily, hourly};
};

const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather = await getWeatherData('weather', searchParams).then(formatCurrentWeather)

    const { lat, lon } = formattedCurrentWeather

    const formattedForecastWeather = await getWeatherData('onecall', {
        lat,
        lon,
        exclude: 'current,minutely,alerts',
        units: searchParams.units,
    }).then(formatForecastWeather)


    return {...formattedCurrentWeather, ...formattedForecastWeather}
};

const formatToLocalTime = (
    secs,
    zone,
    format = "cccc, dd LLL yyyy"
    ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);


export default getFormattedWeatherData;

export {formatToLocalTime};
