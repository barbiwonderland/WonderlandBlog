import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export const Navbar = () => {
  const { currentUser, logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" >
          <Toolbar style={{ justifyContent: "space-between", display: "flex" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Wonderland Blog
            </Typography>
            {!currentUser ? (
              <Button href="/login" color="inherit">
                Login
              </Button>
            ) : (
              <Button onClick={handleLogOut} color="inherit">
                Log Out
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>

    </div>
  );
};
