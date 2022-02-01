import { useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchOrderDetails } from "../actions/orderAction";
import OrderPlacedAddress from "../components/order/OrderPlacedAddress";
import OrderPlacedOrderList from "../components/order/OrderPlacedOrderList";

function OrderPlacedPage() {
  var { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const order = useSelector((state) => state.order);
  const { orderDetails } = order;

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [id, dispatch]);

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
                {orderDetails?.orderTotal?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
              </Typography>
              {orderDetails?.orderItems?.map((item) => (
                <OrderPlacedOrderList item={item} key={item?._id} />
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default OrderPlacedPage;
