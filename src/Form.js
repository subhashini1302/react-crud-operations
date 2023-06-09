import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import "milligram";

import CancelIcon from "@mui/icons-material/Cancel";
import "./Form.css";

function Form(props) {
  const [open, setOpen] = React.useState(props?.open);
  const [values, setValues] = useState({
    first_name: props?.userDetail?.first_name || "",
    last_name: props?.userDetail?.last_name || "",
    email: props?.userDetail?.email || "",
    profile_pic: props?.userDetail?.avatar || "",
  });

  const isEmailValid = (email) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email.toLowerCase());
  };

  const handleSubmit = () => {
    if (!values?.first_name) {
      alert("Please enter First Name");
    } else if (!values?.last_name) {
      alert("Please enter Last Name");
    } else if (!values?.email) {
      alert("Please enter Email");
    } else if (values?.email && !isEmailValid(values?.email)) {
      alert("Please enter valid email id");
    } else {
      const data = {
        first_name: values?.first_name,
        last_name: values?.last_name,
        email: values?.email,
      };

      if (props?.isAdd) {
        fetch("https://reqres.in/api/users", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData);
            if (responseData) {
              alert("User Created");
              close();
              props?.getUsersList();
            } else {
              alert("Please fill the form correctly");
            }
          });
      } else {
        fetch(`https://reqres.in/api/users/${props?.userDetail?.id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData);
            if (responseData) {
              alert("User Updated");
              close();
              props?.getUsersList();
            } else {
              alert("Please fill the form correctly");
            }
          });
      }
    }
  };

  const close = () => {
    setOpen(false);
    props?.isAdd ? props?.closeAddUsersDialog() : props?.closeEditUsersDialog();
  };

  const handleChange = (prop) => (event) => {
    if (prop === "first_name" || prop === "last_name") {
      if (
        /^[a-zA-Z]+$/.test(event?.target?.value) ||
        event?.target?.value === ""
      ) {
        setValues({ ...values, [prop]: event.target.value });
      }
    } else {
      setValues({ ...values, [prop]: event.target.value });
    }
  };

  const renderLabel = (label) => {
    return <h6 className="label-text">{label}</h6>;
  };

  const renderFormSection = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} lg={10}>
          {renderLabel("First Name")}
          <TextField
            variant="outlined"
            onChange={handleChange("first_name")}
            placeholder={"First Name"}
            value={values["first_name"]}
          />
        </Grid>

        <Grid item xs={12} md={10}>
          {renderLabel("Last name")}
          <TextField
            variant="outlined"
            onChange={handleChange("last_name")}
            placeholder={"Last Name"}
            value={values["last_name"]}
          />
        </Grid>

        <Grid item xs={12} md={10}>
          {renderLabel("Email")}
          <TextField
            variant="outlined"
            onChange={handleChange("email")}
            placeholder={"Email"}
            value={values["email"]}
          />
        </Grid>
        {props?.isAdd ? (
          <Grid item xs={12} md={10}>
            {renderLabel("Uplaod Image")}
            <input type="file" id="myFile" className="filename" />
          </Grid>
        ) : (
          <Grid item xs={12} md={10}>
            <input
              type="image"
              img
              src={values?.profile_pic}
              alt="image not found"
            />
          </Grid>
        )}
      </Grid>
    );
  };

  const renderTitleSection = () => {
    return (
      <Grid item container>
        <Grid item xs={12} className="dialog-heading">
          <Grid item xs={11}>
            <h4 className="profile-title">
              {props?.isAdd ? "Add User Info" : "Edit User Info"}
            </h4>
          </Grid>
          <Grid item xs={1}>
            <CancelIcon onClick={close} className="close-icon" />
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Grid>
      <Dialog
        className="main-shared-grid"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "50%",
              maxWidth: "20rem",
              borderRadius: ".625rem",
              height: "65%",
            },
          },
        }}
        open={open}
        onClose={close}
      >
        <DialogContent>
          {renderTitleSection()}

          <Grid item container xs={12}>
            <Paper className="profile-wrapper">{renderFormSection()}</Paper>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container xs={12}>
            <Grid item xs={6} />
            <Grid item xs={3}>
              <input
                class="button-clear"
                type="submit"
                value="Cancel"
                onClick={close}
              />
            </Grid>
            {props?.isAdd ? (
              <Grid item xs={3}>
                <input
                  class="button-save"
                  type="submit"
                  value="Create"
                  onClick={handleSubmit}
                />
              </Grid>
            ) : (
              <Grid item xs={3}>
                <input
                  class="button-save"
                  type="submit"
                  value="Update"
                  onClick={handleSubmit}
                />
              </Grid>
            )}
          </Grid>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Form;
