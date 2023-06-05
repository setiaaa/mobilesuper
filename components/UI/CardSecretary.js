import { Fragment, useEffect, useState } from "react";
import { Alert, Text, StyleSheet, View } from "react-native";
import { Avatar, Card, IconButton } from "react-native-paper";
import { Config } from "../../constants/config";
import { GlobalStyles } from "../../constants/styles";
import { nde_api } from "../../utils/api.config";
import { headerToken } from "../../utils/http";

function CardSecretary({ data, onPress }) {
  const [errorAvatarTitle, setErrorAvatarTitle] = useState(false);
  const [errorAvatarSekre, setErrorAvatarSekre] = useState(false);
  let header = {};
  async function getHeader() {
    try {
      header = await headerToken();
    } catch (error) {
      Alert.alert("Warning!", "Get Header not working!");
    }
  }
  useEffect(() => {
    getHeader();
  });
  return (
    <Card style={styles.container} onPress={onPress}>
      <Card.Content style={styles.cardContent}>
        {errorAvatarTitle && (
          <Avatar.Image
            {...props}
            source={Config.avatar}
            theme={{
              colors: {
                primary: GlobalStyles.colors.textWhite,
              },
            }}
          />
        )}
        {!errorAvatarTitle && (
          <Avatar.Image
            size={40}
            source={{
              uri: `${nde_api.baseurl + data.title.avatar}`,
              method: "GET",
              headers: header,
            }}
            onError={(e) => setErrorAvatarTitle(true)}
            theme={{
              colors: {
                primary: GlobalStyles.colors.textWhite,
              },
            }}
          />
        )}
        {errorAvatarSekre && (
          <Avatar.Image
            {...props}
            source={Config.avatar}
            theme={{
              colors: {
                primary: GlobalStyles.colors.textWhite,
              },
            }}
          />
        )}
        {!errorAvatarSekre && (
          <Avatar.Image
            size={40}
            source={{
              uri: `${nde_api.baseurl + data.profile.avatar}`,
              method: "GET",
              headers: header,
            }}
            style={styles.avaSecre}
            onError={(e) => setErrorAvatarSekre(true)}
            theme={{
              colors: {
                primary: GlobalStyles.colors.textWhite,
              },
            }}
          />
        )}
        <View style={styles.containerTitle}>
          <Text style={styles.title}>{data.title.name}</Text>
          <Text style={styles.subtitle}>{data.title.fullname}</Text>
          <View style={styles.subtitleSecre}>
            <IconButton
              icon="arrow-right-bottom"
              size={14}
              iconColor={GlobalStyles.colors.textWhite}
              style={{ marginLeft: 0 }}
            />
            <Text style={[styles.subtitle, styles.subtitleArrow]}>
              {data.profile.fullname}
            </Text>
          </View>
        </View>
      </Card.Content>
      <View style={styles.footer}>
        <View>
          <Text variant="bodySmall">
            Diaktifkan:{" "}
            <Text style={{ fontWeight: "600" }}>{data.created_date}</Text>
          </Text>
        </View>
        <IconButton
          icon="arrow-right"
          mode="outlined"
          size={GlobalStyles.font.md}
        />
      </View>
    </Card>
  );
}

export default CardSecretary;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: GlobalStyles.colors.textWhite,
  },
  cardContent: {
    flexDirection: "row",
    paddingBottom: 8,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    backgroundColor: GlobalStyles.colors.dSecretary,
  },
  avaSecre: {
    marginLeft: -25,
    marginTop: 30,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  containerTitle: {
    width: "75%",
    marginLeft: 16,
  },
  containerNoTitle: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  title: {
    fontSize: GlobalStyles.font.lg,
    fontWeight: "bold",
    color: GlobalStyles.colors.textWhite,
  },
  subtitle: {
    fontSize: GlobalStyles.font.sm,
    color: GlobalStyles.colors.textWhite,
  },
  subtitleArrow: {
    marginLeft: -8,
  },
  subtitleSecre: {
    flexDirection: "row",
    alignItems: "center",
  },
});
