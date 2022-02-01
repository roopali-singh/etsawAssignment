import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function ProductCardQty({ qty, updateQty }) {
  const [quantity, setQuantity] = useState(qty);

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  useEffect(() => {
    updateQty(quantity);
  }, [quantity]);

  const maxQty = 10;

  ////////// STYLING //////////

  return (
    <FormControl sx={{ minWidth: 70 }}>
      <Select
        value={quantity}
        onChange={handleChange}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        {[...Array(maxQty).keys()].map((x) =>
          x + 1 === 1 ? (
            <MenuItem value={x + 1} key={x + 1}>
              {x + 1}
            </MenuItem>
          ) : (
            <MenuItem key={x + 1} value={x + 1} key={x + 1}>
              {x + 1}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
}

export default ProductCardQty;
