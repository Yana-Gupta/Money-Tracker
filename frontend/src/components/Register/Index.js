import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import "./Index.css"
const URL = "http://localhost:4000/";

function Register() {
  const [authLine, setAuthLine] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(event) {
    console.log("hh");
    let name = event.target.name.value;
    let email = event.target.email.value;
    let password = event.target.password.value;
    event.preventDefault();
    await axios
      .post(URL + "register", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          setAuthLine("A user is alredy associated with this email.");
        } else if (res.status === 200) {
          let isAuth = 1;
          console.log(isAuth);
          navigate("/", {
            state: { isAuth: true, email: email },
          });
        } else {
          console.log("");
        }
      })
      .catch((err) => console.log("Error posting user", err));
  }
  return (
    <div style={{ height: "100vh", width: "100%", backgroundColor: "#FCF0EE" }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container sx={{ margin: "20px 0px 20px 0px",}}>
          <Typography variant="h4" component="h1" className="heading" padding={"20px auto"}>
            Money Tracker: An easy way to split friends' bills!
          </Typography>
        </Container>
        <form
        className="form"
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "30px",
            height: "400px",
            backgroundColor: "#9E949E",
          }}
        >
          <FormLabel
            sx={{
              fontWeight: "bold",
              fontSize: "1.8rem",
            }}
          >
            Register
          </FormLabel>
          {authLine && <Typography variant="span">{authLine}</Typography>}
          <FormControl>
            <TextField
              label="Username"
              variant="standard"
              type={"text"}
              name={"name"}
              sx={{
                margin: "7px 0px",
                width: "210px",
                label: {color: "#FBEFDA"},
                input: {color: "#FBEFDA"}
              }}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Your Email Address"
              variant="standard"
              type={"email"}
              name={"email"}
              sx={{
                margin: "7px 0px",
                width: "210px",
                label: {color: "#FBEFDA"},
                input: {color: "#FBEFDA"}
              }}
            />
          </FormControl>
          <FormControl>
            <TextField
              label="Create Password"
              variant="standard"
              type={"password"}
              name={"password"}
              sx={{
                margin: "7px 0px",
                width: "210px",
                label: {color: "#FBEFDA"},
                input: {color: "#FBEFDA"}
              }}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            sx={{ margin: "28px 0px 0px 0px" }}
          >
            Submit
          </Button>
          <Link href="/signin" sx={{ margin: "30px 0px 0px 0px" }}>
            <Typography sx={{ fontSize: ".8rem" }}>
              Already have account. SignIn.
            </Typography>
          </Link>
        </form>
      </Container>
    </div>
  );
}

export default Register;
