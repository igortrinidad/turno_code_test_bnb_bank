export const useFormatDateTime = (
  date: any,
  time = false,
  items = ["YYYY", "MM", "DD"],
  locale = null
) => {
  return !date
    ? null
    : useDayJs.tz(date).format(useLocaleDatetimeFormat(time, items, locale))
}


export const useFormatTimezonedDate = (
  date: any,
  timezone: string = "America/Sao_Paulo",
  time = false,
  items = ["YYYY", "MM", "DD"],
  locale = null
) => {
  return !date
    ? null
    : useDayJs
        .utc(date)
        .tz(timezone)
        .format(useLocaleDatetimeFormat(time, items, locale))
}

export const useFormatSimpleDate = (date: any, format = "MM/DD/YYYY") => {
  return useDayJs(date).format(format)
}

export const useLocaleDatetimeFormat = (
  time = false,
  items = ["YYYY", "MM", "DD"],
  locale: any = "pt"
) => {
  // if(!locale) {
  //   locale = useI18n().locale.value
  // }
  let order: string[] = []
  if (locale == "en") {
    order = ["YYYY", "MM", "DD"]
  } else {
    order = ["MM", "DD", "YYYY"]
  }
  return (
    items
      .sort((a: string, b: string) => order.indexOf(a) - order.indexOf(b))
      .join("/") + (time ? " HH:mm:ss" : "")
  )
}

export const useHowMuchTimeAgo = (date: any, showDateAfter: null, ...args: any[]) => {
  if(!showDateAfter) {
    return useDayJs().locale('pt-br').to(date)
  }

  const currentDate = useDayJs()
  const diff = currentDate.diff(date, 'days')
  if(diff > showDateAfter) {
    return useFormatDateTime(date, ...args)
  } else {
    return useDayJs().locale('pt-br').to(date)
  }
}

export const useFormatSecondsToDuration = (seconds: number, format: string = 'HH:mm:ss') => {
  return useDayJs.duration(seconds, "seconds").format(format)
}
