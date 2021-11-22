import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
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
  Snackbar,
} from "@mui/material";

function Register() {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");
  const { signUp } = useAuth();
  const handleUser = (e) => {
    setUser(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(user, password);
    try {
      await signUp(user, password);
    } catch {
      setError(
        "El mail ingresado ya se encuentra registrado,intente nuevamente"
      );
      setTimeout(() => {
        setError("")
      }, 3000);
    }
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
        <form onSubmit={handleRegister}>
          <Paper elevation={10} style={paperStyle} onSubmit={handleRegister}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOpenOutlinedIcon />
              </Avatar>
              <h3>Sign Up</h3>
            </Grid>
            <TextField
              label="Full name"
              placeholder="Enter Name and Surname"
              fullWidth
              required
            />
            <TextField
              sx={{ mt: 1 }}
              label="Email"
              placeholder="Email"
              fullWidth
              required
              onChange={handleUser}
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
              Sign up
            </Button>
            <br/><br/>
            <Typography>
              Do you Have an account?
              <Link href="/"> Sign In</Link>
            </Typography>
            <br/>
            {error && <Alert severity="error">{error}</Alert>}
          </Paper>
        </form>
      </Grid>
    </>
  );
}

export default Register;
