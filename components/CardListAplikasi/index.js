import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../config/SuperAppps";

export const CardListAplikasi = ({
  item,
  appsIsChecked,
  handleChangeChecked,
}) => {
  console.log(appsIsChecked);
  return (
    <View
      style={{
        marginHorizontal: "8%",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={{ marginBottom: 10 }}>{item.title}</Text>
        {item?.subMenu?.map((data) => {
          return (
            <>
              <Text style={{ marginBottom: 10, marginLeft: 10 }}>
                {data.subTitle}
              </Text>
            </>
          );
        })}
      </View>
      <Checkbox
        value={appsIsChecked.map((e) => e.title).indexOf(item.title) > -1}
        onValueChange={() => handleChangeChecked(item)}
        color={COLORS.primary}
      />
      {/* {item?.subMenu?.map((data) => {
        <Text style={{ marginBottom: 10 }}>{data.subTitle}</Text>;
      })} */}
    </View>
  );
};
