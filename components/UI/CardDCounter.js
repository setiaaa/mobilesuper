import { Avatar, Card } from "react-native-paper";
import { Text, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { COLORS, fontSizeResponsive } from "../../config/SuperAppps";
import { useSelector } from "react-redux";

function CardDCounter({ data, navigation }) {
  const avatarIcon = StyleSheet.compose(styles.avatarIcon, {
    backgroundColor: data?.color,
  });
  const { device } = useSelector((state) => state.apps);
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
        title={
          <View style={{ flexDirection: "row", gap: 8 }}>
            <Avatar.Icon
              size={25}
              icon={data?.icon}
              color={COLORS.white}
              style={avatarIcon}
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: fontSizeResponsive("Judul", device),
              }}
            >
              {data?.value}
            </Text>
          </View>
        }
        titleStyle={{ justifyContent: "center" }}
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
        subtitleStyle={{ fontSize: fontSizeResponsive("H4", device) }}
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
    borderRadius: 5,
  },
});
