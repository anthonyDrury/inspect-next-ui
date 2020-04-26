import { Action, UpdateFiveDayPayload } from "../../types/redux.types";
import moment from "moment";

export function updateFiveDayForecast(payload: UpdateFiveDayPayload): Action {
  return {
    type: "UPDATE_FIVE_DAY",
    payload: {
      fiveDay: {
        forecast: payload.forecast,
        mappedForecast: payload.mappedForecast,
        expiresAt: moment().add(1, "hour"),
        locationFor: payload.location,
        unitsFor: payload.units,
      },
    },
  };
}

export function deleteFiveDayForecast(): Action {
  return {
    type: "DELETE_FIVE_DAY",
    payload: { fiveDay: undefined },
  };
}
