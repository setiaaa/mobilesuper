import React from "react";
import { Text } from "react-native";
import WebView from "react-native-webview";
import { useSelector } from "react-redux";

export const PdfPerisai = () => {
  const { digitalsign } = useSelector((state) => state.digitalsign);
  const perisai = digitalsign.detail;
  console.log(perisai);
  const htmlContent = `
  <!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Perisai PDF Viewer</title>
      <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/imgareaselect/0.9.10/css/imgareaselect-animated.css">
      <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap"
          rel="stylesheet">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
  
      <style type="text/css">
          body {
              padding: 16px;
              font-family: 'Poppins', 'sans-serif';
          }
  
          ::-webkit-scrollbar {
              width: 8px;
          }
  
          /* Track */
          ::-webkit-scrollbar-track {
              /* box-shadow: inset 0 0 5px grey; */
              background-color: white;
              border-radius: 10px;
          }
  
          /* Handle */
          ::-webkit-scrollbar-thumb {
              background: grey;
              border-radius: 10px;
          }
  
          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
              background: grey;
          }
  
          #pdf-main-container {
              width: 100%;
              height: 85%;
              margin: 0 auto;
          }
  
          #pdf-loader {
              display: none;
              text-align: center;
              color: #999999;
              font-size: 13px;
              line-height: 100px;
              height: 100px;
          }
  
          #pdf-contents {
              display: none;
              height: 100%;
          }
  
          #pdf-meta {
              background: rgba(0, 0, 0, 0.2);
              overflow: hidden;
              padding: 10px;
          }
  
          #pdf-buttons {
              float: left;
          }
  
          #page-count-container {
              float: right;
              font-size: 15pt;
          }
  
          @media (max-width:768px) {
              #page-count-container {
                  float: right;
                  font-size: 12pt;
              }
          }
  
          #pdf-current-page {
              display: inline;
          }
  
          #pdf-total-pages {
              display: inline;
          }
  
          #pdf-canvas {
              width: 100%;
              height: 100%;
              border: 1px solid rgba(0, 0, 0, 0.2);
              box-sizing: border-box;
          }
  
          #page-loader {
              height: 100px;
              line-height: 100px;
              text-align: center;
              display: none;
              color: #999999;
              font-size: 13px;
          }
      </style>
      <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/imgareaselect/0.9.10/js/jquery.imgareaselect.js"></script>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/pdf.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.943/pdf.worker.js"></script>
  
  </head>
  
  <body>
      <div class="content row"><body>
    <div class="content row">
        <div class="col-md-7 pb-sm-4 pb-lg-0">
            <input type="hidden" name="x1" value="" />
            <input type="hidden" name="x2" value="" />
            <input type="hidden" name="y1" value="" />
            <input type="hidden" name="y2" value="" />
            <input type="hidden" name="dokumen_height" value="" required="required" />
            <input type="hidden" name="dokumen_width" value="" required="required" />
            <input type="hidden" name="dokumen_page" id="dokumen_page">
            <input type="hidden" name="digital_signature_path" id="digital_signature_path">
            <input type="hidden" name="is_visible_sign" id="is_visible_sign" value="True">

            <div id="pdf-main-container">
                <div id="pdf-loader">Loading document ...</div>
                <div id="pdf-contents">
                    <div id="pdf-meta">
                        <div id="pdf-buttons">
                            <button class="btn" id="pdf-prev" class="btn btn-default btn-sm">Prev</button>
                            <button class="btn" id="pdf-next" class="btn btn-default btn-sm">Next</button>
                        </div>
                        <div id="page-count-container">Halaman <div id="pdf-current-page"></div> of <div
                                id="pdf-total-pages"></div>
                        </div>
                    </div>
                    <canvas id="pdf-canvas" width="1000"></canvas>
                    <div id="page-loader">Loading page ...</div>
                </div>
            </div>
        </div>

        <div class="col-md-5 d-flex flex-column gap-4 pb-sm-5 pb-lg-0 pt-3">
            <div class="d-flex flex-row mt-lg-0 mt-sm-5 gap-3">
                <div class="flex-grow-1">
                    <label style="font-weight: bold"><strong>Masukkan Passphrase</strong></label>
                    <div class="input-group">
                        <input type="password" class="form-control password" name="paraphrase"
                            placeholder="Masukkan Passphrase" id="paraphrase" value="" />
                        <span class="input-group-text">
                            <i class="toggle-password fa fa-eye" style="cursor: pointer;"></i>
                        </span>
                    </div>
                </div>
                <div class="d-flex align-items-end justify-content-end">
                    <button id="submit" class="btn btn-primary"
                        style="background-color: #800000;  border-color: #800000;">Tanda Tangan</button>
                </div>
            </div>

            <a style="color: #800000; background-color: transparent; cursor: pointer;" id="clickInformasiOpen">
                <div class="d-flex flex-row gap-3 align-items-center">
                    <i class="fa fa-chevron-down"></i>
                    <span style="font-weight: 500;">Lihat Informasi Koordinat</span>
                </div>
            </a>

            <a style="color: #800000; background-color: transparent; cursor: pointer;" id="clickInformasiClose">
                <div class="d-flex flex-row gap-3 align-items-center">
                    <i class="fa fa-chevron-up"></i>
                    <span style="font-weight: 500;">Tutup Informasi Koordinat</span>
                </div>
            </a>

            <div class="row" id="informasi_koordinat">
                <div class="d-flex align-items-center justify-content-start mb-3 flex-row gap-3">
                    <div style="width:5%;">
                        <a data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Atur ulang"
                            style="border-radius: 100%; border: 3px solid #800000; width:24px; height:24px; display: flex; align-items: center; justify-content: center; cursor: pointer;"
                            id="reset">
                            <span style="color: #800000; font-weight: 500;">i</span>
                        </a>
                    </div>
                    <span>Kolom dibawah merupakan koordinat label tanda tangan</span>
                </div>

                <div class="col-md-6">
                    <font style="font-weight: bold"><strong>Kiri Bawah X</strong></font>
                    <input type="text" class="form-control" name="lower_left_x" value="" style="width: 100%" disabled />
                </div>
                <div class="col-md-6 mt-sm-3 mt-md-0">
                    <font style="font-weight: bold"><strong>Kiri Bawah Y</strong></font>
                    <input type="text" class="form-control" name="lower_left_y" value="" style="width: 100%" disabled />
                </div>
                <div class="col-md-6 mt-3">
                    <font style="font-weight: bold"><strong>Atas Kanan X</strong></font>
                    <input type="text" class="form-control" name="upper_right_x" value="" style="width: 100%"
                        disabled />
                </div>
                <div class="col-md-6 mt-3">
                    <font style="font-weight: bold"><strong>Atas Kanan Y</strong></font>
                    <input type="text" class="form-control" name="upper_right_y" value="" style="width: 100%"
                        disabled />
                </div>
            </div>
        </div>
    </div>

    <script>
        var __PDF_DOC,
            __CURRENT_PAGE,
            __TOTAL_PAGES,
            __PAGE_RENDERING_IN_PROGRESS = 0,
            __CANVAS = $('#pdf-canvas').get(0),
            __CANVAS_CTX = __CANVAS.getContext('2d'),
            dokumen_height,
            scale;
        let
            __TOKEN,
            __ID_DOCUMENT,
            __URL,
            __FILE,
            __LABEL,
            __TYPE,
            __SEQUENCE;

        window.addEventListener("message", function (event) {
            if (event.data.attachment && event.data.id_document) {
                __FILE = event.data.attachment
                __ID_DOCUMENT = event.data.id_document
                __URL = event.data.url
                __LABEL = event.data.label
                __TYPE = event.data.type
                __SEQUENCE = event.data.sequence
                $("#paraphrase").val('');
                $("#clickInformasiOpen").show();
                $("#informasi_koordinat").hide();
                $("#clickInformasiClose").hide();
                showPDF(__FILE);
            }
        });
        __TOKEN = window.sessionStorage.getItem('token')
        __FILE = "https://media.kubekkp.coofis.com/digitalsign/attachment/2023/11/23/sertifikat_1.pdf"
        __ID_DOCUMENT = localStorage.getItem('id_document')
        __URL = localStorage.getItem('url')
        __LABEL = localStorage.getItem('label')
        __TYPE = localStorage.getItem('type')
        __SEQUENCE = localStorage.getItem('sequence')

        if (__FILE !== null) {
            showPDF(__FILE)
        }

        function showPDF(pdf_url) {
            $("#pdf-loader").show();
            pdfjsLib.disableWorker = true
            pdfjsLib.getDocument(pdf_url).then(function (pdf_doc) {
                __PDF_DOC = pdf_doc;
                __TOTAL_PAGES = __PDF_DOC.numPages;

                // Hide the pdf loader and show pdf container in HTML
                $("#pdf-loader").hide();
                $("#pdf-contents").show();
                $("#pdf-total-pages").text(__TOTAL_PAGES);
                alert('Masuk')
            }).catch(function (error) {
                // If error re-show the upload button
                $("#pdf-loader").hide();

                alert('KANJUT');
            });;
        }

        function showPage(page_no) {
            __PAGE_RENDERING_IN_PROGRESS = 1;
            __CURRENT_PAGE = page_no;

            // Disable Prev & Next buttons while page is being loaded
            $("#pdf-next, #pdf-prev").attr('disabled', 'disabled');

            // While page is being rendered hide the canvas and show a loading message
            $("#pdf-canvas").hide();
            $("#page-loader").show();

            // Update current page in HTML
            $("#pdf-current-page").text(page_no);

            // Fetch the page
            __PDF_DOC.getPage(page_no).then(function (page) {
                // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
                var scale_required = __CANVAS.width / page.getViewport(1).width;

                // Get viewport of the page at required scale
                var viewport = page.getViewport(scale_required);

                // Set canvas height
                __CANVAS.height = viewport.height;

                var renderContext = {
                    canvasContext: __CANVAS_CTX,
                    viewport: viewport
                };
                $('input[name="dokumen_height"]').val(page.getViewport(1).height);
                $('input[name="dokumen_width"]').val(page.getViewport(1).width);

                // Render the page contents in the canvas
                page.render(renderContext).then(function () {
                    __PAGE_RENDERING_IN_PROGRESS = 0;

                    // Re-enable Prev & Next buttons
                    $("#pdf-next, #pdf-prev").removeAttr('disabled');

                    // Show the canvas and hide the page loader
                    $("#pdf-canvas").show();
                    $("#page-loader").hide();

                    var canvasWidth = document.getElementById('pdf-canvas').clientWidth;
                    var canvasHeight = document.getElementById('pdf-canvas').clientHeight;

                    var canvaspdf = $('#pdf-canvas');
                    let tipe = localStorage.getItem('type')
                    var resolusi = Math.round(window.devicePixelRatio * 100) / 100
                    var { responsiveX1, responsiveY1, responsiveLebar, responsiveTinggi } = calculateResponsiveValues(tipe);

                    var tempX1 = responsiveX1 / resolusi
                    var tempY1 = responsiveY1 / resolusi
                    var lebar = responsiveLebar
                    var tinggi = responsiveTinggi

                    $(canvaspdf).imgAreaSelect({
                        handles: true,
                        show: true,
                        aspectRatio: '3:1',
                        resizable: false,
                        persistent: true,
                        // movable: tipe === 'bankom' ? false : true,
                        onSelectEnd: function (img, selection) {
                            var height = parseInt($('input[name="dokumen_height"]').val());
                            var width = parseInt($('input[name="dokumen_width"]').val());
                            var scale = width / (canvasWidth - 1);

                            var x1 = canvaspdf.width() - tempX1,
                                y1 = canvaspdf.height() - tempY1,
                                x2 = x1 + (lebar / resolusi),
                                y2 = y1 + (tinggi / resolusi);;
                            var lower_left_x = selection.x1 * scale,
                                lower_left_y = height - (selection.y2 * scale),
                                upper_right_x = selection.x2 * scale,
                                upper_right_y = height - (selection.y1 * scale);
                            $('input[name="x1"]').val(x1);
                            $('input[name="x2"]').val(x2);
                            $('input[name="y1"]').val(y1);
                            $('input[name="y2"]').val(y2);
                            $('input[name="lower_left_x"]').val(lower_left_x);
                            $('input[name="lower_left_y"]').val(lower_left_y);
                            $('input[name="upper_right_x"]').val(upper_right_x);
                            $('input[name="upper_right_y"]').val(upper_right_y);
                        },
                        zIndex: -2,
                        borderWidth: 4
                    });

                    dokumen_height = parseInt(page.getViewport(1).height);
                    scale = page.getViewport(1).width / (canvasWidth - 1);
                    var height = (canvaspdf.width() / 16) * 9;

                    var x1 = canvaspdf.width() - tempX1,
                        y1 = canvaspdf.height() - tempY1,
                        x2 = x1 + (lebar / resolusi),
                        y2 = y1 + (tinggi / resolusi);
                    var lower_left_x = x1 * scale,
                        lower_left_y = dokumen_height - (y2 * scale),
                        upper_right_x = x2 * scale,
                        upper_right_y = dokumen_height - (y1 * scale);

                    $('input[name="x1"]').val(x1);
                    $('input[name="x2"]').val(x2);
                    $('input[name="y1"]').val(y1);
                    $('input[name="y2"]').val(y2);
                    $('input[name="lower_left_x"]').val(lower_left_x);
                    $('input[name="lower_left_y"]').val(lower_left_y);
                    $('input[name="upper_right_x"]').val(upper_right_x);
                    $('input[name="upper_right_y"]').val(upper_right_y);

                    var is_visible_sign = $('#is_visible_sign').val();
                    if (is_visible_sign == 'True') {
                        $(canvaspdf).imgAreaSelect({
                            x1: x1,
                            y1: y1,
                            x2: x2,
                            y2: y2
                        });
                    }

                    var digital_signature_path = $('#digital_signature_path').val();
                    var url = __TYPE === 'bankom' ? __LABEL : '../images/Tandatangan.png';

                    if (digital_signature_path != '')
                        url = digital_signature_path;

                    $('.imgareaselect-selection').css({ 'background': 'url(' + url + ') center/100% 100% no-repeat' })
                });
            });
        }

        $(".toggle-password").click(function () {
            $(this).toggleClass("fa-eye fa-eye-slash");
            input = $('.password');
            if (input.attr("type") == "password") {
                input.attr("type", "text");
            } else {
                input.attr("type", "password");
            }
        });
        // Previous page of the PDF
        $("#pdf-prev").on('click', function () {
            if (__CURRENT_PAGE != 1)
                showPage(--__CURRENT_PAGE);
        });

        // Next page of the PDF
        $("#pdf-next").on('click', function () {
            if (__CURRENT_PAGE != __TOTAL_PAGES)
                showPage(++__CURRENT_PAGE);
        });

        $("#clickInformasiOpen").click(function () {
            $("#informasi_koordinat").show();
            $("#clickInformasiClose").show();
            $("#clickInformasiOpen").hide();
        })

        $("#reset").click(function () {
            var canvaspdf = $('#pdf-canvas');
            var resolusi = Math.round(window.devicePixelRatio * 100) / 100
            var { responsiveX1, responsiveY1, responsiveLebar, responsiveTinggi } = calculateResponsiveValues(__TYPE);

            var tempX1 = responsiveX1 / resolusi
            var tempY1 = responsiveY1 / resolusi
            var lebar = responsiveLebar
            var tinggi = responsiveTinggi

            var x1 = canvaspdf.width() - tempX1,
                y1 = canvaspdf.height() - tempY1,
                x2 = x1 + (lebar / resolusi),
                y2 = y1 + (tinggi / resolusi);
            var lower_left_x =  x1 * scale,
                lower_left_y =  dokumen_height - (y2 * scale),
                upper_right_x =  x2 * scale,
                upper_right_y =  dokumen_height - (y1 * scale);

            $('input[name="x1"]').val(x1);
            $('input[name="x2"]').val(x2);
            $('input[name="y1"]').val(y1);
            $('input[name="y2"]').val(y2);
            $('input[name="lower_left_x"]').val(lower_left_x);
            $('input[name="lower_left_y"]').val(lower_left_y);
            $('input[name="upper_right_x"]').val(upper_right_x);
            $('input[name="upper_right_y"]').val(upper_right_y);

            $(canvaspdf).imgAreaSelect({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2
            });
        })

        $("#clickInformasiClose").click(function () {
            $("#informasi_koordinat").hide();
            $("#clickInformasiClose").hide();
            $("#clickInformasiOpen").show();
        })

        $("#submit").click(function () {
            var paraphrase = $('#paraphrase').val()
            var kiri_bawah_x = $('input[name="lower_left_x"]').val();
            var kiri_bawah_y = $('input[name="lower_left_y"]').val();
            var kanan_atas_x = $('input[name="upper_right_x"]').val();
            var kanan_atas_y = $('input[name="upper_right_y"]').val();
            if (paraphrase === '') {
                window.parent.postMessage(1, '*')
            }
            // else if (paraphrase !== 'password123') {
            //     window.parent.postMessage(3, '*')
            // }
            else {
                // data koordinat belum bisa beda tiap page untuk bankom
                let data = {}
                if (__TYPE === 'bankom') {
                    data = {
                        "passphrase": paraphrase,
                        "id_documents": [__ID_DOCUMENT],
                        "array_of_sign": [
                            {
                                "kanan_atas_y": kanan_atas_y,
                                "kanan_atas_x": kanan_atas_x,
                                "kiri_bawah_x": kiri_bawah_x,
                                "kiri_bawah_y": kiri_bawah_y,
                                "halaman": "1"
                            },
                            {
                                "kanan_atas_y": kanan_atas_y,
                                "kanan_atas_x": kanan_atas_x,
                                "kiri_bawah_x": kiri_bawah_x,
                                "kiri_bawah_y": kiri_bawah_y,
                                "halaman": "2"
                            }
                        ]
                    }
                } else {
                    data = {
                        "passphrase": paraphrase,
                        "id_documents": [__ID_DOCUMENT],
                        "kanan_atas_y": kanan_atas_y,
                        "kanan_atas_x": kanan_atas_x,
                        "kiri_bawah_x": kiri_bawah_x,
                        "kiri_bawah_y": kiri_bawah_y,
                        "halaman": __CURRENT_PAGE
                    }
                }
                $.ajax({
                    url: __URL,
                    type: 'PUT',
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        'Authorization': __TOKEN
                    },
                    data: JSON.stringify(data),
                    success: function (data, textStatus, xhr) {
                        console.log(data);
                        if (data.success) {
                            window.parent.postMessage(2, '*')
                        } else {
                            window.parent.postMessage(4, '*')
                        }
                    },
                    error: function (xhr, textStatus, errorThrown) {
                        window.parent.postMessage(0, '*')
                    }
                });
            }
        });

        $(document).ready(function () {
            $('[data-bs-toggle="tooltip"]').tooltip();
        });

        function calculateResponsiveValues(tipe) {
            var screenInnerWidth = window.innerWidth;
            var screenOuterWidth = window.outerWidth;
            var devicePixelRatio = window.devicePixelRatio;

            // Calculate the effective screen width considering zoom
            var effectiveScreenWidth = screenInnerWidth * devicePixelRatio;

            var responsiveX1 = 0;
            var responsiveY1 = 0;
            var responsiveLebar = 0;
            var responsiveTinggi = 0;

            if (effectiveScreenWidth < 600) {
                console.log("Small screen resolution");
                responsiveX1 = tipe === 'bankom' ? 220 : 190;
                responsiveY1 = tipe === 'bankom' ? 100 : 90;
                responsiveLebar = tipe === 'bankom' ? 190 : 150;
                responsiveTinggi = tipe === 'bankom' ? 45 : 35;
            } else if (effectiveScreenWidth >= 600 && effectiveScreenWidth < 1200) {
                console.log("Medium screen resolution");
                responsiveX1 = tipe === 'bankom' ? 220 : 190;
                responsiveY1 = tipe === 'bankom' ? 100 : 90;
                responsiveLebar = tipe === 'bankom' ? 190 : 150;
                responsiveTinggi = tipe === 'bankom' ? 45 : 38;
            } else {
                console.log("Large screen resolution");
                responsiveX1 = tipe === 'bankom' ? 310 : 250;
                responsiveY1 = tipe === 'bankom' ? 140 : 120;
                responsiveLebar = tipe === 'bankom' ? 250 : 210;
                responsiveTinggi = tipe === 'bankom' ? 60 : 48;
            }

            // Return an object with the calculated values
            return {
                responsiveX1: responsiveX1,
                responsiveY1: responsiveY1,
                responsiveLebar: responsiveLebar,
                responsiveTinggi: responsiveTinggi
            };
        }
    </script>
     
  </body>
  
  </html>
  `;

  return <WebView source={{ html: htmlContent }} style={{ flex: 1 }} />;
};
