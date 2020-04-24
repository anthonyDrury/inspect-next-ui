import React from "react";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <div className="in-footer">
      <Grid container justify="space-around">
        <Grid
          item
          container
          direction="column"
          justify="flex-start"
          xs={12}
          sm={3}
        >
          <Grid item>
            <Typography variant="h6" component="h6" noWrap>
              Navigation
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="p" noWrap style={{ color: "black" }}>
              <Link href="/">Home</Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          justify="flex-start"
          xs={12}
          sm={3}
        >
          <Grid item>
            <Typography variant="h6" component="h6" noWrap>
              Contact
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="p" noWrap>
              <a
                onClick={(
                  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                ): void => {
                  event.preventDefault();
                  if (window !== null) {
                    window.open("mailto:admin@inspectnext.com", "mail");
                  }
                }}
                href="mailto:admin@inspectnext.com"
              >
                mail: admin@inspectnext.com
              </a>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
