import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { cartOrderTotal } from "../../actions/cartActions";

function CartPriceBox() {
  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const user = useSelector((state) => state.user);
  const { loggedInUser } = user;

  const deliveryCharge = 10;
  const subTotal = cartItems?.reduce(
    (acc, value) => value?.price * value?.qty + acc,
    0
  );
  const total = deliveryCharge + subTotal;
  const numberOfItems = cartItems?.reduce((acc, item) => acc + item?.qty, 0);

  const cartContent = [
    {
      title: `Subtotal (${numberOfItems} ${
        numberOfItems > 1 ? "items" : "item"
      })`,
      price: subTotal,
      bold: false,
    },
    {
      title: "Delivery Charges",
      price: deliveryCharge,
      bold: false,
    },
    { title: "Total", price: total, bold: true },
  ];

  const checkoutHandler = () => {
    dispatch(cartOrderTotal(total));
    if (!loggedInUser?.token) {
      history?.push("/signUp?redirect=address");
    } else {
      history?.push("/address");
    }
  };

  /////////////////  STYLING  /////////////////

  const StyledButton = styled(Button)({
    backgroundColor: "#DEBB99",
    "&:hover": {
      backgroundColor: "#c99c71",
    },
  });

  return (
    <Box sx={{ minWidth: 300, mb: 5 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 27 }} gutterBottom>
            Price Details
          </Typography>
          <Divider sx={{ mb: 1 }} />
          {cartContent?.map((line) => (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={line?.title}
            >
              <Typography
                sx={{ fontWeight: line?.bold && 600 }}
                variant="h6"
                component="div"
                gutterBottom
              >
                {line?.title}
              </Typography>
              <Typography
                sx={{ fontWeight: line?.bold && 600 }}
                variant="h6"
                component="div"
                gutterBottom
              >
                ${" "}
                {line?.price?.toLocaleString("en-US", {
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Box>
          ))}
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2} sx={{ width: 1 }}>
            <StyledButton
              onClick={checkoutHandler}
              variant="contained"
              fullWidth
              disabled={cartItems?.length < 1}
              sx={{
                mb: 2,
                backgroundColor: "#DEBB99",
                width: "100%",
              }}
            >
              Proceed To Checkout
            </StyledButton>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
}

export default CartPriceBox;
