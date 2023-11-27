import { DrawerActions } from "@react-navigation/native";
import { Avatar, Card } from "react-native-paper";
import { Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useDispatch } from "react-redux";
import { COLORS } from "../../config/SuperAppps";
import { View } from "react-native";

function CardDLetter({ data, icon, navigation }) {
  const dispatch = useDispatch();
  const avatarIcon = StyleSheet.compose(styles.avatarIcon, {
    backgroundColor: icon.color,
  });
  return (
    <Card
      style={styles.card}
      onPress={() => {
        navigation.dispatch(
          DrawerActions.jumpTo(icon.navName, {
            unread: true,
          })
        );
      }}
    >
      <Card.Title
        style={styles.cardTitle}
        title={
          data.type == "onprogress"
            ? "Surat Perlu Di Proses"
            : data.type == "agenda_in"
            ? "Surat Masuk"
            : data.type == "agenda_disposition"
            ? "Disposisi"
            : ""
        }
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon={icon.icon}
            color={COLORS.white}
            style={avatarIcon}
          />
        )}
        right={() => <Text style={styles.counterText}>{data.value}</Text>}
      />
    </Card>
  );
}

export default CardDLetter;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginTop: 16,
    // marginHorizontal: 16,
    backgroundColor: GlobalStyles.colors.textWhite,
    width: "98%",
    alignSelf: "center",
  },
  cardTitle: {
    gap: 20,
  },
  avatarIcon: {
    backgroundColor: GlobalStyles.colors.primary,
  },
  counterText: {
    fontSize: GlobalStyles.font.hd4,
    padding: 15,
    fontWeight: "bold",
  },
});
