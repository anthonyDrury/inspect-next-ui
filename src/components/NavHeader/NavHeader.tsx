import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CityInput from "../CityInput/CityInput";
import SettingsModal from "../SettingsModal/SettingsModal";
import { Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      marginRight: "1rem",
    },
    textAlign: "left",
  },
  link: {
    marginRight: "auto",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    textAlign: "left",
  },
  search: {
    display: "flex",
    alignContent: "center",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
      justifyContent: "flex-start",
    },
  },
}));

export default function NavHeader(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link href="/">
              <a style={{ color: "black", textDecoration: "none" }}>
                Inspect Next
              </a>
            </Link>
          </Typography>
          <Typography className={classes.link} noWrap>
            <Link href="/articles">
              <a style={{ color: "black", textDecoration: "underline" }}>
                Articles
              </a>
            </Link>
          </Typography>
          <div className={classes.search}>
            <CityInput />
          </div>
          <div style={{ marginLeft: "1rem" }}>
            <SettingsModal />
          </div>
        </Toolbar>
      </AppBar>
      {/* Render second toolbar to push hidden content down */}
      <Toolbar />
    </div>
  );
}
