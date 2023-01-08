import {
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";
import React from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import BackupTwoToneIcon from "@mui/icons-material/BackupTwoTone";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:4000/";

const TransactionType = [
  { id: 2, type: "Aestheics" },
  { id: 1, type: "Laundry" },
  { id: 3, type: "Clothes" },
  { id: 4, type: "Sports" },
  { id: 5, type: "Hiking" },
  { id: 6, type: "Education" },
  { id: 7, type: "Miscellaneous" },
];

function UpadateModal({ openForm, closeForm, item }) {
  const navigate = useNavigate();
  if (!openForm) {
    return null;
  }

  async function handleSubmit(event, item) {
    event.preventDefault();
    console.log(item);
    axios
      .put(URL + "transaction", {
        _id: item._id,
        userType: event.target.userType.value,
        numberOfPeople: event.target.people.value,
        amount: event.target.amount.value,
        transactionType: event.target.type.value,
      })
      .then((res) => {
        if (res.status === 200) {
          closeForm();
        }
      })
      .catch((err) => console.log("Error Updating Transaction", err));
  }
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        zIndex: "10000",
        padding: "30px 20px",
        borderRadius: "20px",
      }}
    >
      <Button
        onClick={() => {
          closeForm();
        }}
        sx={{
          position: "relative",
          top: "0px",
          left: "0px",
          width: "50px",
        }}
      >
        <CloseIcon />
      </Button>
      <form onSubmit={(e) => handleSubmit(e, item)}>
        <FormLabel>Update Transaction Details</FormLabel>

        <FormControl sx={{ margin: "6px auto" }} fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Transaction Type
          </InputLabel>
          <NativeSelect
            defaultValue={item.transactionType}
            inputProps={{
              type: "text",
              name: "type",
              id: "uncontrolled-native",
            }}
          >
            {TransactionType.map((type) => {
              return <option key={type.id}>{type.type.toUpperCase()}</option>;
            })}
          </NativeSelect>
        </FormControl>

        <FormControl sx={{ margin: "6px auto" }} fullWidth>
          <TextField
            type={"number"}
            variant="standard"
            label="Total Amount"
            name="amount"
            defaultValue={item.amount}
          ></TextField>
        </FormControl>

        <FormControl sx={{ margin: "6px auto" }} fullWidth>
          <TextField
            type={"number"}
            variant="standard"
            label="Number Of People"
            name="people"
            defaultValue={item.numberOfPeople}
          />
        </FormControl>

        <FormControl sx={{ margin: "6px auto" }} fullWidth>
          <InputLabel variant="standard"></InputLabel>
          <NativeSelect
            defaultValue={item.userType}
            inputProps={{
              type: "text",
              name: "userType",
              id: "uncontrolled-native",
            }}
          >
            <option>Owner</option>
            <option>Lender</option>
          </NativeSelect>
        </FormControl>
        <FormControl sx={{ margin: "6px auto" }}>
          <Button type="submit">
            Submit <BackupTwoToneIcon />{" "}
          </Button>
        </FormControl>
      </form>
    </div>
  );
}

export default UpadateModal;
