# Unit Conversion API

## Intro

This is a simple API that runs unit conversions on lengths, weights, volumes, pressures, speeds, etc.

## Length

/length/:from/:to

- From parameter must contain both the number and unit (i.e. 10cm, 9mi, 4m).

- To parameter must contain the unit to be converted to (i.e. in, km).

- An optional 'precision' query can be added as am integer to limit the number of decimals.