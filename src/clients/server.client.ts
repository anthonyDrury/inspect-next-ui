import { FiveDayForecast } from "../types/openWeather.types";
import { isStateValid } from "../common/support";
import { State } from "../types/redux.types";
import { AutocompleteResponse, Prediction } from "../types/google.type";
import { AutocompleteOption, Location } from "../types/location.type";
import { Routes } from "../common/routes";
import { WeatherMap } from "../types/weather.type";
import { mapListToWeatherMap } from "../common/weather.support";
import { Units } from "../types/app.type";
import Router from "next/dist/client/router";

export const API_URL: string =
  process.env.REACT_APP_API_URL || "http://localhost:80";

const routeToNotFound: () => void = (): void => {
  Router.push(Routes.LOCATION_NOT_FOUND);
};

export type FiveDayReturnObj =
  | undefined
  | {
      forecast: FiveDayForecast;
      mappedForecast: WeatherMap;
      location: Location;
      units: Units;
    };
export async function getFiveDay(
  location: Location,
  state: State
): Promise<FiveDayReturnObj> {
  if (!isStateValid("fiveDay", state) && !state.loading) {
    // store.dispatch(updateLoading(true));

    const response: Response = await fetch(
      `${API_URL}/fiveDay?cityName=${location.cityName}&countryName=${
        location.countryName
      }&units=${state.settings.units.toLowerCase()}`
    );

    // Typically means openWeather does not have the city
    if (response.status !== 200) {
      routeToNotFound();
      return undefined;
    }

    const body: Promise<FiveDayForecast> = response.json().catch(() => {
      routeToNotFound();
      return Promise.resolve(undefined);
    });

    return body.then((data: FiveDayForecast):
      | undefined
      | {
          forecast: FiveDayForecast;
          mappedForecast: WeatherMap;
          location: Location;
          units: Units;
        } => {
      if (data.list === undefined || data.list.length === 0) {
        routeToNotFound();
        return undefined;
      } else {
        const mappedForecast: WeatherMap = mapListToWeatherMap(data.list);
        return {
          forecast: data,
          mappedForecast,
          location,
          units: state.settings.units,
        };
      }
    });
  } else return undefined;
}

export async function getAutocomplete(
  input: string,
  sessionId: string
): Promise<AutocompleteOption[]> {
  const response: Response = await fetch(
    `${API_URL}/autocomplete?input=${input}&session=${sessionId}`
  );
  const body: Promise<AutocompleteResponse> = response.json();

  if (response.status !== 200) {
    throw Error((body as any).message);
  }

  return body.then((data: AutocompleteResponse): AutocompleteOption[] => {
    return data.predictions.map(
      (value: Prediction): AutocompleteOption => {
        return { description: value.description, terms: value.terms };
      }
    );
  });
}
