import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Cards } from "./Cards";
import { InputForm } from "./InputForm";
import { useAuth } from "../context/AuthContext";
import { Button, Grid, Typography } from "@material-ui/core";

const Dashboard = () => {
  const { currentUser, logOut } = useAuth();
  const userExist = currentUser ? currentUser.email : "Ghost User 👻";
  const welcome = currentUser ? (
    <Button href="/upload" color="primary" variant="contained">
      Nuevo posteo
    </Button>
  ) : null;

  return (
    <>
      <Navbar />{" "}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "1%",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h6" component="h5">
          Welcome {userExist}
        </Typography>
        {welcome}
      </div>
      <Cards />
    </>
  );
};
export default Dashboard;
