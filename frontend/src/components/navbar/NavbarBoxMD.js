import { useState } from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

function NavbarBoxMD({ pages }) {
  const history = useHistory();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleCloseNavMenu = () => {
    history.push("/");
    setAnchorElNav(null);
  };

  return (
    <>
      {pages.map((page) => (
        <Button
          key={page}
          onClick={handleCloseNavMenu}
          sx={{ my: 2, color: "white", display: "block" }}
          style={{ color: "black" }}
        >
          {page}
        </Button>
      ))}
    </>
  );
}

export default NavbarBoxMD;
