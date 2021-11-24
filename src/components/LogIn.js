import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  Box,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
function LogIn() {
  const [error, setError] = useState("");
  const { logIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const history = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      await logIn(email, password);
      history("/");
    } catch (error) {
      console.log(error);
      setError("Usuario o contraseña incorrecta");
    }
    setTimeout(() => {
      setError("");
    }, 3000);
  };
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "80px auto",
  };
  const avatarStyle = {
    background: "#00b4db",
  };
  return (
    <>
      <Grid>
        <form onSubmit={handleSubmit}>
          <Paper elevation={20} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOpenOutlinedIcon />
              </Avatar>
              <Box my={2}>
                <Typography variant="h5">Sign In</Typography>
              </Box>
            </Grid>
            <TextField
              label="Email"
              placeholder="Enter email"
              fullWidth
              required
              onChange={handleEmail}
            />
            <TextField
              sx={{ mt: 1 }}
              label="Password"
              placeholder="Enter Password"
              fullWidth
              required
              type="password"
              onChange={handlePassword}
            />
            <Button
              sx={{ mt: 2 }}
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
            >
              Sign in
            </Button>
            <br />
            <Box mt={2}>
              <Typography>
                Do you have an account?
                <Link style={{ textDecoration: "none" }} href="/register">
                  {" "}
                  Sign Up
                </Link>
              </Typography>
            </Box>
            <br />
            {error && <Alert severity="error">{error}</Alert>}
          </Paper>
        </form>
      </Grid>
    </>
  );
}

export default LogIn;
