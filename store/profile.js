import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: [],
    organization: [],
    device_uuid: "",
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
      if (action.payload == null) {
        AsyncStorage.removeItem("profileLogin");
      } else {
        AsyncStorage.setItem("profileLogin", JSON.stringify(action.payload));
      }
    },
    setOrganization: (state, action) => {
      state.organization = action.payload;
      if (action.payload == null) {
        AsyncStorage.removeItem("profileOrganization");
      } else {
        AsyncStorage.setItem(
          "profileOrganization",
          JSON.stringify(action.payload)
        );
      }
    },
    setDeviceUUID: (state, action) => {
      state.device_uuid = action.payload;
    },
  },
});

export const { setProfile, setOrganization, setDeviceUUID } =
  profileSlice.actions;

export default profileSlice.reducer;
