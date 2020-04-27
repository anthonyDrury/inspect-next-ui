import React from "react";
import { Units } from "../../types/app.type";
import moment from "moment";
import { Grid, Typography, Tooltip } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { WeatherValidity, ViableWeather } from "../../types/weather.type";
import { getRainAmount, getWindSpeed } from "../../common/support";

type HourInfoProps = {
  weatherPreview: ViableWeather | undefined;
  units: Units | undefined;
};
function HourInfoTable(props?: HourInfoProps): JSX.Element {
  function getHourGridItem(
    weatherItem: WeatherValidity,
    index: number
  ): JSX.Element {
    const hour: string = moment(weatherItem.weather.dt_txt).format("hh A");
    return (
      <Grid
        key={index}
        item
        container
        direction="row"
        wrap="nowrap"
        xs={12}
        alignItems="center"
        className="in-hour-table__row"
      >
        <Grid item xs={2} className="in-hour-table__row-item">
          <p>{hour}</p>
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          <Tooltip
            title={`${
              weatherItem.isOptimal
                ? "Optimal"
                : weatherItem.isViable
                ? "Viable, but not optimal,"
                : "Inadvisable"
            } inspection time`}
            arrow
          >
            <div>
              {weatherItem.isOptimal ? (
                <FontAwesomeIcon
                  size="lg"
                  color="green"
                  icon={faCheckCircle}
                  data-testid="optimal-icon"
                />
              ) : weatherItem.isViable ? (
                <FontAwesomeIcon
                  size="lg"
                  color="black"
                  icon={faCheckCircle}
                  data-testid="viable-icon"
                />
              ) : (
                <FontAwesomeIcon
                  size="lg"
                  color="red"
                  icon={faTimesCircle}
                  data-testid="inadvisable-icon"
                />
              )}
            </div>
          </Tooltip>
          <Typography component="p">{weatherItem.reason}</Typography>
        </Grid>
        <Grid item xs={3} className="in-hour-table__row-item">
          {weatherItem.weather.main.temp}°
          {props?.units === "Imperial" ? "F" : "C"}
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          {weatherItem.weather.rain !== undefined
            ? getRainAmount(weatherItem.weather.rain["3h"], props?.units!)
            : 0}{" "}
          {props?.units === "Imperial" ? "in" : "mm"}
        </Grid>
        <Grid item xs={3} className="in-hour-table__row-item">
          {getWindSpeed(weatherItem.weather.wind.speed, props?.units!)}
          {props?.units === "Imperial" ? "MPH" : "KM/h"}
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          {weatherItem.weather.snow !== undefined
            ? getRainAmount(weatherItem.weather.snow["3h"], props?.units!)
            : 0}{" "}
          {props?.units === "Imperial" ? "in" : "mm"}
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container direction="column" className="in-hour-table">
      <Grid
        item
        container
        direction="row"
        wrap="nowrap"
        xs={12}
        alignItems="center"
        className="in-hour-table__row"
      >
        <Grid item xs={2} className="in-hour-table__row-item">
          <Typography className="in-text--strong" component="p">
            Time
          </Typography>
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          <Typography className="in-text--strong" component="p">
            Inspect
          </Typography>
        </Grid>
        <Grid item xs={3} className="in-hour-table__row-item">
          <Typography className="in-text--strong" component="p">
            Temp
          </Typography>
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          <Typography className="in-text--strong" component="p">
            Rain
          </Typography>
        </Grid>
        <Grid item xs={3} className="in-hour-table__row-item">
          <Typography className="in-text--strong" component="p">
            Wind
          </Typography>
        </Grid>
        <Grid item xs={2} className="in-hour-table__row-item">
          <Typography className="in-text--strong" component="p">
            Snow
          </Typography>
        </Grid>
      </Grid>
      {props?.weatherPreview?.times?.map(getHourGridItem)}
    </Grid>
  );
}

export default HourInfoTable;
