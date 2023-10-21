import React, { useEffect, useState } from "react";

// utils
import { convertHexToRGB, convertRGBToCMYK, convertRGBtoHex } from "../../utils/colourUtils";

// styles
import "./Home.css";

// components
import { WC } from "../../components/WC.jsx";
import Input from "./components/Input";

export const Home = () => {
    // colour code we want to convert
    const [hexValue, setHexValue] = useState("#000000");
    const [RGBValue, setRGBValue] = useState(`rgb(0,0,0)`);
    const [CMYKValue, setCMYKValue] = useState(`cmyk(0,0,0,100)`);

    const handleHexChange = (value) => {
        setHexValue(value);
        const updatedRGBValue = convertHexToRGB(value);
        const updatedCMYKValue = convertRGBToCMYK(updatedRGBValue);
        setRGBValue(`rgb(${updatedRGBValue.red},${updatedRGBValue.green},${updatedRGBValue.blue})`);
        setCMYKValue(`cmyk(${updatedCMYKValue.cyan},${updatedCMYKValue.magenta},${updatedCMYKValue.yellow},${updatedCMYKValue.black})`);
    }

    const handleRGBChange = (value) => {
        setRGBValue(value);
        // parse RGB value from string
        const [red, green, blue] = value.replace("rgb(", "").replace(")", "").split(",");

        if (red === "" || green === "" || blue === "" || isNaN(red) || isNaN(green) || isNaN(blue)) {
            return;
        }

        const updatedCMYKValue = convertRGBToCMYK({
            red: parseInt(red),
            green: parseInt(green),
            blue: parseInt(blue),
        });
        
        const updatedHexValue = convertRGBtoHex(value);
        setHexValue(updatedHexValue);
        
        setCMYKValue(`cmyk(${updatedCMYKValue.cyan},${updatedCMYKValue.magenta},${updatedCMYKValue.yellow},${updatedCMYKValue.black})`);
    }

    const handleCMYKChange = (value) => {
        setCMYKValue(value);
    }

    return (
        <div>
            <WC>
                <div className="container">
                    <Input 
                        id="hex-input" 
                        value={hexValue} 
                        setValue={handleHexChange} 
                        placeholder="HEX" 
                        label="HEX"
                    />
                    <Input 
                        id="rgb-input" 
                        value={RGBValue} 
                        setValue={handleRGBChange} 
                        placeholder="RGB" 
                        label="RGB"
                    />
                    <Input 
                        id="cmyk-input" 
                        value={CMYKValue} 
                        setValue={handleCMYKChange} 
                        placeholder="CMYK" 
                        label="CMYK"
                    />
                </div>
                
            </WC>
       </div>
    );
}
