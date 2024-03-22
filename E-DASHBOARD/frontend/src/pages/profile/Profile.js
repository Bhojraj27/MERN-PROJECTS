import {useState} from 'react'
import { makeStyles } from '@mui/styles';
import { Box,Button,Paper, Typography} from '@mui/material';
const useStyles = makeStyles((theme) => ({
  loginmainBox: {
    height: "100%",
    position: "relative",
    zIndex: "999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflowY: "auto",
  },
  loginBox: {
    height: "initial",
    margin: "15px auto",
    maxWidth: "95%",
    width: "487px",
    maxHeight: "100%",
    "& .mainBox": {
      padding: "40px 30px",
      "& h2": {
        textAlign: "center",
        paddingBottom: "25px",
      },
    },
    "& .displaySpacebetween": {
      padding: "15px 0px",
    },
  },
  editButton: {
    margin: 2
  },
}));
function Profile() {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  const auth = JSON.parse(localStorage.getItem('user'));
  const handleEdit = () => {
    setEditMode(!editMode);
   
    console.log(editMode);
  }
  return (
    <Box className={classes.loginmainBox}>
        <Box className={classes.loginBox}>
          <Paper className="mainBox" elevation={2}>
            <Typography variant="h2" color="primary">
              Profile
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Name: {auth.name?auth.name:"NA" }
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Email: {auth.email?auth.email:"NA" }
            </Typography>
            <Button
            variant="outlined"
            color="primary"
            className={classes.editButton}
            onClick={handleEdit}
          >
            Edit Profile
          </Button>
        </Paper>
        </Box>
        </Box>
  );
}

export default Profile;
