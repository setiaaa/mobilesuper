import { Avatar, Card } from "react-native-paper";
import { Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { COLORS } from "../../config/SuperAppps";

function CardDCounter({ data, icon, navigation }) {
  const avatarIcon = StyleSheet.compose(styles.avatarIcon, {
    backgroundColor: icon.color,
  });
  return (
    <Card
      style={styles.card}
      onPress={() => {
        navigation.navigate(icon.navName, {
          unread:
            icon.navName == "DispositionUnread" ||
            icon.navName == "IncomingUnread" ||
            icon.navName == "InternalUnread"
              ? true
              : false,
          title:
            data?.type == "draft"
              ? "Nomor Tersedia"
              : data?.type == "onprogress"
              ? "Perlu Diproses"
              : data?.type == "agenda_in"
              ? "Surat Masuk Belum Dibaca"
              : data?.type == "agenda_disposition"
              ? "Disposisi Belum Dibaca"
              : data?.type == "incoming"
              ? "Surat Masuk"
              : data?.type == "internal" && icon.navName == "InternalUnread"
              ? "Internal Satker Belum Dibaca"
              : data?.type == "internal" && icon.navName !== "InternalUnread"
              ? "Internal Satker"
              : data?.type == "disposition"
              ? "Disposisi"
              : data?.type == "tracking"
              ? "Lacak"
              : data?.type == "submitted"
              ? "Terkirim"
              : "",
        });
      }}
    >
      <Card.Title
        style={styles.cardTitle}
        title={
          data?.type == "draft"
            ? "Nomor Tersedia"
            : data?.type == "onprogress"
            ? "Perlu Diproses"
            : data?.type == "agenda_in"
            ? "Surat Masuk\nBelum Dibaca"
            : data?.type == "agenda_disposition"
            ? "Disposisi\nBelum Dibaca"
            : data?.type == "incoming"
            ? "Surat Masuk"
            : data?.type == "internal" && icon.navName == "InternalUnread"
            ? "Internal Satker\nBelum Dibaca"
            : data?.type == "internal" && icon.navName !== "InternalUnread"
            ? "Internal Satker"
            : data?.type == "disposition"
            ? "Disposisi"
            : data?.type == "tracking"
            ? "Lacak"
            : data?.type == "submitted"
            ? "Terkirim"
            : ""
        }
        titleNumberOfLines={5}
        left={(props) => (
          <Avatar.Icon
            {...props}
            size={50}
            icon={icon.icon}
            color={COLORS.white}
            style={avatarIcon}
          />
        )}
        titleStyle={{ fontSize: 14 }}
        right={() => (
          <Text style={styles.counterText} numberOfLines={5}>
            {data?.value}
          </Text>
        )}
      />
    </Card>
  );
}

export default CardDCounter;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginTop: 16,
    // marginHorizontal: 16,
    backgroundColor: GlobalStyles.colors.textWhite,
    width: "98%",
    paddingVertical: 12,
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
