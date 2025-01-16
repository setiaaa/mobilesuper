import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getDetailDigisign } from "../../service/api";
import { Config } from "../../constants/config";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  COLORS,
  fontSizeResponsive,
  FONTWEIGHT,
} from "../../config/SuperAppps";
import { useState } from "react";

export const CardListDokumenSK = ({ item, variant, token, device }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isSelected, setSelection] = useState(false);
  const getDetail = (id) => {
    const params = { token, id };
    // const data = event.listsprogress.find(item => item.id === id)
    dispatch(getDetailDigisign(params));
  };
  const BASE_URL = Config.base_url + "bridge";
  return (
    <View
      key={item.id}
      style={{
        backgroundColor: "white",
        borderRadius: 16,
        width: "90%",
        flex: 1,
        marginTop: 10,
        marginHorizontal: "5%",
        padding: 20,
        //shadow ios
        shadowOffset: { width: -2, height: 4 },
        shadowColor: "#171717",
        shadowOpacity: 0.2,
        // //shadow android
        elevation: 2,
        marginVertical: 10,
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        onPress={() => {
          getDetail(item.id);
          navigation.navigate("DetailDokumenLain", { variant: variant });
        }}
      >
        {/* {variant === "inprogress" ? (
          <Checkbox
            value={isSelected}
            onValueChange={setSelection}
            color={isSelected === true ? COLORS.lighter : null}
          />
        ) : null} */}
        <View style={{ flexDirection: "column", width: "100%" }}>
          <Text
            style={{
              fontSize: fontSizeResponsive("H3", device),
              textAlign: "justify",
              fontWeight: FONTWEIGHT.bold,
              width: "100%",
            }}
          >
            {item?.subject}
          </Text>
          <View
            style={{
              backgroundColor: COLORS.lighter,
              height: 1,
              marginVertical: 5,
              width: "100%",
            }}
          />
          <View style={{ gap: 5, width: "100%" }}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: fontSizeResponsive("H3", device),
                  width: 120,
                  textAlign: "auto",
                  paddingRight: 12,
                  fontWeight: FONTWEIGHT.bold,
                  width: "25%",
                }}
              >
                Operator
              </Text>
              {item?.composer?.display_title !== undefined ? (
                <Text
                  style={{
                    fontWeight: FONTWEIGHT.normal,
                    width: "75%",
                    textAlign: "auto",
                    fontSize: fontSizeResponsive("H3", device),
                  }}
                >
                  :{" "}
                  {item?.composer?.officer?.nama !== undefined
                    ? item?.receivers[0]?.officer?.nama
                    : "-"}
                </Text>
              ) : (
                <Text
                  style={{
                    fontWeight: FONTWEIGHT.normal,
                    width: "75%",
                    textAlign: "auto",
                    fontSize: fontSizeResponsive("H3", device),
                  }}
                >
                  :{" "}
                  {item?.composer?.nama !== undefined
                    ? item?.composer?.nama
                    : "-"}
                </Text>
              )}
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: fontSizeResponsive("H3", device),
                  width: 120,
                  textAlign: "auto",
                  paddingRight: 12,
                  fontWeight: FONTWEIGHT.bold,
                  width: "25%",
                }}
              >
                Approval
              </Text>
              <Text style={{ fontSize: fontSizeResponsive("H3", device) }}>
                :{" "}
              </Text>
              {item?.approvers.slice(1).map((data) => (
                <Image
                  source={{ uri: data.avatar_url }}
                  style={{
                    width: device === "tablet" ? 40 : 20,
                    height: device === "tablet" ? 40 : 20,
                    borderRadius: 50,
                  }}
                />
              ))}
            </View>
            {variant === "signed" ? (
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H3", device),
                    width: 110,
                    textAlign: "auto",
                    paddingRight: 12,
                    fontWeight: FONTWEIGHT.bold,
                    width: "25%",
                  }}
                >
                  Status
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H3", device),
                    width: 200,
                    textAlign: "auto",
                    fontWeight: FONTWEIGHT.normal,
                    width: "55%",
                  }}
                >
                  :{item.state === "in_progress" ? "In Progress" : "Done"}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
