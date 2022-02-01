import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { newUserSignUp, userSignIn } from "../actions/userActions";
import { useSelector } from "react-redux";
import ErrorBox from "../components/error/ErrorBox";

function SignUpPage() {
  const location = useLocation();
  const [redirect, setRedirect] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loggedInUser, loading, error } = user;
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has("redirect")) {
      setRedirect(searchParams.get("redirect"));
    }
  }, [location]);

  const handleSpacesInBetween = (e) => {
    if (e.key === " ") {
      e.preventDefault();
    }
  };

  const signInHandler = () => {
    dispatch(userSignIn(email, password));
  };

  const signUpHandler = () => {
    dispatch(newUserSignUp(email, password));
  };

  useEffect(() => {
    if (loggedInUser?.token) {
      if (redirect === null) {
        history?.replace("/");
      } else {
        history?.replace("/address");
      }
    }
  }, [loggedInUser]);

  /////////////////  STYLING  /////////////////

  const StyledButton = styled(Button)({
    backgroundColor: "#DEBB99",
    "&:hover": {
      backgroundColor: "#c99c71",
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          <Typography component="h1" variant="h5">
            MANGO
          </Typography>
        </Link>
        <Avatar sx={{ m: 1, bgcolor: "#DEBB99" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Box sx={{ mt: 1 }}>
          {error && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <ErrorBox error={error} />
            </Stack>
          )}
          <TextField
            value={email}
            margin="normal"
            required
            fullWidth
            id="custom-css-outlined-input"
            label="Email Address"
            type="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
            onBlur={(e) => setEmail(e.target.value.trim())}
            onKeyPress={(e) => handleSpacesInBetween(e)}
          />
          <TextField
            value={password}
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            onBlur={(e) => setPassword(e.target.value.trim())}
            onKeyPress={(e) => handleSpacesInBetween(e)}
          />
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <StyledButton
              onClick={() => signInHandler()}
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                mr: 2,
                flex: 1,
              }}
            >
              Sign In
            </StyledButton>
            <StyledButton
              onClick={() => signUpHandler()}
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                ml: 2,
                backgroundColor: "#DEBB99",
                flex: 1,
              }}
            >
              Sign Up
            </StyledButton>
          </Box>
          <Grid container>
            <Grid item xs>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Forgot password?
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Don't have an account? Sign Up
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUpPage;
