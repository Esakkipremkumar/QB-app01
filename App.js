import { ApolloProvider } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "react-query";
import AppStack from "./src/navigation/AppStack";
import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "./src/assets/theme/default";
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_800ExtraBold,
} from "@expo-google-fonts/open-sans";
import { useState } from "react";
import {
  AccessTokenProvider,
  useAccessToken,
} from "./src/contexts/useAccessToken";
import * as SplashScreen from "expo-splash-screen";
import { client } from "./src/utils/graphql/client";
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://078f841d39de45eeb0bd6a0f202ea78d@o4504287377162240.ingest.sentry.io/4504287379324928",
  enableInExpoDevelopment: true,
  debug: __DEV__, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function App() {
  return (
    <AccessTokenProvider>
      <InnerApp />
    </AccessTokenProvider>
  );
}

const InnerApp = () => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [hiddenStatusBar, setHiddenStatusBar] = useState(false);
  const { checkedForToken, accessToken } = useAccessToken();

  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_800ExtraBold,
  });

  if (!fontsLoaded && checkedForToken) return null;

  SplashScreen.hideAsync();
  return (
    <ThemeProvider theme={DefaultTheme}>
      <StatusBar style={"light"} hidden={hiddenStatusBar} />
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>
          <AppStack
            setHiddenStatusBar={setHiddenStatusBar}
            hiddenStatusBar={hiddenStatusBar}
            accessToken={accessToken}
          />
        </ApolloProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
