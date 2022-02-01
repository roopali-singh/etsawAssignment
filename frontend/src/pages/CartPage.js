import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import CartPriceBox from "../components/cart/CartPriceBox";
import CartProductList from "../components/cart/CartProductList";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

function CartPage() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <div style={{ backgroundColor: "#e8e3e9" }}>
      <CssBaseline sx={{ background: "#e8e3e9" }} />
      <Container
        maxWidth="xl"
        sx={{
          background: "#e8e3e9",
          pt: "3%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: 1 }}>
          <Typography align="left" variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
            {cartItems?.length <= 0
              ? "Your Mango Cart is Empty"
              : "Shopping Cart"}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "96%",
            m: 5,
            display: "flex",
            flexDirection: "row-reverse",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1 }}>
            <CartPriceBox />
          </div>
          <div style={{ flex: 4 }}>
            <CartProductList />
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default CartPage;
