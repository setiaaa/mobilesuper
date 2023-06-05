import { View, Text, Image, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { Config } from "../../constants/config";
import { GlobalStyles } from "../../constants/styles";

//toolbar custom
export const toolbarBack = ({ navigation, route, options, back }) => {
  return (
    <View style={styles.containerHeader}>
      <View style={styles.containerHeaderLeft}>
        <IconButton
          icon="chevron-left"
          size={26}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Image style={styles.logoHeader} source={Config.logoHeader} />
      </View>
      <Text style={styles.titleHeader}>{route.params.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 16,
    borderBottomWidth: 1,
    borderBottomColor: GlobalStyles.colors.primary,
    backgroundColor: GlobalStyles.colors.textWhite,
  },
  containerHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleHeader: {
    textAlign: "right",
    fontWeight: "500",
    fontSize: 16,
  },
  logoHeader: {
    height: 30,
    width: 60,
  },
});
