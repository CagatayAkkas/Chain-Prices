import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNotistack } from "./Core/Hooks";
import RouteList from "./Core/Router/Routes";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const mode = useSelector((state) => state.AppConfig.theme);

  useNotistack();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          common: {
            black: "#000000",
            white: "#ffffff",
          },
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#f50057",
          },
        },
        typography: {
          button: {
            textTransform: "none",
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouteList />
    </ThemeProvider>
  );
};

export default App;
