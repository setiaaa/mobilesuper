export function initAgenda(data) {
  //find receivers, copytos, salam
  data.receivers_display = [];
  data.copytos_display = [];
  data.kepada_addressbook = [];
  data.kepada_addressbook_ids = [];
  data.additional_approver = [];
  data.office_city = "";
  data.salam = "";
  data.kepada_bank = "";
  data.keterangan = "";
  data.attributes.forEach((e, i) => {
    //Parsing receiver dari migrasi
    if (e.key == "receivers_display") {
      if (e.value != "") {
        var temp = e.value.split("\n");
        temp.forEach((j) => {
          if (j.trim() != "") {
            var temp2 = data.receivers_display.indexOf(j.trim());
            if (temp2 == -1) {
              data.receivers_display.push(j.trim());
            }
          }
        });
      }
    }

    //Parsing copytos dari migrasi
    if (e.key == "copytos_display") {
      if (e.value != "") {
        var temp = e.value.split("\n");
        temp.forEach((j) => {
          if (j.trim() != "") {
            var temp2 = data.copytos_display.indexOf(j.trim());
            if (temp2 == -1) {
              data.copytos_display.push(j.trim());
            }
          }
        });
      }
    }

    //additional_approver
    if (e.key == "additional_approver") {
      if (e.value != "") {
        data.additional_approver = e.value;
      }
    }
    //additional_approver_ids
    if (e.key == "additional_approver_ids") {
      if (e.value != "") {
        data.additional_approver_ids = e.value;
      }
    }

    //Office City
    if (e.key == "office_city") {
      if (e.value != "") {
        data.office_city = e.value;
      }
    }

    if (data.template?.name == "nota_external") {
      //init nota_external kepada_addressbook kepada_addressbook_ids
      if (e.key == "kepada_addressbook") {
        if (e.value != "") {
          var temp = e.value.split("\n");
          temp.forEach((j) => {
            if (j.trim() != "") {
              var temp2 = data.kepada_addressbook.indexOf(j.trim());
              if (temp2 == -1) {
                data.kepada_addressbook.push(j.trim());
              }
            }
          });
        }
      }
      if (e.key == "kepada_addressbook_ids") {
        if (e.value != "") {
          var temp = e.value.split("\n");
          temp.forEach((j) => {
            if (j.trim() != "") {
              var temp2 = data.kepada_addressbook_ids.indexOf(j.trim());
              if (temp2 == -1) {
                data.kepada_addressbook_ids.push(j.trim());
              }
            }
          });
        }
      }

      //init salam
      if (e.key == "salam") {
        if (e.value != "") {
          data.salam = e.value;
        }
      }
    }

    //kepada bank
    if (e.template?.name == "permintaan_bg") {
      if (e.key == "kepada_bank") {
        if (e.value != "") {
          data.kepada_bank = e.value;
        }
      }
    }

    if (data.state == "sps") {
      if (e.key == "keterangan") {
        if (e.value != "") {
          data.keterangan = e.value;
        }
      }
    }
  });
}

