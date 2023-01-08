import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Avatar,
  Button,
  createTheme,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useLocation } from "react-router-dom";
import TransationModal from "../TransactionModal/Index";
import UpadateModal from "../UpdateTransactionModal/Index";
import UpdateIcon from "@mui/icons-material/Update";
import { red } from "@mui/material/colors";
const URL = "http://localhost:4000/";

function Home() {
  // USER AUTHENTICATIOn
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setIsAuthenticated(location.state.isAuth);
      setUserEmail(location.state.email);
    } else {
    }
  }, []);

  // Creats New Transaction without login
  const [restrictionLine, setRestrictionLine] = useState();
  function openNewTransactionFrom() {
    if (isAuthenticated) {
      setIsOpenTransationForm(true);
    }
    console.log(restrictionLine);
    setRestrictionLine("You need to login first.");
    console.log(restrictionLine);
  }

  // Transactions
  const [transactions, setTransactions] = useState();
  useEffect(() => {
    if (userEmail) {
      axios
        .get(URL + "transaction/?email=" + userEmail)
        .then((res) => {
          console.log(res.data);
          setTransactions(res.data);
        })
        .catch((err) => console.log("Error Fetching Transactions ", err));
    }
  }, [userEmail]);

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 1000,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      secondary: red,
    },
  });

  // Delete transaction Function
  async function DeleteTransaction(id) {
    await axios
      .delete(URL + "transaction", {
        data: {
          id: id,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log("Error Deleting Transacton", err));
  }
  // For creating Transaction
  const [isOpenTransactionFrom, setIsOpenTransationForm] = useState(false);

  // For Updating Transaction
  const [isOpenUpdateForm, setIsOpenUpdateForm] = useState(false);

  // For Storing id of Desired Updated Transaction
  const [id, setId] = useState();
  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: "100%" }}>
        <Box sx={{ alignContent: "center", width: "100%" }}>
          <Container height="72px">
            <AppBar
              sx={{
                backgroundColor: "#F27C54",
              }}
            >
              <Container
                maxWidth="lg"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Container>
                  <Link to="/">
                    <Typography variant="h5" component="h1" width={"200px"}>
                      <strong>Money Tracker</strong>
                    </Typography>
                  </Link>
                </Container>
                {!isAuthenticated && (
                  <Toolbar
                    sx={{
                      position: "relative",
                      right: "20px",
                    }}
                  >
                    <Button
                      href="/signin"
                      variant="text"
                      sx={{
                        margin: "auto 30px",
                        color: "#000",
                        width: "100px",
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="contained"
                      href="/register"
                      sx={{ width: "100px" }}
                    >
                      Sign Up
                    </Button>
                  </Toolbar>
                )}
                {isAuthenticated && (
                  <Toolbar>
                    <Avatar sx={{ bgcolor: "red" }}>
                      {userEmail && userEmail.toUpperCase()[0]}
                    </Avatar>
                  </Toolbar>
                )}
              </Container>
            </AppBar>
          </Container>
          <Container
            sx={{
              position: "relative",
              top: "72px",
              margin: "auto",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Container
              sx={{
                margin: "10px 0px 0px 10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "600px",
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                sx={{ paddingBottom: "20px" }}
              >
                Transactions
              </Typography>
              {restrictionLine && !isAuthenticated && (
                <Typography sx={{ color: "red", fontSize: ".8rem" }}>
                  <Link href="/signin" sx={{ color: "red" }}>
                    {restrictionLine}
                  </Link>
                </Typography>
              )}

              {transactions && (
                <Container>
                  {transactions.map((transaction) => {
                    let t = transaction;
                    return (
                      <ul
                        key={t._id}
                        style={{
                          backgroundColor: "#F8B6A0",
                          borderRadius: "20px",
                          padding: "20px 20px",
                          listStyle: "none",
                        }}
                      >
                        <UpadateModal
                          openForm={isOpenUpdateForm}
                          closeForm={() => setIsOpenUpdateForm(false)}
                          item={id}
                        />
                        <li>
                          Your are: <strong>{transaction.userType}</strong>{" "}
                          &nbsp; &nbsp; of transaction spent for:{" "}
                          <strong>{transaction.transactionType}</strong>
                        </li>
                        <li>
                          &nbsp; &nbsp; with total amount:{" "}
                          <strong>{transaction.amount}</strong> &nbsp; &nbsp;
                          and amount per user:{" "}
                          <strong>
                            {" "}
                            {parseFloat(
                              transaction.amount / transaction.numberOfPeople
                            ).toFixed(3)}{" "}
                          </strong>
                        </li>
                        <li>
                          with total people: {transaction.numberOfPeople}&nbsp;
                          done on{" "}
                          <strong>{transaction.date.substr(0, 10)} </strong>
                        </li>
                        <li
                          style={{
                            margin: "10px auto 0px auto",
                            padding: "10px auto 0px auto",
                          }}
                        >
                          <span>
                            <Button
                              onClick={() => DeleteTransaction(transaction._id)}
                            >
                              <DeleteOutlineIcon />
                            </Button>
                            <Button
                              onClick={() => {
                                setIsOpenUpdateForm(true);
                                setId(transaction);
                              }}
                            >
                              <UpdateIcon />
                            </Button>
                          </span>
                        </li>
                        {/* Modal For Updating Previous Transactions */}
                      </ul>
                    );
                  })}
                </Container>
              )}
            </Container>
          </Container>
          {/* New Transaction Form Open Button*/}
          <Button
            color="secondary"
            variant="contained"
            sx={{
              position: "fixed",
              bottom: "20%",
              right: "10%",
              margin: "20px auto",
            }}
            onClick={() => {
              openNewTransactionFrom();
            }}
          >
            Create <ReceiptLongIcon />
          </Button>
        </Box>
        {/* Model For Creating New Transaction */}
        <TransationModal
          isOpenTransationFrom={isOpenTransactionFrom}
          onClose={() => setIsOpenTransationForm(false)}
          userEmail={userEmail && userEmail}
        />
      </div>
    </ThemeProvider>
  );
}

export default Home;
