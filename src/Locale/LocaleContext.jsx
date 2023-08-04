import React, { useState } from "react";
const LocaleContext = React.createContext({
    lang: {
        current: "",
        sidePane: {
            credits: "",
        },
        weather: {
            feels_like: "",
            humidity: "",
        },
        searchbar: {
            placeholder: "",
            loadingText: "",
            noMatch: "",
        },
        highlights: {
            title: "",
        },
        weekdays: [],
    },
    setLang: () => {},
    en: "en",
    pt: "pt",
    setUnits: () => {},
    units: {
        current: "",
        temp: "",
        pressure: "",
        humidity: "",
    },
    metric: "metric",
    imperial: "imperial",
});

//UNIT ENUMS
import metricUnitObj from "./Units/metric.json";
import imperialUnitObj from "./Units/imperial.json";
//UNIT ID
const metric = metricUnitObj.current;
const imperial = imperialUnitObj.current;
//TEXT
import ptLangObj from "./Lang/pt.json";
import enLangObj from "./Lang/en.json";
//IMPROVE:--add lang support here
//LANG ID
const en = enLangObj.current;
const pt = ptLangObj.current;
//================================================================== CONTEXT PROVIDER
export const LocaleContextProvider = (props) => {
    //========================================== TEXT
    //Current Lang State
    const [lang, setLangObj] = useState(ptLangObj);

    /**
     * Changes the context's current language.
     * @param {String} lang_code Target language code.
     */
    const setLang = (lang_code) => {
        switch (lang_code) {
            case pt:
                setLangObj(ptLangObj);
                break;
            case en:
                setLangObj(enLangObj);
                break;
            //IMPROVE:--add lang support here
            default:
                setLangObj(ptLangObj);
        }
    };

    //========================================== UNITS
    const [units, setUnitsObj] = useState(metricUnitObj);
    /**
     * Changes the context's current language.
     * @param {String} units_code Target language code.
     */
    const setUnits = (units_code) => {
        switch (units_code) {
            case metric:
                setUnitsObj(metricUnitObj);

                break;
            case imperial:
                setUnitsObj(imperialUnitObj);

                break;
            default:
                setLangObj(metricUnitObj);
        }
    };

    return (
        <LocaleContext.Provider
            //IMPROVE: ADD LANG AND UNIT SUPPORT
            value={{ lang, setLang, en, pt, units, setUnits, metric, imperial }}
        >
            {props.children}
        </LocaleContext.Provider>
    );
};

export default LocaleContext;
