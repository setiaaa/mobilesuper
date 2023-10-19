import React from "react";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { AVATAR, COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TabBar } from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={{ marginTop: 10 }}>
    <Text
      style={{
        backgroundColor: "#F0F0F0",
        fontSize: 13,
        fontWeight: 600,
        textAlign: "center",
        borderRadius: 4,
      }}
    >
      JUMLAH
    </Text>
    <View
      style={{ flexDirection: "row", marginTop: 10, justifyContent: "center" }}
    >
      <View
        style={{
          width: "30%",
          height: 64,
          alignItems: "center",
          alignContent: "center",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: 400 }}>Nilai</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#11C15B",
            marginTop: 10,
          }}
        >
          0
        </Text>
      </View>
      <View
        style={{
          width: "30%",
          height: 64,
          alignItems: "center",
          alignContent: "center",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: 400 }}>Disukai</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#11C15B",
            marginTop: 10,
          }}
        >
          0
        </Text>
      </View>
      <View
        style={{
          width: "30%",
          height: 64,
          alignItems: "center",
          alignContent: "center",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: 400 }}>Dilihat</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#11C15B",
            marginTop: 10,
          }}
        >
          0
        </Text>
      </View>
    </View>
  </View>
);

const SecondRoute = () => (
  <View style={{ marginTop: 10 }}>
    <Text
      style={{
        backgroundColor: "#F0F0F0",
        fontSize: 13,
        fontWeight: 600,
        textAlign: "center",
        borderRadius: 4,
      }}
    >
      JUMLAH
    </Text>
    <View
      style={{ flexDirection: "row", marginTop: 10, justifyContent: "center" }}
    >
      <View
        style={{
          width: "30%",
          height: 64,
          alignItems: "center",
          alignContent: "center",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: 400 }}>Nilai</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#11C15B",
            marginTop: 10,
          }}
        >
          0
        </Text>
      </View>
      <View
        style={{
          width: "30%",
          height: 64,
          alignItems: "center",
          alignContent: "center",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: 400 }}>Disukai</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#11C15B",
            marginTop: 10,
          }}
        >
          0
        </Text>
      </View>
      <View
        style={{
          width: "30%",
          height: 64,
          alignItems: "center",
          alignContent: "center",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: 400 }}>Dilihat</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#11C15B",
            marginTop: 10,
          }}
        >
          0
        </Text>
      </View>
    </View>
  </View>
);

const ThirdRoute = () => (
  <View style={{ marginTop: 10 }}>
    <Text
      style={{
        backgroundColor: "#F0F0F0",
        fontSize: 13,
        fontWeight: 600,
        textAlign: "center",
        borderRadius: 4,
      }}
    >
      JUMLAH
    </Text>
    <View
      style={{ flexDirection: "row", marginTop: 10, justifyContent: "center" }}
    >
      <View
        style={{
          width: "30%",
          height: 64,
          alignItems: "center",
          alignContent: "center",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: 400 }}>Nilai</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#11C15B",
            marginTop: 10,
          }}
        >
          0
        </Text>
      </View>
      <View
        style={{
          width: "30%",
          height: 64,
          alignItems: "center",
          alignContent: "center",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: 400 }}>Disukai</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#11C15B",
            marginTop: 10,
          }}
        >
          0
        </Text>
      </View>
      <View
        style={{
          width: "30%",
          height: 64,
          alignItems: "center",
          alignContent: "center",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: 400 }}>Dilihat</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#11C15B",
            marginTop: 10,
          }}
        >
          0
        </Text>
      </View>
    </View>
  </View>
);

const FourthRoute = () => (
  <View style={{ marginTop: 10 }}>
    <Text
      style={{
        backgroundColor: "#F0F0F0",
        fontSize: 13,
        fontWeight: 600,
        textAlign: "center",
        borderRadius: 4,
      }}
    >
      JUMLAH
    </Text>
    <View
      style={{ flexDirection: "row", marginTop: 10, justifyContent: "center" }}
    >
      <View
        style={{
          width: "30%",
          height: 64,
          alignItems: "center",
          alignContent: "center",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: 400 }}>Nilai</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#11C15B",
            marginTop: 10,
          }}
        >
          0
        </Text>
      </View>
      <View
        style={{
          width: "30%",
          height: 64,
          alignItems: "center",
          alignContent: "center",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: 400 }}>Disukai</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#11C15B",
            marginTop: 10,
          }}
        >
          0
        </Text>
      </View>
      <View
        style={{
          width: "30%",
          height: 64,
          alignItems: "center",
          alignContent: "center",
          padding: 10,
        }}
      >
        <Text style={{ fontSize: 13, fontWeight: 400 }}>Dilihat</Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#11C15B",
            marginTop: 10,
          }}
        >
          0
        </Text>
      </View>
    </View>
  </View>
);

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: COLORS.danger, }}
    style={{ backgroundColor: '#FFFFFF', shadowOffset: { width: -2, height: 2 }, shadowColor: COLORS.primary, shadowOpacity: 0.2, elevation: 2, }}
    labelStyle={{ color: COLORS.primary, fontWeight: 700, fontSize: 1 }}
  />
);


const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute,
});

export const JumlahPostingan = () => {
  const navigation = useNavigation();

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Pertama" },
    { key: "second", title: "Kedua" },
    { key: "third", title: "Ketiga" },
    { key: "fourth", title: "Keempat" },
  ]);

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          backgroundColor: COLORS.primary,
          height: 80,
          paddingBottom: 20,
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
            Jumlah Postingan
          </Text>
        </View>
      </View>
      <View style={{ width: "90%", alignSelf: "center", marginTop: 10 }}>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 8,
            height: 182,
            padding: 16,
            //shadow ios
            shadowOffset: { width: -2, height: 4 },
            shadowColor: "#171717",
            shadowOpacity: 0.2,
            //shadow android
            elevation: 2,
          }}
        >
          <View style={{ backgroundColor: COLORS.primary, borderRadius: 8 }}>
            <Text style={{ color: "#FFFFFF", textAlign: "center", fontSize: 13, fontWeight: 600}}>Triwulan</Text>
          </View>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </View>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 8,
            height: 175,
            padding: 16,
            marginTop: 10,
            //shadow ios
            shadowOffset: { width: -2, height: 4 },
            shadowColor: "#171717",
            shadowOpacity: 0.2,
            //shadow android
            elevation: 2,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="newspaper-outline" size={24} />
            <Text
              style={{
                fontSize: 13,
                fontWeight: 600,
                justifyContent: "center",
                color: "#111827",
                marginLeft: 5,
              }}
            >
              POST
            </Text>
          </View>
          <Text style={{ fontWeight: 400, textAlign: "center", marginTop: 5 }}>
            Triwulan saat ini
          </Text>
          <Text
            style={{
              backgroundColor: "#F0F0F0",
              fontSize: 13,
              fontWeight: 600,
              textAlign: "center",
              borderRadius: 4,
              marginTop: 10,
            }}
          >
            JUMLAH
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "30%",
                height: 64,
                alignItems: "center",
                alignContent: "center",
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: 400 }}>Draft</Text>
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: "#F0F0F0",
                  borderRadius: 8,
                  width: 41,
                  height: 46,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#6B7280",
                  }}
                >
                  0
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "30%",
                height: 64,
                alignItems: "center",
                alignContent: "center",
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 13, fontWeight: 400 }}>Diterbitkan</Text>
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: "#D9F5E5",
                  borderRadius: 8,
                  width: 41,
                  height: 46,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#6B7280",
                  }}
                >
                  0
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
