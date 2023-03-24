import logo from "./logo.svg";
import "./App.css";
import { Grid } from "@material-ui/core";
// import Form from "./Form";
import UsersList from "./UsersList";

function App() {
  return (
    <Grid>
      <UsersList />
    </Grid>
  );
}

export default App;
