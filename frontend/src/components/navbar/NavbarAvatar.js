import { useState } from "react";
import { green } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userSignOut } from "../../actions/userActions";

function NavbarAvatar() {
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const user = useSelector((state) => state.user);
  const { loggedInUser } = user;

  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    !loggedInUser?.token
      ? history?.push("/signUp")
      : setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOutHandler = () => {
    dispatch(userSignOut());
    handleClose();
  };

  const numberOfItems = cartItems?.reduce((acc, item) => acc + item?.qty, 0);

  /////////////////// STYLING /////////////////////

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      backgroundColor: "#DEBB99",
      color: theme.palette.text.primary,
    },
  }));

  return (
    <>
      <Link to="/cart" style={{ color: "black" }}>
        <IconButton
          size="large"
          aria-label="cart"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          sx={{ m: 1 }}
        >
          <StyledBadge badgeContent={numberOfItems}>
            <ShoppingCartIcon color="inherit" />
          </StyledBadge>
        </IconButton>
      </Link>
      <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          sx={{ m: 1 }}
        >
          {loggedInUser?.token ? (
            <AccountCircle sx={{ color: green[400] }} />
          ) : (
            <AccountCircle color="inherit" />
          )}
        </IconButton>

        {/* ///////////////////// MENU ////////////////////////// */}

        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {loggedInUser?.token && (
            <MenuItem onClick={handleClose}>
              <Typography textAlign="center">{loggedInUser?.email}</Typography>
            </MenuItem>
          )}
          <MenuItem onClick={signOutHandler}>
            <Typography textAlign="center">Sign-out</Typography>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
}

export default NavbarAvatar;
