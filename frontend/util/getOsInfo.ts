interface Os {
  name: string
  regex: RegExp
  isMobile: boolean
}

const osInfos: Array<Os> = [
  { name: 'iPhone', regex: /iphone/i, isMobile: true },
  { name: 'iPad', regex: /ipad/i, isMobile: true },
  { name: 'iPod', regex: /ipod/i, isMobile: true },
  { name: 'Android', regex: /android/i, isMobile: true },
  { name: 'Samsung', regex: /samsung/i, isMobile: true },
  { name: 'Opera Mini', regex: /Opera Mini/i, isMobile: true },
  { name: 'Windows Phone', regex: /windows phone/i, isMobile: true },
  { name: 'IE Mobile', regex: /IEMobile/i, isMobile: true },
  { name: 'WP Desktop', regex: /WPDesktop/i, isMobile: true },
  { name: 'Blackberry', regex: /blackberry/i, isMobile: true },
  { name: 'Windows', regex: /windows nt/i, isMobile: false },
  { name: 'Mac', regex: /macintosh/i, isMobile: false },
  { name: 'Linux', regex: /linux/i, isMobile: false },
  { name: 'Wii', regex: /wii/i, isMobile: false },
  { name: 'Playstation', regex: /playstation/i, isMobile: false },
  { name: 'Curl', regex: /curl/i, isMobile: false },
]

interface OsVersion {
  version: string
  regex: RegExp
}

const osVersions: Array<OsVersion> = [
  { version: "Windows 10/11", regex: /windows nt 10\.0/i},
  { version: "Windows 81", regex: /windows nt 6\.3/i},
  { version: "Windows 8", regex: /windows nt 6\.2/i},
  { version: "Windows 7", regex: /windows nt 6\.1/i},
  { version: "Unknown Windows", regex: /windows nt 6\.\d+/i},
  { version: "Windows Vista", regex: /windows nt 6\.0/i},
  { version: "Windows 2003", regex: /windows nt 5\.2/i},
  { version: "Windows XP", regex: /windows nt 5\.1/i},
  { version: "Windows 2000", regex: /windows nt 5\.0/i},
  { version: "Windows Phone 8", regex: /windows phone 8\./},
  { version: "OSX Cheetah", regex: /os x 10[._]0/i},
  { version: "OSX Puma", regex: /os x 10[._]1(\D|$)/i},
  { version: "OSX Jaguar", regex: /os x 10[._]2/i},
  { version: "OSX Panther", regex: /os x 10[._]3/i},
  { version: "OSX Tiger", regex: /os x 10[._]4/i},
  { version: "OSX Leopard", regex: /os x 10[._]5/i},
  { version: "OSX SnowLeopard", regex: /os x 10[._]6/i},
  { version: "OSX Lion", regex: /os x 10[._]7/i},
  { version: "OSX Mountain Lion", regex: /os x 10[._]8/i},
  { version: "OSX Mavericks", regex: /os x 10[._]9/i},
  { version: "OSX Yosemite", regex: /os x 10[._]10/i},
  { version: "OSX ElCapitan", regex: /os x 10[._]11/i},
  { version: "OSX Sierra", regex: /os x 10[._]12/i},
  { version: "OSX HighSierra", regex: /os x 10[._]13/i},
  { version: "OSX Mojave", regex: /os x 10[._]14/i},
  { version: "OSX Catalina", regex: /os x 10[._]15/i},
  { version: "OSX BigSur", regex: /os x 11/i},
  { version: "OSX Monterey", regex: /os x 12/i},
  { version: "OSX Ventura", regex: /os x 12/i},
  { version: "iOS", regex: /os x/i},
  { version: "Linux", regex: /linux/i},
  { version: "Linux 64", regex: /linux x86_64/i},
  { version: "Chrome OS", regex: /cros/i},
  { version: "Wii", regex: /wii/i},
  { version: "PS3", regex: /playstation 3/i},
  { version: "PSP", regex: /playstation portable/i},
  { version: "iPad", regex: /\(iPad.*os (\d+)[._](\d+)/i},
  { version: "iPhone", regex: /\(iphone.*os (\d+)[._](\d+)/i},
  { version: "Bada", regex: /Bada\/(\d+)\.(\d+)/i},
  { version: "Curl", regex: /curl\/(\d+)\.(\d+)\.(\d+)/i}
]


const getOSVersion = (source: string): OsVersion => {
  const osVersionFinded = osVersions.filter((os) => {
    return os.regex.test(source)
  })
  return osVersionFinded.length > 0 ? osVersionFinded[0] : { version: 'unknown', regex: /unknown/i }
}

const getOsInfoMethod = (source: string): Os => {
  const osFinded = osInfos.filter((os) => {
    return os.regex.test(source)
  })
  return osFinded.length > 0 ? osFinded[0] : { name: 'unknown', isMobile: false, regex: /unknown/i }
}

interface OsInfo {
  name: string
  version: string
  isMobile: boolean
}

export const getOsInfo = (): OsInfo => {
  
  const source = navigator.userAgent

  const { name, isMobile } = getOsInfoMethod(source)
  const { version } = getOSVersion(source)

  return {
    name,
    isMobile,
    version
  }

}