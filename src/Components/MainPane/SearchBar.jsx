import React, { useContext } from "react";
import RadioButton from "../Common/RadioButton";
import useGeoDB from "../../APIs/useGeoDB";
import Select from "../Common/Select";
import { twMerge } from "tailwind-merge";
import LocaleContext from "../../Locale/LocaleContext";

export default function SearchBar({
    onCitySelect,
    onUnitsSelect,
    onLangSelect,
    onReset,
    showReset,
    ...props
}) {
    const { lang } = useContext(LocaleContext);
    const { getCities } = useGeoDB({ lang: lang.current });

    return (
        <div
            className={twMerge(`
            flex justify-center items-center 
            flex-col md:flex-row space-y-2
            glass-container
            z-30

            ${props.className}
            `)}
        >
            <Select
                className="w-full"
                src={(search) => getCities(search)}
                onSelect={onCitySelect}
                placeholder={lang.searchbar.placeholder}
                loadingText={lang.searchbar.loadingText}
                noMatchText={lang.searchbar.noMatch}
            ></Select>
            <div className="flex flex-rowitems-center relative md:-top-1">
                <RadioButton
                    className=""
                    onChange={onLangSelect}
                    options={[
                        { label: "PT", value: "pt" },
                        { label: "EN", value: "en" },
                    ]}
                ></RadioButton>
                <RadioButton
                    onChange={onUnitsSelect}
                    options={[
                        { label: "ºC", value: "metric" },
                        { label: "ªF", value: "imperial" },
                    ]}
                ></RadioButton>
                {showReset && (
                    <button
                        onClick={onReset}
                        className={`

                    btn btn--primary
                    mx-[0.1em] md:ml-10 p-2
                    flex items-center
                    rounded-md
                `}
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                )}{" "}
            </div>
        </div>
    );
}
