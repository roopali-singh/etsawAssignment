import Alert from "@mui/material/Alert";

function ErrorBox({ error }) {
  return <Alert severity="error">{error}</Alert>;
}

export default ErrorBox;
