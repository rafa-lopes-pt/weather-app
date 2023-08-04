import { useCallback, useContext, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
const sleep = (ms) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(undefined);
        }, ms);
    });

export const loadOptions = async (search, prevOptions) => {
    await sleep(1000);

    let filteredOptions;
    if (!search) {
        filteredOptions = options;
    } else {
        const searchLower = search.toLowerCase();

        filteredOptions = options.filter(({ label }) =>
            label.toLowerCase().includes(searchLower)
        );
    }

    const hasMore = filteredOptions.length > prevOptions.length + 10;
    const slicedOptions = filteredOptions.slice(
        prevOptions.length,
        prevOptions.length + 10
    );

    return {
        options: slicedOptions,
        hasMore,
    };
};

export default function Select({
    src,
    onSelect,
    placeholder,
    loadingText,
    noMatchText,
    ...props
}) {
    const wrappedLoadOptions = useCallback(async (src, ...args) => {
        const data = await src(...args);
        // console.log("DATA", data);
        return { options: data };
    }, []);

    return (
        <AsyncPaginate
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    borderRadius: "1em",
                    background: "#ffec",
                }),
                menu: (provided, state) => ({
                    ...provided,
                    borderRadius: "1em",
                    background: "#ffec",
                }),
                option: (provided, state) => ({
                    ...provided,
                    borderRadius: "1em",
                    color: "#223",
                }),
            }}
            placeholder={placeholder}
            className={props.className}
            debounceTimeout={1000}
            loadOptions={(...args) => {
                return wrappedLoadOptions(src, ...args);
            }}
            onChange={(val) => onSelect(val.value)}
        />
    );
}
