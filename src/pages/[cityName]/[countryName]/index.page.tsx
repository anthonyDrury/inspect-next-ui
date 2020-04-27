import React, { Dispatch, useEffect } from "react";
import { connect } from "react-redux";
import {
  State,
  Action,
  UpdateFiveDayPayload,
} from "../../../types/redux.types";
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
  updateLocation?: (d: Location | undefined) => void;
  updateFiveDay?: (f: UpdateFiveDayPayload) => void;
  state?: State;
  params?: Location;
};
// displays the five day forecast
function LocationSetPage(props?: LocationSetProps): JSX.Element {
  const router: NextRouter = useRouter();
  const query: Location = router.query as Location;

  useEffect((): void => {
    updatePageDescription(
      `${query?.cityName}, ${query?.countryName} forecast`,
      `Five day forecast for ${query?.cityName}, ${query?.countryName}`
    );
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
                props.updateFiveDay({
                  forecast: value.forecast,
                  mappedForecast: value.mappedForecast,
                  location: value.location,
                  units: value.units,
                });
              }
            }
          );
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
        <SpinnerFallback condition={props?.state?.fiveDay !== undefined}>
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
        </SpinnerFallback>
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
    updateFiveDay: (f: UpdateFiveDayPayload): void =>
      dispatch(updateFiveDayForecast(f)),
    ...ownProps,
  };
};

export async function getStaticProps(context: any): Promise<any> {
  debugger;
  console.table(context);
  return { props: {} };
}

export async function getStaticPaths(): Promise<any> {
  return {
    paths: [{ params: { cityName: "Sydney", countryName: "Australia" } }],
    fallback: true,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationSetPage);
