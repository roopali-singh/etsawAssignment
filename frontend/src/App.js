import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Navbar from "./components/navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import CartPage from "./pages/CartPage";
import SignUpPage from "./pages/SignUpPage";
import AddressPage from "./pages/AddressPage";
import Footer from "./components/footer/Footer";
import OrderPlacedPage from "./pages/OrderPlacedPage";

function App() {
  const defaultFontFamily = "Helvetica Neue";

  const theme = createTheme({
    typography: {
      fontFamily: defaultFontFamily,
    },
    palette: {
      primary: {
        main: "#c99c71",
      },
    },
  });

  return (
    <Router>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Switch>
            <Route path="/signUp">
              <SignUpPage />
            </Route>

            <Route path="/order/:id">
              <OrderPlacedPage />
            </Route>

            <Route path="/address">
              <Navbar />
              <AddressPage />
            </Route>

            <Route path="/cart">
              <Navbar />
              <CartPage />
            </Route>

            <Route path="/">
              <Navbar />
              <LandingPage />
            </Route>
          </Switch>
          <Footer />
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
