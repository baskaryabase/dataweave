import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Cards from "./Cards";
import Grid from "@material-ui/core/Grid";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import FilterIcon from "@material-ui/icons/FilterList";
import SortIcon from "@material-ui/icons/Sort";
import AddIcon from "@material-ui/icons/Add";
import StarIcon from "@material-ui/icons/Star";
import axios from "axios";
import { hidden } from "ansi-colors";

const drawerWidth = 200;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: window.innerHeight - 40,
    overflow: "scroll",
    width: "100%"
  }
});

class App extends React.Component {
  state = {
    mobileOpen: false,
    anchorEl: null,
    data: [],
    selected: {},
    category: "All Products"
  };

  componentWillMount() {
    this.getData("all_products");
  }

  getData = category => {
    console.log("from getData", category);
    axios
      .get(
        `https://app.dataweave.com/v6/app/retailer/bundles/?&base_view=${category}&
       start=0&limit=20&sort_on=&sort_by=&filters={%22search%22:%22%22}&api_key=38430b87ac715c5858b7de91fb90b3f7`
      )
      .then(res => {
        this.setState({ data: res.data.data, selected: res.data.data[0] });
      });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme } = this.props;

    const drawer = (
      <div>
        <Divider />
        <List>
          <ListItemText
            style={{ paddingLeft: 5, color: "blue" }}
            primary={"VIEWS"}
          />
          {[
            "All Matched Produts",
            "Margin Gain Oppurtunities",
            "Revenue Gain Oppurtunities",
            "Loss Price Leadership",
            "In Stock Only On Store"
          ].map(text => (
            <div>
              <div
                style={{
                  paddingLeft: 12,
                  fontSize: 14,
                  marginTop: 5,
                  cursor: "pointer"
                }}
                onClick={() => {
                  if (text == "Margin Gain Oppurtunities") {
                    this.getData("increase_opportunity");
                    return this.setState({
                      category: "Margin Gain Oppurtunities"
                    });
                  }
                  if (text == "All Matched Produts") {
                    this.getData("all_products");
                    return this.setState({ category: "All Matched Produts" });
                  }
                }}
              >
                {text}
              </div>
              <br />
            </div>
          ))}
        </List>
        <Divider />
        <List>
          <ListItemText
            style={{ paddingLeft: 5, color: "blue" }}
            primary={"FILTERS"}
          />

          {[
            "BRAND",
            "CATEGORY",
            "COMPARE AGAINST",
            "ON COMPETITOR",
            "PRICE RANGE"
          ].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </div>
    );

    const { anchorEl } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <Grid container>
          <Grid
            md={4}
            style={{ background: "#ddd", height: window.innerHeight }}
          >
            <div
              style={{
                height: 40,
                display: "flex",
                flexDirection: "row"
                // position: "fixed",
                // top: 0
              }}
            >
              <div style={{ width: "100%" }}>
                <input
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    background: "#ddd",
                    paddingLeft: 40
                  }}
                  placeholder={"Search For products"}
                  type="text"
                />
                <div style={{ position: "absolute", top: 8 }}>
                  <SearchIcon />
                </div>
              </div>

              <Button
                aria-owns={anchorEl ? "simple-menu" : undefined}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <FilterIcon />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  PRICE - HIGH TO LOW
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  DISCOUNTS% - HIGH TO LOW
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  INCREASE% - HIGH TO LOW
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  DECREASE% - HIGH TO LOW
                </MenuItem>
              </Menu>
              <Button>
                <SortIcon />
              </Button>
            </div>
            {/* <div className={classes.toolbar} /> */}
            <main className={classes.content}>
              <h6>{this.state.category}</h6>
              {this.state.data.map((data, i) => (
                <Cards
                  data={data}
                  onClick={() =>
                    this.setState({ selected: this.state.data[i] })
                  }
                />
              ))}
            </main>
          </Grid>
          <Grid md={8}>
            <Grid container style={{ margin: 8 }}>
              <Grid xs={12}>
                <div style={{ display: "flex ", flexDirection: "column" }}>
                  <div>
                    <IconButton>
                      <StarIcon />
                    </IconButton>
                  </div>
                  <div style={{ marginLeft: 49, marginTop: -35 }}>
                    <span style={{ fontSize: 12 }}>
                      {this.state.selected.stock}
                    </span>
                    <br />
                    {this.state.selected.title}
                    <br />
                    <span style={{ fontSize: 12 }}>SDC123</span>
                  </div>
                </div>
              </Grid>
              <Grid xs={4}>
                <div style={{ width: 200, height: 200 }}>
                  <img
                    style={{
                      border: "1px solid #ddd",
                      width: "100%",
                      height: "100%"
                    }}
                    src={this.state.selected.thumbnail}
                  />
                </div>
              </Grid>
              <Grid xs={8}>
                <Grid
                  container
                  justify="center"
                  alignContent="center"
                  flexDirection={"row"}
                >
                  <div style={{ textAlign: "center", fontSize: 12 }}>
                    YOUR PRICE
                    <br />
                    RS: {this.state.selected.available_price}
                  </div>
                  <div
                    style={{
                      width: 1,
                      height: 30,
                      background: "#ddd",
                      margin: 20
                    }}
                  />
                  <div style={{ textAlign: "center", fontSize: 12 }}>
                    LOWEST PRICE
                    <br />
                    RS: NA
                  </div>
                  <div
                    style={{
                      width: 1,
                      height: 30,
                      background: "#ddd",
                      margin: 20
                    }}
                  />
                  <div style={{ textAlign: "center", fontSize: 12 }}>
                    HIGHEST PRICE
                    <br />
                    RS: NA
                  </div>
                </Grid>
                <Divider />

                <Grid
                  container
                  justify="center"
                  alignContent="center"
                  flexDirection={"row"}
                >
                  <div style={{ textAlign: "center", fontSize: 12 }}>
                    PRICE POSITION
                    <br />
                    RS: NA
                  </div>
                  <div
                    style={{
                      width: 1,
                      height: 30,
                      background: "#ddd",
                      margin: 20
                    }}
                  />
                  <div style={{ textAlign: "center", fontSize: 12 }}>
                    COMPETITORS
                    <br />
                    RS: NA
                  </div>
                  <div
                    style={{
                      width: 1,
                      height: 30,
                      background: "#ddd",
                      margin: 20
                    }}
                  />
                  <div style={{ textAlign: "center", fontSize: 12 }}>
                    PRICE GAP
                    <br />
                    RS: NA
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(App);
