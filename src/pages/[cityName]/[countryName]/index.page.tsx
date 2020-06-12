import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../types/redux.types";
import DayPreviewList from "../../../components/DayPreviewList/DayPreviewList";
import { updateLocation } from "../../../redux/actions/location.actions";
import { Location } from "../../../types/location.type";
import {
  mapFromUrlSafeLocation,
  doLocationMatch,
  updatePageDescription,
} from "../../../common/routes";
import { isFiveDayValid } from "../../../common/support";
import { Typography, Container } from "@material-ui/core";
import { getFiveDay, FiveDayReturnObj } from "../../../clients/server.client";
import { updateFiveDayForecast } from "../../../redux/actions/weather.actions";
import { useRouter, NextRouter } from "next/router";
import SpinnerFallback from "../../../components/SpinnerFallback/SpinnerFallback";

type LocationSetProps = {
  params?: Location;
};
// displays the five day forecast
function LocationSetPage(props?: LocationSetProps): JSX.Element {
  const router: NextRouter = useRouter();
  const query: Location = router.query as Location;
  const state: State = useSelector((state: State) => state);
  const dispatch = useDispatch();

  useEffect((): void => {
    updatePageDescription(
      `${query?.cityName}, ${query?.countryName} forecast`,
      `Five day forecast for ${query?.cityName}, ${query?.countryName}`
    );
    if (state !== undefined && !isFiveDayValid(state, query)) {
      const safeParams: Location | undefined = mapFromUrlSafeLocation(query);

      if (!state.loading) {
        if (!doLocationMatch(state.location, query)) {
          dispatch(updateLocation(safeParams));
        }
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
  });

  return (
    <div className="in-location">
      <Container maxWidth={false} style={{ backgroundColor: "#f4f4f4" }}>
        <Typography variant="h3" component="h1">
          Forecast for
          <br />
          {query?.cityName}, {query?.countryName}
        </Typography>
        <SpinnerFallback condition={state.fiveDay !== undefined}>
          {state.fiveDay !== undefined ? (
            <DayPreviewList
              weatherMap={state.fiveDay?.mappedForecast}
              weatherConditions={state.settings.inspectionWeatherVars}
              utcOffset={state.fiveDay!.forecast.city.timezone}
              sunsetTime={state.fiveDay!.forecast.city.sunset}
              sunriseTime={state.fiveDay!.forecast.city.sunrise}
              units={state.settings.units}
            ></DayPreviewList>
          ) : null}
        </SpinnerFallback>
      </Container>
    </div>
  );
}

export default LocationSetPage;
