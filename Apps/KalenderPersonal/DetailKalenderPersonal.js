import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import {
  COLORS,
  DATETIME,
  DateFormat,
  FONTSIZE,
  FONTWEIGHT,
} from "../../config/SuperAppps";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createShimmerPlaceHolder } from "expo-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment/moment";

export const DetailKalenderPersonal = () => {
  const { personal, loading } = useSelector((state) => state.kalenderPersonal);
  const navigation = useNavigation();
  const ShimmerPlaceHolder = createShimmerPlaceHolder(LinearGradient);
  const detail = personal.detail;

  console.log(detail);

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: COLORS.primary,
          height: 80,
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            borderRadius: 20,
            width: 28,
            height: 28,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <TouchableOpacity style={{}} onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center", marginRight: 50 }}>
          <Text style={{ fontSize: 15, fontWeight: 600, color: COLORS.white }}>
            Detail Kalender Personal
          </Text>
        </View>
      </View>

      <View style={styles.container}>
        <View
          style={{
            backgroundColor: COLORS.white,
            width: "90%",
            borderRadius: 8,
            marginLeft: 20,
          }}
        >
          {loading ? (
            <View style={{ marginTop: 20, marginHorizontal: 20 }}>
              <ShimmerPlaceHolder
                style={{ borderRadius: 4 }}
                width={100}
                height={20}
              />
            </View>
          ) : (
            <View style={{ marginTop: 20, marginHorizontal: 20 }}>
              <Text
                style={{
                  fontWeight: FONTWEIGHT.bold,
                  fontSize: FONTSIZE.Judul,
                }}
              >
                {detail.name}
              </Text>
            </View>
          )}

          <View
            style={{
              marginHorizontal: 20,
              marginTop: 10,
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: FONTSIZE.H2,
                fontWeight: FONTWEIGHT.bold,
              }}
            >
              Dibuat pada :
            </Text>
            {loading ? (
              <ShimmerPlaceHolder
                style={{ borderRadius: 4 }}
                width={100}
                height={20}
              />
            ) : (
              <Text>
                {DateFormat({
                  date: detail?.created_at,
                  fromDate: DATETIME.LONG_DATETIME,
                  toDate: DATETIME.LONG_DATETIME,
                })}
              </Text>
            )}
          </View>

          <View>
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                flexDirection: "row",
              }}
            >
              <View style={{ width: "50%" }}>
                <Text
                  style={{
                    fontSize: FONTSIZE.H2,
                    fontWeight: FONTWEIGHT.bold,
                  }}
                >
                  Lokasi
                </Text>
              </View>
              {loading ? (
                <ShimmerPlaceHolder
                  style={{ borderRadius: 4 }}
                  width={100}
                  height={20}
                />
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    width: "50%",
                  }}
                >
                  <Text>{detail?.location}</Text>
                </View>
              )}
            </View>
            <View
              style={{
                height: 1,
                width: "90%",
                backgroundColor: COLORS.lighter,
                opacity: 0.3,
                marginTop: 10,
                marginHorizontal: 20,
              }}
            />
          </View>

          <View>
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                flexDirection: "row",
              }}
            >
              <View style={{ width: "50%" }}>
                <Text
                  style={{
                    fontSize: FONTSIZE.H2,
                    fontWeight: FONTWEIGHT.bold,
                  }}
                >
                  Nomor Surat
                </Text>
              </View>
              {loading ? (
                <ShimmerPlaceHolder
                  style={{ borderRadius: 4 }}
                  width={100}
                  height={20}
                />
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    width: "50%",
                  }}
                >
                  <Text>{detail?.letter_number}</Text>
                </View>
              )}
            </View>
            <View
              style={{
                height: 1,
                width: "90%",
                backgroundColor: COLORS.lighter,
                opacity: 0.3,
                marginTop: 10,
                marginHorizontal: 20,
              }}
            />
          </View>

          <View>
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                flexDirection: "row",
              }}
            >
              <View style={{ width: "50%" }}>
                <Text
                  style={{
                    fontSize: FONTSIZE.H2,
                    fontWeight: FONTWEIGHT.bold,
                  }}
                >
                  Kategori Surat
                </Text>
              </View>
              {loading ? (
                <ShimmerPlaceHolder
                  style={{ borderRadius: 4 }}
                  width={100}
                  height={20}
                />
              ) : (
                <View
                  style={{
                    justifyContent: "center",
                    width: "50%",
                  }}
                >
                  <Text>{detail?.kategori}</Text>
                </View>
              )}
            </View>
            <View
              style={{
                height: 1,
                width: "90%",
                backgroundColor: COLORS.lighter,
                opacity: 0.3,
                marginTop: 10,
                marginHorizontal: 20,
              }}
            />
          </View>

          <View
            style={{
              marginHorizontal: 20,
              marginTop: 10,
              flexDirection: "row",
            }}
          >
            <View style={{ width: "50%" }}>
              <Text
                style={{
                  fontSize: FONTSIZE.H2,
                  fontWeight: FONTWEIGHT.bold,
                }}
              >
                Waktu Pelaksanaan
              </Text>
            </View>
            {loading ? (
              <ShimmerPlaceHolder
                style={{ borderRadius: 4 }}
                width={100}
                height={20}
              />
            ) : (
              <Text
                style={{
                  justifyContent: "center",
                  width: "50%",
                }}
              >
                {moment(detail.start_date, "YYYY-MM-DD HH:mm:ss")
                  .locale("id")
                  .format(DATETIME.LONG_DATE)}{" "}
                -{" "}
                {moment(detail.end_date, "YYYY-MM-DD HH:mm:ss")
                  .locale("id")
                  .format(DATETIME.LONG_DATE)}
              </Text>
            )}
          </View>

          <View>
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                flexDirection: "row",
              }}
            >
              <View style={{ width: "30%" }}>
                <Text
                  style={{
                    fontSize: FONTSIZE.H2,
                    fontWeight: FONTWEIGHT.bold,
                  }}
                >
                  Kepada
                </Text>
              </View>
              {loading ? (
                <ShimmerPlaceHolder
                  style={{ borderRadius: 4 }}
                  width={100}
                  height={20}
                />
              ) : (
                <View style={{ justifyContent: "center", width: 150 }}>
                  {detail.kepada.length === 0 ? (
                    <Text>-</Text>
                  ) : (
                    detail.kepada?.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                          }}
                        >
                          <Text>{index + 1}. </Text>
                          {/* <Image
                          source={{ uri: item.avatar_url }}
                          style={{
                            marginLeft: -8,
                            borderWidth: 2,
                            borderRadius: 50,
                            borderColor: COLORS.white,
                            width: 30,
                            height: 30,
                          }}
                        /> */}
                          <Text>{item.title.name}</Text>
                        </View>
                      );
                    })
                  )}
                </View>
              )}
            </View>
            <View
              style={{
                height: 1,
                width: "90%",
                backgroundColor: COLORS.lighter,
                opacity: 0.3,
                marginTop: 10,
                marginHorizontal: 20,
              }}
            />
          </View>

          <View>
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                flexDirection: "row",
              }}
            >
              <View style={{ width: "30%" }}>
                <Text
                  style={{
                    fontSize: FONTSIZE.H2,
                    fontWeight: FONTWEIGHT.bold,
                  }}
                >
                  Tembusan
                </Text>
              </View>
              {loading ? (
                <ShimmerPlaceHolder
                  style={{ borderRadius: 4 }}
                  width={100}
                  height={20}
                />
              ) : (
                <View style={{ justifyContent: "center", width: 150 }}>
                  {detail.tembusan?.length === 0 ? (
                    <Text>-</Text>
                  ) : (
                    detail.tembusan?.map((item, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                          }}
                        >
                          <Text>{index + 1}. </Text>
                          {/* <Image
                          source={{ uri: item.avatar_url }}
                          style={{
                            marginLeft: -8,
                            borderWidth: 2,
                            borderRadius: 50,
                            borderColor: COLORS.white,
                            width: 30,
                            height: 30,
                          }}
                        /> */}
                          <Text>{item.title.name}</Text>
                        </View>
                      );
                    })
                  )}
                </View>
              )}
            </View>
            <View
              style={{
                height: 1,
                width: "90%",
                backgroundColor: COLORS.lighter,
                opacity: 0.3,
                marginTop: 10,
                marginHorizontal: 20,
              }}
            />
          </View>

          <View>
            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                flexDirection: "row",
              }}
            >
              <View style={{ width: "30%" }}>
                <Text
                  style={{
                    fontSize: FONTSIZE.H2,
                    fontWeight: FONTWEIGHT.bold,
                  }}
                >
                  Member
                </Text>
              </View>
              {loading ? (
                <ShimmerPlaceHolder
                  style={{ borderRadius: 4 }}
                  width={100}
                  height={20}
                />
              ) : (
                <View style={{ justifyContent: "center", width: 150 }}>
                  {detail.members?.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          flexDirection: "row",
                          gap: 10,
                          alignItems: "center",
                        }}
                      >
                        <Text>{index + 1}. </Text>
                        <Image
                          source={{ uri: item.avatar_url }}
                          style={{
                            marginLeft: -8,
                            borderWidth: 2,
                            borderRadius: 50,
                            borderColor: COLORS.white,
                            width: 30,
                            height: 30,
                          }}
                        />
                        <Text>{item.nama}</Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
            <View
              style={{
                height: 1,
                width: "90%",
                backgroundColor: COLORS.lighter,
                opacity: 0.3,
                marginTop: 10,
                marginHorizontal: 20,
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1, // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
    marginRight: 40,
    marginTop: 20,
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  galeri: {
    flex: 1, // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },
  container: {
    marginTop: 20,
    flex: 1,
  },
});
