import { useState, useRef, useEffect } from "react";
import "../../@styling/components/input.scss";
import React from "react";

interface NaflowsInputProps {
    onUserInput: (e: React.FormEvent<HTMLInputElement>) => void;
    defaultValue?: string;
    placeholder?: string;
    fillCondition?: (e: string) => boolean;
    warning?: (e: string) => string;
    type?: string;
}

const NaflowsInput: React.FC<NaflowsInputProps> = ({
    onUserInput,
    defaultValue = "",
    placeholder = "",
    fillCondition = (value: string) => {
        return value.length > 0;
    },
    warning,
    type = "text",
    
}) => {
    const [IN, setIn] = useState(
        defaultValue.length > 0 ? true : false
    );
    const [filled, setFilled] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);
    const [warningMessage, setWarningMessage] = useState("");

    useEffect(() => {
      const handleClickOutside = (
        event: MouseEvent
      ) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            if (filled) {
                setIn(true);
            } else {
                setIn(false);
            }
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [
        selectRef,
        filled,
    ]);

    return (
        <>
            <div className={`input ${IN ? "in" : ""}`}>
                <input
                    defaultValue={defaultValue}
                    type={type}
                    onInput={(event) => {
                        onUserInput(event);
                        if ((event.target as HTMLInputElement).value.length > 0) {
                            setFilled(true);
                        } else {
                            setFilled(false);
                        }

                        const target = event.target as HTMLInputElement;
                        if (!fillCondition(target.value)) {
                            if (warning) {
                                setWarningMessage(warning(target.value) as unknown as string);
                            }
                        } else {
                            setWarningMessage("");
                        }

                    }}
                    onBlur={() => {
                        if (filled) {
                            setIn(true);
                        } else {
                            setIn(false);
                        }
                    }}
                ></input>
                <label className={warningMessage!=''?'warning-enabled':''}>{placeholder}</label>
                <div  className="warning">
                    {warningMessage}
                </div>
            </div>
        </>
    )
}


 



export default NaflowsInput;