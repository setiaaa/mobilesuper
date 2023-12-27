import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getDetailArsipCuti } from "../../service/api";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, DATETIME } from "../../config/SuperAppps";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

export const CardListDokumenDikembalikan = ({ item, nip, token }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const getDetail = (id) => {
    const params = { nip, id };
    // const data = event.listsprogress.find(item => item.id === id)
    dispatch(getDetailArsipCuti(params));
  };

  return (
    <>
      {item.status === "Returned" ? (
        <TouchableOpacity
          onPress={
            (onPress = () => {
              getDetail(item.id);
              navigation.navigate("DetailDokumenCuti", { id: "view" });
            })
          }
        >
          <View
            style={{
              backgroundColor: COLORS.white,
              padding: 10,
              borderRadius: 8,
              gap: 15,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 12 }}>
              Tanggal Pengajuan:{" "}
              {moment(item.tanggal_pembuatan, "DD MMMM YYYY HH:mm:ss").format(
                DATETIME.LONG_DATETIME
              )}
            </Text>
            <Text style={{ fontSize: 12, color: COLORS.lighter }}>
              Jenis: {item.jenis_cuti}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: COLORS.lighter }}>
                Tipe Dokumen:{" "}
              </Text>
              <View
                style={{ backgroundColor: "red", borderRadius: 10, padding: 5 }}
              >
                <Text style={{ fontSize: 12, color: COLORS.white }}>
                  {item.tipe_dokumen}
                </Text>
              </View>
            </View>
            <View style={{ justifyContent: "space-between" }}>
              <View
                style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
              >
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color={COLORS.primary}
                />
                <Text style={{ fontSize: 12, color: COLORS.lighter }}>
                  Mulai:{" "}
                  {moment(item.mulai_cuti, DATETIME.LONG_DATETIME).format(
                    DATETIME.LONG_DATETIME
                  )}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 4,
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color={COLORS.primary}
                />
                <Text style={{ fontSize: 12, color: COLORS.lighter }}>
                  Mulai:{" "}
                  {moment(item.akhir_cuti, DATETIME.LONG_DATETIME).format(
                    DATETIME.LONG_DATETIME
                  )}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ) : null}
    </>
  );
};
