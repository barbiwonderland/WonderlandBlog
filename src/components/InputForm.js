import {
  Button,
  Grid,
  IconButton,
  Input,
  Paper,
  TextField,
} from "@material-ui/core";
import { PhotoCamera } from "@mui/icons-material";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { storage, fs } from "../firebase";

export const InputForm = () => {
  const { currentUser, logOut } = useAuth();
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  //STYLES
  const paperStyle = {
    padding: 20,
    height: "30vh",
    margin: "80px auto",
  };

  //FUNCTIONS
  const handleText = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(text, "texto");
    // se crea la referencia
    let imageUpload = storage.ref(`images/${image.name}`);
    // se sube a firebase
    await imageUpload.put(image);
    //obtener enlace de desacarga
    const urlImage = await imageUpload.getDownloadURL();
    console.log(urlImage);
    // // setUrlImg(urlImage);
    // // console.log(urlImg)
    console.log("subido ok");
    // Subir datos a la base
    const colectionRef = fs.collection("posteos");
    const doc = await colectionRef.add({
      texto: text,
      image: urlImage,
      autor: currentUser ? currentUser.email : "Anonimo",
    });
    // Recargar pagina
    window.location.reload();
  };
  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={10} md={5} >
        <form onSubmit={handleSubmit}>
          <Paper elevation={10} style={paperStyle}>
            <TextField
              sx={{ mt: 2 }}
              label="What's on you mind?"
              fullWidth
              required
              onChange={handleText}
            />
            <br /> <br />
            <Input
              onChange={handleImage}
              accept="image/*"
              id="icon-button-file"
              type="file"
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
            <br />
            <Button  type="submit" variant="contained" color="primary">
              Subir
            </Button>
          </Paper>
        </form>
        </Grid>
      </Grid>
    </div>
  );
};
