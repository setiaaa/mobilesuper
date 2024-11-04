import { Avatar, Card } from "react-native-paper";
import { Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { COLORS } from "../../config/SuperAppps";

function CardDCounter({ data, navigation }) {
  const avatarIcon = StyleSheet.compose(styles.avatarIcon, {
    backgroundColor: data?.color,
  });
  return (
    <Card
      style={styles.card}
      onPress={() => {
        navigation.navigate(data?.navName, {
          unread:
            data?.navName == "DispositionUnread" ||
            data?.navName == "IncomingUnread" ||
            data?.navName == "InternalUnread"
              ? true
              : false,
          title:
            data?.type == "draft"
              ? "Nomor Tersedia"
              : data?.type == "onprogress"
              ? "Perlu Diproses"
              : data?.type == "sign"
              ? "Perlu TTD Elektronik"
              : data?.type == "agenda_in"
              ? "Surat Masuk"
              : data?.type == "agenda_disposition"
              ? "Disposisi"
              : data?.type == "incoming"
              ? "Surat Masuk"
              : data?.type == "internal" && data?.navName == "InternalUnread"
              ? "Internal Satker"
              : data?.type == "internal" && data?.navName !== "InternalUnread"
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
        title={<Text>{data?.value}</Text>}
        titleStyle={{ fontSize: 20, fontWeight: "bold", paddingTop: 5 }}
        subtitle={
          data?.type == "draft"
            ? "Nomor Tersedia"
            : data?.type == "onprogress"
            ? "Perlu Diproses"
            : data?.type == "sign"
            ? "Perlu TTD Elektronik"
            : data?.type == "agenda_in"
            ? "Surat Masuk"
            : data?.type == "agenda_disposition"
            ? "Disposisi"
            : data?.type == "incoming"
            ? "Surat Masuk"
            : data?.type == "internal" && data?.navName == "InternalUnread"
            ? "Internal Satker"
            : data?.type == "internal" && data?.navName !== "InternalUnread"
            ? "Internal Satker"
            : data?.type == "disposition"
            ? "Disposisi"
            : data?.type == "tracking"
            ? "Lacak"
            : data?.type == "submitted"
            ? "Terkirim"
            : ""
        }
        subtitleNumberOfLines={5}
        subtitleStyle={{ fontSize: 9 }}
        left={(props) => (
          <Avatar.Icon
            {...props}
            size={45}
            icon={data?.icon}
            color={COLORS.white}
            style={avatarIcon} // Atur margin agar sesuai kebutuhan
          />
        )}
        leftStyle={{ marginRight: 20 }}
      />
    </Card>
  );
}

export default CardDCounter;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.textWhite,
    width: "48%",
    justifyContent: "center",
  },
  avatarIcon: {
    backgroundColor: GlobalStyles.colors.primary,
    borderRadius: 10,
  },
  counterText: {
    fontSize: GlobalStyles.font.hd5,
    // padding: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
