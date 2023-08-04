import React, { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export default function RadioButton({
    options = [],
    onChange = () => {},
    ...props
}) {
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        onChange(options[selected].value);
    }, [selected]);

    return (
        <div className={twMerge("flex mx-1 " + props.className)}>
            {options.map((el, i) => (
                <button
                    key={"radio-btn-" + el.label + i}
                    className={twMerge(`
                        btn
                        mx-[0.1em] p-2
                        
                        ${
                            selected === i
                                ? "btn--primary btn__option-selected"
                                : "btn--secondary btn--disabled"
                        }
                        
                        `)}
                    onClick={() => setSelected(i)}
                >
                    {el.label}
                </button>
            ))}
        </div>
    );
}
