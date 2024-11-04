import { Divider, List } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { fontSizeResponsive } from "../../config/SuperAppps";
import { useSelector } from "react-redux";

function CardDMenu({ data, navigation }) {
  const { device } = useSelector((state) => state.apps);
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
        titleStyle={{ fontSize: fontSizeResponsive("H4", device) }}
        left={() => <List.Icon icon={data?.icon} />}
        right={() => <List.Icon icon="chevron-right" />}
      />
      <Divider />
    </TouchableOpacity>
  );
}

export default CardDMenu;
