import { createTheme as createMuiTheme, responsiveFontSizes } from '@mui/material/styles';
import _ from "lodash";


import typography from "./typography";

const baseOptions = {
  direction: "ltr",
  typography,
  overrides: {
    MuiPickersModal: {
      dialogRoot: {
        padding: "0px",
      },
    },
    MuiDialog: {
      paperWidthSm: {
        maxWidth: "460px",
      },
    },
    MuiFormControl: {
      root: {
        width: "100%",
      },
      ".MuiFormControlLabel-label.Mui-disabled":{
        color:"transparent"
      }
    },
    paperWidthSm: {
      maxWidth: "600px",
      padding: "20px 30px",
    },
    MuiCollapse: {
      wrapperInner: {
        paddingLeft: "44px",
      },
    },

    MuiInputAdornment: {
      positionStart: {
        paddingLeft: "14px",
      },
    },
    MuiTableCell: {
      root: {
        textAlign:"center",
        borderBottom: "none",
        fontSize: "12px",
      },
    },
    MuiFormHelperText: {
      contained: {
        marginLeft: "0px !important",
        // color: "rgb(255, 125, 104) !important",
      },
    },
    MuiPickersCalendarHeader: {
      iconButton: {
        backgroundColor: "transparent",
      },
    },
    MuiPickerDTToolbar: { toolbar: { borderRadius: "8px 8px 0px 0px" } },

    MuiButton: {
      root: {
        "&.Mui-disabled": {
          color: "rgb(112, 107, 107)",
        },
      },
      contained: {
        fontSize: "14px !important",
        fontWeight: "300",
        borderRadius: "5px",
        whiteSpace: "pre",
        padding: "20px 20px !important",
      },
      outlined: {
        fontSize: "14px !important",
        fontWeight: "300",
        borderRadius: "50px",
        whiteSpace: "pre",
        padding: "10px 20px",
      },
      outlinedSizeLarge: {
        padding: "7px 35px",
      },
      containedSizeLarge: {},
    },
  },
};

