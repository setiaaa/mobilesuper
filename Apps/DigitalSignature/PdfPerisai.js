import React, { useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";
import { getTokenValue } from "../../service/session";

export const PdfPerisai = ({ route }) => {
  const { item } = route.params;
  const webViewRef = useRef(null);
  const [token, setToken] = useState("");
  // const type = "dokumen_lain";
  useEffect(() => {
    getTokenValue().then((val) => {
      setToken(val);
    });
  }, []);

  let myInjectedJs = `(function(){ 
    let attach = window.localStorage.getItem('attachment');
    if(!attach || (attach && attach != '${item.attachments[0]?.file}')){
      window.localStorage.setItem('attachment', '${item.attachments[0]?.file}');
      window.location.reload();
    }
  })();

  __TYPE = "dokumen-lain"
  $("#submit").click(function () {
    var paraphrase = $('#paraphrase').val()
    var kiri_bawah_x = $('input[name="lower_left_x"]').val();
    var kiri_bawah_y = $('input[name="lower_left_y"]').val();
    var kanan_atas_x = $('input[name="upper_right_x"]').val();
    var kanan_atas_y = $('input[name="upper_right_y"]').val();
    if (paraphrase === "") {
        alert("Passphrase tidak boleh kosong")
    } else {
      let data = {}
      if (__TYPE === 'dokumen-lain') {
        data = {
            "passphrase": paraphrase,
            "id_documents": ["${item.id}"],
            "kanan_atas_y": kanan_atas_y,
            "kanan_atas_x": kanan_atas_x,
            "kiri_bawah_x": kiri_bawah_x,
            "kiri_bawah_y": kiri_bawah_y,
            "halaman": __CURRENT_PAGE
        }
          $.ajax({
            url: 'https://apigw.kubekkp.coofis.com/digitalsign/document/approve/',
            type: 'PUT',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'Authorization': '${token}'
            },
            data: JSON.stringify(data),
            success: function (data, textStatus, xhr) {
                if (data.success) {
                  alert("berhasil")
                } else {
                  alert("gagal")
                }
            },
            error: function (xhr, textStatus, errorThrown) {
              alert('error')
            }
        });  
      }
    }
  })
  `;
  return (
    <WebView
      ref={webViewRef}
      source={{
        uri: "https://portal.kubekkp.coofis.com/assets/pdfViewer/index.html",
      }}
      style={{ flex: 1 }}
      injectedJavaScript={myInjectedJs}
    />
  );
};
