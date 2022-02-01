import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import { createOrder, resetOrderCreated } from "../actions/orderAction";
import { useHistory } from "react-router-dom";
import ErrorBox from "../components/error/ErrorBox";

function AddressPage() {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress, orderTotal } = cart;

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loggedInUser } = user;
  const order = useSelector((state) => state.order);
  const { createdOrder, loading, success, error } = order;
  const [address, setAddress] = useState(shippingAddress?.address);
  const [city, setCity] = useState(shippingAddress?.city);
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode);
  const [country, setCountry] = useState(shippingAddress?.country);

  const placeOrderHandler = (event) => {
    event.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(createOrder({ ...cart, orderItems: cart?.cartItems }, orderTotal));
  };

  useEffect(() => {
    if (success) {
      history.replace(`/order/${createdOrder?.createdOrder?._id}`);
      dispatch(resetOrderCreated());
    }
  }, [success]);

  const formInputs = [
    { label: "Address", value: address, updaterFn: setAddress },
    { label: "City", value: city, updaterFn: setCity },
    { label: "Postal Code", value: postalCode, updaterFn: setPostalCode },
    { label: "Country", value: country, updaterFn: setCountry },
  ];

  /////////////////  STYLING  /////////////////

  const StyledButton = styled(Button)({
    backgroundColor: "#DEBB99",
    "&:hover": {
      backgroundColor: "#c99c71",
    },
  });

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: 1, mb: 2 }}>
            <Typography
              component="h4"
              sx={{ textAlign: "left", fontSize: 26, fontWeight: 600 }}
            >
              Shipping Address
            </Typography>
          </Box>

          {error && (
            <Box
              sx={{
                width: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 1,
                mt: 1,
              }}
            >
              <ErrorBox error={error} />
            </Box>
          )}

          <Box sx={{ mt: 1 }}>
            {formInputs?.map((input, index) => (
              <TextField
                value={input?.value}
                key={input?.label}
                margin="normal"
                required
                fullWidth
                label={input?.label}
                type="text"
                autoFocus={index === 0}
                onChange={(e) => input?.updaterFn(e.target.value)}
                onBlur={(e) => input?.updaterFn(e.target.value.trim())}
              />
            ))}

            <StyledButton
              onClick={placeOrderHandler}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                cartItems?.length === 0 || !loggedInUser?.token || loading
              }
            >
              Place Order
            </StyledButton>
          </Box>
        </Box>
      </Container>
      {/* <OrderPlacedDialog open={openDialog} /> */}
    </>
  );
}

export default AddressPage;
