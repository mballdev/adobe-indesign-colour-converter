/**
 * Converts RGB to CMYK
 * @param {{ red: number; green: number; blue: number; }} RGB value represented as an object
 * @returns {{ cyan: number; magenta: number; yellow: number; black: number; }} cmyk value represented as an object
 */
export const convertRGBToCMYK = ({ red, green, blue }: { red: number; green: number; blue: number; }) => {
  // remove spaces from input RGB values, convert to int
  const r = parseInt(`${ red }`.replace(/\s/g, ''), 10);
  const g = parseInt(`${ green }`.replace(/\s/g, ''), 10);
  const b = parseInt(`${ blue }`.replace(/\s/g, ''), 10);

  // black
  if (r === 0 && g === 0 && b === 0) {
    return {
      cyan: 0,
      magenta: 0,
      yellow: 0,
      black: 1,
    };
  }
  
  let computedC = 1 - (r / 255);
  let computedM = 1 - (g / 255);
  let computedY = 1 - (b / 255);

  const minCMY = Math.min(computedC, Math.min(computedM, computedY));

  const c = computedC === 1 ? 0 : (((computedC - minCMY) / (1 - minCMY)) * 100).toFixed(0);
  const m = computedM === 1 ? 0 : (((computedM - minCMY) / (1 - minCMY)) * 100).toFixed(0);
  const y = computedY === 1 ? 0 : (((computedY - minCMY) / (1 - minCMY)) * 100).toFixed(0);
  const k = (minCMY * 100).toFixed(0);

  return {
    cyan: c,
    magenta: m,
    yellow: y,
    black: k,
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