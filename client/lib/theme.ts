import grey from '@material-ui/core/colors/grey';
import { createMuiTheme } from '@material-ui/core/styles';

export const themeDark = createMuiTheme({
  palette: {
    primary: { main: grey[700] },
    secondary: { main: grey[900] },
    type: 'dark',
  },
});

export const themeLight = createMuiTheme({
  palette: {
    primary: { main: grey[700] },
    secondary: { main: grey[900] },
    type: 'light',
  },
});
