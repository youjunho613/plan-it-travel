import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyle from "style/GlobalStyle";
import { theme } from "style/theme/theme";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import store from "redux/config/store";
import Router from "shared/Router";

import "react-simple-toasts/dist/theme/success.css";
import "react-simple-toasts/dist/theme/warning.css";
import "react-simple-toasts/dist/theme/failure.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <Router />
        </QueryClientProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
