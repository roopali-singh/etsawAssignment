import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import OrderPlacedAddress from "./OrderPlacedAddress";
import CartItemsCard from "./OrderPlacedOrderList";
import OrderPlacedOrderList from "./OrderPlacedOrderList";

function OrderPlacedDialog({ open }) {
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { cartItems, orderTotal } = cart;

  const backToHome = () => {
    history.replace("/");
  };

  /////////////////  STYLING  /////////////////

  const StyledButton = styled(Button)({
    backgroundColor: "#DEBB99",
    "&:hover": {
      backgroundColor: "#c99c71",
    },
  });

  return (
    <Dialog fullScreen open={open}>
      <Box sx={{ backgroundColor: "#e8e3e9", width: 1 }}>
        <Container
          component="main"
          maxWidth="xl"
          sx={{ backgroundColor: "#e8e3e9" }}
        >
          <CssBaseline />
          <Box
            sx={{
              width: 1,
              // height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h2" sx={{ mt: 5 }}>
              Order Placed
            </Typography>
            <StyledButton
              onClick={backToHome}
              variant="contained"
              sx={{
                // mb: 1,
                mt: 2,
                backgroundColor: "#DEBB99",
              }}
            >
              SHOP MORE
            </StyledButton>
            <Box
              sx={{
                backgroundColor: "white",
                width: 1,
                height: "100%",
                mt: 5,
                mb: 5,
                p: 3,
                display: "flex",
                flexDirection: "row-reverse",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <OrderPlacedAddress />
              <Box
                sx={{
                  flex: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                }}
              >
                <Typography sx={{ fontSize: 42, fontWeight: 600, mb: 2 }}>
                  Order Total: ${" "}
                  {orderTotal?.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                </Typography>
                {cartItems?.map((item) => (
                  <OrderPlacedOrderList item={item} key={item?.product_id} />
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Dialog>
  );
}

export default OrderPlacedDialog;
