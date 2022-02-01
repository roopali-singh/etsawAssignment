import { forwardRef } from "react";
import PropTypes from "prop-types";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import { useHistory } from "react-router-dom";

const ButtonRoot = forwardRef(function ButtonRoot(props, ref) {
  const { children, ...other } = props;

  return (
    <svg width="150" height="50" {...other} ref={ref}>
      <polygon points="0,50 0,0 150,0 150,50" className="bg" />
      <polygon points="0,50 0,0 150,0 150,50" className="borderEffect" />
      <foreignObject x="0" y="0" width="150" height="50">
        <div className="content">{children}</div>
      </foreignObject>
    </svg>
  );
});

ButtonRoot.propTypes = {
  children: PropTypes.node,
};

const brown = {
  50: "#E8E3E9",
  100: "#ede1d5",
  200: "#D6A583",
  400: "#622F18",
  500: "#007FFF",
  600: "#9D633E",
  800: "#b7c7c4",
  900: "#B57245",
};

const CustomButtonRoot = styled(ButtonRoot)(
  ({ theme }) => `
          overflow: visible;
          cursor: pointer;
          --main-color: ${
            theme.palette.mode === "light" ? brown[600] : brown[100]
          };
          --hover-color: ${
            theme.palette.mode === "light" ? brown[50] : brown[900]
          };
          --active-color: ${
            theme.palette.mode === "light" ? brown[100] : brown[800]
          };
        
          & polygon {
            fill: transparent;
            transition: all 800ms ease;
            pointer-events: none;
          }
          
          & .bg {
            stroke: var(--main-color);
            stroke-width: 1;
            filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1));
            fill: transparent;
          }
        
          & .borderEffect {
            stroke: var(--main-color);
            stroke-width: 2;
            stroke-dasharray: 150 600;
            stroke-dashoffset: 150;
            fill: transparent;
          }
        
          &:hover,
          &.${buttonUnstyledClasses.focusVisible} {
            .borderEffect {
              stroke-dashoffset: -600;
            }
        
            .bg {
              fill: var(--hover-color);
            }
          }
        
          &:focus,
          &.${buttonUnstyledClasses.focusVisible} {
            outline: 2px solid ${
              theme.palette.mode === "dark" ? brown[400] : brown[200]
            };
            outline-offset: 2px;
          }
        
          &.${buttonUnstyledClasses.active} { 
            & .bg {
              fill: var(--active-color);
              transition: fill 300ms ease-out;
            }
          }
        
          & foreignObject {
            pointer-events: none;
        
            & .content {
              font-size: 0.875rem;
              font-family: IBM Plex Sans, sans-serif;
              font-weight: 500;
              line-height: 1.5;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: var(--main-color);
              text-transform: uppercase;
            }
        
            & svg {
              margin: 0 5px;
            }
          }`
);

const SvgButton = forwardRef(function SvgButton(props, ref) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} ref={ref} />;
});

function HomeBannerBtn() {
  const history = useHistory();

  const clickHandler = () => {
    history.push("/");
  };

  return <SvgButton onClick={clickHandler}>View Collecion</SvgButton>;
}

export default HomeBannerBtn;
