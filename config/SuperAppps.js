import { FontWeight } from "@shopify/react-native-skia";
import moment from "moment/min/moment-with-locales";
import { Dimensions } from "react-native";

export const COLORS = {
  primary: "#323247",
  secondary: "#F0F0F0",
  white: "#FFFFFF",
  input: "#f5f6f8",
  lighter: "#6B7280",
  grey: "grey",
  warning: "#F6AD1D",
  warningLight: "#FEF2DB",
  info: "#1868AB",
  infoLight: "#E4EEF5",
  success: "#11C15B",
  successLight: "#D9F5E5",
  danger: "#EA5455",
  orange: "#FF8F28",
  infoDanger: "#C34647",
  infoDangerLight: "#FBDDDD",
  ExtraDivinder: "#DBDADE",
  secondaryLighter: "#d9d9d9",
  lightBrown: "#D2B48C",
  foundation: "#474747",
  bgLightGrey: "#F8F8F8",
  tertiary: "#B3B2B5",
  iconMenu: "#526D82",
};
export const FONTSIZE = {
  H1: 15,
  H2: 14,
  H3: 12,
  H4: 11,
  H5: 10,
  Judul: 17,
};

export const fontSizeResponsive = (type, device) => {
  let data = {
    H1: device === "phone" ? 15 : 26,
    H2: device === "phone" ? 14 : 25,
    H3: device === "phone" ? 13 : 23,
    H4: device === "phone" ? 12 : 22,
    H5: device === "phone" ? 10 : 21,
    H6: device === "phone" ? 8 : 14,
    Judul: device === "phone" ? 17 : 28,
    textS: device === "phone" ? textStyle.textS : 22,
    textM: device === "phone" ? textStyle.textM : 24,
    textL: device === "phone" ? textStyle.textL : 26,
    headingS: device === "phone" ? textStyle.headingS : 22,
    headingM: device === "phone" ? textStyle.headingM : 23,
    headingL: device === "phone" ? textStyle.headingL : 25,
  };
  return data[type];
};

export const getOrientation = (width, height) => {
  let orientation = "";
  if (width > height) {
    orientation = "landscape";
  } else {
    orientation = "potrait";
  }

  return orientation;
};

export const imageApps = (type) => {
  if (type === "Korespondensi") {
    return require("../assets/superApp/korespondensi.png");
  } else if (type === "Cuti") {
    return require("../assets/superApp/cuti.png");
  } else if (type === "Pengembangan Kompetensi") {
    return require("../assets/superApp/Bankomicon.png");
  } else if (type === "Digital Sign") {
    return require("../assets/superApp/digitalsign.png");
  } else if (type === "Perizinan Menteri") {
    return require("../assets/superApp/PerizinanMentri.png");
  }
};

export const FONTWEIGHT = {
  bolder: "800",
  bold: "700",
  normal: "400",
};

export const AVATAR = {};

export const DATETIME = {
  SHORT_DATETIME: "DD-MM-YYYY HH:mm",
  LONG_DATETIME: "DD MMMM YYYY HH:mm",
  SHORT_DATE: "DD-MM-YYYY",
  LONG_DATE: "DD MMMM YYYY",
};

export const PADDING = {
  Page: 20,
};

export const spacing = {
  small: 4,
  medium: 8,
  default: 16,
  large: 24,
  extraLarge: 48,
};

export const textStyle = {
  textS: {
    fontsize: 12,
    lineHeight: 16,
  },
  textM: {
    fontsize: 14,
    lineHeight: 20,
  },
  textL: {
    fontsize: 16,
    lineHeight: 24,
  },
  headingS: {
    fontsize: 20,
    lineHeight: 28,
    fontWeight: 800,
  },
  headingM: {
    fontsize: 28,
    lineHeight: 36,
    fontWeight: 800,
  },
  headingL: {
    fontsize: 36,
    lineHeight: 44,
    fontWeight: 800,
  },
};

export const shadow = {
  cardShadow: {
    shadowColor: "#171717",
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,

    elevation: 2,
  },
};

export const fixedDateString = (tanggal) => {
  return tanggal
    .replace("May", "Mei")
    .replace("August", "Agustus")
    .replace("October", "Oktober")
    .replace("December", "Desember");
};

export const DateFormat = ({ date, fromDate, toDate }) => {
  return moment(fixedDateString(date), fromDate).locale("id").format(toDate);
};

export const extraKeyKorespondensi = {
  sifat: "Sifat",
  catatan: "Catatan",
  nomor_surat: "Nomor Surat",
  "kode derajat": "Kode Derajat",
  penanda_tangan: "Penanda Tangan",
  kepada_internal: "Kepada Internal",
  "tanggal dikirim": "Tanggal Dikirim",
  kepada_eksternal: "Kepada Eksternal",
  tembusan_internal: "Tembusan Internal",
  tembusan_eksternal: "Tembusan Eksternal",
};
