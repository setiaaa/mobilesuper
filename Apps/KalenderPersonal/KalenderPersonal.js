import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTSIZE, FONTWEIGHT } from "../../config/SuperAppps";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar, modeToNum } from "react-native-big-calendar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTokenValue } from "../../service/session";
import { getlistKalenderPersonal } from "../../service/api";
import dayjs from "dayjs";

export const KalenderPersonal = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [events, setEvents] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);
  useEffect(() => {
    if (token !== "") {
      dispatch(getlistKalenderPersonal(token));
    }
  }, [token]);

  const { personal } = useSelector((state) => state.kalenderPersonal);

  const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  };

  useEffect(() => {
    let newArr = [];
    if (personal.lists?.length > 0) {
      personal.lists?.map((child) => {
        const startDate = dayjs(child.start_date).format("YYYY-MM-DD");
        const endDate = dayjs(child.end_date).format("YYYY-MM-DD");
        let obj = {
          title: child.name || child.title,
          start: dayjs(startDate).set("hour", 10).set("minute", 0).toDate(),
          end: dayjs(endDate).set("hour", 10).set("minute", 0).toDate(),
          color: {
            backgroundColor: stringToColor(child.pic.title.name),
          },
        };
        newArr.push(obj);
      });
      setEvents(newArr);
    } else setEvents([]);
  }, [personal]);

  dayjs.locale("id");
  const today = new Date();
  const [date, setDate] = useState(today);

  const _onPrevDate = () => {
    setDate(
      dayjs(date)
        .add(dayjs(date).date() * -1, "day")
        .toDate()
    );
  };

  const _onNextDate = () => {
    setDate(dayjs(date).add(modeToNum("month", date), "day").toDate());
  };

  const _onToday = () => {
    setDate(today);
  };

  console.log(events);
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
            Kalender Personal
          </Text>
        </View>
      </View>

      <View
        style={{
          width: "90%",
          height: "90%",
          marginHorizontal: "5%",
          marginVertical: "5%",
          backgroundColor: COLORS.white,
          padding: 10,
          borderRadius: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 20,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              _onPrevDate();
            }}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: FONTSIZE.Judul,
              fontWeight: FONTWEIGHT.bold,
            }}
          >
            {dayjs(date).format("MMMM YYYY")}
          </Text>

          <TouchableOpacity
            onPress={() => {
              _onToday();
            }}
          >
            {/* <Ionicons
                      name="calendar"
                      size={24}
                      color={COLORS.primary}
                    /> */}
            <View
              style={{
                backgroundColor: COLORS.primary,
                paddingVertical: 5,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: COLORS.white }}>Hari ini</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              _onNextDate();
            }}
          >
            <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <Calendar
          events={events}
          height={500}
          mode="month"
          date={date}
          eventCellStyle={(x) => x.color}
          locale="id"
          activeDate={date}
          onPressEvent={() => {
            console.log("cek");
          }}
        />
      </View>
    </ScrollView>
  );
};
