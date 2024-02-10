import { convertHexToRGB, convertRGBToCMYK, convertRGBtoHex, convertCMYKtoRGB } from "./colourUtils";

describe('convertHexToRGB', () => {
  it('is exported', () => {
    expect(convertHexToRGB).toBeDefined();
  });

  it('converts a hex string to RGB', () => {
    expect(convertHexToRGB('#000000')).toEqual({ red: 0, green: 0, blue: 0 });
    expect(convertHexToRGB('#ffffff')).toEqual({ red: 255, green: 255, blue: 255 });
    expect(convertHexToRGB('#ff0000')).toEqual({ red: 255, green: 0, blue: 0 });
    expect(convertHexToRGB('#00ff00')).toEqual({ red: 0, green: 255, blue: 0 });
    expect(convertHexToRGB('#0000ff')).toEqual({ red: 0, green: 0, blue: 255 });

    expect(convertHexToRGB('#3F629A')).toEqual({ red: 63, green: 98, blue: 154 });
  });
});

describe('convertRGBToCMYK', () => {
  it('is exported', () => {
    expect(convertRGBToCMYK).toBeDefined();
  })

  it('converts RGB to CMYK correctly', () => {
    expect(convertRGBToCMYK({ red: 255, green: 255, blue: 255 })).toEqual({ cyan: 0, magenta: 0, yellow: 0, black: 0 });
    expect(convertRGBToCMYK({ red: 0, green: 0, blue: 0 })).toEqual({ cyan: 0, magenta: 0, yellow: 0, black: 100 });
    expect(convertRGBToCMYK({ red: 255, green: 0, blue: 0 })).toEqual({ cyan: 0, magenta: 100, yellow: 100, black: 0 });
  });
});

describe('convertRGBtoHex', () => {
  it('is exported', () => {
    expect(convertRGBtoHex).toBeDefined();
  })

  it('converts RGB to hex', () => {
    expect(convertRGBtoHex('rgb(0, 0, 0)')).toEqual('#000000');
    expect(convertRGBtoHex('rgb(255, 255, 255)')).toEqual('#ffffff');
    expect(convertRGBtoHex('rgb(255, 0, 0)')).toEqual('#ff0000');
  });
})

describe('convertCMYKtoRGB', () => {
  it('is exported', () => {
    expect(convertCMYKtoRGB).toBeDefined();
  })

  it('converts CMYK to RGB correctly', () => {
    expect(convertCMYKtoRGB(0, 0, 0, 0, false)).toEqual({ red: 255, green: 255, blue: 255 });
    expect(convertCMYKtoRGB(0, 0, 0, 100, false)).toEqual({ red: 0, green: 0, blue: 0 });
    expect(convertCMYKtoRGB(0, 100, 100, 0, false)).toEqual({ red: 255, green: 0, blue: 0 });
  });
});