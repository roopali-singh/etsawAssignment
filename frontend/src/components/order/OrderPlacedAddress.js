import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { Divider } from "@mui/material";

function OrderPlacedAddress() {
  const user = useSelector((state) => state.user);
  const { loggedInUser } = user;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const OrderAddressInfo = [
    { label: "Email", value: loggedInUser?.email },
    { label: "Address", value: shippingAddress?.address },
    { label: "City", value: shippingAddress?.city },
    { label: "Postal Code", value: shippingAddress?.postalCode },
    { label: "Country", value: shippingAddress?.country },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#e8e3e9",
        p: 3,
        mb: 5,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      {OrderAddressInfo?.map((infoItem) => (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
          }}
          key={infoItem?.label}
        >
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {infoItem?.label}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            {infoItem?.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default OrderPlacedAddress;
