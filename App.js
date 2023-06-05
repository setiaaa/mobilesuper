import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { store } from "./store/store";
import { GlobalStyles } from "./constants/styles";
// import AppNavigator from "./screen/AppNavigator";
import AppNavigator from './Apps/Korespondensi/AppNavigator'
// import OneSignal from "react-native-onesignal";
// import Constants from "expo-constants";

// OneSignal.setAppId(Constants.manifest.extra.oneSignalAppId);

// // promptForPushNotificationsWithUserResponse will show the native iOS or Android notification permission prompt.
// // We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 8)
// OneSignal.promptForPushNotificationsWithUserResponse();

export default function App() {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    version: 3,
    colors: {
      ...DefaultTheme.colors,
      primary: GlobalStyles.colors.primary,
      secondary: GlobalStyles.colors.secondary,
      tertiary: GlobalStyles.colors.tertiery,
      secondaryContainer: GlobalStyles.colors.browhite,
    },
  };

  return (
    <>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        </PaperProvider>
      </SafeAreaProvider>
    </>
  );
}
