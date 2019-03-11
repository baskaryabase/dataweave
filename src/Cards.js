import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import logo from "./logo.svg";
const styles = theme => ({
  card: {
    display: "flex",
    marginBottom: 10,
    cursor: "pointer"
  },
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto",
    width: 180
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  }
});

function MediaControlCard(props) {
  const { classes, theme } = props;

  return (
    <Card className={classes.card} onClick={() => props.onClick()}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <p>
            <span style={{ fontSize: 12 }}>
              RS: {props.data.available_price}
            </span>
            <br />
            <span style={{ fontSize: 14 }}>
              {props.data.title.slice(12) + "..."}
            </span>
            <br />
            <span style={{ fontSize: 10, color: "rgb(97, 94, 94)" }}>
              {props.data.sku}
            </span>
          </p>
          <p style={{ fontSize: 11, fontWeight: "bold" }}>
            <span> increases today heavi;y</span>
            <br />
            <span> increases today heavi;y</span>
          </p>
        </CardContent>
        <div className={classes.controls} />
      </div>
      <CardMedia
        className={classes.cover}
        image={props.data.thumbnail}
        style={{ marginBottom: 30, marginTop: 30 }}
        title="Live from space album cover"
      />
    </Card>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);
