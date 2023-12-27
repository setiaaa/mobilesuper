import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FAB, Portal } from "react-native-paper";
import { COLORS } from "../config/SuperAppps";
import { GlobalStyles } from "../constants/styles";
import { useDispatch, useSelector } from "react-redux";
import { removeAll } from "../store/addressbook";
import { removeAllDispoMulti } from "../store/dispoMulti";
import { handlerError, postHTTP } from "../utils/http";
import { Alert } from "react-native";
import { nde_api } from "../utils/api.config";

function FABactions({ id, data, noAgenda, tipe }) {
  const profile = useSelector((state) => state.profile.profile);
  const visibleFab = useSelector((state) => state.snackbar.fab);
  const [state, setState] = useState({ open: false });
  const [visible, setVisible] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onStateChange = ({ open }) => {
    setState({ open });
  };
  const { open } = state;
  const refresh = navigation.addListener("focus", () => {
    setVisible(visibleFab);
    getAction();
  });
  const [action, setAction] = useState();
  useEffect(() => {
    if (
      tipe != "sender" &&
      tipe != "receivers" &&
      tipe != "copytos" &&
      tipe != "additional_approver" &&
      tipe != "approver" &&
      tipe != "Addressbook"
    ) {
      dispatch(removeAll());
      dispatch(removeAllDispoMulti());
    }
    setVisible(visibleFab);
    if (action == undefined) getAction();
    return refresh;
  }, [action, visibleFab]);

  function confirmForward() {
    Alert.alert("Konfirmasi", "Anda yakin untuk meneruskan surat ini?", [
      {
        text: "Tidak",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YA", onPress: () => forward() },
    ]);
  }
  async function forward() {
    try {
      //prep-data
      let kepada = [];
      let kepada_ids = [];
      let data = {
        request: [
          {
            kepada: kepada,
            kepada_ids: kepada_ids,
            nota_tindakan_free: "",
            nota_tindakan: "Forward",
          },
        ],
      };
      //post api forward
      const response = await postHTTP(
        nde_api.postForward.replace("{$type}", tipe).replace("{$id}", id),
        data
      );
      //alert response
      if (response?.data?.status == "Error") {
        Alert.alert("Peringatan!", response.data.msg);
      } else {
        Alert.alert("Berhasil!", "Anda berhasil meneruskan surat ini!");
        navigation.goBack();
      }
    } catch (error) {
      handlerError(error, "Peringatan!", "Meneruskan tidak berfungsi!");
    }
  }
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
              title: "Lembar Disposisi",
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
                title: "Lembar Disposisi",
                id: id,
                data: data,
                noAgenda: noAgenda,
                tipe: tipe,
              });
            },
          },
          {
            icon: "forward",
            color: GlobalStyles.colors.textWhite,
            style: { borderRadius: 50, backgroundColor: COLORS.primary },
            label: "Teruskan",
            onPress: () => {
              confirmForward();
              // navigation.navigate("ForwardForm", {
              //   title: "Teruskan",
              //   id: id,
              //   data: data,
              //   noAgenda: noAgenda,
              //   tipe: tipe,
              // });
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
                title: "Lembar Disposisi",
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
