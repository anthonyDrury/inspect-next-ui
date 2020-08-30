import { WeatherListItem } from "../types/openWeather.types";
import moment from "moment";
import {
  WeatherInspectionVariables,
  WeatherPreviewType,
  ViableWeather,
  WeatherReasonObj,
  WeatherReason,
  WeatherValidity,
} from "../types/weather.type";

// Used to map the weatherAPI response into a map of Map<date_key, Map<hour_key, weatherItem>>
export function mapListToWeatherMap(
  list: WeatherListItem[],
  utcOffset: number
): Map<string, Map<string, WeatherListItem>> {
  // Map of Dates
  // Includes Map of hour-times
  const dayList: Map<string, Map<string, WeatherListItem>> = new Map();

  list.forEach((item: WeatherListItem): void => {
    const dateOf: string = getWeatherTimeToLocal(item.dt_txt, utcOffset).format(
      "DD-MM"
    );
    const hourOf: string = getWeatherTimeToLocal(item.dt_txt, utcOffset).format(
      "HH"
    );

    // If Date is not present, add
    if (!dayList.has(dateOf)) {
      dayList.set(dateOf, new Map([[hourOf, item]]));
    } else {
      // if Time is not present add
      if (!dayList.get(dateOf)?.has(hourOf)) {
        dayList.get(dateOf)?.set(hourOf, item);
      }
    }
  });
  return dayList;
}

export function getWeatherInfo(
  weatherList: WeatherListItem[],
  weatherVars: WeatherInspectionVariables,
  utcOffset: number,
  sunriseTime: number,
  sunsetTime: number
): WeatherPreviewType {
  // [min, max]
  const tempArr: [number, number] = [999, -999];
  const windArr: [number, number] = [999, -999];
  let rainAmount: number = 0;
  let snowAmount: number = 0;
  let nine: WeatherListItem | undefined;
  let three: WeatherListItem | undefined;

  weatherList.forEach((listItem: WeatherListItem): void => {
    if (listItem.main.temp_max > tempArr[1]) {
      tempArr[1] = listItem.main.temp_max;
    }
    if (listItem.main.temp_min < tempArr[0]) {
      tempArr[0] = listItem.main.temp_min;
    }
    if (listItem.wind.speed < windArr[0]) {
      windArr[0] = listItem.wind.speed;
    }
    if (listItem.wind.speed > windArr[1]) {
      windArr[1] = listItem.wind.speed;
    }
    if (listItem.rain) {
      rainAmount += listItem.rain["3h"];
    }
    if (listItem.snow) {
      snowAmount += listItem.snow["3h"];
    }

    if (
      getWeatherTimeToLocal(listItem.dt_txt, utcOffset).format("h A") === "3 PM"
    ) {
      three = listItem;
    } else if (
      getWeatherTimeToLocal(listItem.dt_txt, utcOffset).format("h A") === "9 AM"
    ) {
      nine = listItem;
    }
  });

  const viableTypes: ViableWeather = getViableWeatherSlots(
    weatherList,
    weatherVars,
    utcOffset,
    sunriseTime,
    sunsetTime
  );

  return {
    minTemp: tempArr[0],
    maxTemp: tempArr[1],
    minWind: windArr[0],
    maxWind: windArr[1],
    rainAmount: Number(rainAmount.toFixed(0)),
    snowAmount: Number(snowAmount.toFixed(0)),
    isViable: viableTypes.isOptimal || viableTypes.isViable,
    threePM: three,
    nineAM: nine,
    defaultWeather: nine !== undefined ? nine : weatherList[0],
    viableTypes,
  };
}

function isWeatherViable(
  weatherItem: WeatherListItem,
  weatherVars: WeatherInspectionVariables,
  utcOffset: number,
  sunriseTime: number,
  sunsetTime: number
): WeatherReasonObj {
  const sunrise: number = moment
    .unix(sunriseTime)
    .utc()
    .utcOffset(utcOffset / 60)
    .hours();
  const sunset: number = moment
    .unix(sunsetTime)
    .utc()
    .utcOffset(utcOffset / 60)
    .hours();
  const isDaylight: boolean =
    getWeatherTimeToLocal(weatherItem.dt_txt, utcOffset).hours() >= sunrise &&
    getWeatherTimeToLocal(weatherItem.dt_txt, utcOffset).hours() < sunset;
  const isRainViable: boolean =
    weatherItem.rain === undefined ||
    weatherItem.rain["3h"] <= weatherVars.viaRainMax;
  const isTooHot: boolean = weatherItem.main.temp_max > weatherVars.viaTempMax;
  const isTooCold: boolean = weatherItem.main.temp_min < weatherVars.viaTempMin;
  const isWindViable: boolean =
    weatherItem.wind.speed <= weatherVars.viaWindMax;
  return {
    isDaylight,
    isTooWet: !isRainViable,
    isTooCold,
    isTooHot,
    isTooWindy: !isWindViable,
  };
}

