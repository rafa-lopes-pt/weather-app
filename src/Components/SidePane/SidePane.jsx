import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";
import LocaleContext from "../../Locale/LocaleContext";

/**
 *
 * @param {Object} data -> Weather data
 * @returns
 */
export default function SidePane({
    data = { weatherData: {}, currentLocation: {} },
    ...props
}) {
    const { lang, units } = useContext(LocaleContext);
    console.log("Current Weather", data);
    return (
        <div
            className={twMerge(
                props.className +
                    `
        p-10
        flex flex-col justify-evenly items-center
        side-pane
        `
            )}
        >
            <div>
                <div className="flex flex-col-reverse md:flex-row items-center justify-evenly ">
                    <h3 className="font-bold text-[1.45rem] md:text-3xl">
                        {data.weatherData?.temp} {units.temp}
                    </h3>

                    <img
                        src={`src/Components/Common/icons/${data.weatherData?.icon}.png`}
                        alt={"Weather Icon"}
                        className="weather-icon w-[75%] md:w-[30%]"
                    />
                </div>
                <span className="flex flex-col items-center text-xl text-center mt-2 md:mt-0">
                    <div
                        className={`
                            flex flex-col md:flex-row justify-evenly items-center 
                            md:space-x-8 
                            text-center text-sm md:text-lg`}
                    >
                        <span>
                            Min:{data.weatherData?.temp_min} {units.temp}
                        </span>
                        <span>
                            Max:{data.weatherData?.temp_max} {units.temp}
                        </span>
                    </div>
                    <h3 className=" md:text-2xl mt-4 font-bold">
                        {data.weatherData?.descp || "text"}
                    </h3>
                </span>
            </div>

            <span className="flex flex-col items-center">
                <span className="flex items-center space-x-2 my-3">
                    <img
                        src="/src/Components/Common/icons/location.png"
                        className="h-6 weather-icon"
                    ></img>
                    <h3 className=" text-lg md:text-2xl">
                        {data.currentLocation?.city}
                    </h3>
                </span>
                <p className="text-sm">
                    {"lat:" +
                        data.currentLocation?.latitude +
                        ",  " +
                        "lon:" +
                        data.currentLocation?.longitude}
                </p>
            </span>

            <p className="md:absolute md:bottom-10 mt-20 normal-case text-[0.75rem] text-center">
                {lang.sidePane.credits}
                <a
                    className="underline"
                    href="https://rapidapi.com/wirefreethought/api/geodb-cities/"
                    target="_blank"
                >
                    GeoDB
                </a>

                {" & "}
                <a
                    className="underline"
                    href="https://openweathermap.org/api"
                    target="_blank"
                >
                    OpenWeather
                </a>
            </p>
        </div>
    );
}
