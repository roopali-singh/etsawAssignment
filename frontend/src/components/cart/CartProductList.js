import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import ProductCard from "../productList/ProductCard";

function CartProductList() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <>
      <Box
        sx={{
          width: 3 / 4,
          display: "grid",
          rowGap: 5,
          columnGap: 3,
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gridTemplateRows: "repeat(auto-fill, 1fr)",
          justifyItems: "center",
          alignItems: "flex-start",
        }}
      >
        {cartItems?.map((cartItem) => (
          <ProductCard
            forCart
            product={cartItem}
            key={cartItem?.product_id}
            cartItemId={cartItem?.product_id}
          />
        ))}
      </Box>
    </>
  );
}

export default CartProductList;
