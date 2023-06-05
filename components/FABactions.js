import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FAB, Portal } from "react-native-paper";

function FABactions({ id, data, noAgenda, tipe }) {
  const [state, setState] = useState({ open: false });
  const [visible, setVisible] = useState(true);
  const navigation = useNavigation();
  const onStateChange = ({ open }) => {
    console.log(open);
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
    getAction();
    return refresh;
  }, []);
  function getAction(){    
    if (tipe == "disposition") {
      setAction([
        {
          icon: "share",
          label: "Disposition",
          onPress: () => {
            navigation.navigate("DispositionForm", {
              title: "Disposition\nForm",
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
          label: "Disposition",
          onPress: () => {
            navigation.navigate("DispositionForm", {
              title: "Disposition\nForm",
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
          label: "Forward",
          onPress: () => {
            navigation.navigate("ForwardForm", {
              title: "Forward\nForm",
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
  return (
    <Portal>
      <FAB.Group
        open={open}
        visible={visible}
        icon={open ? "calendar-today" : "plus"}
        actions={action}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
}
export default FABactions;
