import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import { State, Action } from "../../../types/redux.types";
import DayPreviewList from "../../../components/DayPreviewList/DayPreviewList";
import { updateLocation } from "../../../redux/actions/location.actions";
import { Location } from "../../../types/location.type";
import {
  mapFromUrlSafeLocation,
  doLocationMatch,
} from "../../../common/routes";
import { isFiveDayValid } from "../../../common/support";
import { Typography, Container } from "@material-ui/core";
import { yellow } from "@material-ui/core/colors";
import { useRouter, NextRouter } from "next/dist/client/router";
import { getFiveDay, FiveDayReturnObj } from "../../../clients/server.client";
import { updateFiveDayForecast } from "../../../redux/actions/weather.actions";
import { FiveDayForecast } from "../../../types/openWeather.types";
import { WeatherMap } from "../../../types/weather.type";
import { Units } from "../../../types/app.type";

type LocationSetProps = {
  updateLocation?: (d: Location | undefined) => void;
  updateFiveDay?: (
    f: FiveDayForecast,
    m: WeatherMap,
    l: Location,
    u: Units
  ) => void;
  state?: State;
};
// displays the five day forecast
function LocationSetPage(props?: LocationSetProps): JSX.Element {
  const router: NextRouter = useRouter();
  const query: Location = router.query as Location;

  useEffect((): void => {
    // updatePageDescription(
    //   `${query?.cityName}, ${query?.countryName} forecast`,
    //   `Five day forecast for ${query?.cityName}, ${query?.countryName}`
    // );
    if (props?.state !== undefined && !isFiveDayValid(props?.state, query)) {
      const safeParams: Location | undefined = mapFromUrlSafeLocation(query);

      if (props?.updateLocation !== undefined && !props.state?.loading) {
        if (!doLocationMatch(props.state.location, query)) {
          props.updateLocation(safeParams);
        }
        if (safeParams !== undefined) {
          getFiveDay(safeParams, props.state).then(
            (value: FiveDayReturnObj): void => {
              if (value !== undefined && props?.updateFiveDay !== undefined) {
                props.updateFiveDay(
                  value.forecast,
                  value.mappedForecast,
                  value.location,
                  value.units
                );
              }
            }
          );
        }
      }
    }
  });

  return (
    <div className="in-location">
      <Container maxWidth={false} style={{ backgroundColor: yellow[500] }}>
        <Typography variant="h3" component="h1">
          Forecast for
          <br />
          {props?.state?.fiveDay?.locationFor?.cityName},{" "}
          {props?.state?.fiveDay?.locationFor?.countryName}
        </Typography>
        {props?.state?.fiveDay !== undefined ? (
          <DayPreviewList
            weatherMap={props!.state!.fiveDay?.mappedForecast}
            weatherConditions={props!.state!.settings.inspectionWeatherVars}
            utcOffset={props!.state!.fiveDay!.forecast.city.timezone}
            sunsetTime={props!.state!.fiveDay!.forecast.city.sunset}
            sunriseTime={props!.state!.fiveDay!.forecast.city.sunrise}
            units={props!.state!.settings.units}
          ></DayPreviewList>
        ) : null}
      </Container>
    </div>
  );
}

function mapStateToProps(
  state: State,
  ownProps: LocationSetProps
): LocationSetProps {
  return { state, ...ownProps };
}

const mapDispatchToProps: (
  d: Dispatch<Action>,
  o: LocationSetProps
) => LocationSetProps = (
  dispatch: Dispatch<Action>,
  ownProps: LocationSetProps
): LocationSetProps => {
  return {
    updateLocation: (d: Location | undefined): void =>
      dispatch(updateLocation(d)),
    updateFiveDay: (
      f: FiveDayForecast,
      m: WeatherMap,
      l: Location,
      u: Units
    ): void => dispatch(updateFiveDayForecast(f, m, l, u)),
    ...ownProps,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationSetPage);
