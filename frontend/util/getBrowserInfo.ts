
interface BrowserInfoInterface {
  browser: string
  browser_version: string
  timezone: string
  hardware_concurrency: number
  default_language: string
  languages: string[]
}

interface BrowserListItemInterface {
  name: Array<string>
  keywords?: Array<string>
  cb?: any
}

const testBrave = () => {
  return ('brave' in navigator) ? true : false
}

const browsers = [
  { name: ['Brave'], cb: testBrave },
  { name: ['Instagram'], keywords: ['instagram'] },
  { name: ['Facebook'], keywords: ['fbav'] },
  { name: ['Pinterest'], keywords: ['pinterest'] },
  { name: ['Facebook Bot', 'FacebookBot'], keywords: ['facebookexternalhit'] },
  { name: ['Web Page Test Bot', 'WebPageTest.org bot'], keywords: ['ptst'] },
  { name: ['Opera'], keywords: ['OPR'] },
  { name: ['LightHouse Page Test Bot', 'Chrome Mobile'], keywords: ['chrome-lighthouse'] },
  { name: ['Googlebot'], keywords: ['Googlebot'] },
  { name: ['MiuiBrowser'], keywords: ['XiaoMi/MiuiBrowser'] },
  { name: ['Samsung Browser', 'Samsung Internet', 'Brave'], keywords: ['SamsungBrowser'] },
  { name: ['Chrome Mobile iOS'], keywords: ['CriOS'] },
  { name: ['Chrome Mobile'], keywords: ['android','chrome'] },
  { name: ['Safari Mobile', 'Mobile Safari'], keywords: ['iphone', 'mac os x', 'safari'] },
  { name: ['Safari'], keywords: ['macintosh', 'mac os x', 'safari'] },
  { name: ['Edge'], keywords: ['windows', 'edge'] },
  { name: ['Chromium'], keywords: ['chromium'] },
  { name: ['Chrome'], keywords: ['chrome'] },
  { name: ['Firefox'], keywords: ['firefox'] },
  { name: ['IE'], keywords: ['msie'] },
  { name: ['Amaya'], keywords: ['amaya'] },
  { name: ['Konqueror'], keywords: ['konqueror'] },
  { name: ['Epiphany'], keywords: ['epiphany'] },
  { name: ['SeaMonkey'], keywords: ['seamonkey'] },
  { name: ['Flock'], keywords: ['flock'] },
  { name: ['OmniWeb'], keywords: ['omniweb'] },
  { name: ['PS3'], keywords: ['playstation'] },
  { name: ['PSP'], keywords: [] },
  { name: ['WinJs'], keywords: ['msapphost'] },
  { name: ['PhantomJS'], keywords: ['phantomjs'] },
  { name: ['unknown'], keywords: ['.+'] },
]

function createRegex(words: any) {
  const regex = new RegExp(`${words.map((word: any) => `\\b(?=\\w*${word})\\b`).join(".+")}`, "gi")
  return regex
}

export const getBrowser = (source: string): BrowserListItemInterface => {
  return browsers.find((browser) => {
    if(browser.cb) return browser.cb()
    const regex = createRegex(browser.keywords)
    return regex.test(source)
  }) ?? { name: ['Unknown'], keywords: [] }
}

const getBrowserVersion = (source:string): string => {

    let matches=source.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
    let temp
    matches=matches[2]? [matches[1], matches[2]]: [navigator.appName, navigator.appVersion, '-?']

    // Trident.
    if(/trident/i.test(matches[1])) {
      temp=/\brv[ :]+(\d+)/g.exec(source) || []; 
      return (temp[1]||'');
    }

    // Chrome.
    if(matches[1]==='Chrome') {
      temp = source.match(/\bOPR|Edge\/(\d+)/)
      if(temp != null && temp[1]) return temp[1]
    }

    if((temp=source.match(/version\/(\d+)/i))!=null) {
      matches.splice(1,1,temp[1]);                                                                                   
    }

    return matches[1]
}

const getTimezone = (): string => {
  const intl = window.Intl;
  if (intl && intl.DateTimeFormat) {
    const timeZone = (new intl.DateTimeFormat()).resolvedOptions().timeZone;
    if (timeZone) {
      return timeZone;
    }
  }

  const currentYear = (new Date()).getFullYear();
  const timezoneOffset = -Math.max(
    Math.abs(new Date(currentYear, 0, 1).getTimezoneOffset()),
    Math.abs(new Date(currentYear, 6, 1).getTimezoneOffset())
  );
  return "UTC" + (timezoneOffset >= 0 ? "+" : "") + Math.abs(timezoneOffset);
}

const getHardwareConcurrency = (): number => {
  return navigator.hardwareConcurrency || 1;
}

const getLanguages = (): Array<string> => {
  return [...navigator.languages] || [navigator.language]
}

export const getBrowserInfo = (): BrowserInfoInterface => {

  const source = navigator.userAgent
  const { name } = getBrowser(source)
  const browser_version = getBrowserVersion(source)
  const timezone = getTimezone()
  const hardware_concurrency = getHardwareConcurrency()
  const languages = getLanguages()
  const default_language = navigator.language || languages[0]

  return { 
    browser: name[0], 
    browser_version, 
    timezone, 
    hardware_concurrency, 
    languages, 
    default_language 
  }
}