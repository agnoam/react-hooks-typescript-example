import { createMuiTheme, Theme } from '@material-ui/core/styles';
import { green, teal } from '@material-ui/core/colors';

export const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500]
    },
    secondary: {
      main: green[500]
    }
  }
});