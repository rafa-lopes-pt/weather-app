// import { optionsParser } from "../Components/Common/Select";

//NOTE: Hook vs simple js file/functions
/*
    Hook -> When used, creates a new object, with new "initial props" (lang, key,...others if needed in the future)
    Pure js Function -> Whole application refers to a single reference, optimizing code, but cutting on modularity.
*/

const ENV_API_KEY = import.meta.env.VITE_GEODB_API_KEY;

export const COUNTRY_CODES = new Map([
    ["portugal", "PT"],
    ["spain", "ES"],
    ["france", "FR"],
    ["italy", "IT"],
    ["usa", "US"],
    ["great britan", "GB"],
]);

const useGeoDB = ({
    lang = "pt",
    countryId: countryIds = [...COUNTRY_CODES.values()],
    API_KEY = ENV_API_KEY,
} = {}) => {
    //API Options
    const defaultLang = lang;
    const defaultOptions = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        },
    };
    //Base URL
    const baseURL = "https://wft-geo-db.p.rapidapi.com/v1/geo/";

    //Base Fetch
    const baseFetch = async (endpoint, params = "") => {
        return fetch(baseURL + endpoint + params, defaultOptions)
            .then((response) => response.json())
            .then((response) => {
                // console.log(response);
                return response;
            })
            .catch((err) => console.error(err));
    };

    const cityToLabel = (cityData) => {
        const labelArr = [
            cityData.city,
            cityData.country,
            cityData.countryCode,
        ];
        const label = labelArr.join(", ");
        // console.log("label", label);
        return label;
    };

    const getCities = async (
        search = "",
        lang = defaultLang,
        minPop = 9500
    ) => {
        // console.log("Lang", lang);
        //params ? key=val&key=val
        let requestParams = `?minPopulation=${minPop}&languageCode=${lang}&countryIds=${countryIds}&namePrefix=${search}`;

        let data = await baseFetch("cities", requestParams);
        // console.log("RAW DATA", data);

        if (Object.hasOwn(data, "data")) {
            //filter only cities (other possible value -> ADM2)
            //dont know what that is...but when searching for Lisbon it returns a city and an "amd2"
            data = data.data.filter((el) => el.type === "CITY");

            //Parse data && remove duplicates
            const dataMap = new Map(
                data.map((el) => [
                    `${el.city}, ${el.country}, ${el.countryCode}`,
                    {
                        value: el,
                        label: `${el.city}, ${el.country}, ${el.countryCode}`,
                    },
                ])
            );

            // console.log("Parsed Cities", [...dataMap.keys()]);
            return [...dataMap.values()];
        }

        //Response can contain data or an obejct with a message property!
        //TODO: That should be handled...but...here?
        return data;
    };

    return { getCities, cityToLabel };
};
export default useGeoDB;
