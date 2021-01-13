import { ThemeProvider } from "@material-ui/core";
import { AppRouter } from "./components/pages/AppRouter";
import { theme } from './components/shared/themes';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
