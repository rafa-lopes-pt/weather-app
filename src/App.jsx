import { useContext, useEffect, useMemo, useState } from "react";
import SidePane from "./Components/SidePane/SidePane";
import useOpenWeather from "./APIs/useOpenWeather";
import SearchBar from "./Components/MainPane/SearchBar";
import ForecastDay from "./Components/MainPane/ForecastDay";
import Highlights from "./Components/MainPane/Highlights";

import LocaleContext from "./Locale/LocaleContext";
function App() {
    // Lang and units
    const { setLang, lang, setUnits, units } = useContext(LocaleContext);

    // OpenWeather API
    const { getCurrentWeather, getForecast } = useOpenWeather(
        lang.current,
        units.current
    );

    const [currentLocation, setCurrentLocation] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        if (currentLocation) {
            getForecast({
                lat: currentLocation?.latitude,
                lon: currentLocation?.longitude,
                lang: lang.current,
                units: units.current,
            })
                .then((res) => res)
                .then((res) => setForecastData(res));

            getCurrentWeather({
                lat: currentLocation?.latitude,
                lon: currentLocation?.longitude,
                lang: lang.current,
                units: units.current,
            })
                .then((res) => res)
                .then((res) => setWeatherData(res));
        }
    }, [currentLocation, lang.current, units.current]);

    return (
        <main
            className="
                 h-[100svh]
                flex justify-between
                relative
                "
        >
            <SidePane
                className={`
                  onload-animation
                  glass-container
                 relative
                    ${
                        currentLocation
                            ? "-translate-x-[0%] md:-translate-x-[0%] "
                            : "-translate-x-[110%] md:-translate-x-[110%] "
                    }
                    w-[45%] h-[75%] self-end
                    
                    md:w-[33%] md:h-full 
                    
                    `}
                data={{ weatherData, currentLocation }}
            ></SidePane>
            {/*=============================== MAIN PANE */}
            <div
                className={`
                            w-[100%] md:w-[67%] 
                           
                            p-3 md:p-10 
                            flex flex-col justify-between
                            space-y-4
                            `}
            >
                <SearchBar
                    onCitySelect={setCurrentLocation}
                    onLangSelect={setLang}
                    onUnitsSelect={setUnits}
                    onReset={() => setCurrentLocation(null)}
                    showReset={currentLocation ? true : false}
                    //16.667 && 12.5 === 1/6
                    className={`
                    relative
                    onload-animation
                    ${
                        !currentLocation &&
                        `top-1/2 -left-[25%] md:-left-[16.667%] 
                         -translate-y-1/2 -translate-x-[25%] md:-translate-x-[12.5%]
                        `
                    }
                    ${
                        currentLocation &&
                        `top-0 -left-[25%] -translate-x-[25%] md:left-[0%] md:-translate-x-0 md:-translate-y-0
                        `
                    }
                    
                    `}
                ></SearchBar>
                {/* Forecast */}
                <div
                    className={`
                    w-[65%] md:w-full
                    h-[75%] md:h-auto
                    forecast-grid
                    onload-animation
                    overflow-scroll

                    ${currentLocation ? "opacity-100" : "opacity-0"}`}
                >
                    {forecastData?.map((el, i) => (
                        <ForecastDay
                            key={"forecast-day-" + i}
                            data={el}
                        ></ForecastDay>
                    ))}
                </div>
                {/* today's highlights */}
                {weatherData && (
                    <span
                        className={`
                        hidden
                        onload-animation
                        md:inline-block
                        overflow-hidden
                        glass-container
                        ${currentLocation ? "opacity-100" : "opacity-0"}`}
                    >
                        <Highlights
                            className={`
                        w-full
                        relative
                        onload-animation
                        ${currentLocation ? `bottom-0` : `-bottom-full`}
                        `}
                            data={weatherData}
                        ></Highlights>
                    </span>
                )}
            </div>
        </main>
    );
}

export default App;
