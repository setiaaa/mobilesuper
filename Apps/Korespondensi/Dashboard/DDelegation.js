import { useNavigation } from "@react-navigation/native";
import { Fragment, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button, Card } from "react-native-paper";
import { useDispatch } from "react-redux";
import CardDelegation from "../../../components/UI/CardDelegation";
import { GlobalStyles } from "../../../constants/styles";
import { removeAll } from "../../../store/addressbook";
import { nde_api } from "../../../utils/api.config";
import { getHTTP, handlerError } from "../../../utils/http";

function DDelegation({ add }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  let [listMyDelegation, setMyDelegation] = useState([]);
  const willFocusSubscription = navigation.addListener("focus", () => {
    getMyDelegation();
  });

  useEffect(() => {
    getMyDelegation();
    return willFocusSubscription;
  }, []);

  async function getMyDelegation() {
    try {
      //get secretary actived
      const response = await getHTTP(nde_api.delegationassigned);
      setMyDelegation(response.data);
    } catch (error) {
      handlerError(error, "Warning!", "My Delegation list not working!");
    }
  }
  return (
    <>
      <ScrollView>
        <View style={styles.screen}>
          {listMyDelegation.results &&
            listMyDelegation.results.length > 0 &&
            listMyDelegation.results.map((data) => (
              <Fragment key={data.date}>
                {data.children &&
                  data.children.map((item) => (
                    <CardDelegation
                      key={item.id}
                      style={styles.card}
                      data={item}
                      onPress={() => {
                        navigation.navigate("DelegationDetail", {
                          id: item.id,
                          title: "Delegation\nDetail",
                        });
                      }}
                    />
                  ))}
              </Fragment>
            ))}
          {listMyDelegation.results && listMyDelegation.results.length == 0 && (
            <Card style={styles.container}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.containerNoTitle}>
                  <Text style={styles.title}>You don't have a Delegation</Text>
                </View>
              </Card.Content>
              <View style={styles.footerDele}>
                <Text></Text>
              </View>
            </Card>
          )}
        </View>
      </ScrollView>
      {add && (
        <View style={styles.footer}>
          <Button
            mode="contained"
            style={styles.button}
            onPress={() => {
              dispatch(removeAll());
              navigation.navigate("DelegationForm", {
                title: "Delegation\nForm",
              });
            }}
          >
            <Text style={styles.buttonText}>Add Delegation</Text>
          </Button>
        </View>
      )}
    </>
  );
}
export default DDelegation;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    marginBottom: 54,
  },
  card: {
    borderWidth: 1,
  },

  container: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: GlobalStyles.colors.textWhite,
  },
  cardContent: {
    flexDirection: "row",
    borderTopStartRadius: 16,
    borderTopEndRadius: 16,
    backgroundColor: GlobalStyles.colors.dDelegation,
  },
  footerDele: {
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
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    padding: 16,
    paddingBottom: 16,
  },
  button: {
    backgroundColor: GlobalStyles.colors.dDelegation,
  },
  buttonText: {
    fontSize: GlobalStyles.font.lg,
    fontWeight: "bold",
  },
});
