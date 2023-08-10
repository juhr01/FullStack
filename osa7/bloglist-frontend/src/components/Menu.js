import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

const Menu = (props) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          <Button
            id="logout-Button"
            color="inherit"
            onClick={props.handleLogout}
          >
            logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Menu;
