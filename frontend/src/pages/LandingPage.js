import HomeBanner from "../components/homeBanner/HomeBanner";
import ProductList from "../components/productList/ProductList";
import { useTheme } from "@mui/material/styles";

function LandingPage() {
  const theme = useTheme();
  return (
    <>
      <HomeBanner />
      <ProductList />
    </>
  );
}

export default LandingPage;
