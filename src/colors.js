import * as u from './util';
import * as convert from './rgba';

export const Palette = {
  Blue: 0xff0000ff,
  SwanWhite: 0xfff7f1e3,
  CrocTooth: 0xffd1ccc0,
  SummerSky: 0xff34ace0,
  GreyPorc: 0xff84817a,
  Pumpkin: 0xffff793f,
  CelGreen: 0xff33d9b2,
  FluRed: 0xffff5252,
  Mandarin: 0xffffb142,
  LuckyP: 0xff2c2c54,
  ChileanFire: 0xffcd6133
};

export const arr = rgba => {
  const a = (rgba & 0xff000000) >>> 24,
        r = (rgba & 0x00ff0000) >>> 16,
        g = (rgba & 0x0000ff00) >>> 8,
        b = (rgba & 0x000000ff);

  return [r, g, b, a];
};

// https://stackoverflow.com/a/54030756/3994249
export const fromArr = ([r, g, b, a]) => {
  return ((a << 24 >>> 0) | (r << 16 >>> 0) | (g << 8 >>> 0) | b) >>> 0;
};

export const hsla = rgba => {
  const [r, g, b, a] = arr(rgba),
        [h, s, l] = convert.rgbToHsl(r, g, b);
  
  return [h, s, l, a];
};

export const hslToRgba = (h, s, l, a) => {
  const [r, g, b] = convert.hslToRgb(h, s, l);
  return fromArr([r, g, b, a]);
};

export const css = rgba => {
  const [r, g, b, a] = arr(rgba);

  return `rgba(${r}, ${g}, ${b}, ${a/255})`;
};

// hsla(120, 100%, 50%, 0.3)
export function cssHsla(h,s,l,a) {
  return `hsla(${h * 360}, ${s * 100}%, ${l*100}%, ${a/255})`;

}

export function normalizeHsb([h, s, b]) {
  return [u.map(h, 0, 360, 0, 1),
          u.map(s, 0, 100, 0, 1),
          u.map(b, 0, 100, 0, 1)];
}

export function shifter(rgba = Palette.Blue) {
  let [h, s, l, a] = hsla(rgba);

  const base = [h, s, l, a];

  // https://stackoverflow.com/a/57539098/3994249
  function shift(a, b) {
    let r = (a + b);
    return r === 1 ? 1 : r % 1;
  }

  const fluent = f => (...args) => {
    f(...args);
    return this;
  };

  this.reset = fluent(_ => {
    h = base[0];
    s = base[1];
    l = base[2];
    a = base[3];
  });

  this.base = fluent(() => {
    base[0] = h;
    base[1] = s;
    base[2] = l;
    base[3] = a;
  });

  this.hue = fluent(dv => h = dv);
  this.sat = fluent(dv => s = dv);
  this.lum = fluent(dv => l = dv);
  this.alp = fluent(dv => a = dv*255);

  this.hsl = fluent(dv => {
    h = dv[0];
    s = dv[1];
    l = dv[2];
  });

  this.hsb = fluent(dv => {
    h = dv[0] / 360;
    s = dv[1] / 100;
    l = dv[2] / 100;
  });

  this.rgba = () => hslToRgba(h, s, l, a);
  this.css = () => cssHsla(h, s, l, a);
}
