import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FAB, Portal } from "react-native-paper";
import { COLORS } from "../config/SuperAppps";
import { GlobalStyles } from "../constants/styles";
import { useSelector } from "react-redux";

function FABactions({ id, data, noAgenda, tipe }) {
  const profile = useSelector((state) => state.profile.profile);
  const [state, setState] = useState({ open: false });
  const [visible, setVisible] = useState(true);
  const navigation = useNavigation();
  const onStateChange = ({ open }) => {
    setState({ open });
  };
  const { open } = state;
  const refresh = navigation.addListener("focus", () => {
    setVisible(true);
    getAction();
  });
  const [action, setAction] = useState();
  useEffect(() => {
    setVisible(true);
    if (action == undefined) getAction();
    return refresh;
  }, [action]);
  function getAction() {
    if (tipe == "disposition") {
      setAction([
        {
          icon: "share",
          color: GlobalStyles.colors.textWhite,
          style: { borderRadius: 50, backgroundColor: COLORS.primary },
          label: "Disposisi",
          onPress: () => {
            navigation.navigate("DispositionForm", {
              title: "Buat Disposisi",
              id: id,
              data: data,
              noAgenda: noAgenda,
              tipe: tipe,
            });
            setVisible(false);
          },
        },
      ]);
    } else {
      if (profile?.is_secretary == "true") {
        setAction([
          {
            icon: "share",
            color: GlobalStyles.colors.textWhite,
            style: { borderRadius: 50, backgroundColor: COLORS.primary },
            label: "Disposisi",
            onPress: () => {
              navigation.navigate("DispositionForm", {
                title: "Buat Disposisi",
                id: id,
                data: data,
                noAgenda: noAgenda,
                tipe: tipe,
              });
              setVisible(false);
            },
          },
          {
            icon: "forward",
            color: GlobalStyles.colors.textWhite,
            style: { borderRadius: 50, backgroundColor: COLORS.primary },
            label: "Teruskan",
            onPress: () => {
              navigation.navigate("ForwardForm", {
                title: "Teruskan",
                id: id,
                data: data,
                noAgenda: noAgenda,
                tipe: tipe,
              });
              setVisible(false);
            },
          },
        ]);
      } else {
        setAction([
          {
            icon: "share",
            color: GlobalStyles.colors.textWhite,
            style: { borderRadius: 50, backgroundColor: COLORS.primary },
            label: "Disposisi",
            onPress: () => {
              navigation.navigate("DispositionForm", {
                title: "Buat Disposisi",
                id: id,
                data: data,
                noAgenda: noAgenda,
                tipe: tipe,
              });
              setVisible(false);
            },
          },
        ]);
      }
    }
  }
  return (
    <Portal>
      {action != undefined && (
        <FAB.Group
          open={open}
          visible={visible}
          icon={open ? "plus" : "plus"}
          actions={action}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
          fabStyle={{
            borderRadius: 50,
            backgroundColor: COLORS.primary,
          }}
          color={GlobalStyles.colors.textWhite}
        />
      )}
    </Portal>
  );
}
export default FABactions;
