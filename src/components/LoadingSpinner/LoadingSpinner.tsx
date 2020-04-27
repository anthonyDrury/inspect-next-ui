import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { orange } from "@material-ui/core/colors";

type LoadingSpinnerProps = {
  size?: SizeProp;
};
const LoadingSpinner: React.FunctionComponent<LoadingSpinnerProps> = ({
  size = "3x",
}: LoadingSpinnerProps): JSX.Element => {
  return (
    <div style={{ margin: "0 auto" }}>
      <FontAwesomeIcon
        size={size}
        icon={faCircleNotch}
        color={orange[500]}
        spin
      />
    </div>
  );
};

export default LoadingSpinner;
