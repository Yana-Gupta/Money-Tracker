import React from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";

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

function TransationModal({ isOpenTransationFrom, onClose, userEmail }) {
  if (!isOpenTransationFrom) {
    return null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let type = event.target.type.value;
    let amount = event.target.amount.value;
    let user = event.target.usertype.value;
    let people = event.target.people.value;
    await axios
      .post(URL + "transaction", {
        email: userEmail,
        transactionType: type,
        amount: amount,
        userType: user,
        numberOfPeople: people,
      })
      .then((res) => {
        if (res.status === 201) {
          onClose();
        }
      })
      .catch((err) => console.log("Error Posting transaction", err));
  }
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "1000",
        backgroundColor: "#FCE2D9",
        padding: "90px 100px",
        borderRadius: "12px",
      }}
    >
      <Button
        onClick={onClose}
        style={{
          height: "50px",
          position: "absolute",
          top: "0px",
          right: "0px",
        }}
      >
        <CloseIcon />
      </Button>
      <form
        id="form"
        className="form"
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <FormLabel sx={{ margin: "10px auto" }}>Transaction Details</FormLabel>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Transaction Type
          </InputLabel>
          <NativeSelect
            defaultValue={""}
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

        <FormControl sx={{ margin: "10px auto" }} fullWidth>
          <TextField type="number" variant="standard" name="amount" required />
        </FormControl>

        <FormControl sx={{ margin: "10px auto" }} fullWidth>
          <InputLabel variant="standard">You're: </InputLabel>
          <NativeSelect inputProps={{ name: "usertype", type: "text" }}>
            <option>Owner</option>
            <option>Borrower</option>
          </NativeSelect>
        </FormControl>

        <FormControl sx={{ margin: "10px auto" }} fullWidth>
          <TextField type="number" name="people" required />
        </FormControl>
        <Button type="submit"> Submit </Button>
      </form>
    </div>
  );
}

export default TransationModal;
