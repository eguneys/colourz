# colourz
Manipulate colors using hsv, rgba and use as css, hex string or integer array


Install: `yarn add colourz --save`

Use:

```
    import * as co from 'colourz'

    let myColor = new co.shifter();

    // set hue saturation luminance and alpha values between 0 and 1
    myColor
        .hue(0.5)
        .sat(0.4)
        .lum(0.3)
        .alp(1.0);

    console.log(myColor.css()); // `hsla(0.5, 0.4, 0.3, 1.0)`
    
```


#### Constructor

```
    let color = new co.shifter(/*rgba color*/);
    color = new co.shifter(co.Palette.Blue);
```

Takes an rgba color in format `0xaarrggbb` where `a` is `alpha` `rgb` is other colors. You can also use predefined colors from [#Palette].

#### Methods

```
   color
    .hue(0.1)
    .sat(0.1)
    .lum(0.1)
    .alp(1.0)
```

_.hue_, _.sat_ _.lum_ _.alp_ sets the hue, saturation, luminance and alpha values between _0 and 1_.

`color.hsl([h, s, l])` sets hsl from a single array of h s l values in range 0 and 1.

`color.hsb([h, s, b])` sets hsl from a single array of h s b values in range _h 360_ _s 100_ _b 100_.

`color.reset()` reset the hue saturation luminance and alpha values to base values.

`color.base()` set the current color values as the base values. So the _.reset_ will reset to current values.

#### Palette

Defines predefined color values in Palette format `0xaarrggbb` to pass to the constructor. See [colors.js](https://github.com/eguneys/colourz/blob/master/src/colors.js) for all defined colors.

```
    co.Palette.Blue
    co.Palette.SwanWhite
    co.Palette.CrocTooth
    co.Palette.SummerSky
    co.Palette.GreyPorc
    co.Palette.Pumpkin
    co.Palette.CelGreen
    co.Palette.FluRed
    co.Palette.Mandarin
    co.Palette.LuckyP
    co.Palette.ChileanFire
```

#### Misc

`co.arr(rgba)` Converts a color defined in Palette format to array format. Eg: `co.arr(0xaarrggbb)` gives `[r, g, b, a]`;

`co.fromArr([r, g, b, a])` Converts a color in array format to Palette format. 

`hslToRgba(h, s, l, a)` Converts `h, s, l, a` values into Palette format.

`css(/* colour in Palette format */)` returns Css color property in `rgba(r, g, b, a)` format.
