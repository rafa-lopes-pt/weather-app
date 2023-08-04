import { useState } from "react";

//TODO: export possible lang and units val

const ENV_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const useOpenWeather = (
    lang = "en",
    units = "metric",
    API_KEY = ENV_API_KEY
) => {
    const [defaultLang, setDefaultLang] = useState(lang);
    const [defaultUnits, setDefaultUnits] = useState(units);
    //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
    const baseURL = `https://api.openweathermap.org/data/2.5/`;

    const baseFetch = async (endpoint, params = "") => {
        return fetch(baseURL + endpoint + params)
            .then((response) => response.json())
            .then((response) => {
                // console.log(response);
                return response;
            })
            .catch((err) => console.error(err));
    };

    const getCurrentWeather = async ({
        lat,
        lon,
        units = defaultUnits,
        lang = defaultLang,
    }) => {
        if (
            (typeof lat === "string" || typeof lat === "number") &&
            (typeof lon === "string" || typeof lon === "number") &&
            typeof units === "string" &&
            typeof lang === "string"
        ) {
            //parse params
            const params = `?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&${API_KEY}`;

            //baseFetch
            let data = await baseFetch("weather", params);
            //parse data
             console.log("Current Weather Raw", data);
            const { main: title, description: descp, icon } = data.weather[0];
            const { temp, feels_like, temp_min, temp_max, humidity, pressure } =
                data.main;

            return {
                title,
                descp,
                icon,
                temp,
                feels_like,
                temp_min,
                temp_max,
                humidity,
                pressure,
            };
        } else
            throw new Error(
                "All parameters of getCurrentWeather() should be of type string"
            );
    };

    const getForecast = async ({
        lat,
        lon,
        units = defaultUnits,
        lang = defaultLang,
        intervals = 40, //40 intervals of 3h = 5 Days <- 40 is the max value on free plan
    }) => {
        if (
            (typeof lat === "string" || typeof lat === "number") &&
            (typeof lon === "string" || typeof lon === "number") &&
            typeof units === "string" &&
            typeof lang === "string" &&
            (typeof intervals === "string" || typeof intervals === "number")
        ) {
            //parse params
            const params = `?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&cnt=${intervals}&${API_KEY}`;

            //baseFetch
            let data = await baseFetch("forecast", params);
            //parse data

            // console.log("Forecast Raw", data);

            const date = data.list.map((el) => {
                //parsing data
                const { main: title, description: descp, icon } = el.weather[0];
                const {
                    temp,
                    feels_like,
                    temp_min,
                    temp_max,
                    humidity,
                    pressure,
                } = el.main;

                //The api provides dates in UNIX format
                const date = new Date(el.dt * 1000);

                return {
                    date,
                    title,
                    descp,
                    icon,
                    temp,
                    feels_like,
                    temp_min,
                    temp_max,
                    humidity,
                    pressure,
                };
            });
            //Each interval has 3h -> 3*8 = 24h = 1Day
            //Index 0 = Current Day
            //Index 8 = 2nd Day ( index (0+1)*8  <- +1 due to counting error )
            //Index 16 = 3rd Day( index (0+1)*8*2  <- +1 due to counting error )
            //...
            //5th day will be calculated with index 39 ( last index )
            const forecastData = [
                date[8],
                date[16],
                date[24],
                date[32],
                date[39],
            ];

            // console.table(forecastData);

            return forecastData;
        } else
            throw new Error(
                "All parameters of getForecast() should be of type string"
            );
    };

    return { getCurrentWeather, getForecast };
};
export default useOpenWeather;
