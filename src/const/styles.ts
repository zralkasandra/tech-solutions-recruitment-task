const styles = {
  colors: {
    white: "#FFFFFF",
    black: "#020403",
    primary: "#385fb2",
    secondary: "#738fc9",
    disabledLight: "#D1D3D2",
    disabledDark: "#303030",
    errorLight: "#ee5c79",
    errorDark: "#910101",
  },
  containers: {
    xl: "1200px",
  },
  breakpoints: {
    sm: "481px",
    md: "769px",
    lg: "1025px",
    xl: "1201px",
  },
  formControls: {
    width: "250px",
    height: "50px",
    borderRadius: "25px",
  },
  transition: (attribute: string) => {
    return `${attribute} 0.25s ease-out`;
  },
};

export default styles;
