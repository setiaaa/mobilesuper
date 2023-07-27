import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import profileReducer from "./profile";
import addressbookReducer from "./addressbook";
import dispoMultiReducer from "./dispoMulti";
import payloadReducer from "./payload";
import pushnotifReducer from "./pushnotif";
import snackbarReducer from "./snackbar";
import referensiReducer from "./referensi";
import superAppsReducer from "./SuperApps";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    addressbook: addressbookReducer,
    dispoMulti: dispoMultiReducer,
    payload: payloadReducer,
    pushnotif: pushnotifReducer,
    snackbar: snackbarReducer,
    referensi: referensiReducer,
    superApps: superAppsReducer,
  },
});
