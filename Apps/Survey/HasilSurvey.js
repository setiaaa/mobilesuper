import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text } from "react-native";
import {
  COLORS,
  FONTWEIGHT,
  PADDING,
  fontSizeResponsive,
} from "../../config/SuperAppps";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { CardListSurveyUser } from "../../components/CardListSurveyUser";
import { getTokenValue } from "../../service/session";
import {
  getSurveyCount,
  getSurveyExport,
  getSurveyReport,
} from "../../service/api";
import { BarChart, StackedBarChart } from "react-native-chart-kit";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import PieChart from "react-native-pie-chart";
import * as FileSystem from "expo-file-system";
const { StorageAccessFramework } = FileSystem;
import * as Sharing from "expo-sharing";
import ListEmpty from "../../components/ListEmpty";
import { Loading } from "../../components/Loading";

export const HasilSurvey = () => {
  const navigation = useNavigation();
  const { device } = useSelector((state) => state.apps);
  const [token, setToken] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
      // dispatch(getSurveyReport({ token: val, page: page }));
      dispatch(getSurveyCount(val));
      dispatch(getSurveyExport(val));
    });
  }, [token]);

  const [label, setLabel] = useState([]);
  const [aktualName, setAktualName] = useState([]);
  const [dataset, setDataSet] = useState([]);
  const [datasetdone, setDataSetDone] = useState([]);
  const [datasetuse, setDataSetUse] = useState([]);
  const [labelPie, setLabelPie] = useState([]);
  const [dataPenilainSatu, setDataPenilaianSatu] = useState([]);
  const [dataPenilainDua, setDataPenilaianDua] = useState([]);
  const [dataPenilainTiga, setDataPenilaianTiga] = useState([]);
  const [dataPenilainEmpat, setDataPenilaianEmpat] = useState([]);
  const [dataPenilainLima, setDataPenilaianLima] = useState([]);
  const [dataRataSatu, setDataRataSatu] = useState([]);
  const [dataRataDua, setDataRataDua] = useState([]);
  const [dataRataTiga, setDataRataTiga] = useState([]);
  const [dataRataEmpat, setDataRataEmpat] = useState([]);
  const [dataRataLima, setDataRataLima] = useState([]);
  const [labelRata, setLabelRata] = useState([]);
  const [aktualNameRata, setAktualNameRata] = useState([]);
  const [page, setPage] = useState(5);

  const { report, count, exportFile, loading } = useSelector(
    (state) => state.survey
  );
  const apps = [
    { Korespondensi: 0 },
    { "E-mail": 0 },
    { Kebijakan: 0 },
    { "Preparing dan Sharing": 0 },
    { Pengetahuan: 0 },
    { "Digital Sign": 0 },
    { "Layanan Mandiri -> Cuti": 0 },
    { "Layanan Mandiri -> SPPD": 0 },
    { Kalender: 0 },
    { "Agenda Rapat/Event": 0 },
    { "Task Management": 0 },
    { Repositori: 0 },
    { "Real Time Collaboration -> Chat": 0 },
    { "Real Time Collaboration -> Video Conference": 0 },
    { "Help Desk": 0 },
  ];

  const penilaian = [
    {
      id: "1",
      name: "Sangat Tidak Setuju",
    },
    {
      id: "2",
      name: "Tidak Setuju",
    },
    {
      id: "3",
      name: "Biasa Saja/Netral",
    },
    {
      id: "4",
      name: "Setuju",
    },
    {
      id: "5",
      name: "Sangat Setuju",
    },
  ];

  useEffect(() => {
    let label = [];
    let aktualName = [];
    let dataset = [];
    let datasetdone = [];
    let datasetuse = [];
    let labelPie = [];
    let dataPenilainSatu = [];
    let dataPenilainDua = [];
    let dataPenilainTiga = [];
    let dataPenilainEmpat = [];
    let dataPenilainLima = [];
    let dataRataSatu = [];
    let dataRataDua = [];
    let dataRataTiga = [];
    let dataRataEmpat = [];
    let dataRataLima = [];
    let aktualNameRata = [];
    let labelRata = [];

    if (count !== null) {
      let charA = 65;
      apps.map((item) => {
        label.push(String.fromCharCode(charA));
        aktualName.push({
          id: String.fromCharCode(charA),
          name: Object.keys(item)[0],
        });
        let check = count["Modul yang paling disukai"]?.hasOwnProperty(
          Object.keys(item)[0]
        );
        let checkDone = count["Modul yang sudah digunakan"]?.hasOwnProperty(
          Object.keys(item)[0]
        );
        let checkUse = count[
          "Modul yang paling sering digunakan"
        ]?.hasOwnProperty(Object.keys(item)[0]);
        if (check) {
          dataset.push(
            count["Modul yang paling disukai"][Object.keys(item)[0]]
          );
        } else {
          dataset.push(0);
        }
        if (checkDone) {
          datasetdone.push(
            count["Modul yang sudah digunakan"][Object.keys(item)[0]]
          );
        } else {
          datasetdone.push(0);
        }
        if (checkUse) {
          datasetuse.push(
            count["Modul yang paling sering digunakan"][Object.keys(item)[0]]
          );
        } else {
          datasetuse.push(0);
        }
        charA++;
      });

      penilaian.map((item) => {
        labelPie.push(item.name);
        let checksatu = count[
          "Portal Collaboration Office dapat diakses setiap hari"
        ]?.hasOwnProperty(item.id);

        let checkdua = count[
          "Informasi pada Portal Collabaration Office tersaji sesuai dengan kebutuhan"
        ]?.hasOwnProperty(item.id);

        let checktiga = count[
          "Akses login Portal Collaboration Office memiliki tingkat keamanan yang baik"
        ]?.hasOwnProperty(item.id);

        let checktempat = count[
          "Portal Collaboration Office dapat diakses dengan baik pada penjelajah (browser) saya"
        ]?.hasOwnProperty(item.id);

        let checklima = count[
          "Portal Collaboration Office mudah digunakan"
        ]?.hasOwnProperty(item.id);

        if (checksatu) {
          dataPenilainSatu.push(
            count["Portal Collaboration Office dapat diakses setiap hari"][
              item.id
            ]
          );
        } else {
          dataPenilainSatu.push(0);
        }

        if (checkdua) {
          dataPenilainDua.push(
            count[
              "Informasi pada Portal Collabaration Office tersaji sesuai dengan kebutuhan"
            ][item.id]
          );
        } else {
          dataPenilainDua.push(0);
        }

        if (checktiga) {
          dataPenilainTiga.push(
            count[
              "Akses login Portal Collaboration Office memiliki tingkat keamanan yang baik"
            ][item.id]
          );
        } else {
          dataPenilainTiga.push(0);
        }

        if (checktempat) {
          dataPenilainEmpat.push(
            count[
              "Portal Collaboration Office dapat diakses dengan baik pada penjelajah (browser) saya"
            ][item.id]
          );
        } else {
          dataPenilainEmpat.push(0);
        }

        if (checklima) {
          dataPenilainLima.push(
            count["Portal Collaboration Office mudah digunakan"][item.id]
          );
        } else {
          dataPenilainLima.push(0);
        }
      });

      charA = 65;

      // for (const key in count) {
      //   if (key.startsWith("average")) {
      //     dataRata.push(count[key]);
      //     aktualNameRata.push(key.replace("average ", ""));
      //     labelRata.push(String.fromCharCode(charA));
      //     charA++;
      //   }
      // }
      dataRataSatu.push(
        count[
          "average Akses login Portal Collaboration Office memiliki tingkat keamanan yang baik"
        ],
        5 -
          count[
            "average Akses login Portal Collaboration Office memiliki tingkat keamanan yang baik"
          ]
      );

      dataRataDua.push(
        count[
          "average Informasi pada Portal Collabaration Office tersaji sesuai dengan kebutuhan"
        ],
        5 -
          count[
            "average Informasi pada Portal Collabaration Office tersaji sesuai dengan kebutuhan"
          ]
      );

      dataRataTiga.push(
        count["average Portal Collaboration Office dapat diakses setiap hari"],
        5 -
          count["average Portal Collaboration Office dapat diakses setiap hari"]
      );

      dataRataEmpat.push(
        count["average Portal Collaboration Office mudah digunakan"],
        5 - count["average Portal Collaboration Office mudah digunakan"]
      );

      dataRataLima.push(
        count[
          "average Portal Collaboration Office dapat diakses dengan baik pada penjelajah (browser) saya"
        ],
        5 -
          count[
            "average Portal Collaboration Office dapat diakses dengan baik pada penjelajah (browser) saya"
          ]
      );

      setLabel(label);
      setAktualName(aktualName);
      setDataSet(dataset);
      setDataSetDone(datasetdone);
      setDataSetUse(datasetuse);
      setLabelPie(labelPie);
      setDataPenilaianSatu(dataPenilainSatu);
      setDataPenilaianDua(dataPenilainDua);
      setDataPenilaianTiga(dataPenilainTiga);
      setDataPenilaianEmpat(dataPenilainEmpat);
      setDataPenilaianLima(dataPenilainLima);
      setDataRataSatu(dataRataSatu);
      setDataRataDua(dataRataDua);
      setDataRataTiga(dataRataTiga);
      setDataRataEmpat(dataRataEmpat);
      setDataRataLima(dataRataLima);
      setAktualNameRata(aktualNameRata);
      setLabelRata(labelRata);
    }
  }, [count]);

  const sliceColor = [
    COLORS.infoDanger,
    COLORS.warning,
    COLORS.lighter,
    COLORS.info,
    COLORS.success,
  ];

  const colorAveragefirst = [COLORS.orange, COLORS.ExtraDivinder];
  const colorAverageSecond = [COLORS.warning, COLORS.ExtraDivinder];
  const colorAverageThird = [COLORS.lightBrown, COLORS.ExtraDivinder];
  const colorAverageFourth = [COLORS.info, COLORS.ExtraDivinder];
  const colorAverageFifth = [COLORS.success, COLORS.ExtraDivinder];
  const widthAndHeight = 200;

  const downloadPath =
    FileSystem.documentDirectory + (Platform.OS == "android" ? "" : "");

  const downloadFile = async (fileUrl, fileType, fileName) => {
    //alert(fileName)

    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        fileUrl,
        downloadPath + fileName,
        { headers: { Authorization: token } }
      );
      try {
        // if (Platform.OS === "android") {
        //   const { uri } = await downloadResumable.downloadAsync();
        //   saveAndroidFile(uri, fileName, fileType);
        // } else {
        const { uri } = await downloadResumable.downloadAsync();
        saveIosFile(uri);
        // }
      } catch (e) {
        // setIsLoading(false);
        console.error("download error:", e);
      }
    } catch (e) {}
  };

  const saveIosFile = async (fileUri) => {
    try {
      await Sharing.shareAsync(fileUri, {
        mimeType: "application/vnd.ms-excel",
        dialogTitle: "Share excel",
      });
    } catch (error) {
      console.error("Error sharing file:", error);
    }
  };

  useEffect(() => {
    if (token !== "") {
      dispatch(getSurveyReport({ token: token, page: page }));
    }
  }, [page, token]);

  const loadMore = () => {
    if (report.length % 5 === 0 && report.length !== 0) {
      setPage((prev) => prev + 5);
    }
  };

  return (
    <ScrollView>
      {loading ? <Loading /> : null}
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
            width: device === "tablet" ? 40 : 28,
            height: device === "tablet" ? 40 : 28,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-outline"
              size={device === "tablet" ? 40 : 24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text
            style={{
              fontSize: fontSizeResponsive("H1", device),
              fontWeight: FONTWEIGHT.bold,
              color: COLORS.white,
              marginRight: 50,
            }}
          >
            Hasil Survei
          </Text>
        </View>
      </View>

      <View
        style={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: COLORS.white,
          borderRadius: 16,
          padding: 20,
          marginBottom: 10,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Modul yang paling disukai
        </Text>
        <View
          style={{
            justifyContent: device === "tablet" ? "center" : "flex-start",
            alignItems: device === "tablet" ? "center" : "flex-start",
          }}
        >
          <BarChart
            data={{
              labels: label,
              datasets: [
                {
                  data: dataset,
                },
              ],
            }}
            hide
            legend
            width={wp(85)}
            height={300}
            chartConfig={{
              backgroundGradientFrom: COLORS.white,
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: COLORS.white,
              backgroundGradientToOpacity: 1,
              color: () => COLORS.lighter,
              propsForBackgroundLines: {
                x1: 60,
              },
              decimalPlaces: 1,
              fillShadowGradientFromOffset: 1,
              fillShadowGradientFrom: COLORS.warning,
              fillShadowGradientFromOpacity: 1,
              barPercentage: 0.2,
            }}
            style={{ marginHorizontal: -35, marginTop: 20 }}
            withInnerLines={false}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginHorizontal: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: COLORS.warning,
              }}
            />
            <Text
              style={{
                fontSize: fontSizeResponsive("H3", device),
                fontWeight: 400,
              }}
            >
              Jawaban Survei
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: COLORS.grey,
            marginVertical: 20,
          }}
        />
        {aktualName.map((item) => {
          return (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text style={{ width: 10 }}>{item.id}</Text>
              <Text>=</Text>
              <Text>{item.name}</Text>
            </View>
          );
        })}
      </View>

      <View
        style={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: COLORS.white,
          borderRadius: 16,
          padding: 20,
          marginBottom: 10,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
        }}
      >
        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Modul yang sudah digunakan
        </Text>
        <View
          style={{
            justifyContent: device === "tablet" ? "center" : "flex-start",
            alignItems: device === "tablet" ? "center" : "flex-start",
          }}
        >
          <BarChart
            data={{
              labels: label,
              datasets: [
                {
                  data: datasetdone,
                },
              ],
            }}
            hide
            legend
            width={wp(85)}
            height={300}
            chartConfig={{
              backgroundGradientFrom: COLORS.white,
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: COLORS.white,
              backgroundGradientToOpacity: 1,
              color: () => COLORS.lighter,
              propsForBackgroundLines: {
                x1: 60,
              },
              decimalPlaces: 1,
              fillShadowGradientFromOffset: 1,
              fillShadowGradientFrom: COLORS.warning,
              fillShadowGradientFromOpacity: 1,
              barPercentage: 0.2,
            }}
            style={{ marginHorizontal: -35, marginTop: 20 }}
            withInnerLines={false}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginHorizontal: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: COLORS.warning,
              }}
            />
            <Text
              style={{
                fontSize: fontSizeResponsive("H3", device),
                fontWeight: 400,
              }}
            >
              Jawaban Survei
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: COLORS.grey,
            marginVertical: 20,
          }}
        />
        {aktualName.map((item) => {
          return (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text style={{ width: 10 }}>{item.id}</Text>
              <Text>=</Text>
              <Text>{item.name}</Text>
            </View>
          );
        })}
      </View>

      <View
        style={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: COLORS.white,
          borderRadius: 16,
          padding: 20,
          marginBottom: 10,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
        }}
      >
        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Modul yang paling sering digunakan
        </Text>
        <View
          style={{
            justifyContent: device === "tablet" ? "center" : "flex-start",
            alignItems: device === "tablet" ? "center" : "flex-start",
          }}
        >
          <BarChart
            data={{
              labels: label,
              datasets: [
                {
                  data: datasetuse,
                },
              ],
            }}
            hide
            legend
            width={wp(85)}
            height={300}
            chartConfig={{
              backgroundGradientFrom: COLORS.white,
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: COLORS.white,
              backgroundGradientToOpacity: 1,
              color: () => COLORS.lighter,
              propsForBackgroundLines: {
                x1: 60,
              },
              decimalPlaces: 1,
              fillShadowGradientFromOffset: 1,
              fillShadowGradientFrom: COLORS.warning,
              fillShadowGradientFromOpacity: 1,
              barPercentage: 0.2,
            }}
            style={{ marginHorizontal: -35, marginTop: 20 }}
            withInnerLines={false}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginHorizontal: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: COLORS.warning,
              }}
            />
            <Text
              style={{
                fontSize: fontSizeResponsive("H3", device),
                fontWeight: 400,
              }}
            >
              Jawaban Survei
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: COLORS.grey,
            marginVertical: 20,
          }}
        />
        {aktualName.map((item) => {
          return (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text style={{ width: 10 }}>{item.id}</Text>
              <Text>=</Text>
              <Text>{item.name}</Text>
            </View>
          );
        })}
      </View>
      {/* pertanyaan satu */}
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: COLORS.white,
          borderRadius: 16,
          padding: 20,
          marginVertical: 10,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
        }}
      >
        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Portal Collaboration Office dapat diakses setiap hari
        </Text>

        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Rata-rata{" "}
          {count === null
            ? "-"
            : count[
                "average Portal Collaboration Office dapat diakses setiap hari"
              ]}
        </Text>
        {dataPenilainSatu.length !== 0 ? (
          <PieChart
            widthAndHeight={widthAndHeight}
            series={dataPenilainSatu}
            sliceColor={sliceColor}
            coverRadius={0.75}
            coverFill={"#FFF"}
            style={{ alignSelf: "center", marginVertical: 20 }}
          />
        ) : null}
        <View
          style={{
            backgroundColor: COLORS.white,
            // backgroundColor: "brown",
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: COLORS.grey,
          }}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <View style={{ marginBottom: 10, alignItems: "flex-start" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10,
                    gap: 8,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.infoDanger,
                      width: 20,
                      height: 20,
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H2", device),
                      fontWeight: 600,
                    }}
                  >
                    Sangat Tidak Setuju
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("Judul", device),
                      fontWeight: 600,
                    }}
                  >
                    {dataPenilainSatu[0]}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.warning,
                      width: 20,
                      height: 20,
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H2", device),
                      fontWeight: 600,
                    }}
                  >
                    Tidak Setuju
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("Judul", device),
                    }}
                  >
                    {dataPenilainSatu[1]}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.lighter,
                    width: 20,
                    height: 20,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H2", device),
                    fontWeight: 600,
                  }}
                >
                  Biasa Saja/Netral
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("Judul", device),
                    fontWeight: 600,
                  }}
                >
                  {dataPenilainSatu[2]}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.info,
                    width: 20,
                    height: 20,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H2", device),
                    fontWeight: 600,
                  }}
                >
                  Setuju
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("Judul", device),
                    fontWeight: 600,
                  }}
                >
                  {dataPenilainSatu[3]}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.success,
                    width: 20,
                    height: 20,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H2", device),
                    fontWeight: 600,
                  }}
                >
                  Sangat Setuju
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("Judul", device),
                    fontWeight: 600,
                  }}
                >
                  {dataPenilainSatu[4]}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* pertanyaan dua */}
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: COLORS.white,
          borderRadius: 16,
          padding: 20,
          marginVertical: 10,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
        }}
      >
        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Informasi pada Portal Collabaration Office tersaji sesuai dengan
          kebutuhan
        </Text>

        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Rata-rata{" "}
          {count === null
            ? "-"
            : count[
                "average Informasi pada Portal Collabaration Office tersaji sesuai dengan kebutuhan"
              ]}
        </Text>
        {dataPenilainDua.length !== 0 ? (
          <PieChart
            widthAndHeight={widthAndHeight}
            series={dataPenilainDua}
            sliceColor={sliceColor}
            coverRadius={0.75}
            coverFill={"#FFF"}
            style={{ alignSelf: "center", marginVertical: 20 }}
          />
        ) : null}
        <View
          style={{
            backgroundColor: COLORS.white,
            // backgroundColor: "brown",
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: COLORS.grey,
          }}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <View style={{ marginBottom: 10, alignItems: "flex-start" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10,
                    gap: 8,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.infoDanger,
                      width: 20,
                      height: 20,
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H2", device),
                      fontWeight: 600,
                    }}
                  >
                    Sangat Tidak Setuju
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("Judul", device),
                      fontWeight: 600,
                    }}
                  >
                    {dataPenilainDua[0]}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.warning,
                      width: 20,
                      height: 20,
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H2", device),
                      fontWeight: 600,
                    }}
                  >
                    Tidak Setuju
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("Judul", device),
                    }}
                  >
                    {dataPenilainDua[1]}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.lighter,
                    width: 20,
                    height: 20,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H2", device),
                    fontWeight: 600,
                  }}
                >
                  Biasa Saja/Netral
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("Judul", device),
                    fontWeight: 600,
                  }}
                >
                  {dataPenilainDua[2]}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.info,
                    width: 20,
                    height: 20,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H2", device),
                    fontWeight: 600,
                  }}
                >
                  Setuju
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("Judul", device),
                    fontWeight: 600,
                  }}
                >
                  {dataPenilainDua[3]}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.success,
                    width: 20,
                    height: 20,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H2", device),
                    fontWeight: 600,
                  }}
                >
                  Sangat Setuju
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("Judul", device),
                    fontWeight: 600,
                  }}
                >
                  {dataPenilainDua[4]}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* pertanyaan tiga */}
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: COLORS.white,
          borderRadius: 16,
          padding: 20,
          marginVertical: 10,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
        }}
      >
        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Akses login Portal Collaboration Office memiliki tingkat keamanan yang
          baik
        </Text>
        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Rata-rata{" "}
          {count === null
            ? "-"
            : count[
                "average Akses login Portal Collaboration Office memiliki tingkat keamanan yang baik"
              ]}
        </Text>
        {dataPenilainTiga.length !== 0 ? (
          <PieChart
            widthAndHeight={widthAndHeight}
            series={dataPenilainTiga}
            sliceColor={sliceColor}
            coverRadius={0.75}
            coverFill={"#FFF"}
            style={{ alignSelf: "center", marginVertical: 20 }}
          />
        ) : null}
        <View
          style={{
            backgroundColor: COLORS.white,
            // backgroundColor: "brown",
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: COLORS.grey,
          }}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <View style={{ marginBottom: 10, alignItems: "flex-start" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10,
                    gap: 8,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.infoDanger,
                      width: 20,
                      height: 20,
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H2", device),
                      fontWeight: 600,
                    }}
                  >
                    Sangat Tidak Setuju
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("Judul", device),
                      fontWeight: 600,
                    }}
                  >
                    {dataPenilainTiga[0]}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.warning,
                      width: 20,
                      height: 20,
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H2", device),
                      fontWeight: 600,
                    }}
                  >
                    Tidak Setuju
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("Judul", device),
                    }}
                  >
                    {dataPenilainTiga[1]}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.lighter,
                    width: 20,
                    height: 20,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H2", device),
                    fontWeight: 600,
                  }}
                >
                  Biasa Saja/Netral
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("Judul", device),
                    fontWeight: 600,
                  }}
                >
                  {dataPenilainTiga[2]}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.info,
                    width: 20,
                    height: 20,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H2", device),
                    fontWeight: 600,
                  }}
                >
                  Setuju
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("Judul", device),
                    fontWeight: 600,
                  }}
                >
                  {dataPenilainTiga[3]}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.success,
                    width: 20,
                    height: 20,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H2", device),
                    fontWeight: 600,
                  }}
                >
                  Sangat Setuju
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("Judul", device),
                    fontWeight: 600,
                  }}
                >
                  {dataPenilainTiga[4]}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* pertanyaan empat */}
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: COLORS.white,
          borderRadius: 16,
          padding: 20,
          marginVertical: 10,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
        }}
      >
        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Portal Collaboration Office dapat diakses dengan baik pada penjelajah
          (browser) saya
        </Text>

        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Rata-rata{" "}
          {count === null
            ? "-"
            : count[
                "average Portal Collaboration Office dapat diakses dengan baik pada penjelajah (browser) saya"
              ]}
        </Text>
        {dataPenilainEmpat.length !== 0 ? (
          <PieChart
            widthAndHeight={widthAndHeight}
            series={dataPenilainEmpat}
            sliceColor={sliceColor}
            coverRadius={0.75}
            coverFill={"#FFF"}
            style={{ alignSelf: "center", marginVertical: 20 }}
          />
        ) : null}
        <View
          style={{
            backgroundColor: COLORS.white,
            // backgroundColor: "brown",
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: COLORS.grey,
          }}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <View style={{ marginBottom: 10, alignItems: "flex-start" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10,
                    gap: 8,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.infoDanger,
                      width: 20,
                      height: 20,
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H2", device),
                      fontWeight: 600,
                    }}
                  >
                    Sangat Tidak Setuju
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("Judul", device),
                      fontWeight: 600,
                    }}
                  >
                    {dataPenilainEmpat[0]}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.warning,
                      width: 20,
                      height: 20,
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H2", device),
                      fontWeight: 600,
                    }}
                  >
                    Tidak Setuju
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("Judul", device),
                    }}
                  >
                    {dataPenilainEmpat[1]}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.lighter,
                    width: 20,
                    height: 20,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H2", device),
                    fontWeight: 600,
                  }}
                >
                  Biasa Saja/Netral
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("Judul", device),
                    fontWeight: 600,
                  }}
                >
                  {dataPenilainEmpat[2]}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.info,
                    width: 20,
                    height: 20,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H2", device),
                    fontWeight: 600,
                  }}
                >
                  Setuju
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("Judul", device),
                    fontWeight: 600,
                  }}
                >
                  {dataPenilainEmpat[3]}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.success,
                    width: 20,
                    height: 20,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H2", device),
                    fontWeight: 600,
                  }}
                >
                  Sangat Setuju
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("Judul", device),
                    fontWeight: 600,
                  }}
                >
                  {dataPenilainEmpat[4]}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* pertanyaan lima */}
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: COLORS.white,
          borderRadius: 16,
          padding: 20,
          marginVertical: 10,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
        }}
      >
        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Portal Collaboration Office mudah digunakan
        </Text>
        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Rata-rata{" "}
          {count === null
            ? "-"
            : count["average Portal Collaboration Office mudah digunakan"]}
        </Text>
        {dataPenilainLima.length !== 0 ? (
          <PieChart
            widthAndHeight={widthAndHeight}
            series={dataPenilainLima}
            sliceColor={sliceColor}
            coverRadius={0.75}
            coverFill={"#FFF"}
            style={{ alignSelf: "center", marginVertical: 20 }}
          />
        ) : null}
        <View
          style={{
            backgroundColor: COLORS.white,
            // backgroundColor: "brown",
            borderRadius: 16,
            padding: 20,
            borderWidth: 1,
            borderColor: COLORS.grey,
          }}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <View style={{ marginBottom: 10, alignItems: "flex-start" }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 10,
                    gap: 8,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.infoDanger,
                      width: 20,
                      height: 20,
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H2", device),
                      fontWeight: 600,
                    }}
                  >
                    Sangat Tidak Setuju
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("Judul", device),
                      fontWeight: 600,
                    }}
                  >
                    {dataPenilainLima[0]}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: COLORS.warning,
                      width: 20,
                      height: 20,
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  ></View>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("H2", device),
                      fontWeight: 600,
                    }}
                  >
                    Tidak Setuju
                  </Text>
                  <Text
                    style={{
                      fontSize: fontSizeResponsive("Judul", device),
                    }}
                  >
                    {dataPenilainLima[1]}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.lighter,
                    width: 20,
                    height: 20,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H2", device),
                    fontWeight: 600,
                  }}
                >
                  Biasa Saja/Netral
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("Judul", device),
                    fontWeight: 600,
                  }}
                >
                  {dataPenilainLima[2]}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  marginBottom: 10,
                  gap: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.info,
                    width: 20,
                    height: 20,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H2", device),
                    fontWeight: 600,
                  }}
                >
                  Setuju
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("Judul", device),
                    fontWeight: 600,
                  }}
                >
                  {dataPenilainLima[3]}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <View
                  style={{
                    backgroundColor: COLORS.success,
                    width: 20,
                    height: 20,
                    borderRadius: 15,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("H2", device),
                    fontWeight: 600,
                  }}
                >
                  Sangat Setuju
                </Text>
                <Text
                  style={{
                    fontSize: fontSizeResponsive("Judul", device),
                    fontWeight: 600,
                  }}
                >
                  {dataPenilainLima[4]}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: fontSizeResponsive("Judul", device),
            fontWeight: FONTWEIGHT.bold,
          }}
        >
          Rata-rata Survei
        </Text>
      </View>

      {/* rata-rata satu */}
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          backgroundColor: COLORS.white,
          borderRadius: 16,
          padding: 20,
          marginBottom: 10,
          marginTop: 10,
          //shadow ios
          shadowOffset: { width: -2, height: 4 },
          shadowColor: "#171717",
          shadowOpacity: 0.2,
          //shadow android
          elevation: 2,
        }}
      >
        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          [A] Akses login Portal Collaboration Office memiliki tingkat keamanan
          yang baik
        </Text>
        {/* <View
          style={{
            justifyContent: device === "tablet" ? "center" : "flex-start",
            alignItems: device === "tablet" ? "center" : "flex-start",
          }}
        >
          <BarChart
            data={{
              labels: labelRata,
              datasets: [
                {
                  data: dataRata,
                },
              ],
            }}
            hide
            legend
            width={wp(85)}
            height={300}
            chartConfig={{
              backgroundGradientFrom: COLORS.white,
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: COLORS.white,
              backgroundGradientToOpacity: 1,
              color: () => COLORS.lighter,
              propsForBackgroundLines: {
                x1: 60,
              },
              decimalPlaces: 1,
              fillShadowGradientFromOffset: 1,
              fillShadowGradientFrom: COLORS.orange,
              fillShadowGradientFromOpacity: 1,
              barPercentage: 1,
            }}
            style={{ marginHorizontal: -35, marginTop: 20 }}
            withInnerLines={false}
          />
        </View> */}
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginHorizontal: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: COLORS.orange,
              }}
            />
            <Text
              style={{
                fontSize: fontSizeResponsive("H3", device),
                fontWeight: 400,
              }}
            >
              Rata-rata Survei
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 2,
            backgroundColor: COLORS.grey,
            marginVertical: 20,
          }}
        />
        {aktualNameRata.map((item, index) => {
          return (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text>{labelRata[index]} </Text>
              <Text>=</Text>
              <Text style={{ width: 250 }}>{item}</Text>
            </View>
          );
        })} */}
        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Rata-rata{" "}
          {count === null
            ? "-"
            : count[
                "average Portal Collaboration Office dapat diakses setiap hari"
              ]}
        </Text>
        {dataRataSatu.length !== 0 ? (
          <PieChart
            widthAndHeight={widthAndHeight}
            series={dataRataSatu}
            sliceColor={colorAveragefirst}
            coverRadius={0.75}
            coverFill={"#FFF"}
            style={{ alignSelf: "center", marginVertical: 20 }}
          />
        ) : null}

        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          [B] Informasi pada Portal Collabaration Office tersaji sesuai dengan
          kebutuhan
        </Text>
        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Rata-rata{" "}
          {count === null
            ? "-"
            : count[
                "average Informasi pada Portal Collabaration Office tersaji sesuai dengan kebutuhan"
              ]}
        </Text>
        {dataRataDua.length !== 0 ? (
          <PieChart
            widthAndHeight={widthAndHeight}
            series={dataRataDua}
            sliceColor={colorAverageSecond}
            coverRadius={0.75}
            coverFill={"#FFF"}
            style={{ alignSelf: "center", marginVertical: 20 }}
          />
        ) : null}

        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          [C] Portal Collaboration Office dapat diakses setiap hari
        </Text>
        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Rata-rata{" "}
          {count === null
            ? "-"
            : count[
                "average Portal Collaboration Office dapat diakses setiap hari"
              ]}
        </Text>
        {dataRataTiga.length !== 0 ? (
          <PieChart
            widthAndHeight={widthAndHeight}
            series={dataRataTiga}
            sliceColor={colorAverageThird}
            coverRadius={0.75}
            coverFill={"#FFF"}
            style={{ alignSelf: "center", marginVertical: 20 }}
          />
        ) : null}

        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          [D] Portal Collaboration Office mudah digunakan
        </Text>
        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Rata-rata{" "}
          {count === null
            ? "-"
            : count["average Portal Collaboration Office mudah digunakan"]}
        </Text>
        {dataRataEmpat.length !== 0 ? (
          <PieChart
            widthAndHeight={widthAndHeight}
            series={dataRataEmpat}
            sliceColor={colorAverageFourth}
            coverRadius={0.75}
            coverFill={"#FFF"}
            style={{ alignSelf: "center", marginVertical: 20 }}
          />
        ) : null}

        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          [E] Portal Collaboration Office dapat diakses dengan baik pada
          penjelajah (browser) saya
        </Text>
        <Text
          style={{
            fontSize: fontSizeResponsive("H2", device),
            fontWeight: 600,
            marginBottom: 10,
          }}
        >
          Rata-rata{" "}
          {count === null
            ? "-"
            : count[
                "average Portal Collaboration Office dapat diakses dengan baik pada penjelajah (browser) saya"
              ]}
        </Text>
        {dataRataLima.length !== 0 ? (
          <PieChart
            widthAndHeight={widthAndHeight}
            series={dataRataLima}
            sliceColor={colorAverageFifth}
            coverRadius={0.75}
            coverFill={"#FFF"}
            style={{ alignSelf: "center", marginVertical: 20 }}
          />
        ) : null}
      </View>

      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: fontSizeResponsive("Judul", device),
            fontWeight: FONTWEIGHT.bold,
          }}
        >
          List Survei
        </Text>

        <TouchableOpacity
          style={{
            padding: 5,
            backgroundColor: COLORS.white,
            borderRadius: 20,
            marginRight: "5%",
          }}
          onPress={() => {
            downloadFile(
              exportFile.file,
              "application/pdf",
              "report_response_survey.xls"
            );
          }}
        >
          <Ionicons name="share-social-outline" size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={report}
        renderItem={({ item, index }) => (
          <CardListSurveyUser item={item} token={token} />
        )}
        keyExtractor={(item) => item}
        style={{ marginBottom: 40, maxHeight: 300 }}
        ListEmptyComponent={() => <ListEmpty />}
        onEndReached={report.length !== 0 ? loadMore : null}
        scrollEnabled={true}
        nestedScrollEnabled
      />
    </ScrollView>
  );
};
