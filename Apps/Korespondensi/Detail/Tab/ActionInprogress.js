import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Alert, Platform, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import LoadingOverlay from "../../../../components/UI/LoadingOverlay";
import { GlobalStyles } from "../../../../constants/styles";
import { nde_api } from "../../../../utils/api.config";
import { handlerError, postHTTP } from "../../../../utils/http";

function ActionInprogress({ id, data, page }) {
  const platform = Platform;
  const [isLoading, setisLoading] = useState();
  const [tipe, setTipe] = useState();
  const [comment, setComment] = useState("");
  const navigation = useNavigation();
  let perihal = useSelector((state) => state.payload.subject);
  let masalah = useSelector((state) => state.addressbook.km);
  let lampiran = useSelector((state) => state.payload.lampiran);
  let isi = useSelector((state) => state.payload.isi);
  let receivers = useSelector((state) => state.addressbook.receivers);
  let sender = useSelector((state) => state.addressbook.sender);
  let copytos = useSelector((state) => state.addressbook.copytos);
  let approver = useSelector((state) => state.addressbook.approver);
  let add_approver = useSelector(
    (state) => state.addressbook.additional_approver
  );
  let isi_atas = useSelector((state) => state.payload.isi_atas);
  let isi_bawah = useSelector((state) => state.payload.isi_bawah);
  let tanggal_mulai = useSelector((state) => state.payload.tanggal_mulai);
  let tanggal_selesai = useSelector((state) => state.payload.tanggal_selesai);
  let waktu_mulai = useSelector((state) => state.payload.waktu_mulai);
  let waktu_selesai = useSelector((state) => state.payload.waktu_selesai);
  let zona_waktu = useSelector((state) => state.payload.zona_waktu);
  let tempat = useSelector((state) => state.payload.tempat);
  let agenda = useSelector((state) => state.payload.agenda);
  let place = "";
  let receivers_external_display = useSelector(
    (state) => state.payload.kepada_external
  );
  let salam = useSelector((state) => state.payload.salam);
  // ref
  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => [50, 250], []);
  const loadingOverlay = (
    <>
      <LoadingOverlay visible={isLoading} />
    </>
  );

  function showComment(action, page) {
    //validasi data payload
    let valid = 1;
    if (data.verifytitleprofile.status == "error" && action == "Approve") {
      valid = 0;
      if (data.verifytitleprofile.data.approver.length != 0) {
        if (data.state == "rns") {
          Alert.alert(
            "Warning!",
            data.verifytitleprofile.data.approver.join(",") +
            ' is not active. Please remove from "Pemeriksa" to continue.'
          );
        } else if (data.state == "inpro") {
          Alert.alert(
            "Warning!",
            data.verifytitleprofile.data.approver.join(",") +
            ' is not active. Please "return to composer" to be fixed.'
          );
        }
      } else if (data.verifytitleprofile.data.copyto.length != 0) {
        Alert.alert(
          "Warning!",
          data.verifytitleprofile.data.copyto.join(",") +
          ' is not active. Please remove from "Tembusan" to continue.'
        );
      } else if (data.verifytitleprofile.data.receiver.length != 0) {
        Alert.alert(
          "Warning!",
          data.verifytitleprofile.data.receiver.join(",") +
          ' is not active. Please remove from "Kepada" to continue.'
        );
      }
    } else {
      if (page == "edit") {
        if (sender.length == 0) {
          valid = 0;
          Alert.alert("Warning!", "Dari is required");
        } else if (receivers.length == 0) {
          valid = 0;
          Alert.alert("Warning!", "Kepada is required");
        } else if (masalah.length == 0) {
          valid = 0;
          Alert.alert("Warning!", "Kode Masalah is required");
        } else if (
          (isi.length == 0 && data?.template.name != "undangan") ||
          (isi_atas.length == 0 &&
            isi_bawah.length == 0 &&
            data?.template.name == "undangan")
        ) {
          valid = 0;
          Alert.alert("Warning!", "Isi surat is required");
        } else if (approver.length != 0) {
          //cek approver
          let codeLastApprover = approver[approver.length - 1].code
            ? approver[approver.length - 1].code
            : approver[approver.length - 1].nik;
          let codeSender = sender[0].title_code
            ? sender[0].title_code
            : sender[0].name_code
              ? sender[0].name_code
              : sender[0].code;
          if (codeLastApprover != codeSender) {
            valid = 0;
            Alert.alert(
              "Warning!",
              "Last Approver should be the same as a Sender"
            );
          }
        }
      }
    }
    if (valid == 1) {
      setTipe(action);
      bottomSheetModalRef.current?.present();
    }
  }
  function showConfirm() {
    Alert.alert(
      "Confirm",
      "Are you sure want to save this data?",
      [
        { text: "Cancel", onPress: () => { } },
        {
          text: "Ok",
          onPress: () => actionEdit("Save"),
        },
      ],
      {
        cancelable: true,
      }
    );
  }
  function submitComment() {
    if (page == "edit") {
      //jika edit, prep data
      handlerEdit();
    } else {
      //jika tidak edit
      actionNoEdit();
    }
  }
  async function actionNoEdit() {
    //action tanpa edit
    try {
      setisLoading(true);
      if (comment.length == 0) {
        Alert.alert("Warning!", "Please fill in the comment");
        setisLoading(false);
      } else {
        let payload = { komentar: comment, pass: "1" };
        let response;
        if (tipe == "Approve") {
          response = await postHTTP(
            nde_api.letteridapprove.replace("{$id}", id),
            payload
          );
        } else if (tipe == "Return") {
          response = await postHTTP(
            nde_api.letteridreturn.replace("{$id}", id),
            payload
          );
        } else if (tipe == "Return To Composer") {
          response = await postHTTP(
            nde_api.letteridreturntokonseptor.replace("{$id}", id),
            payload
          );
        } else if (tipe == "Reject") {
          response = await postHTTP(
            nde_api.letteridreject.replace("{$id}", id),
            payload
          );
        }
        if (response?.data?.status == "Error") {
          Alert.alert("Warning!", response.data.msg);
        } else {
          Alert.alert("Success!", tipe + " was successfull!", [
            {
              text: "Ok",
              onPress: () => navigation.goBack(),
            },
          ]);
        }
      }
      setisLoading(false);
    } catch (error) {
      handlerError(error, "Warning!", tipe + " letter not working.");
      setisLoading(false);
    }
  }

  async function handlerEdit() {
    //action jika edit
    try {
      setisLoading(true);
      if (comment.length == 0) {
        Alert.alert("Warning!", "Please fill in the comment");
        setisLoading(false);
      } else {
        actionEdit(tipe);
      }
    } catch (error) {
      handlerError(error, "Warning!", tipe + " letter not working.");
      setisLoading(false);
    }
  }

  async function actionEdit(tipe) {
    try {
      //prep data
      let dari = "";
      let dari_ids = "";
      if (sender.length != 0) {
        if (sender[0].title) {
          dari = sender[0].title;
          dari_ids = sender[0].code ? sender[0].code : sender[0].title_code;
        } else {
          dari = sender[0].name;
          dari_ids = sender[0].code;
        }
      } else {
        if (data?.senders[0].title) {
          dari = data?.senders[0].title;
          dari_ids = data?.senders[0].title_code;
        } else {
          dari = data?.senders[0].name;
          dari_ids = data?.senders[0].name_code;
        }
      }

      let kepada_addressbook = [];
      let kepada_addressbook_ids = [];
      if (receivers.length == 0) {
        if (data?.template.name == "nota_external") {
          kepada_addressbook = data?.kepada_addressbook.join("\n");
          kepada_addressbook_ids = data?.kepada_addressbook_ids.join("\n");
          // if (
          //   receivers_external_display &&
          //   result[0] == "Approve" &&
          //   data?.tracker.lastposition
          // ) {
          //   // console.log(receivers_external);
          //   // receivers_external_display =
          //   //   document.getElementById("receivers_external")?.innerText;
          // } else if (result[0] == "Approve" && data?.tracker.lastposition) {
          //   // console.log(document.getElementById("receivers_external"));
          //   // receivers_external_display =
          //   //   document.getElementById("receivers_external")?.innerText;
          // }
        } else {
          kepada_addressbook = data?.receivers.join("\n");
          data?.receivers_ids.forEach((e) => {
            kepada_addressbook_ids.push(e.code);
            kepada_addressbook_ids = kepada_addressbook_ids.join("\n");
          });
        }
      } else {
        if (data?.template.name == "nota_external") {
          // if (
          //   receivers_external_display &&
          //   result[0] == "Approve" &&
          //   data?.tracker.lastposition
          // ) {
          //   // receivers_external_display = document.getElementById(
          //   //   "receivers_external2"
          //   // )?.innerText;
          // } else if (result[0] == "Approve" && data?.tracker.lastposition) {
          //   // receivers_external_display = document.getElementById(
          //   //   "receivers_external2"
          //   // )?.innerText;
          // }
        }
        kepada_addressbook = [];
        kepada_addressbook_ids = [];
        receivers.forEach((element) => {
          if (element.fullname) {
            kepada_addressbook.push(element.fullname);
            kepada_addressbook_ids.push(element.nik);
          } else if (element.title) {
            kepada_addressbook.push(element.title);
            kepada_addressbook_ids.push(element.code);
          } else if (element.name) {
            kepada_addressbook.push(element.name);
            kepada_addressbook_ids.push(element.code);
          }
        });
        kepada_addressbook = kepada_addressbook.join("\n");
        kepada_addressbook_ids = kepada_addressbook_ids.join("\n");
      }

      let tembusan = [];
      let tembusan_ids = [];
      if (copytos.length == 0) {
        copytos = data?.copytos.join("\n");
        data?.copytos_ids.forEach((e) => {
          tembusan_ids.push(e.code);
        });
        tembusan_ids = tembusan_ids.join("\n");
      } else {
        copytos.forEach((element) => {
          if (element.fullname) {
            tembusan.push(element.fullname);
            tembusan_ids.push(element.nik);
          } else if (element.title) {
            tembusan.push(element.title);
            tembusan_ids.push(element.code);
          } else if (element.name) {
            tembusan.push(element.name);
            tembusan_ids.push(element.code);
          }
        });
        tembusan = tembusan.join("\n");
        tembusan_ids = tembusan_ids.join("\n");
      }

      let additional_approver = [];
      let additional_approver_ids = [];
      add_approver.forEach((element) => {
        if (element.fullname) {
          additional_approver.push(element.fullname);
          additional_approver_ids.push(element.nik);
        } else if (element.title) {
          additional_approver.push(element.title);
          additional_approver_ids.push(element.code);
        } else if (element.name) {
          additional_approver.push(element.name);
          additional_approver_ids.push(element.code);
        }
      });
      additional_approver = additional_approver.join("\n");
      additional_approver_ids = additional_approver_ids.join("\n");

      let approvers = "";
      let approvers_ids = "";
      let pemeriksa = [];
      let pemeriksa_ids = [];
      if (approver.length == 0) {
        data?.tracker?.approvers.forEach((element) => {
          if (element.sequence != 0) {
            if (element.profile != null) {
              pemeriksa.push(element.profile.fullname);
              pemeriksa_ids.push(element.profile.nik);
            } else if (element.title != null) {
              pemeriksa.push(element.title.name);
              pemeriksa_ids.push(element.title.objid);
            }
          }
        });
      } else {
        approver.forEach((element) => {
          if (element.fullname) {
            pemeriksa.push(element.fullname);
            if (element.nik) {
              pemeriksa_ids.push(element.nik);
            } else {
              pemeriksa_ids.push(element.code);
            }
          } else if (element.title) {
            pemeriksa.push(element.title);
            pemeriksa_ids.push(element.code);
          } else if (element.name) {
            pemeriksa.push(element.name);
            pemeriksa_ids.push(element.code);
          }
        });
      }
      approvers = pemeriksa.join("\n");
      approvers_ids = pemeriksa_ids.join("\n");

      let hf_attachments = "";
      let attachment = [];
      data?.attachments?.forEach((element) => {
        attachment.push(element.id);
      });
      hf_attachments = attachment?.join(",");

      let references = "";
      let referensi = [];
      data?.references?.forEach((element) => {
        referensi.push(element.subject + "|" + element.url);
      });
      references = referensi?.join("\n");

      //edit undangan
      if (data?.template?.name == "undangan") {
        let cek = tempat.replace(/\n/g, "<br>").split(" ");
        let hasil = "";
        for (let i = 0; i < cek.length; i++) {
          let cekChar = cek[i].charAt(cek[i].length - 1);
          let test = cek[i].search("http");
          if (test == 0) {
            if (cekChar == "," || cekChar == ".") {
              let hasil = cek[i].slice(0, cek[i].length - 1);
              //console.log(hasil);
              cek[i] =
                "<a href='" +
                hasil +
                "' target='_blank'> " +
                hasil +
                " </a>" +
                cekChar;
            } else {
              cek[i] =
                "<a href='" + cek[i] + "' target='_blank'> " + cek[i] + " </a>";
            }
          }

          if (hasil == "") {
            hasil = cek[i];
          } else {
            hasil = hasil + " " + cek[i];
          }
        }
        place = hasil;
      }

      //set payload
      let payload;
      if (data?.state == "rns") {
        switch (data?.template?.name) {
          case "nota_external":
            payload = {
              document: data?.id,
              lokasi: data?.office_city,
              template: data?.template?.name,
              template_name: data?.template?.name,
              prioritas: data?.priority,
              sifat: data?.type,
              referensi: references,
              hf_attachments: hf_attachments,
              salam: salam ? salam : data?.salam,
              dari: dari,
              dari_ids: dari_ids,
              kepada: receivers_external_display,
              kepada_addressbook: kepada_addressbook,
              kepada_addressbook_ids: kepada_addressbook_ids,
              tembusan: tembusan,
              tembusan_ids: tembusan_ids,
              pemeriksa: approvers,
              pemeriksa_ids: approvers_ids,
              lampiran: lampiran ? lampiran : "-",
              masalah: masalah[0].code,
              subject: perihal ? perihal : data?.subject,
              isi: isi ? isi : data?.body,
              komentar: comment,
            };
            break;
          case "undangan":
            payload = {
              document: data?.id,
              lokasi: data?.office_city,
              template: data?.template?.name,
              template_name: data?.template?.name,
              prioritas: data?.priority,
              sifat: data?.type,
              referensi: references,
              hf_attachments: hf_attachments,
              dari: dari,
              dari_ids: dari_ids,
              kepada: kepada_addressbook,
              kepada_ids: kepada_addressbook_ids,
              tembusan: tembusan,
              tembusan_ids: tembusan_ids,
              pemeriksa: approvers,
              pemeriksa_ids: approvers_ids,
              lampiran: lampiran ? lampiran : "-",
              masalah: masalah[0].code,
              subject: perihal ? perihal : data?.subject,
              isi_atas: isi_atas,
              isi_bawah: isi_bawah,
              tanggal_mulai: tanggal_mulai,
              tanggal_selesai: tanggal_selesai,
              zona_waktu: zona_waktu,
              waktu_mulai: waktu_mulai,
              waktu_selesai: waktu_selesai,
              agenda: agenda,
              tempat: place,
              komentar: comment,
            };
            break;
          default:
            payload = {
              document: data?.id,
              lokasi: data?.office_city,
              template: data?.template?.name,
              template_name: data?.template?.name,
              prioritas: data?.priority,
              sifat: data?.type,
              referensi: references,
              hf_attachments: hf_attachments,
              dari: dari,
              dari_ids: dari_ids,
              kepada: kepada_addressbook,
              kepada_ids: kepada_addressbook_ids,
              tembusan: tembusan,
              tembusan_ids: tembusan_ids,
              pemeriksa: approvers,
              pemeriksa_ids: approvers_ids,
              lampiran: lampiran ? lampiran : "-",
              masalah: masalah[0].code,
              subject: perihal ? perihal : data?.subject,
              isi: isi ? isi : data?.body,
              komentar: comment,
            };
            break;
        }
      } else {
        switch (data?.template?.name) {
          case "nota_external":
            payload = {
              template: data?.template?.name,
              template_name: data?.template?.name,
              prioritas: data?.priority,
              sifat: data?.type,
              referensi: references,
              hf_attachments: hf_attachments,
              salam: salam ? salam : data?.salam,
              kepada: receivers_external_display,
              kepada_addressbook: kepada_addressbook,
              kepada_addressbook_ids: kepada_addressbook_ids,
              tembusan: tembusan,
              tembusan_ids: tembusan_ids,
              additional_approver: additional_approver,
              additional_approver_ids: additional_approver_ids,
              lampiran: lampiran ? lampiran : "-",
              masalah: masalah[0].code,
              subject: perihal ? perihal : data?.subject,
              isi: isi ? isi : data?.body,
              komentar: comment,
            };

            // payload = { komentar: comment, pass: "1" };
            break;
          case "undangan":
            payload = {
              template: data?.template?.name,
              template_name: data?.template?.name,
              prioritas: data?.priority,
              sifat: data?.type,
              referensi: references,
              hf_attachments: hf_attachments,
              kepada: kepada_addressbook,
              kepada_ids: kepada_addressbook_ids,
              tembusan: tembusan,
              tembusan_ids: tembusan_ids,
              additional_approver: additional_approver,
              additional_approver_ids: additional_approver_ids,
              lampiran: lampiran ? lampiran : "-",
              masalah: masalah[0].code,
              subject: perihal ? perihal : data?.subject,
              isi_atas: isi_atas,
              isi_bawah: isi_bawah,
              tanggal_mulai: tanggal_mulai,
              tanggal_selesai: tanggal_selesai,
              zona_waktu: zona_waktu,
              waktu_mulai: waktu_mulai,
              waktu_selesai: waktu_selesai,
              agenda: agenda,
              tempat: place,
              komentar: comment,
            };
            // payload = { komentar: comment, pass: "1" };
            break;
          default:
            payload = {
              template: data?.template?.name,
              template_name: data?.template?.name,
              prioritas: data?.priority,
              sifat: data?.type,
              referensi: references,
              hf_attachments: hf_attachments,
              kepada: kepada_addressbook,
              kepada_ids: kepada_addressbook_ids,
              tembusan: tembusan,
              tembusan_ids: tembusan_ids,
              additional_approver: additional_approver,
              additional_approver_ids: additional_approver_ids,
              lampiran: lampiran ? lampiran : "-",
              masalah: masalah[0].code,
              subject: perihal ? perihal : data?.subject,
              isi: isi ? isi : data?.body,
              komentar: comment,
            };
            break;
        }
      }
      // console.log("data-" + JSON.stringify(payload));
      let response;
      if (payload == undefined) {
        response = {};
        response.data = {};
        response.data = { status: "Error", msg: tipe + " not working" };
      } else {
        switch (tipe) {
          case "Save":
            response = await postHTTP(
              nde_api.letteridsave.replace("{$id}", id),
              payload
            );
            break;
          case "Submit":
            response = await postHTTP(nde_api.lettersubmit, payload);
            break;
          case "Approve":
            response = await postHTTP(
              nde_api.letteridapprove.replace("{$id}", id),
              payload
            );
            break;
          case "Return":
            response = await postHTTP(
              nde_api.letteridreturn.replace("{$id}", id),
              payload
            );
            break;
          case "Return To Composer":
            response = await postHTTP(
              nde_api.letteridreturntokonseptor.replace("{$id}", id),
              payload
            );
            break;
          case "Reject":
            response = await postHTTP(
              nde_api.letteridreject.replace("{$id}", id),
              payload
            );
            break;
        }
      }
      // console.log(response?.data);
      if (response?.data?.status == "Error") {
        Alert.alert("Warning!", response?.data?.msg);
      } else {
        Alert.alert("Success!", tipe + " was successfull!", [
          {
            text: "Ok",
            onPress: () => navigation.goBack(),
          },
        ]);
      }
      setisLoading(false);
    } catch (error) {
      console.log(error);
      // handlerError(error, "Warning!", tipe + " letter not working.");
      setisLoading(false);
    }
  }

  return (
    <>
      {loadingOverlay}
      <View>
        {page == "edit" && (
          <Button
            onPress={() => {
              showConfirm();
            }}
            mode="contained"
            style={[
              { backgroundColor: GlobalStyles.colors.blue, marginBottom: 16 },
            ]}
          >
            Save
          </Button>
        )}
        {page == "edit" && data?.state == "rns" && (
          <Button
            onPress={() => {
              showComment("Submit", page);
            }}
            mode="contained"
            style={[
              {
                backgroundColor: GlobalStyles.colors.green,
                marginBottom: 24,
              },
            ]}
          >
            Submit
          </Button>
        )}
        {data?.state != "rns" && page != "edit" && (
          <>
            <Button
              onPress={() => {
                showComment("Approve");
              }}
              mode="contained"
              style={[
                {
                  backgroundColor: GlobalStyles.colors.approve,
                  marginBottom: 16,
                },
              ]}
            >
              Approve
            </Button>
            <Button
              onPress={() => showComment("Return")}
              mode="contained"
              style={[
                {
                  backgroundColor: GlobalStyles.colors.return,
                  marginBottom: 16,
                },
              ]}
            >
              Return
            </Button>
            <Button
              onPress={() => showComment("Return To Composer")}
              mode="contained"
              style={[
                {
                  backgroundColor: GlobalStyles.colors.returntocomposer,
                  marginBottom: 16,
                },
              ]}
            >
              Return To Composer
            </Button>
            <Button
              onPress={() => showComment("Reject")}
              mode="contained"
              style={[
                {
                  backgroundColor: GlobalStyles.colors.reject,
                  marginBottom: 16,
                },
              ]}
            >
              Reject
            </Button>
          </>
        )}
        {data?.state != "rns" && page == "edit" && (
          <View>
            <View style={styles.containerRow}>
              <View style={styles.button}>
                <Button
                  onPress={() => {
                    showComment("Approve", page);
                  }}
                  mode="contained"
                  style={[{ backgroundColor: GlobalStyles.colors.approve }]}
                >
                  Approve
                </Button>
              </View>
              <View style={styles.button}>
                <Button
                  onPress={() => showComment("Return", page)}
                  mode="contained"
                  style={[{ backgroundColor: GlobalStyles.colors.return }]}
                >
                  Return
                </Button>
              </View>
            </View>
            <View style={styles.containerRow}>
              <View style={styles.button}>
                <Button
                  onPress={() => showComment("Return To Composer", page)}
                  mode="contained"
                  style={[
                    { backgroundColor: GlobalStyles.colors.returntocomposer },
                  ]}
                  compact
                >
                  Return To Composer
                </Button>
              </View>
              <View style={styles.button}>
                <Button
                  onPress={() => showComment("Reject", page)}
                  mode="contained"
                  style={[{ backgroundColor: GlobalStyles.colors.reject }]}
                >
                  Reject
                </Button>
              </View>
            </View>
          </View>
        )}
      </View>

      <BottomSheetModalProvider>
        <SafeAreaView>
          <View>
            <BottomSheetModal
              name={tipe}
              ref={bottomSheetModalRef}
              index={1}
              snapPoints={snapPoints}
              keyboardBehavior={
                platform?.OS == "android" ? "fillParent" : "interactive"
              }
              keyboardBlurBehavior="restore"
              android_keyboardInputMode="adjust"
            >
              <View
                style={
                  page == "edit"
                    ? [styles.contentContainer, { margin: 16 }]
                    : styles.contentContainer
                }
              >
                <View style={{ flexDirection: "row" }}>
                  <Text>Comment - </Text>
                  <Text
                    style={{
                      color:
                        tipe == "Approve"
                          ? GlobalStyles.colors.approve
                          : tipe == "Return"
                            ? GlobalStyles.colors.return
                            : tipe == "Return To Composer"
                              ? GlobalStyles.colors.returntocomposer
                              : tipe == "Reject"
                                ? GlobalStyles.colors.reject
                                : GlobalStyles.colors.blue,
                    }}
                  >
                    {tipe}
                  </Text>
                </View>
                <BottomSheetTextInput
                  value={comment}
                  onChangeText={(text) => setComment(text)}
                  style={styles.input}
                  multiline={true}
                  autoFocus
                />
                <Button
                  mode="contained"
                  style={[
                    {
                      backgroundColor:
                        tipe == "Approve"
                          ? GlobalStyles.colors.approve
                          : tipe == "Return"
                            ? GlobalStyles.colors.return
                            : tipe == "Return To Composer"
                              ? GlobalStyles.colors.returntocomposer
                              : tipe == "Reject"
                                ? GlobalStyles.colors.reject
                                : GlobalStyles.colors.blue,
                      marginBottom: 16,
                    },
                  ]}
                  onPress={() => submitComment()}
                >
                  Submit
                </Button>
                <Button
                  mode="contained"
                  style={[
                    {
                      backgroundColor: GlobalStyles.colors.gray500,
                      marginBottom: 16,
                    },
                  ]}
                  onPress={() => {
                    bottomSheetModalRef.current?.dismiss();
                    setComment("");
                  }}
                >
                  Cancel
                </Button>
              </View>
            </BottomSheetModal>
          </View>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </>
  );
}

export default ActionInprogress;
const styles = StyleSheet.create({
  button: {
    width: "49%",
    marginBottom: 16,
  },
  contentContainer: {
    flex: 1,
  },
  containerRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
});
