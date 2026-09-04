export type UnitCategory = { name: string; units: Record<string, number> }

/** Each unit's value is its size relative to the category's base unit (factor 1). */
export const UNIT_CATEGORIES: Record<string, UnitCategory> = {
  length: {
    name: 'Length',
    units: { meter: 1, kilometer: 1000, centimeter: 0.01, millimeter: 0.001, mile: 1609.344, yard: 0.9144, foot: 0.3048, inch: 0.0254 },
  },
  weight: {
    name: 'Weight',
    units: { kilogram: 1, gram: 0.001, milligram: 0.000001, pound: 0.45359237, ounce: 0.028349523125, ton: 1000 },
  },
  temperature: { name: 'Temperature', units: { celsius: 1, fahrenheit: 1, kelvin: 1 } },
  data: {
    name: 'Data',
    units: { byte: 1, kilobyte: 1024, megabyte: 1024 ** 2, gigabyte: 1024 ** 3, terabyte: 1024 ** 4 },
  },
}

export function convertUnit(category: string, from: string, to: string, value: number): number {
  if (category === 'temperature') return convertTemperature(from, to, value)
  const { units } = UNIT_CATEGORIES[category]
  return (value * units[from]) / units[to]
}

function convertTemperature(from: string, to: string, value: number): number {
  const toCelsius: Record<string, (v: number) => number> = {
    celsius: (v) => v,
    fahrenheit: (v) => ((v - 32) * 5) / 9,
    kelvin: (v) => v - 273.15,
  }
  const fromCelsius: Record<string, (v: number) => number> = {
    celsius: (v) => v,
    fahrenheit: (v) => (v * 9) / 5 + 32,
    kelvin: (v) => v + 273.15,
  }
  return fromCelsius[to](toCelsius[from](value))
}