function isWeatherOptimal(
  weatherItem: WeatherListItem,
  weatherVars: WeatherInspectionVariables,
  utcOffset: number,
  sunriseTime: number,
  sunsetTime: number
): WeatherReasonObj {
  const sunrise: number = moment
    .unix(sunriseTime)
    .utc()
    .utcOffset(utcOffset / 60)
    .hours();
  const sunset: number = moment
    .unix(sunsetTime)
    .utc()
    .utcOffset(utcOffset / 60)
    .hours();
  const isDaylight: boolean =
    getWeatherTimeToLocal(weatherItem.dt_txt, utcOffset).hours() >= sunrise &&
    getWeatherTimeToLocal(weatherItem.dt_txt, utcOffset).hours() < sunset;
  const isRainOptimal: boolean =
    weatherItem.rain === undefined ||
    weatherItem.rain["3h"] <= weatherVars.optRainMax;
  const isTooHot: boolean = weatherItem.main.temp_min > weatherVars.optTempMax;
  const isTooCold: boolean = weatherItem.main.temp_min < weatherVars.optTempMin;
  const isWindViable: boolean =
    weatherItem.wind.speed <= weatherVars.optWindMax;

  return {
    isDaylight,
    isTooWet: !isRainOptimal,
    isTooCold,
    isTooHot,
    isTooWindy: !isWindViable,
  };
}

function getIsWeatherValid(weatherReason: WeatherReasonObj): boolean {
  return (
    weatherReason.isDaylight &&
    !weatherReason.isTooCold &&
    !weatherReason.isTooHot &&
    !weatherReason.isTooWet &&
    !weatherReason.isTooWindy
  );
}
function getViableWeatherSlots(
  weatherList: WeatherListItem[],
  weatherVars: WeatherInspectionVariables,
  utcOffset: number,
  sunriseTime: number,
  sunsetTime: number
): ViableWeather {
  const viableTimes: WeatherValidity[] = [];
  const optimalTimes: WeatherValidity[] = [];
  const times: WeatherValidity[] = [];
  let isViable: boolean = false;
  let isOptimal: boolean = false;

  const isViableObjArr: WeatherReasonObj[] = [];
  const isOptimalObjArr: WeatherReasonObj[] = [];

  weatherList.forEach((listItem: WeatherListItem, index: number): void => {
    isViableObjArr.push(
      isWeatherViable(listItem, weatherVars, utcOffset, sunriseTime, sunsetTime)
    );

    isOptimalObjArr.push(
      isWeatherOptimal(
        listItem,
        weatherVars,
        utcOffset,
        sunriseTime,
        sunsetTime
      )
    );
    if (getIsWeatherValid(isOptimalObjArr[index])) {
      optimalTimes.push({
        weather: listItem,
        isOptimal: true,
        isViable: true,
        reason: getMainReasonForDay(
          [
            isWeatherOptimal(
              listItem,
              weatherVars,
              utcOffset,
              sunriseTime,
              sunsetTime
            ),
          ],
          true
        ),
      });
      times.push({
        weather: listItem,
        isOptimal: true,
        isViable: true,
        reason: getMainReasonForDay(
          [
            isWeatherOptimal(
              listItem,
              weatherVars,
              utcOffset,
              sunriseTime,
              sunsetTime
            ),
          ],
          true
        ),
      });
      isOptimal = true;
    } else if (getIsWeatherValid(isViableObjArr[index])) {
      viableTimes.push({
        weather: listItem,
        isOptimal: false,
        isViable: true,
        reason: getMainReasonForDay(
          [
            isWeatherOptimal(
              listItem,
              weatherVars,
              utcOffset,
              sunriseTime,
              sunsetTime
            ),
          ],
          true
        ),
      });
      times.push({
        weather: listItem,
        isOptimal: false,
        isViable: true,
        reason: getMainReasonForDay(
          [
            isWeatherOptimal(
              listItem,
              weatherVars,
              utcOffset,
              sunriseTime,
              sunsetTime
            ),
          ],
          true
        ),
      });
      isViable = true;
    } else {
      times.push({
        weather: listItem,
        isOptimal: false,
        isViable: false,
        reason: getMainReasonForDay(
          [
            isWeatherOptimal(
              listItem,
              weatherVars,
              utcOffset,
              sunriseTime,
              sunsetTime
            ),
          ],
          false
        ),
      });
    }
  });

  return {
    isOptimal,
    isViable,
    reason: getMainReasonForDay(
      isViable ? isOptimalObjArr : isViableObjArr,
      isViable
    ),
    times,
    optimalTimes,
    viableTimes,
  };
}

function getMainReasonForDay(
  reasonArr: WeatherReasonObj[],
  viable: boolean
): WeatherReason {
  let tooCold: number = 0;
  let tooHot: number = 0;
  let tooWindy: number = 0;
  let tooWet: number = 0;

  reasonArr.forEach((reasonObj: WeatherReasonObj): void => {
    if (reasonObj.isTooCold) {
      tooCold++;
    }
    if (reasonObj.isTooHot) {
      tooHot++;
    }
    if (reasonObj.isTooWindy) {
      tooWindy++;
    }
    if (reasonObj.isTooWet) {
      tooWet++;
    }
  });

  const weatherArr: [string, number][] = [
    ["wet", tooWet],
    ["hot", tooHot],
    ["cold", tooCold],
    ["windy", tooWindy],
  ];

  weatherArr.sort(
    (a: [string, number], b: [string, number]): number => b[1] - a[1]
  );

  const topCondition: [string, number] = weatherArr[0];
  if (topCondition[1] === 0) {
    return "Optimal";
  }

  if (topCondition[0] === "cold") {
    return viable ? "A bit cold" : "Too cold";
  }

  if (topCondition[0] === "hot") {
    return viable ? "A bit hot" : "Too hot";
  }

  if (topCondition[0] === "wet") {
    return viable ? "A bit wet" : "Too wet";
  }

  if (topCondition[0] === "windy") {
    return viable ? "A bit windy" : "Too windy";
  }

  // should never reach here
  return "Optimal";
}

export function getWeatherTimeToLocal(
  time: moment.Moment | string | Date,
  offset: number
) {
  return moment.utc(time).utcOffset(offset / 60);
}
