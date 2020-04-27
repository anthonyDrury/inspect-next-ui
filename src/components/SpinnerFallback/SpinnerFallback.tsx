import React from "react";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const SpinnerFallback: React.FunctionComponent<{
  condition: boolean;
  spinnerSize?: SizeProp;
}> = (
  props: React.PropsWithChildren<{
    condition: boolean;
    spinnerSize?: SizeProp;
  }>
): JSX.Element => {
  return (
    <>
      {props?.condition ? (
        props.children
      ) : (
        <LoadingSpinner size={props.spinnerSize} />
      )}
    </>
  );
};

export default SpinnerFallback;
