import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  FormGroup,
  Container,
  FormControlLabel,
  Box,
  Fade,
} from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import TandemRegisterForm from "./TandemRegisterForm";
import UserRegisterForm from "./UserRegisterForm";
import { makeStyles } from "@material-ui/core/styles";

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + $track": {
        backgroundColor: "#03a9f4",
        opacity: 1,
        border: "none",
      },
    },
    "&$focusVisible $thumb": {
      color: "#4caf50",
      border: "3px solid #fff",
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});

const useStyles = makeStyles({
  whiteText: {
    color: "white",
    textAlign: "center",
  },
});

export default function RoleSwitches() {
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const classes = useStyles();

  return (
    <>
      <Container maxWidth="sm">
        <FormGroup>
          <Typography className={classes.whiteText}>
            <IOSSwitch
              checked={state.checkedA}
              onChange={handleChange}
              name="checkedA"
            />{" "}
            Зарегистрироваться в качестве:
            <Fade in={state.checkedA} timeout={2000}>
              <Typography className={classes.whiteText}>
                <b>Пилота</b>{" "}
              </Typography>
            </Fade>
            <Fade in={!state.checkedA} timeout={2000}>
              <Typography className={classes.whiteText}>
                <b>Пассажира</b>
              </Typography>
            </Fade>
          </Typography>
        </FormGroup>

        {state.checkedA ? <TandemRegisterForm /> : <UserRegisterForm />}
      </Container>
    </>
  );
}
