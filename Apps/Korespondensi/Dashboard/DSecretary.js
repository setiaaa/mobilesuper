import { Fragment } from "react";
import { View, StyleSheet, Text } from "react-native";
import CardSecretary from "../../../components/UI/CardSecretary";
import { Button, Card } from "react-native-paper";
import { GlobalStyles } from "../../../constants/styles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { removeAll } from "../../../store/addressbook";

function DSecretary({ data, add }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.screen}>
        {data?.results &&
          data.results.length > 0 &&
          data.results.map((data) => (
            <Fragment key={data.date}>
              {data.children &&
                data.children.map((item) => (
                  <CardSecretary
                    key={item.id}
                    data={item}
                    onPress={() => {
                      navigation.navigate("SecretaryDetail", {
                        id: item.id,
                        title: "Secretary\nDetail",
                      });
                    }}
                  />
                ))}
            </Fragment>
          ))}

        {data?.results && data.results.length == 0 && (
          <Card style={styles.container}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.containerNoTitle}>
                <Text style={styles.title}>You don't have a Secretary</Text>
              </View>
            </Card.Content>
            <View style={styles.footerCard}>
              <Text></Text>
            </View>
          </Card>
        )}
      </View>

      {add && (
        <View style={styles.footer}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              dispatch(removeAll());
              navigation.navigate("SecretaryForm", {
                title: "Secretary\nForm",
              });
            }}
          >
            <Text style={styles.buttonText}>Add Secretary</Text>
          </Button>
        </View>
      )}
    </>
  );
}
export default DSecretary;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    marginBottom: 54,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    padding: 16,
    paddingBottom: 16,
  },
  button: {
    backgroundColor: GlobalStyles.colors.dSecretary,
    height: 40,
  },
  buttonText: {
    fontSize: GlobalStyles.font.lg,
    fontWeight: "bold",
  },
  container: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: GlobalStyles.colors.textWhite,
  },
  cardContent: {
    flexDirection: "row",
    paddingBottom: 16,
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    backgroundColor: GlobalStyles.colors.dSecretary,
  },
  footerCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    margin: 4,
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
});
