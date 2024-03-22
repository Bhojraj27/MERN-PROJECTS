import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  footerSection: {
    background: "#0D0D0D",
    position: "relative",
    width: "100%",
    bottom: 0,

   
  },
  footerlogo: {
    paddingTop: 20,
    width: "50px",
    height: "50px",
  },
  linkButton: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
    color: "#FBFBFB !important",
    cursor: "pointer",
    textTransform: "none",
    // marginRight: theme.spacing(2), // Add margin between buttons
  },
  linkButton2: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "24px",
    color: "#FBFBFB !important",
    cursor: "pointer",
    textTransform: "none",
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <Box className={classes.footerSection}>
      <Container maxWidth="lg">
        <Grid container >
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Box mr={8}>
              <Box mb={2}>
                <RouterLink to="/">
                  <img
                    className={classes.footerlogo}
                    src="images/b.png"
                    alt="logo2"
                  />
                  <br />
                </RouterLink>
              </Box>
              <Typography variant="body1" component="small"></Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={7}  lg={6}>
            <Box mt={3}>
              <Button
                component={RouterLink}
                to="/features"
                className={classes.linkButton}
              >
                Features
              </Button>
              <Button
                component={RouterLink}
                to="/how-it-works"
                className={classes.linkButton}
              >
                How it works
              </Button>
              <Button
                component={RouterLink}
                to="/pricing"
                className={classes.linkButton}
              >
                Pricing
              </Button>
              <Button
                component={RouterLink}
                to="/affiliate-plan"
                className={classes.linkButton}
              >
                Affiliate Plan
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={2}  lg={3}>
            <Box mt={3}>
              <Button className={classes.linkButton2}>© 2024 Ecommerce</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
