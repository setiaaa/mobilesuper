import Checkbox from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONTWEIGHT } from "../../config/SuperAppps";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CardListAplikasi = ({
  item,
  index,
  appsIsChecked,
  handleChangeChecked,
  checked,
}) => {
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
        {item.subMenu &&
          item.subMenu?.map((subItem, subIndex) => {
            return (
              <View
                key={subIndex}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "97%",
                  marginBottom: 10,
                  marginLeft: 10,
                }}
              >
                <Text>{subItem.title}</Text>
                <Checkbox
                  value={checked(subItem.title)}
                  onValueChange={(checked) =>
                    handleChangeChecked(checked, subItem, item)
                  }
                />
              </View>
            );
          })}
      </View>
      {!item.subMenu && (
        <Checkbox
          value={checked(item.title)}
          onValueChange={(checked) => handleChangeChecked(checked, item)}
          color={COLORS.primary}
        />
      )}
      {/* {item?.subMenu?.map((data) => {
        <Text style={{ marginBottom: 10 }}>{data.subTitle}</Text>;
      })} */}
    </View>
  );
};
