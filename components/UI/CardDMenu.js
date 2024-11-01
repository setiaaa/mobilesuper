import { Divider, List } from "react-native-paper";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { TouchableOpacity } from "react-native";

function CardDMenu({ data, navigation }) {
  return (
    <TouchableOpacity
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
              : data?.type == "internal"
              ? "Internal Satker"
              : data?.type == "internal"
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
      <List.Item
        title={
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
        titleStyle={{ fontSize: 14 }}
        left={() => <List.Icon icon={data?.icon} />}
        right={() => <List.Icon icon="chevron-right" />}
      />
      <Divider />
    </TouchableOpacity>
  );
}

export default CardDMenu;

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
