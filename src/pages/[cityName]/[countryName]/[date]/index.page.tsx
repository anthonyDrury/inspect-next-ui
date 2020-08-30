import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { State } from "../../../../types/redux.types";
import { WeatherPreviewType } from "../../../../types/weather.type";
import { WeatherListItem } from "../../../../types/openWeather.types";
import {
  isStateValid,
  getRainAmount,
  getWindSpeed,
} from "../../../../common/support";
import moment from "moment";
import {
  getFiveDay,
  FiveDayReturnObj,
} from "../../../../clients/server.client";
import { getWeatherInfo } from "../../../../common/weather.support";
import { Location } from "../../../../types/location.type";
import { Grid, Button, Typography } from "@material-ui/core";
import HourInfoTable from "../../../../components/HourInfoTable/HourInfoTable";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePageDescription,
  safeUrlString,
  mapFromUrlSafeLocation,
} from "../../../../common/routes";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import SpinnerFallback from "../../../../components/SpinnerFallback/SpinnerFallback";
import { updateLocation } from "../../../../redux/actions/location.actions";
import { updateFiveDayForecast } from "../../../../redux/actions/weather.actions";

interface DatePageProps {
  state: State;
}
type DatePageState = {
  weatherPreview?: WeatherPreviewType;
  hourList?: WeatherListItem[];
  backRoute?: string;
};
function DatePage(props?: DatePageProps): JSX.Element {
  const router: NextRouter = useRouter();
  const state: State = useSelector((state: State) => state);
  const dispatch = useDispatch();
  const query: Location & { date: string } = router.query as any;
  const [localState, setLocalState]: [DatePageState, any] = useState(
    computeLocalState()
  );

  function computeLocalState(): DatePageState {
    const hourList: WeatherListItem[] | undefined = getWeatherListForDate();
    return {
      weatherPreview:
        hourList !== undefined ? getWeatherInfoForDate(hourList) : undefined,
      hourList,
    };
  }

  function getBackRoute(): string | undefined {
    let backRoute: string | undefined;
    if (state?.location !== undefined) {
      backRoute = `/${safeUrlString(state?.location?.cityName)}/${safeUrlString(
        state?.location?.countryName
      )}/`;
    }
    return backRoute;
  }

  useEffect((): void => {
    updatePageDescription(
      `${state?.location?.cityName}, ${state?.location?.countryName} ${moment(
        localState.weatherPreview?.defaultWeather.dt_txt
      ).format("dddd MMMM-DD")} forecast`,
      `${state?.location?.cityName}, ${
        state?.location?.countryName
      } detailed forecast overview for ${moment(
        localState.weatherPreview?.defaultWeather.dt_txt
      ).format("dddd MMMM-DD")}`
    );

    setLocalState({ ...computeLocalState(), backRoute: getBackRoute() });

    if (state !== undefined && !isStateValid("fiveDay", state)) {
      const safeParams: Location | undefined = mapFromUrlSafeLocation(query);

      if (!state?.loading) {
        dispatch(updateLocation(safeParams));
        if (safeParams !== undefined) {
          getFiveDay(safeParams, state).then(
            (value: FiveDayReturnObj): void => {
              dispatch({ type: "UPDATE_LOADING", payload: { loading: false } });
              if (value !== undefined) {
                dispatch(
                  updateFiveDayForecast({
                    forecast: value.forecast,
                    mappedForecast: value.mappedForecast,
                    location: value.location,
                    units: value.units,
                  })
                );
              }
            }
          );
          dispatch({ type: "UPDATE_LOADING", payload: { loading: true } });
        }
      }
    }

    // eslint-disable-next-line
  }, [state]);

  function getWeatherListForDate(): WeatherListItem[] | undefined {
    if (
      query.date !== undefined &&
      state !== undefined &&
      state.fiveDay !== undefined
    ) {
      const day: string = moment(query.date).format("DD-MM");
      const values:
        | IterableIterator<WeatherListItem>
        | undefined = state.fiveDay?.mappedForecast.get(day)?.values();
      return values !== undefined ? Array.from(values) : values;
    }
    return undefined;
  }

  function getWeatherInfoForDate(
    weatherList: WeatherListItem[]
  ): WeatherPreviewType | undefined {
    if (
      props !== undefined &&
      state !== undefined &&
      state.fiveDay !== undefined
    ) {
      return getWeatherInfo(
        weatherList,
        state.settings.inspectionWeatherVars,
        state.fiveDay.forecast.city.timezone,
        state.fiveDay.forecast.city.sunrise,
        state.fiveDay.forecast.city.sunset
      );
    }
    return undefined;
  }

  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
      }}
    >
      <Grid
        container
        style={{
          maxWidth: " 50rem",
          margin: "0 auto",
        }}
      >
        <Grid item xs={12} style={{ marginBottom: "0.5rem" }}>
          <Link
            href={localState.backRoute ? localState.backRoute : ""}
            passHref
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                marginTop: "0.5rem",
                position: "absolute",
                left: "0.5rem",
              }}
            >
              Back to week
            </Button>
          </Link>
          <Typography variant="h3" component="h1" style={{ marginTop: "3rem" }}>
            {moment(localState.weatherPreview?.defaultWeather.dt_txt).format(
              "dddd MMMM-DD"
            )}
          </Typography>
          <Typography variant="h4" component="h2">
            {state?.location?.cityName}, {state?.location?.countryName}
          </Typography>
        </Grid>
        <SpinnerFallback condition={localState.weatherPreview !== undefined}>
          <Grid
            container
            alignContent="center"
            alignItems="center"
            justify="flex-start"
            direction="column"
            item
            xs={6}
            sm={4}
            style={{
              borderTop: " 1px solid black",
              backgroundColor: "#d8d8dd",
            }}
          >
            <Typography variant="h6" component="p">
              {
                localState?.weatherPreview?.defaultWeather.weather[0]
                  .description
              }
            </Typography>
            <img
              src={`/weatherIcons/${localState.weatherPreview?.defaultWeather.weather[0]?.icon?.replace(
                "n",
                "d"
              )}@2x.png`}
              alt="weather icon"
            ></img>
          </Grid>
          <Grid
            item
            container
            alignContent="center"
            alignItems="center"
            justify="space-between"
            direction="column"
            xs={6}
            sm={2}
            style={{
              borderTop: " 1px solid black",
              backgroundColor: "#d8d8dd",
            }}
          >
            <Typography variant="h6" component="p">
              {localState?.weatherPreview?.viableTypes.isOptimal
                ? "Optimal"
                : localState?.weatherPreview?.viableTypes.isViable
                ? "Viable"
                : "Inadvisable"}
            </Typography>
            {localState?.weatherPreview?.viableTypes.isViable ||
            localState?.weatherPreview?.viableTypes.isOptimal ? (
              <>
                <FontAwesomeIcon
                  size="3x"
                  color={
                    localState?.weatherPreview?.viableTypes.isOptimal
                      ? "green"
                      : "black"
                  }
                  icon={faCheckCircle}
                />
              </>
            ) : (
              <FontAwesomeIcon color="red" size="3x" icon={faTimesCircle} />
            )}
            <Typography component="p">
              {localState.weatherPreview?.viableTypes !== undefined &&
              !localState?.weatherPreview?.viableTypes.isOptimal
                ? localState.weatherPreview!.viableTypes.reason
                : null}
            </Typography>
          </Grid>

          <Grid
            item
            container
            alignContent="center"
            alignItems="center"
            justify="center"
            direction="column"
            xs={12}
            sm={6}
            style={{
              borderTop: " 1px solid black",
              textAlign: "left",
              lineHeight: 0,
              backgroundColor: "#d8d8dd",
            }}
          >
            <p className="in-text--large in-date-view-item__infoText">
              {localState?.weatherPreview?.minTemp}° -{" "}
              {localState?.weatherPreview?.maxTemp}°
            </p>
            <p className="in-text--large in-date-view-item__infoText">
              wind ({state.settings!.units === "Imperial" ? "MPH" : "KM/H"}) :{" "}
              {getWindSpeed(
                localState?.weatherPreview?.minWind,
                state.settings!.units
              )}{" "}
              -{" "}
              {getWindSpeed(
                localState?.weatherPreview?.minWind,
                state.settings!.units
              )}
            </p>
            <p className="in-date-view-item__infoText">
              rain:{" "}
              {`${getRainAmount(
                localState.weatherPreview?.rainAmount,
                state?.settings.units!
              )}${state?.settings.units === "Imperial" ? "in" : "mm"}`}
            </p>
            <p className="in-date-view-item__infoText">
              snow:{" "}
              {`${getRainAmount(
                localState.weatherPreview?.snowAmount,
                state?.settings.units!
              )}${state?.settings.units === "Imperial" ? "in" : "mm"}`}
            </p>
          </Grid>
          <Grid item xs={12}>
            {localState.weatherPreview !== undefined ? (
              <HourInfoTable
                weatherPreview={localState.weatherPreview!.viableTypes}
                units={state?.settings.units}
                utcOffset={state.fiveDay?.forecast.city.timezone || 60}
              />
            ) : null}
          </Grid>
        </SpinnerFallback>
      </Grid>
    </div>
  );
}

export default DatePage;
