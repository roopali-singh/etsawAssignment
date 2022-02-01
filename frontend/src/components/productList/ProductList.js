import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../actions/productActions";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { PRODUCTS_PER_PAGE } from "../../constants/paginationConstants";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorBox from "../error/ErrorBox";

function ProductList() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(PRODUCTS_PER_PAGE);

  const startIndex = (page - 1) * perPage;
  const selectedProducts = products.slice(startIndex, startIndex + perPage);

  // check for Float
  let count =
    products?.length / perPage !== parseInt(products?.length / perPage)
      ? parseInt(products?.length / perPage) + 1
      : parseInt(products?.length / perPage);

  useEffect(() => {
    dispatch(fetchProducts(page));
  }, [dispatch, page]);

  return (
    <>
      <CssBaseline />
      {error && (
        <Box
          sx={{
            width: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 7,
          }}
        >
          <ErrorBox error={error} />
        </Box>
      )}
      {loading && (
        <Box
          sx={{
            color: "grey.500",
            width: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 7,
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
      <Container
        maxWidth="xl"
        sx={{
          mt: "3%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            rowGap: 5,
            columnGap: 3,
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gridTemplateRows: "repeat(auto-fill, 1fr)",
            justifyItems: "center",
            alignItems: "flex-start",
          }}
        >
          {selectedProducts?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </Box>
      </Container>
      <Box
        sx={{
          width: 1,
          display: "flex",
          justifyContent: "center",
          mt: 4,
          mb: 4,
        }}
      >
        <Stack spacing={2}>
          <Pagination
            onChange={(event, value) => setPage(value)}
            page={page}
            count={count}
            size="large"
          />
        </Stack>
      </Box>
      <Box
        sx={{
          backgroundColor: "#E8E3E9",
          width: 1,
          display: "flex",
          justifyContent: "center",
          mt: 4,
          mb: 4,
        }}
      >
        <FormControl
          sx={{
            m: 1,
            minWidth: 150,
            backgroundColor: "white",
          }}
        >
          <Select
            value={perPage}
            onChange={(e) => setPerPage(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={4}>Upto 4 products / Page</MenuItem>
            <MenuItem value={5}>Upto 5 products / Page</MenuItem>
            <MenuItem value={6}>Upto 6 products / Page</MenuItem>
            <MenuItem value={7}>Upto 7 products / Page</MenuItem>
            <MenuItem value={12}>Upto 12 products / Page</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default ProductList;
