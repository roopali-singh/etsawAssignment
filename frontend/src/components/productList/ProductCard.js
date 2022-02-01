import { useEffect, useState, forwardRef } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import { Button, CardActionArea, CardActions } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import ProductCardQty from "./ProductCardQty";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { useDispatch } from "react-redux";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ProductCard({ product, forCart, cartItemId }) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(forCart ? product?.qty : 1);
  const [open, setOpen] = useState(false);

  const addToCartHandler = (productId, quantity) => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
      !forCart && setOpen(true);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const removeFromCartHandler = (productId) => {
    if (productId) {
      dispatch(removeFromCart(productId));
    }
  };

  useEffect(() => {
    if (forCart) {
      addToCartHandler(cartItemId, qty);
    }
  }, [qty]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <Card sx={{ m: "3%", maxWidth: 300, minWidth: 200 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={product?.title}
          height="345"
          image={product?.image}
          title={product?.title}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="h3"
            color="inherit"
            sx={{ fontWeight: 550 }}
          >
            {truncate(product?.title, 50)}
          </Typography>
          <Typography
            color="primary"
            color="text.secondary"
            sx={{ fontSize: 22 }}
          >
            ${" "}
            {product?.price?.toLocaleString("en-US", {
              maximumFractionDigits: 2,
            })}
          </Typography>

          {!forCart && (
            <Box
              sx={{
                mt: 2,
                width: 1,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="textSecondary" component="p">
                Rating :
              </Typography>
              <Stack spacing={1}>
                <Rating
                  readOnly
                  name="half-rating"
                  value={product?.rating?.rate}
                  precision={0.1}
                />
              </Stack>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box
          sx={{
            width: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {!forCart ? (
            <>
              <IconButton
                color="secondary"
                aria-label="add_to_cart"
                onClick={() => addToCartHandler(product?.id, qty)}
              >
                <AddShoppingCartIcon style={{ color: "#B57245" }} />
              </IconButton>
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Product added to cart!
                </Alert>
              </Snackbar>
            </>
          ) : (
            <Stack direction="row" spacing={2} sx={{ m: 1 }}>
              <Button
                onClick={() => removeFromCartHandler(cartItemId)}
                variant="contained"
                size="small"
                color="error"
              >
                Remove From Cart
              </Button>
            </Stack>
          )}
          <ProductCardQty qty={qty} updateQty={setQty} sx={{ m: 1 }} />
        </Box>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
