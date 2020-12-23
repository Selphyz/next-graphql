import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';
import { themeDark, themeLight } from '../lib/theme';

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [darkState, setDarkState] = useState<Boolean>(false);
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={darkState ? themeDark : themeLight}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