const themesOptions = [
  {
    name: "LIGHT",
    overrides: {
      MuiMenu: {
        list: {
          outline: "0",
          background: "#ffffff",
        },
      },
      MuiDialog: {
        paper: {
          margin: "32px",
          backgroundColor: "#ffffff",
          padding: "20px 30px",
          position: "relative",
          overflowY: "auto",
          color: "#fff !important",
          borderRadius: "10px !important",
          "@media(max-width:767px)": {
            padding: "10px",
          },
        },
      },
      MuiSwitch: {
        switchBase: {
          color: "#FF6600 !important",
        },
        track: {
          backgroundColor: "#a8a4a4",
          opacity: "1",
        },
      },
      MuiInputBase: {
        root: {
          color: "#000",
          height: "50px",

          background: "rgba(0, 0, 0, 0.04)",
          borderRadius: "10px !important",
          // height: "50px !important",
        },
      },
      MuiSelect: {
        icon: {
          color: "#000",
        },
      },
      MuiTableHead: {
        root: {
          background: "transparent",
          borderTop: "1px solid #b3aaaa",
        },
      },
      MuiTableBody: {
        root: {
          background:
            "linear-gradient(152.97deg, rgb(255 255 255 / 65%) 0%, rgb(62 60 60 / 27%) 100%)",
        },
      },
      MuiTableRow: {
        root: {
          borderBottom: "1px solid #b3aaaa",
          "&:hover": {
            backgroundColor: "#00000017",
          },
          "&:last-child": {
            borderBottom: "none",
          },
        },
      },
      MuiTableCell: {
        head: {
          padding: "8px 16px",
          fontWeight: "300",
          color: "#212121",
          whiteSpace: "pre",
        },
        body: {
          color: "#212121",
          whiteSpace: "pre",
        },
      },

      MuiButton: {
        containedPrimary: {
          background: "linear-gradient(92deg, #FFC002 0%, #6F5300 100%)",
          borderRadius: "10px",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "600",
          height: "45px",
          lineHeight: " 21px",
          padding: "10px 39px",
          marginRight: "10px",
          border: "1px solid #FFC002",
          "&:hover": {
            color: "#000",
            background: "transparent !important",
            border: "1px solid #FFC002",
            backgroundColor: "transparent !important",
          },
        },

        containedSecondary: {
          borderRadius: "10px",
          color: "#000",
          fontSize: "14px",
          fontWeight: "600",
          height: "45px",
          lineHeight: " 21px",
          padding: "10px 39px",
          marginRight: "10px",

          background: "transparent",
          boxShadow:
            "0 1px 0 0 #ad5165, 0 -1px 0 0 #7e46a1, 1px 0 0 0 #f5673f, -1px 0 0 0 #f5673f, 1px -1px 0 0 #f5673f, -1px 1px 0 0 #f5673f, 1px 1px 0 0 #f5673f, -1px -1px 0 0 #f5673f",
          backgroundColor: "transparent",
          "&:hover": {
            color: "#fff",
            background:
              "linear-gradient(359.12deg, #FF6600 9.14%, #3333FF 110.76%)",
          },
        },

        contained: {
          "&.Mui-disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.03) ",
          },
        },
        outlinedPrimary: {
          color: "#000",
          border: "1px solid #000 !important",
          "&:hover": {
            color: "#fff",
            boxShadow: "none !important",
            backgroundColor:
              "linear-gradient(180deg, #FDA645 0%, #FF00CD 100%)",
            // backgroundColor: "#51ACED !important",
            // border: "1px solid #51ACED !important",
          },
        },
      },
      MuiPickersCalendarHeader: {
        dayLabel: { color: "#000" },
      },
      MuiPickersClockNumber: { clockNumber: { color: "#000" } },
      MuiPickersDay: {
        day: {
          color: "#000",
        },
      },
      MuiPaginationItem: {
        root: {
          color: "#000",
        },
      },
      MuiPaginationItem: {
        root: {
          color: "#000",
        },
      },
      MuiPaper: {
        root: { color: "#000" },
        elevation2: {
          position: "relative",
          zIndex: "999",
          overflow: "hidden",
          padding: "40px",
          // boxShadow: "-8px -8px 13px 0px #ffffff, 6px 13px 20px #d2d1db",
          borderRadius: "20px !important",
          backgroundColor: "#ffffff",
          "@media(max-width:767px)": {
            padding: "20px !important",
          },
        },
      },
      MuiIconButton: {
        root: {
          color: "#000000",
        },
      },

      MuiOutlinedInput: {
        inputMultiline: {
          padding: "1px !important",
          lineHeight: "17px",
        },
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
            boxShadow: "none",
          },
        },
        notchedOutline: {
          background: "rgba(0, 0, 0, 0.07)",
          borderColor: "rgb(230 226 230)",
        },
        input: {
          borderRadius: "10px",
          color: "#000",
          padding: "16px 14px",
          "&:-webkit-autofill": {
            "-webkit-background-clip": "text !important",
            // transitionDelay: "9999s",
            "caret-color": "white",
            "-webkit-box-shadow": "0 0 0 100px transparent inset",
            "-webkit-text-fill-color": "#000",
          },
          "&:-internal-autofill-selected": {
            color: "#fff",
          },
        },
      },
    },
    typography: {
      fontFamily: "'Saira', sans-serif",
    },
    palette: {
      background: {
        card: "#F0F0F0",
        tab: "rgba(191, 111, 6, 0.2)",
        header: "#fff",
        default: "#F5F5F5",
        price: "#fef7fa",
        pricename: "#fef7fa",
        blackCard: "#fef7fa",
        tablehead: "#fef7fa",
        head: "#fff",
        active: "#DA8300",
        bannerBg: "#FFFFFF",
        pricebg: "#F9F9F9;",
      },
      // primary: {
      //   main: "#007aff", //black
      // },
      secondary: {
        main: "#212121", //black
        icons: "#009900", //white
      },
      text: {
        primary: "#000", //black
        secondary: "rgba(33, 33, 33, 0.5)", //white
        gray: "#000",
        graydark: "#000",
        white: "#000",
        count: "#DA8300",
        countSub: " rgba(33, 33, 33, 0.6)",

        bannerText: "#272E35",
        bannerText1: "#FFFFFF",
      },
    },
  },
  {
    name: "DARK",
    overrides: {
      MuiDropzoneArea: {
        root: {
          backgroundColor: "#101010",
          border: "1px dashed rgba(255, 255, 255, 0.3)",
          borderColor: "rgba(255, 255, 255, 0.3)",
          minHeight: "228px",
        },
      },
      MuiAutocomplete: {
        popper: {
          background: "#1C1C1C",
          borderRadius: "10px",
        }
      },
      MuiMenu: {
        list: {
          outline: "0",
          background: "#191919",
        },
      },

      MuiDialog: {
        paper: {
          padding: "20px 30px",
          background: "#0D0D0D",
          borderRadius: "10px",
          overflow: "hidden",
          position: "relative",
          "@media(max-width:767px)": {
            padding: "10px",
          },
        },
      },
      MuiSwitch: {
        switchBase: {
          color: "#FF6600 !important",
        },
        track: {
          backgroundColor: "#E5E5E5",
          opacity: "1",
        },
      },
      MuiPickersDay: {
        day: {
          color: "#fff",
        },
      },
      MuiPickersCalendarHeader: {
        dayLabel: { color: "#fff" },
      },
      MuiTableHead: {
        root: {
          background: "transparent",
          borderTop: "1px solid #636262",
          "&:hover": {
            backgroundColor: "none",
          },
        },
      },
      MuiTableBody: {
        root: {
          // background:
          //   "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
        },
      },
      MuiTableRow: {
        root: {
          borderBottom: "1px solid #636262",
          "&:hover": {
            backgroundColor: "#ffffff14",
          },
          "&:last-child": {
            borderBottom: "none",
          },
        },
      },
      MuiTableCell: {
        head: {
          padding: "8px 16px",
          fontWeight: "300",
          color: "#DEDEDE",
          whiteSpace: "pre",

        },
        body: {
          color: "#DEDEDE",
          whiteSpace: "pre",

        },
      },
      MuiInputBase: {
        root: {
          color: "#52565c",
          cursor: "text",
          display: "inline-flex",
          position: "relative",
          fontSize: "12px",
          background: "#1C1C1C",
          boxSizing: "border-box",
          alignItems: "center",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: "300",
          lineHeight: "1.1876em",
          borderRadius: "50px",
          // height: "50px",
          boxShadow: "0px 0px 53px rgba(0, 0, 0, 0.25)",
          borderRadius: "10px !important",
          // height: "50px !important",
        },
      },
      MuiSelect: {
        icon: {
          color: "#fff",
        },
      },

      MuiButton: {
        containedPrimary: {
          background: "linear-gradient(92deg, #FFC002 0%, #6F5300 100%)",
          borderRadius: "10px",
          color: "#000",
          fontSize: "14px",
          fontWeight: "600",
          height: "45px",
          lineHeight: " 21px",
          padding: "10px 39px",
          marginRight: "10px",
          "&:hover": {
            transition: "all 0.5s ease",
            color: "#FFC002",
            background: "transparent !important",
            backgroundColor: "transparent !important",
            border: "2px solid #6F5300 ",
          },
          "&:clicked": {
            transition: "all 0.5s ease",
            color: "#FFC002",
            background: "transparent !important",
            backgroundColor: "transparent !important",
            border: "2px solid #6F5300 ",
          },
        },
        containedSecondary: {
          borderRadius: "10px",
          color: "#fff",
          fontSize: "14px",
          fontWeight: "600",
          height: "45px",
          lineHeight: " 21px",
          padding: "10px 39px",
          marginRight: "10px",

          background: "transparent",
          boxShadow:
            "0 1px 0 0 #ad5165, 0 -1px 0 0 #7e46a1, 1px 0 0 0 #f5673f, -1px 0 0 0 #f5673f, 1px -1px 0 0 #f5673f, -1px 1px 0 0 #f5673f, 1px 1px 0 0 #f5673f, -1px -1px 0 0 #f5673f",
          backgroundColor: "transparent",
          "&:hover": {
            color: "#fff",
            background:
              "linear-gradient(359.12deg, #FF6600 9.14%, #3333FF 110.76%)",
          },
        },
        contained: {
          "&.Mui-disabled": {
            backgroundColor: "rgba(255, 255, 255, 0.025) ",
            color: "#ffffff45",
          },
        },
      },
      MuiPaginationItem: {
        root: {
          color: "#ffffff",
        },
      },
      MuiPaper: {
        root: {
          color: "#fff",
          backgroundColor: "rgba(255, 255, 255, 0.03)",
        },
        elevation2: {
          position: "relative",
          zIndex: "999",
          padding: "40px !important",
          background: "#0D0D0D",
          overflow: "hidden",
          boxShadow: "none",
          borderRadius: "20px !important",
          "@media(max-width:767px)": {
            padding: "20px !important",
          },
        },
      },
      MuiIconButton: {
        root: {
          color: "#fff",
        },
      },
      MuiOutlinedInput: {
        inputMultiline: {
          padding: "1px !important",
          lineHeight: "17px",
        },
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "none",
            boxShadow: "none",
          },
        },
        notchedOutline: {
          background: "rgba(255, 255, 255, 0.025)",
          borderColor: "rgba(255, 255, 255, 0.025)",
        },
        input: {
          borderRadius: "10px",
          color: "#fff",
          padding: "16px 14px",
          "&:-webkit-autofill": {
            "-webkit-background-clip": "text !important",
            // transitionDelay: "9999s",
            "caret-color": "white",
            "-webkit-box-shadow": "0 0 0 100px transparent inset",
            "-webkit-text-fill-color": "#fff",
          },
          "&:-internal-autofill-selected": {
            color: "#fff",
          },
        },
      },
    },
    typography: {
      fontFamily: "'K2D', sans-serif",
    },
    palette: {
      background: {
        card: "#1C1C1C",
        tab: "rgba(216, 125, 7, 0.2)",
        header: "#0D0D0D",
        // default:
        //   "linear-gradient(152.97deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)",
        price: "#2B2B2B",
        pricename: "#474747",
        blackCard: "#1E1E1E",
        tablehead: "#1B1A1A",
        head: "#0D0D0D",
        active: "#FFC002",
        bannerBg: "#383838",
        pricebg: "#131313",
      },
      primary: {
        main: "#FFC002", //black
      },
      secondary: {
        main: "#DEDEDE", //white
        icons: "#FFFFFF", //white
      },
      text: {
        primary: "#FFFFFF", //white
        secondary: "rgba(222, 222, 222, 0.5)", //white
        gray: " #A9A9A9",
        graydark: "#A7A7A7",
        white: "#fff",
        count: "#FFC002",
        countSub: "rgba(222, 222, 222, 0.6)",
        bannerText: "#212121",
        bannerText1: "#0D0D0D",
      },
    },
  },
];

export const createTheme = (config = {}) => {
    let themeOptions = themesOptions.find((theme) => theme.name === config.theme);
  
    if (!themeOptions) {
      console.warn(new Error(`The theme ${config.theme} is not valid`));
      [themeOptions] = themesOptions;
    }
  
    let theme = createMuiTheme(
      _.merge({}, baseOptions, themeOptions, { direction: config.direction })
    );
  
    if (config.responsiveFontSizes) {
      theme = responsiveFontSizes(theme, { 
        // Specify unitless line height here
        htmlFontSize: 16, // Adjust according to your design
        factor: 2, // Adjust according to your design
        lineHeight: 1.5, // Use unitless line height
      });
    }
  
    return theme;
  };