import React, { useContext } from "react";
import LocaleContext from "../../Locale/LocaleContext";

export default function ForecastDay({ data = {}, ...props }) {
    // console.log("Forecast", data);
    const locale = useContext(LocaleContext);
    return (
        <div
            className="
            
            flex flex-col items-center justify-center
            m-2 p-4
            text-center md:h-[10em] md:min-w-max 
           glass-container
           forecast-container
            relative
            "
        >
            <h3 className="text-[1.15rem] md:text-xl">
                {locale.lang.weekdays[data.date.getDay()]}
            </h3>
            <span className="flex items-center justify-center space-x-2">
                <h4 className="text-[1rem] md:text-xl mt-1 ">
                    {data.temp + " " + locale.units.temp}
                </h4>
                <img
                    src={`src/Components/Common/icons/${data.icon}.png`}
                    alt={data.title}
                    className={`
                        w-[2.0em] md:w-[3em] 
                weather-icon
                    `}
                />
            </span>
            <h5 className="capitalize text-sm">{data.descp}</h5>
        </div>
    );
}
