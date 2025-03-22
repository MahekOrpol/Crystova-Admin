import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "app/auth/store/userSlice";
import axios from "axios";

function UserMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }) => auth.user);
  const navigate = useNavigate();
  const [admin, setAdmin] = useState([]);
  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = (event) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  const getAdmin = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/admin/get");
      const storedAdminId = localStorage.getItem("adminId"); // Get admin ID from localStorage

      // Find the admin whose id matches localStorage adminId
      const matchedAdmin = res?.data?.find(
        (admin) => admin.id === storedAdminId
      );

      if (matchedAdmin) {
        setAdmin(matchedAdmin);
      } else {
        setAdmin(null); // No match found
      }
    } catch (error) {
      console.error("Failed to fetch admin:", error);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <>
      <Button
        className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        <div className="hidden md:flex flex-col mx-4 items-end">
          <Typography component="span" className="font-semibold flex">
            {admin?.displayName || "Admin"}
          </Typography>
          <Typography
            className="text-11 font-medium capitalize"
            color="textSecondary"
          >
            {"Admin"}
          </Typography>
        </div>
        {user?.data?.photoURL ? (
          <Avatar
            className="md:mx-4"
            alt="user photo"
            src={user.data.photoURL}
          />
        ) : (
          <Avatar className="md:mx-4">
            {admin?.img || user.data.photoURL}
          </Avatar>
        )}
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-8",
        }}
      >
        {!user.role || user.role.length === 0 ? (
          <>
            {!localStorage.getItem("adminToken") ? (
              <>
                <MenuItem component={Link} to="/login" role="button">
                  <ListItemIcon className="min-w-40">
                    <Icon>lock</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Login" />
                </MenuItem>
                <MenuItem component={Link} to="/register" role="button">
                  <ListItemIcon className="min-w-40">
                    <Icon>person_add</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Register" />
                </MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={() => {
                  localStorage.removeItem("adminToken");
                  dispatch(logoutUser());
                  userMenuClose();
                }}
                role="button"
              >
                <ListItemIcon className="min-w-40">
                  <Icon>exit_to_app</Icon>
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </MenuItem>
            )}
          </>
        ) : (
          <>
            <MenuItem
              component={Link}
              to="/pages/profile"
              onClick={userMenuClose}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </MenuItem>
            <MenuItem
              component={Link}
              to="/apps/mail"
              onClick={userMenuClose}
              role="button"
            >
              <ListItemIcon className="min-w-40">
                <Icon>mail</Icon>
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(logoutUser());
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
}

export default UserMenu;
