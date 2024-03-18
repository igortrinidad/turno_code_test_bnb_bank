
export const cpfValidator = (value: string | number) => {
  if(typeof value != 'string') {
    value = value.toString()
  }
  if (value.length < 14) return true

  let cpf = value.replace(/\D/g, '');
  if (cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return true;
  var result = false;
  [9, 10].forEach(function (j) {
    var soma = 0, r;
    cpf.split(/(?=)/).splice(0, j).forEach(function (e, i) {
      soma += parseInt(e) * ((j + 2) - (i + 1));
    });
    r = soma % 11;
    r = (r < 2) ? 0 : 11 - r;
    //@ts-expect-error
    if (r != cpf.substring(j, j + 1)) result = true;
  });
  return result;
}

export const bdayValidator = (value: string) => {
  if (!useDayJs(value).isValid()) return true
}

export const emailValidator = (value: string) => {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !re.test(String(value).toLowerCase());
}

export const phoneValidator = (value: string) => {
  if (!value || value.length < 14) return true
}

export const cepValidator = (value: string) => {
  if (!value || value.length < 9) return true
}

export const minValueValidator = (value: number, min = 0) => {
  if (!value || value < min) return true
}

export const minLength = (value: string, min = 6) => {
  if (!value || value.length < min) return true
}

export const minWords = (value = '', min = 2) => {
  if(value === null) value = ''
  return Boolean(value.split(/&nbsp| /).length < min)
}

export const notEmpty = (value = '') => {
  if([undefined, null, ''].includes(value)) return true
}

export const inputConfirmation = (first: any, second: any) => {
  if (first !== second) return true
}

export const fileValidation = (file: any) => {
  return Boolean(!file || !file.name)
}

export const dateIsValid = (date: string) => {
  //@ts-expect-error
  const dateParsed = useDayJs().customParse(date)
  if(!dateParsed || !dateParsed.isValid) return true
  return Boolean(!dateParsed.isValid())
}

export const booleanShouldBeTrueValidation = (value: boolean) => {
  return Boolean(value != true)
}

export default {
  cpfValidator,
  bdayValidator,
  emailValidator,
  phoneValidator,
  cepValidator,
  minValueValidator,
  minLength,
  minWords,
  inputConfirmation,
  fileValidation,
  dateIsValid,
  booleanShouldBeTrueValidation,
  notEmpty,
} as any
