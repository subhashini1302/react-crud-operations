import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Form from "./Form";
import "milligram";
import "./UsersList.css";

function UsersList() {
  const [usersList, setUsersList] = useState([]);
  const [addusers, setAddUsers] = useState(false);
  const [editusers, setEditUsers] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const getUsersList = async () => {
    const res = await fetch("https://reqres.in/api/users");
    const json = await res.json();
    setUsersList(json);
  };
  const init = () => {
    getUsersList();
  };

  React.useEffect(init, []);

  const handleEdit = (item) => {
    setAddUsers(false);
    setEditUsers(true);
    setUserDetail(item);
  };
  const handleAdd = () => {
    setAddUsers(true);
  };
  const closeAddUsersDialog = () => {
    setAddUsers(false);
  };

  const renderAddUsersForm = () => {
    return (
      <Form
        open={addusers}
        closeAddUsersDialog={closeAddUsersDialog}
        usersList={usersList}
        getUsersList={getUsersList}
        isAdd={true}
      />
    );
  };

  const closeEditUsersDialog = () => {
    setEditUsers(false);
  };

  const renderEditUsersForm = () => {
    return (
      <Form
        open={editusers}
        closeEditUsersDialog={closeEditUsersDialog}
        userDetail={userDetail}
        getUsersList={getUsersList}
        isAdd={false}
      />
    );
  };

  const handleDelete = (value) => {
    fetch(`https://reqres.in/api/users/${value?.id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.text();
      alert("User Deleted");
      getUsersList();
    });
  };

  return (
    <Grid item container className="full-grid">
      <Grid item xs={12} className="main-grid">
        <Grid item xs={12} className="heading-grid">
          <Grid xs={6}>
            <h2 className="heading-text">{"List Of Users"}</h2>
          </Grid>
          <Grid xs={6}>
            <a class="button" onClick={handleAdd}>
              {"Add Users"}
            </a>
          </Grid>
        </Grid>
        {usersList?.data?.map((item, index) => {
          return (
            <Grid container xs={12} className="list-grid">
              <Grid className="list-grid1">
                <img src={item?.avatar} alt="image not found" />
                <Grid xs={4} className="text-grid">
                  <h5 className="text1">
                    {"Name : "}
                    {item?.first_name + " " + item?.last_name}
                  </h5>
                  <h5 className="text2">
                    {"E-mail : "}
                    {item?.email}
                  </h5>
                </Grid>
                <Grid xs={2} className="btn1">
                  <button
                    className="button-outline"
                    onClick={() => {
                      handleEdit(item);
                    }}
                  >
                    {"Edit"}
                  </button>
                </Grid>
                <Grid xs={2} className="btn1">
                  <button
                    className="button-outline"
                    onClick={() => {
                      handleDelete(item);
                    }}
                  >
                    {"Delete"}
                  </button>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
      {addusers && renderAddUsersForm()}
      {editusers && renderEditUsersForm()}
    </Grid>
  );
}
export default UsersList;
