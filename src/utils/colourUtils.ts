/**
 * Converts RGB to CMYK
 * @param {{ red: number; green: number; blue: number; }} RGB value represented as an object
 * @returns {{ cyan: number; magenta: number; yellow: number; black: number; }} cmyk value represented as an object
 */
export const convertRGBToCMYK = ({ red, green, blue }: { red: number; green: number; blue: number; }) => {
  let computedC = 0;
  let computedM = 0;
  let computedY = 0;
  let computedK = 0;

  // Remove the white from the color
  let r1 = red / 255;
  let g1 = green / 255;
  let b1 = blue / 255;
  let maxColor = Math.max(r1, g1, b1);

  if (maxColor == 0) {
    computedK = 1;
    return {
      cyan: 0, 
      magenta: 0, 
      yellow: 0, 
      black: 100
    };
  } else {
    computedC = 1 - (r1 / maxColor);
    computedM = 1 - (g1 / maxColor);
    computedY = 1 - (b1 / maxColor);
    computedK = 1 - maxColor;
  }

  return {
    cyan: +(computedC * 100).toFixed(4),
    magenta: +(computedM * 100).toFixed(4),
    yellow: +(computedY * 100).toFixed(4),
    black: +(computedK * 100).toFixed(4),
  };
}

/**
 * convert Hex code string to RGB
 * @param {string} hex 
 * @returns {{ red: number; green: number; blue: number }} RGB value representeed as an object
 */
export const convertHexToRGB = (hex: string): { red: number; green: number; blue: number; } => {
  // remove hash if it exists
  hex = hex.replace('#', '');

  // convert 3 digit hex to 6 digit hex
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);
    
  return { red, green, blue };
}

const componentFromStr = (numStr: string, percent: string) => {
  var num = Math.max(0, parseInt(numStr, 10));
  return percent ?
      Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}

/**
 * Takes in an RGB string and returns a hex code
 * @param rgb RGB string in the format of 'rgb(0, 0, 0)'
 * @returns { string } Hex code as a string
 */
export const convertRGBtoHex = (rgb: string) => {
  const rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
  const result = rgbRegex.exec(rgb)

  let r = 0;
  let g = 0;
  let b = 0;
  let hex = "";

  if (!!result) {
    r = componentFromStr(result[1], result[2]);
    g = componentFromStr(result[3], result[4]);
    b = componentFromStr(result[5], result[6]);
    
    hex = "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  return hex;
}

/**
 * Takes in CMYK values and returns an RGB object
 * @param c Cyan
 * @param m Magenta
 * @param y Yellow
 * @param k Black
 * @param normalized 
 * @returns RGB value represented as an object with red, green, and blue
 */
export const convertCMYKtoRGB = (c: number, m: number, y: number, k: number, normalized: boolean) => {
  c = (c / 100);
  m = (m / 100);
  y = (y / 100);
  k = (k / 100);
    
  c = c * (1 - k) + k;
  m = m * (1 - k) + k;
  y = y * (1 - k) + k;
    
  let r = 1 - c;
  let g = 1 - m;
  let b = 1 - y;
    
  if(!normalized){
    r = Math.round(255 * r);
    g = Math.round(255 * g);
    b = Math.round(255 * b);
  }
    
  return {
    red: r,
    green: g,
    blue: b
  }
}