import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import {
  Button,
  Container,
  FormLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import "./Index.css";

const URL = "http://localhost:4000/";

function Signin() {
  const navigate = useNavigate();
  const [authLine, setAuthLine] = useState("");
  async function handleClick(event) {
    let email = event.target.email.value;
    let password = event.target.password.value;
    event.preventDefault();
    await axios
      .post(URL + "login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 203) {
          setAuthLine("Invalid user details");
        } else if (res.status === 204) {
          setAuthLine("No such User Found");
        } else if (res.status === 200) {
          navigate("/", {
            state: { isAuth: true, email: email },
          });
        } else {
          console.log("");
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#F5F3F7",
        height: "100vh",
      }}
    >
      <Container>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            margin: "20px 0px 30px 0px",
            color: "#61312E",
          }}
          className={"heading"}
        >
          Money Tracker - A solution to spilt friends' bills
        </Typography>
      </Container>
      <form
        className="form"
        onSubmit={handleClick}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "30px",
          height: "400px",
          backgroundColor: "#A491B6",
          borderRadius: "10px",
        }}
      >
        <FormLabel
          sx={{
            fontWeight: "bold",
            fontSize: "1.7rem",
            color: "#F5F4F5",
          }}
        >
          Sign In
        </FormLabel>
        <Typography
          variant="span"
          sx={{ height: "2.2px", width: "60%", backgroundColor: "#F5F4F5" }}
        />

        {authLine && (
          <Typography
            color={"pink"}
            sx={{
              color: "red",
              fontSize: ".8rem",
              margin: " 5px 0px 0px 0px",
            }}
          >
            {authLine}
          </Typography>
        )}
        <FormControl sx={{ color: "#F5F4F5" }}>
          <TextField
            type="email"
            variant="standard"
            name="email"
            sx={{
              margin: "30px 0px 10px 0px",
              width: "230px",
              color: "#F5F4F5",
              input: { color: "#D8D4D8" },
              label: { color: "#D8D4D8" },
            }}
            label="Your Email Address"
          />
        </FormControl>
        <FormControl>
          <TextField
            type={"password"}
            variant="standard"
            name="password"
            sx={{
              margin: "10px 0px",
              width: "230px",
              input: { color: "#D8D4D8" },
              label: { color: "#D8D4D8" },
            }}
            label="Your Pasword"
          />
        </FormControl>
        <Button type="submit" variant="contained" sx={{ margin: "29px auto" }}>
          Submit
        </Button>
        <Link href="/register" sx={{ fontSize: ".8rem" }}>
          Don't Have Account. Register.
        </Link>
      </form>
    </div>
  );
}

export default Signin;
