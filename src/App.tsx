import { ThemeProvider } from "@material-ui/core";
import { AppRouter } from "./components/pages/AppRouter";
import { theme } from './styles/themes';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
