import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NavbarAvatar from "./NavbarAvatar";
import NavbarBoxXS from "./NavbarBoxXS";
import NavbarBoxMD from "./NavbarBoxMD";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

function Navbar() {
  const pages = ["Home", "Shop"];
  const theme = useTheme();

  return (
    <AppBar position="static" style={{ background: "white", color: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            color="inherit"
          >
            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              MANGO
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <NavbarBoxXS pages={pages} />
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            color="inherit"
          >
            <Link to="/" style={{ color: "black", textDecoration: "none" }}>
              MANGO
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <NavbarBoxMD pages={pages} />
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex" }}>
            <NavbarAvatar />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
