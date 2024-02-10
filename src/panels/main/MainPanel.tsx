import React, { useState } from "react";

// utils
import { convertCMYKtoRGB, convertHexToRGB, convertRGBToCMYK, convertRGBtoHex } from "../../utils/colourUtils";

// styles
import "./MainPanelStyles.css";

// components
import { WC } from "../../components/WC";
import FieldInput from "./components/FieldInput";

const MainPanel: React.FC = () => {
    // colour code we want to convert
    const [hexValue, setHexValue] = useState("#000000");
    const [RGBValue, setRGBValue] = useState(`rgb(0,0,0)`);
    const [CMYKValue, setCMYKValue] = useState(`cmyk(0,0,0,100)`);

    const handleHexChange = (value: string) => {
        setHexValue(value);
        const updatedRGBValue = convertHexToRGB(value);

        if (isNaN(updatedRGBValue.red) || isNaN(updatedRGBValue.green) || isNaN(updatedRGBValue.blue)) {
            return;
        }
    
        const updatedCMYKValue = convertRGBToCMYK(updatedRGBValue);    
        setRGBValue(`rgb(${updatedRGBValue.red},${updatedRGBValue.green},${updatedRGBValue.blue})`);
        setCMYKValue(`cmyk(${updatedCMYKValue.cyan},${updatedCMYKValue.magenta},${updatedCMYKValue.yellow},${updatedCMYKValue.black})`);
    }

    const handleRGBChange = (value: string) => {
        setRGBValue(value);
        // parse RGB value from string
        const [red, green, blue] = value.replace("rgb(", "").replace(")", "").split(",");

        if (red === "" || green === "" || blue === "" || isNaN(+red) || isNaN(+green) || isNaN(+blue)) {
            return;
        }

        const updatedHexValue = convertRGBtoHex(value);
        setHexValue(updatedHexValue);

        const updatedCMYKValue = convertRGBToCMYK({
            red: parseInt(red),
            green: parseInt(green),
            blue: parseInt(blue),
        });
        
        setCMYKValue(`cmyk(${updatedCMYKValue.cyan},${updatedCMYKValue.magenta},${updatedCMYKValue.yellow},${updatedCMYKValue.black})`);
    }

    const handleCMYKChange = (value: string) => {
        setCMYKValue(value);
        const [cyan, magenta, yellow, black] = value.replace("cmyk(", "").replace(")", "").split(",") as unknown as number[];

        const updatedRGBValue = convertCMYKtoRGB(cyan, magenta, yellow, black, false);
        setRGBValue(`rgb(${updatedRGBValue.red},${updatedRGBValue.green},${updatedRGBValue.blue})`);
        
        const updatedHexValue = convertRGBtoHex(`rgb(${updatedRGBValue.red},${updatedRGBValue.green},${updatedRGBValue.blue})`);
        setHexValue(updatedHexValue);
    }

    return (
        <div>
            <WC>
                <div className="container">
                    <FieldInput 
                        id="hex-input" 
                        value={hexValue} 
                        setValue={handleHexChange} 
                        placeholder="HEX" 
                        label="HEX"
                    />
                    <FieldInput 
                        id="rgb-input" 
                        value={RGBValue} 
                        setValue={handleRGBChange} 
                        placeholder="RGB" 
                        label="RGB"
                    />
                    <FieldInput 
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

MainPanel.displayName = "MainPanel";

export default MainPanel;