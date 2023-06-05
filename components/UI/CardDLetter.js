import { DrawerActions } from "@react-navigation/native";
import { Avatar, Card } from "react-native-paper";
import { Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useDispatch } from "react-redux";

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
        title={
          data.type == "onprogress"
            ? "Need Follow Up"
            : data.type == "agenda_in"
            ? "Incoming Letter"
            : data.type == "agenda_disposition"
            ? "Disposition"
            : ""
        }
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon={icon.icon}
            color={GlobalStyles.colors.textWhite}
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
    borderRadius: 16,
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: GlobalStyles.colors.textWhite,
  },
  avatarIcon: { backgroundColor: GlobalStyles.colors.primary },
  counterText: {
    fontSize: GlobalStyles.font.hd4,
    padding: 15,
    fontWeight: "bold",
  },
});
