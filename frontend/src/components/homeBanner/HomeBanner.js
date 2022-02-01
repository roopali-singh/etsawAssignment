import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from '@mui/material/Divider';
import homeBanner from "../../assets/landingPage/homeBanner.jfif";
import HomeBannerBtn from "./HomeBannerBtn";

function HomeBanner() {
  
  /////////////////// STYLING /////////////////////

  const style = {
    imageStyle: {
      width: "100%",
      height: "67vh",
      objectFit: "cover",
    },
  };

  return (
    <>
      <Box
        sx={{
          m: 0,
          p: 0,
          width: 1,
          // height: 500,
          height: "100%",
          backgroundColor: "#E8E3E9",
          position: "relative",
        }}
      >
        <img
          style={style.imageStyle}
          src={homeBanner}
          alt="HomeBanner"
          loading="lazy"
        />
        <Box
          sx={{
            width: "100%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "clamp(65px, 10vmax ,600px)",
            }}
            // variant="h1"
          >
            MANGO
          </Typography>
          <HomeBannerBtn />
        </Box>
      </Box>
      <Box
        sx={{
          m: 0,
          p: 0,
          width: 1,
        }}
      >
        <Typography
          textAlign="center"
          sx={{
            mt: 8,
            mb: 2,
            ml: 2,
            mr: 2,
            fontSize: "5vmax",
            // fontSize: "clamp(50px, 6vmax ,300px)",
          }}
          // variant="h1"
        >
          Autumn Collection
        </Typography>
        <Divider variant="middle" />
      </Box>
    </>
  );
}

export default HomeBanner;
