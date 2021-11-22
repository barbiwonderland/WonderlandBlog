import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Cards } from "./Cards";
import { InputForm } from "./InputForm";
import { useAuth } from "../context/AuthContext";
import { Typography } from "@material-ui/core";

const Dashboard = () => {
  const { currentUser, logOut } = useAuth();
  const welcome = currentUser ? currentUser.email : "Ghost User 👻";

  return (
    <>
      <Navbar />
      <Typography
        style={{ marginTop: 20 }}
        align="center"
        variant="h6"
        component="h5"
      >
        Welcome {welcome}
      </Typography>
      <InputForm />
      <Cards />

    </>
  );
};
export default Dashboard;
