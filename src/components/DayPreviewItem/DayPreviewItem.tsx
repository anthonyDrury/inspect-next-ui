import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { WeatherListItem } from "../../types/openWeather.types";
import moment from "moment";
import {
  WeatherPreviewType,
  WeatherInspectionVariables,
  WeatherValidity,
} from "../../types/weather.type";
import {
  faCheckCircle,
  faTimesCircle,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import If from "../If/If";
import {
  Button,
  Typography,
  Tooltip,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";
import { Units } from "../../types/app.type";
import { orange } from "@material-ui/core/colors";
import { getWeatherInfo } from "../../common/weather.support";
import { getRainAmount, getWindSpeed } from "../../common/support";
import Router from "next/dist/client/router";
import Link from "next/link";

type DayPreviewItemState = {
  weatherPreview: WeatherPreviewType;
  previewRoute?: string;
  expanded: boolean;
};
function DayPreviewItem(props: {
  hourList: WeatherListItem[];
  weatherVars: WeatherInspectionVariables;
  utcOffset: number;
  sunriseTime: number;
  sunsetTime: number;
  units: Units;
}): JSX.Element {
  const [localState, setLocalState]: [
    DayPreviewItemState,
    Dispatch<SetStateAction<DayPreviewItemState>>
  ] = useState({
    weatherPreview: getWeatherInfo(
      props.hourList,
      props.weatherVars,
      props.utcOffset,
      props.sunriseTime,
      props.sunsetTime
    ),
    expanded: false,
  } as DayPreviewItemState);

  useEffect((): void => {
    const previewRoute: string = `/${Router.query?.cityName}/${
      Router.query?.countryName
    }/${moment(localState.weatherPreview?.defaultWeather.dt_txt).format(
      "YYYY-MM-DD"
    )}`;
    setLocalState({
      ...localState,
      weatherPreview: getWeatherInfo(
        props.hourList,
        props.weatherVars,
        props.utcOffset,
        props.sunriseTime,
        props.sunsetTime
      ),
      previewRoute,
    });
  }, [props]);

  return (
    <ExpansionPanel
      style={{ flex: "100%" }}
      onChange={(e: any, expanded: boolean) =>
        setLocalState({ ...localState, expanded })
      }
    >
      <ExpansionPanelSummary className="in-day-preview-item">
        <Tooltip
          title={
            localState.weatherPreview.defaultWeather.weather[0].description
          }
          arrow
        >
          <img
            className="in-day-preview-item__weather-image"
            src={`/weatherIcons/${localState.weatherPreview?.defaultWeather.weather[0]?.icon?.replace(
              "n",
              "d"
            )}@2x.png`}
            alt="weather icon"
          ></img>
        </Tooltip>
        <div className="in-day-preview-item__is-viable">
          <Tooltip
            title={`${
              localState.weatherPreview?.viableTypes.isOptimal
                ? "Optimal"
                : localState.weatherPreview?.viableTypes.isViable
                ? "Viable, but not optimal,"
                : "Inadvisable"
            } inspection time`}
            arrow
          >
            <div>
              {localState.weatherPreview?.viableTypes.isViable ||
              localState.weatherPreview?.viableTypes.isOptimal ? (
                <FontAwesomeIcon
                  size="3x"
                  data-testid={
                    localState.weatherPreview?.viableTypes.isOptimal
                      ? "optimal-icon"
                      : "viable-icon"
                  }
                  color={
                    localState.weatherPreview?.viableTypes.isOptimal
                      ? "green"
                      : "black"
                  }
                  icon={faCheckCircle}
                />
              ) : (
                <FontAwesomeIcon
                  data-testid="inadvisable-icon"
                  color="red"
                  size="3x"
                  icon={faTimesCircle}
                />
              )}
            </div>
          </Tooltip>
          <Typography component="p">
            {!localState.weatherPreview.viableTypes.isOptimal
              ? localState.weatherPreview?.viableTypes.reason
              : "Optimal"}
          </Typography>
        </div>
        <Tooltip
          title={moment(
            localState.weatherPreview?.defaultWeather.dt_txt
          ).format("YYYY-MMM-DD")}
          arrow
        >
          <div className="in-day-preview-item__date-container">
            <Typography variant="h5" component="p">
              {moment(localState.weatherPreview?.defaultWeather.dt_txt).format(
                "dddd"
              )}
            </Typography>
            <Typography variant="h6" component="p">
              {localState.weatherPreview?.defaultWeather.weather[0].description}
            </Typography>
            <Typography variant="h6" component="p">
              {localState.weatherPreview?.minTemp}° -{" "}
              {localState.weatherPreview?.maxTemp}°
            </Typography>
          </div>
        </Tooltip>

        <div className="in-day-preview-item__action-container">
          <Link
            href={localState.previewRoute ? localState.previewRoute : ""}
            passHref
          >
            <Button
              variant="contained"
              color="primary"
              style={{
                alignSelf: "flex-start",
                backgroundColor: orange[400],
              }}
            >
              View Day
            </Button>
          </Link>

          <Tooltip title="expand" arrow>
            <span
              style={{
                backgroundColor: "#d8d8dd",
                padding: "0 0.5rem",
                borderRadius: "2rem",
                marginTop: "1rem",
                border: "solid 1px #808080",
              }}
            >
              <FontAwesomeIcon
                size="3x"
                icon={localState.expanded ? faAngleUp : faAngleDown}
              />
            </span>
          </Tooltip>
        </div>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails className="in-day-preview-item__bottom">
        <div style={{ textAlign: "left" }}>
          <Typography variant="h6" component="p">
            rain:{" "}
            {`${getRainAmount(
              localState.weatherPreview?.rainAmount,
              props.units
            )}${props.units === "Imperial" ? "in" : "mm"}`}
          </Typography>
          <Typography variant="h6" component="p">
            snow:{" "}
            {`${getRainAmount(
              localState.weatherPreview?.snowAmount,
              props.units
            )}${props.units === "Imperial" ? "in" : "mm"}`}
          </Typography>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {!localState.weatherPreview?.isViable &&
          (localState.weatherPreview?.nineAM !== undefined ||
            localState.weatherPreview?.threePM !== undefined) ? (
            <>
              <div className="in-day-preview-item__preview-container">
                <p>&nbsp;</p>
                <p>temp:</p>
                <p>wind:</p>
                <p>humidity:</p>
              </div>
              <If condition={localState.weatherPreview?.nineAM !== undefined}>
                <div className="in-day-preview-item__preview-container">
                  <p>9AM</p>
                  <p>{`${localState.weatherPreview?.nineAM!.main.temp}° ${
                    props.units === "Imperial" ? "F" : "C"
                  }`}</p>
                  <p>{`${getWindSpeed(
                    localState.weatherPreview?.nineAM?.wind.speed,
                    props.units
                  )} ${props.units === "Imperial" ? "MPH" : "KM/H"}`}</p>
                  <p>{`${localState.weatherPreview?.nineAM?.main.humidity}%`}</p>
                </div>
              </If>
              <If condition={localState.weatherPreview?.threePM !== undefined}>
                <div className="in-day-preview-item__preview-container">
                  <p>3PM</p>
                  <p>{`${localState.weatherPreview?.threePM!.main.temp}° ${
                    props.units === "Imperial" ? "F" : "C"
                  }`}</p>
                  <p>{`${getWindSpeed(
                    localState.weatherPreview?.threePM?.wind.speed,
                    props.units
                  )} ${props.units === "Imperial" ? "MPH" : "KM/H"}`}</p>
                  <p>{`${localState.weatherPreview?.threePM?.main.humidity}%`}</p>
                </div>
              </If>
            </>
          ) : (
            <If condition={localState.weatherPreview?.isViable}>
              {[
                ...localState.weatherPreview?.viableTypes.optimalTimes,
                ...localState.weatherPreview?.viableTypes.viableTimes,
              ].map(
                (time: WeatherValidity, index: number): JSX.Element => {
                  return (
                    <>
                      <If condition={index < 2} key={index}>
                        <div className="in-day-preview-item__preview-container">
                          <p
                            className="in-text--strong"
                            style={{
                              color: time.isOptimal
                                ? "green"
                                : time.isViable
                                ? "black"
                                : "red",
                            }}
                          >
                            {time.isOptimal ? "Optimal" : "Viable"}
                          </p>
                          <p>temp:</p>
                          <p>wind:</p>
                          <p>humidity:</p>
                        </div>

                        <div className="in-day-preview-item__preview-container">
                          <p>{moment(time.weather.dt_txt).format("h A")}</p>
                          <p>{`${time.weather.main.temp}° ${
                            props.units === "Imperial" ? "F" : "C"
                          }`}</p>
                          <p>{`${getWindSpeed(
                            time.weather.wind.speed,
                            props.units
                          )} ${
                            props.units === "Imperial" ? "MPH" : "KM/H"
                          }`}</p>
                          <p>{`${time.weather.main.humidity}%`}</p>
                        </div>
                      </If>
                    </>
                  );
                }
              )}
            </If>
          )}
        </div>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default DayPreviewItem;
