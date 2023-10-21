import { convertHexToRGB, convertRGBToCMYK, convertRGBtoHex } from "./colourUtils";

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
});

describe('convertRGBtoHex', () => {
  it('is exported', () => {
    expect(convertRGBtoHex).toBeDefined();
  })

  it('converts RGB to hex', () => {
    expect(convertRGBtoHex('rgb(0, 0, 0)')).toEqual('#000000');
    expect(convertRGBtoHex('rgb(255, 255, 255)')).toEqual('#ffffff');
  });
})