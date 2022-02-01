import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import ProductCardQty from "../productList/ProductCardQty";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { useDispatch } from "react-redux";

function OrderPlacedOrderList({ item }) {
  const dispatch = useDispatch();

  const addToCartHandler = (productId, quantity) => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
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
      </Box>
    </Card>
  );
}

export default OrderPlacedOrderList;
