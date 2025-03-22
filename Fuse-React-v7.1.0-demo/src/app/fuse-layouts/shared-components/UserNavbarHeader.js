import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  "& .username, & .email": {
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },

  "& .avatar": {
    background: theme.palette.background.default,
    transition: theme.transitions.create("all", {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    bottom: 0,
    "& > img": {
      borderRadius: "50%",
    },
  },
}));

function UserNavbarHeader(props) {
  const user = useSelector(({ auth }) => auth.user);
  const [admin, setAdmin] = useState([]);

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
    <StyledAppBar
      position="static"
      color="primary"
      className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0 shadow-0"
    >
      <Typography component="span" className="font-semibold flex">
        {admin?.displayName || "Admin"}
      </Typography>
      <Typography
        className="text-11 font-medium capitalize"
        color="textSecondary"
      >
        {"Admin"}
      </Typography>
      <div className="flex items-center justify-center absolute bottom-0 -mb-44">
        {user?.data?.photoURL ? (
          <Avatar
            className="md:mx-4 w-96 h-96"
            alt="user photo"
            src={user.data.photoURL}
          />
        ) : (
          <Avatar className="md:mx-4 w-96 h-96">
            {admin?.img || user.data.photoURL}
          </Avatar>
        )}
      </div>
    </StyledAppBar>
  );
}

export default UserNavbarHeader;