export function initLetter(data) {
  //sort approver by sequence
  if (data.tracker.type != "" && data.tracker.approvers.length != 0) {
    data.tracker.approvers = data.tracker.approvers.sort(
      (a, b) => a.sequence - b.sequence
    );
    if (
      data.tracker.approvers[data.tracker.approvers.length - 1].title?.name ==
        data.position ||
      data.tracker.approvers[data.tracker.approvers.length - 1].profile
        ?.fullname == data.position
    ) {
      data.tracker.lastposition = true;
    } else {
      data.tracker.lastposition = false;
    }
  }
  //find receivers, copytos, salam
  data.receivers_display = [];
  data.copytos_display = [];
  data.kepada_addressbook = [];
  data.kepada_addressbook_ids = [];
  data.additional_approver = [];
  data.additional_approver_ids = [];
  data.office_city = "";
  data.salam = "";
  data.kepada_bank = "";
  data.attributes.forEach((e, i) => {
    //Parsing receiver dari migrasi
    if (e.key == "receivers_display") {
      if (e.value != "") {
        var temp = e.value.split("\n");
        temp.forEach((j) => {
          if (j.trim() != "") {
            var temp2 = data.receivers_display.indexOf(j.trim());
            if (temp2 == -1) {
              data.receivers_display.push(j.trim());
            }
          }
        });
      }
    }

    //Parsing copytos dari migrasi
    if (e.key == "copytos_display") {
      if (e.value != "") {
        var temp = e.value.split("\n");
        temp.forEach((j) => {
          if (j.trim() != "") {
            var temp2 = data.copytos_display.indexOf(j.trim());
            if (temp2 == -1) {
              data.copytos_display.push(j.trim());
            }
          }
        });
      }
    }

    //Parsing additional_approver dari migrasi
    if (e.key == "additional_approver") {
      if (e.value != "") {
        data.additional_approver = e.value;
      }
    }

    //Parsing additional_approver_ids dari migrasi
    if (e.key == "additional_approver_ids") {
      if (e.value != "") {
        data.additional_approver_ids = e.value;
      }
    }

    //Office City
    if (e.key == "office_city") {
      if (e.value != "") {
        data.office_city = e.value;
      }
    }
    //init nota_external kepada_addressbook kepada_addressbook_ids

    if (e.key == "kepada_addressbook") {
      if (e.value != "") {
        var temp = e.value.split("\n");
        temp.forEach((j) => {
          if (j.trim() != "") {
            var temp2 = data.kepada_addressbook.indexOf(j.trim());
            if (temp2 == -1) {
              data.kepada_addressbook.push(j.trim());
            }
          }
        });
      }
    }
    if (e.key == "kepada_addressbook_ids") {
      if (e.value != "") {
        var temp = e.value.split("\n");
        temp.forEach((j) => {
          if (j.trim() != "") {
            var temp2 = data.kepada_addressbook_ids.indexOf(j.trim());
            if (temp2 == -1) {
              data.kepada_addressbook_ids.push(j.trim());
            }
          }
        });
      }
    }

    //init salam
    if (data.template.name == "nota_external") {
      if (e.key == "salam") {
        if (e.value != "") {
          data.salam = e.value;
        }
      }
    }

    //kepada bank
    if (data.template?.name == "permintaan_bg") {
      if (e.key == "kepada_bank") {
        if (e.value != "") {
          data.kepada_bank = e.value;
        }
      }
    }
  });
}

export function getExtensionIcon(item) {
  let temp = item.filename.split(".");
  if (temp[temp.length - 1] == "pdf") {
    return "file-pdf-box";
  } else if (
    temp[temp.length - 1] == "doc" ||
    temp[temp.length - 1] == "dot" ||
    temp[temp.length - 1] == "docx"
  ) {
    return "file-word";
  } else if (
    temp[temp.length - 1] == "xls" ||
    temp[temp.length - 1] == "xlm" ||
    temp[temp.length - 1] == "xla" ||
    temp[temp.length - 1] == "xlc" ||
    temp[temp.length - 1] == "xlt" ||
    temp[temp.length - 1] == "xlw" ||
    temp[temp.length - 1] == "xlsx"
  ) {
    return "file-excel";
  } else if (
    temp[temp.length - 1] == "ppt" ||
    temp[temp.length - 1] == "pps" ||
    temp[temp.length - 1] == "pot" ||
    temp[temp.length - 1] == "pptx"
  ) {
    return "file-powerpoint";
  } else if (
    temp[temp.length - 1] == "jpeg" ||
    temp[temp.length - 1] == "jpg" ||
    temp[temp.length - 1] == "jpe" ||
    temp[temp.length - 1] == "png"
  ) {
    return "file-image";
  } else if (temp[temp.length - 1] == "zip" || temp[temp.length - 1] == "rar") {
    return "file";
  } else if (temp[temp.length - 1] == "txt") {
    return "file";
  } else {
    return "file";
  }
}
