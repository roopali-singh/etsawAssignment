import { useState, forwardRef } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { addToCart } from "../../actions/cartActions";
import { useDispatch } from "react-redux";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function OrderPlacedOrderList({ item }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const addToCartHandler = (productId, quantity) => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
      setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  /////////////////  STYLING  /////////////////

  const StyledButton = styled(Button)({
    backgroundColor: "#e8e3e9",
    "&:hover": {
      backgroundColor: "#e8e3e9",
    },
  });

  return (
    <Card sx={{ display: "flex", mb: 4, minHeight: "210px" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={item?.image}
        alt="Product Image"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Box sx={{ minWidth: "170px", maxWidth: "230px" }}>
            <Typography component="div" variant="h6">
              {truncate(item?.title, 44)}
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            $ {item?.price}
          </Typography>

          <Typography variant="subtitle1" color="text.primary" component="div">
            Qty: {item?.qty}
          </Typography>
        </CardContent>

        <StyledButton
          onClick={() => addToCartHandler(item?.product_id, item?.qty)}
          variant="contained"
          sx={{
            width: "max-content",
            ml: 2,
            mb: 1,
          }}
        >
          Buy Again
        </StyledButton>

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Product added to cart!
          </Alert>
        </Snackbar>
      </Box>
    </Card>
  );
}

export default OrderPlacedOrderList;
