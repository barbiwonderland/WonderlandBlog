import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  SnackbarContent,
  Typography,
} from "@material-ui/core";
import Snackbar from "@mui/material/Snackbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { fs } from "./../firebase";
import { useAuth } from "../context/AuthContext";
import ErrorIcon from "@mui/icons-material/Error";
export const Cards = () => {
  const { currentUser } = useAuth();

  const navigate = useNavigate();
  const [fsList, setFsList] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState("");

  const fetchBlogs = async () => {
    const data = await fs.collection("posteos").get();
    setFsList(data.docs.map((x) => ({ ...x.data(), id: x.id })));
  };
  const deletePost = async (x, y) => {
    console.log(y);
    if (currentUser && currentUser.email === y) {
      try {
        await fs.collection("posteos").doc(x).delete();
        navigate("/");
        window.location.reload();
      } catch {
        console.log("error");
      }
    } else {
      setOpen(true);
      !currentUser
        ? setMessage("❌ Debes loguearte para poder eliminar publicaciones")
        : setMessage("❌ Usuario no autorizado");
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const cardResult =
    fsList &&
    fsList.map((x) => (
      <>
        <Grid
          item
          xs={10}
          sm={4}
          md={3}
          style={{
            justifyContent: "center",
            display: "flex",
            alignContent: "space-between",
            margin:"2%"
          }}
        >
          <Card
            key={x.autor}
            style={{
              height: "100%",
              width: "80%",
              alignContent: "space-between",
            }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="250"
                image={x.image}
                alt={x.texto}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  padding: 0,
                }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{ textTransform: "capitalize" }}
                >
                  {x.texto}
                </Typography>
                <Typography>{x.autor}</Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                onClick={() => deletePost(x.id, x.autor)}
                size="small"
                color="primary"
              >
                Eliminar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </>
    ));
  return (
    <Grid
      container
      style={{ margin: 1 }}
      alignItems="stretch"
      justifyContent="center"
    >
      <Snackbar
        sx={{ bottom: "10px" }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
      >
        <SnackbarContent
          style={{
            color: "red",
          }}
          message={message}
        />
      </Snackbar>

      {cardResult}
    </Grid>
  );
};
