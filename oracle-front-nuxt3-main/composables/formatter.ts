export function formatChange(percent: number): string {
  const abs = Math.abs(percent).toFixed(1)
  const sign = percent < 0 ? '-' : '+'
  return `${sign}${abs}%`
}

export function getInitials(fullName: string, maxLetters: number = 2): string {
  if (!fullName) return ''
  const words = fullName.trim().split(/\s+/)
  const letters = words.map(word => word.charAt(0).toUpperCase())
  return letters.slice(0, maxLetters).join('')
}

export function sanitizeAmountInput(input: string): string {
  return input
    .replace(/[^0-9.]/g, '')
    .replace(/^(\d*\.\d{0,2}).*$/, '$1')
}


/**
 * Convert Hex color to rgb
 * @param hex
 */
export const hexToRgb = (hex: string) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i

  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  
  return result ? `${Number.parseInt(result[1], 16)},${Number.parseInt(result[2], 16)},${Number.parseInt(result[3], 16)}` : null
}

/**
 *RGBA color to Hex color with / without opacity
 */
export const rgbaToHex = (rgba: string, forceRemoveAlpha = false) => {
  return (`#${rgba
    .replace(/^rgba?\(|\s+|\)$/g, '') // Get's rgba / rgb string values
    .split(',') // splits them at ","
    .filter((string, index) => !forceRemoveAlpha || index !== 3)
    .map(string => Number.parseFloat(string)) // Converts them to numbers
    .map((number, index) => (index === 3 ? Math.round(number * 255) : number)) // Converts alpha to 255 number
    .map(number => number.toString(16)) // Converts numbers to hex
    .map(string => (string.length === 1 ? `0${string}` : string)) // Adds 0 when length of one number is 1
    .join('')}`)
}

export const formatCurrency = (value: number, currency: string) => {
  let sign = ''

  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    RUB: '₽',
    GBP: '£',
    JPY: '¥',
    CNY: '¥',
    UAH: '₴',
    KZT: '₸',
    BYN: 'Br',
    TRY: '₺',
    INR: '₹',
  }
  
  if (currency && currencySymbols[currency]) {
    sign = currencySymbols[currency]
  } else if (currency) {
    sign = currency
  } else {
    sign = ''
  }

  const valueStr = value.toFixed(2)
  const [integer, decimal = ''] = valueStr.split('.')

  let originalDecimal = ''
  if (value % 1 !== 0) {
    const match = value.toString().match(/\.(\d+)/)
    if (match && match[1].length > 2) {
      originalDecimal = match[1]
    }
  }

  let decimalPart = ''
  if (originalDecimal) {
    decimalPart = originalDecimal
  } else {
    decimalPart = decimal.padEnd(2, '0')
  }

  const full =
    Number(integer).toLocaleString('en-US') +
    (decimalPart.length > 0 ? '.' + decimalPart : '.00')

  const withCurrency = `${full} ${sign}`.trim()

  return {
    full,         // Полное число с разделителями тысяч и всеми знаками после запятой
    sign,         // Знак валюты (символ или сокращение)
    integer,      // Целая часть
    decimal: decimalPart,      // Десятичная часть (строка, минимум "00")
    withCurrency  // Число с валютой (например, "1,234.56789 $")
  }
}

/**
 * Форматтер для ввода чисел.
 * Убирает все символы кроме цифр и точки.
 * Удаляет ведущий 0, если после него нет точки.
 * Ограничивает количество знаков после запятой, если указано.
 * 
 * @param {string | number} input - Входное значение (строка или число)
 * @param {number} [maxDecimals] - Максимальное количество знаков после запятой (необязательно)
 * @returns {number} - Отформатированное число
 */
export function formatInputNumber(input: string | number, maxDecimals?: number): number {
  let str = String(input)
    // Удаляем все символы кроме цифр и точки, а также явно запрещаем +, -, e, E, ё, е (русские и латинские)
    .replace(/[^\d.]/g, '') // только цифры и точка
    .replace(/\.{2,}/g, '.') // заменяем двойные точки на одну
    .replace(/^(\d*\.\d*)\./g, '$1'); // только одна точка

  // Удаляем ведущие нули, если нет точки после них
  str = str.replace(/^0+(\d)/, '$1');
  // Если строка начинается с точки, добавляем 0 перед точкой
  if (str.startsWith('.')) str = '0' + str;

  // Ограничиваем количество знаков после запятой, если указано
  if (typeof maxDecimals === 'number' && maxDecimals >= 0) {
    const [intPart, decPart] = str.split('.');
    if (decPart !== undefined) {
      str = intPart + '.' + decPart.slice(0, maxDecimals);
    }
  }

  // Если строка пустая или невалидная, возвращаем 0
  const num = parseFloat(str);
  return isNaN(num) ? 0 : num;
}
