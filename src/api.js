import { DateTime } from "luxon";
import { toast } from 'react-toastify';
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "f8880c3cd731c53f6f921fbc9c371709";


const getWeatherData = (infoType, searchParams) => {
    const url = new URL(WEATHER_API_URL + "/" + infoType)
    url.search = new URLSearchParams({ ...searchParams, appid: WEATHER_API_KEY });

    return fetch(url)
        .then(res => {
            if (!res.ok) {
                toast.info('Could not fetch the data for that resource...')
            }

            return res.json();
        })
        .then((data) => data)
        .catch(error => console.log(error.message))
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
    let { timezone, daily, hourly } = data;
    daily = daily.slice(1, 8).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'ccc'),
            temp: d.temp.day,
            icon: d.weather[0].icon,
        }
    });

    hourly = hourly.slice(1, 9).map(d => {
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm a'),
            temp: d.temp,
            icon: d.weather[0].icon,
        }
    });

    return { timezone, daily, hourly };
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


    return { ...formattedCurrentWeather, ...formattedForecastWeather }
};

const formatToLocalDate = (
    secs,
    zone,
    format = "cccc dd LLL yyyy"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const formatToLocalTime = (
    secs,
    zone,
    format = "hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);


export default getFormattedWeatherData;

export { formatToLocalDate, formatToLocalTime };
