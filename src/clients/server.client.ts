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
    return fetch(
      `${API_URL}/fiveDay?address=${location.cityName},${
        location.countryName
      }&units=${state.settings.units.toLowerCase()}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    ).then(
      (response: Response): Promise<FiveDayReturnObj> => {
        // Typically means openWeather does not have the city
        if (response.status !== 200) {
          routeToNotFound();
          return Promise.resolve(undefined);
        }
        const body: Promise<FiveDayForecast> = response.json().catch(
          (): Promise<undefined> => {
            routeToNotFound();
            return Promise.resolve(undefined);
          }
        );
        return body.then((data: FiveDayForecast):
          | undefined
          | FiveDayReturnObj => {
          if (data.list === undefined || data.list.length === 0) {
            routeToNotFound();
            return undefined;
          } else {
            const mappedForecast: WeatherMap = mapListToWeatherMap(
              data.list,
              data.city.timezone
            );
            return {
              forecast: data,
              mappedForecast,
              location,
              units: state.settings.units,
            };
          }
        });
      }
    );
  } else return undefined;
}

export async function getAutocomplete(
  input: string,
  sessionId: string
): Promise<AutocompleteOption[]> {
  const response: Response = await fetch(
    `${API_URL}/autocomplete?input=${input}&session=${sessionId}`,
    {
      method: "GET",
    }
  );
  const body: Promise<AutocompleteResponse> = response.json();

  if (response.status !== 200) {
    throw Error((body as any).message);
  }

  return body.then((data: AutocompleteResponse): AutocompleteOption[] => {
    return data.predictions.map(
      (value: Prediction): AutocompleteOption => {
        return {
          description: value.description,
          terms: value.terms,
          placeID: value.placeID,
        };
      }
    );
  });
}
