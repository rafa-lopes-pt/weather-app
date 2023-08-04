import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";
import LocaleContext from "../../Locale/LocaleContext";

export default function Highlights({ data, ...props }) {
    const { lang, units } = useContext(LocaleContext);
    return (
        <span className={twMerge(`${props.className}`)}>
            <h2 className="text-lg w-fit shadow-[2px 2px 20px 2px #000] mb-3">
                {lang.highlights.title}
            </h2>

            <div
                className={`
                    flex items-center justify-evenly glass-container text-center
                    `}
            >
                <span>
                    {lang.weather.feels_like}
                    <p>
                        {data.feels_like}
                        {units.temp}
                    </p>
                </span>
                <span>
                    Max
                    <p>
                        {data.temp_max}
                        {units.temp}
                    </p>
                </span>
                <span>
                    Min
                    <p>
                        {data.temp_min}
                        {units.temp}
                    </p>
                </span>
                <span>
                    {lang.weather.humidity}{" "}
                    <p>
                        {data.humidity}
                        {units.humidity}
                    </p>
                </span>
            </div>
        </span>
    );
}
