import { Alert } from "react-native";

export const AlertConfirm = (title, message, onPress) => {
    return Alert.alert(
    title,
    message,
    [
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "Cancel",
      },
      // The "Yes" button
      {
        text: "Ok",
        onPress: onPress
      },
    ]
  );
}

export default AlertConfirm;