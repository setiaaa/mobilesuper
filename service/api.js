import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://apigw.kubekkp.coofis.com/";
const kebijakan = BASE_URL + "policy/";
const kalender = BASE_URL + "calendar/";
const addressbook = BASE_URL + "bridge/";
const pegawai = BASE_URL + "bridge/";
const SATKER = BASE_URL + "bridge/";
const Linimasa = BASE_URL + "mp/";
const repository = BASE_URL + "repository/";
const profile = BASE_URL + "bridge/profile/";
const banner = BASE_URL + "bridge/home/benner/";
const galeri = BASE_URL + "bridge/home/gallery/";
const berita = BASE_URL + "bridge/home/news/";
const detailBerita = BASE_URL + "bridge/home/news/";
const taskManagement = BASE_URL + "calendar/";
const INFOGRAFIS = BASE_URL + "bridge/";
const MYPOST_LIST = BASE_URL + "mp/mypost/";
const MYPOST_DETAIL = BASE_URL + "mp/mypost/";
const CHART_VIEW = BASE_URL + "mp/mypost/chart/view/";
const CHART_POINT = BASE_URL + "mp/mypost/chart/point/";
const CHART_POST = BASE_URL + "mp/mypost/chart/post/";
const CHART_LIKE = BASE_URL + "mp/mypost/chart/like/";
const CHART_COUNT = BASE_URL + "mp/mypost/chart/count/";
const digitalSign = BASE_URL + "digitalsign/";

const SUMMARY_TOTAL_POST = BASE_URL + "mp/admin/summary/total-post/";
const SUMMARY_GRAPH = BASE_URL + "mp/admin/summary/graph/";
const SUMMARY_ACCUMULATION = BASE_URL + "mp/admin/summary/accumulation/";
const SUMMARY_REVIEW = BASE_URL + "mp/admin/summary/review/";
const SUMMARY_BAD_USER = BASE_URL + "mp/admin/summary/bad-user/";

const GET_SUMMARY_COUNT = digitalSign + "document/summary/";
const GET_SUMMARY_LIST = digitalSign + "document/summary/list/";
// const GET_EXPORT_SUMMARY_LIST = URL + 'export/';

const GET_LIST_CATEGORY = BASE_URL + "mp/admin/category/?limit=10";
const GET_LIST_COMPETENCE = BASE_URL + "mp/admin/competence/?limit=199";

const GET_LIST_UNIT_KERJA = BASE_URL + "mp/admin/iku/unitkerja-choice/";
const GET_LIST_PEGAWAI = BASE_URL + "mp/admin/iku/employee/";
const GET_LIST_POSTINGAN_PEGAWAI = BASE_URL + "mp/admin/iku/employee/";
const GET_LIST_PEGAWAI_EXPORT = BASE_URL + "mp/admin/iku/employee/export/";

const UNITKERJA = BASE_URL + "policy/unker/";
const UNITKERJAID = BASE_URL + "policy/tematik/";
const DOKGENERAL = BASE_URL + "policy/search/";

const SPPD = BASE_URL + "monperdin/";

const Cuti = "https://cuti.kubekkp.coofis.com/api/";

//Login
export const Login = createAsyncThunk(
  "auth/Login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const payload = {
        username: username,
        password: password,
      };
      const respon = await axios.post(
        `https://auth.kubekkp.coofis.com/mobile/login/`,
        payload
      );
      return respon?.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// kebijakan
export const getCategory = createAsyncThunk(
  "kebijakan/getCategory",
  async ({ token, page }) => {
    // console.log(token);
    // console.log("page dari api " + page);
    const respon = await axios.get(`${kebijakan}category/?limit=${page}`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const getCategoryId = createAsyncThunk(
  "kebijakan/getCategoryId",
  async ({ token, id }) => {
    const respon = await axios.get(`${kebijakan}category/${id}/`, {
      headers: { Authorization: token },
    });
    return respon?.data;
  }
);

export const getCategoryIdPage = async (id, page) => {
  // console.log(id, page);
  try {
    const respon = await axios.get(`${kebijakan}category/${id}/?page=${page}`, {
      headers: { Authorization: "cf50a5b6-d640-49df-a45d-29f3e7ca1f1c" },
    });
    return respon.data;
  } catch (error) {
    return error;
  }
};

// ? paginasi list dokumen hukum gimana? -Ben
export const getDokHukum = createAsyncThunk(
  "kebijakan/getDokHukum",
  async ({ token, id, page, search }) => {
    // console.log("dari api id " + id);
    // console.log("dari api page " + page);
    // console.log("dari api token " + token);
    const respon = await axios.get(
      `${kebijakan}category/${id}/?limit=${page}&tentang=${search}`,
      {
        headers: { Authorization: token },
      }
    );
    return respon?.data.results.datas;
  }
);

export const getUnitKerjaTematik = createAsyncThunk(
  "kebijakan/getUnitKerjaTematik",
  async ({ token }) => {
    // console.log(token);
    const respon = await axios.get(`${UNITKERJA}`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const getDokGeneral = createAsyncThunk(
  "kebijakan/getDokGeneral",
  async ({ token, search, page }) => {
    const respon = await axios.get(
      `${DOKGENERAL}?&general=${search}&limit=${page}`,
      {
        headers: { Authorization: token },
      }
    );
    return respon?.data.results.datas;
  }
);

export const getUnitKerjaTematikId = createAsyncThunk(
  "kebijakan/getUniteKerjaTematikId",
  async ({ token, id, page, search }) => {
    console.log("id dari api : " + id);
    console.log("token dari api : " + token);
    const respon = await axios.get(
      `${UNITKERJAID}${id}/?&limit=${page}&tentang=${search}`,
      {
        headers: { Authorization: token },
      }
    );
    return respon?.data.results.datas;
  }
);

// event
export const getEvent = createAsyncThunk("calendar/getEvent", async (token) => {
  const respon = await axios.get(`${kalender}event/?limit=9999`, {
    headers: { Authorization: token },
  });
  return respon?.data.results;
});

export const getEventToday = createAsyncThunk(
  "calendar/getEventToday",
  async (token) => {
    const respon = await axios.get(`${kalender}event/today/?limit=9999`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

export const getEventProgress = createAsyncThunk(
  "calendar/getEventProgress",
  async (token) => {
    const respon = await axios.get(`${kalender}event/progress/?limit=9999`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

export const getEventDetail = createAsyncThunk(
  "calendar/getEventDetail",
  async ({ token, id }) => {
    const respon = await axios.get(`${kalender}event/${id}/retrieve/`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const getEventAgenda = createAsyncThunk(
  "calendar/getEventAgenda",
  async (data) => {
    const respon = await axios.get(`${kalender}event/${data.id}/agenda/`, {
      headers: { Authorization: data.token },
    });
    return respon?.data.results;
  }
);

export const getEventAgendaDetail = createAsyncThunk(
  "calendar/getEventAgendaDetail",
  async ({ token, id }) => {
    const respon = await axios.get(`${kalender}event/agenda/${id}/retrieve/`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const getlistApprover = createAsyncThunk(
  "calendar/getlistApprover",
  async ({ token, id }) => {
    const respon = await axios.get(
      `${kalender}event/agenda/notulensi/${id}/approver/`,
      { headers: { Authorization: token } }
    );
    return respon?.data.results;
  }
);

export const getlistNotulensi = createAsyncThunk(
  "calendar/getlistNotulensi",
  async ({ token, idagenda }) => {
    const respon = await axios.get(
      `${kalender}event/agenda/${idagenda}/notulensi/`,
      { headers: { Authorization: token } }
    );
    return respon?.data.results;
  }
);

export const getDetailNotulensi = createAsyncThunk(
  "calendar/getDetailNotulensi",
  async ({ token, idnotu }) => {
    const respon = await axios.get(
      `${kalender}event/agenda/notulensi/${idnotu}/retrieve/`,
      { headers: { Authorization: token } }
    );
    return respon?.data.result;
  }
);

export const getlistTodo = createAsyncThunk(
  "calendar/getlistTodo",
  async ({ token, id }) => {
    const respon = await axios.get(
      `${kalender}event/agenda/notulensi/${id}/task/?name=`,
      { headers: { Authorization: token } }
    );
    return respon?.data.results;
  }
);

export const getDetailTodo = createAsyncThunk(
  "calendar/getDetailTodo",
  async ({ token, id }) => {
    const respon = await axios.get(
      `${kalender}event/agenda/notulensi/task/${id}/retrieve/`,
      { headers: { Authorization: token } }
    );
    return respon?.data.result;
  }
);

export const getlistAbsen = createAsyncThunk(
  "calendar/getlistAbsen",
  async ({ token, idagenda }) => {
    const respon = await axios.get(
      `${kalender}event/agenda/${idagenda}/presensi/?user=`,
      { headers: { Authorization: token } }
    );
    return respon?.data.results;
  }
);

export const getDetailAbsen = createAsyncThunk(
  "calendar/getDetailAbsen",
  async ({ token, idabsen }) => {
    const respon = await axios.get(
      `${kalender}event/agenda/presensi/${idabsen}/retrieve/`,
      { headers: { Authorization: token } }
    );
    return respon?.data.results;
  }
);

export const putAbsen = createAsyncThunk("calendar/putAbsen", async (data) => {
  const respon = await axios.put(
    `${kalender}event/agenda/presensi/${data.idabsen}/update/`,
    { status: data.status, is_scan: data.is_scan },
    { headers: { Authorization: data.token } }
  );
  return respon?.data.result;
});

export const postAttachment = createAsyncThunk(
  "calendar/postAttachment",
  async (data) => {
    let formData = new FormData();
    formData.append("file", data.result);
    const respon = await axios.post(`${kalender}attachment/create/`, formData, {
      headers: { Authorization: data.token },
    });
    return respon?.data.result;
  }
);

export const postEvent = createAsyncThunk(
  "calendar/postEvent",
  async (data) => {
    const respon = await axios.post(`${kalender}event/create/`, data.payload, {
      headers: { Authorization: data.token },
    });
    return respon?.data;
  }
);

export const updateStatus = createAsyncThunk(
  "calendar/updateStatus",
  async (data) => {
    const respon = await axios.put(
      `${kalender}event/${data.id}/status/`,
      { status: data.status },
      { headers: { Authorization: data.token } }
    );
    return respon?.data.result;
  }
);

export const updateEvent = createAsyncThunk(
  "calendar/updateEvent",
  async (data) => {
    const respon = await axios.put(
      `${kalender}event/${data.id}/update/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon?.data.result;
  }
);

export const deleteEvent = createAsyncThunk(
  "calendar/deleteEvent",
  async (data) => {
    const respon = await axios.delete(`${kalender}event/${data.id}/destroy/`, {
      headers: { Authorization: data.token },
    });
    return respon?.data;
  }
);

export const postSubAgenda = createAsyncThunk(
  "calendar/postSubAgenda",
  async (data) => {
    const respon = await axios.post(
      `${kalender}event/agenda/create/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon;
  }
);

export const updateSubAgenda = createAsyncThunk(
  "calendar/updateSubAgenda",
  async (data) => {
    const respon = await axios.put(
      `${kalender}event/agenda/${data.id}/update/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon?.data.result;
  }
);

export const deleteSubAgenda = createAsyncThunk(
  "calendar/deleteSubAgenda",
  async (data) => {
    const respon = await axios.delete(
      `${kalender}event/agenda/${data.id}/destroy/`,
      { headers: { Authorization: data.token } }
    );
    return respon?.data.result;
  }
);

export const postNotulensi = createAsyncThunk(
  "calendar/postNotulensi",
  async (data) => {
    let formData = new FormData();
    formData.append("agenda_id", data.agenda_id);
    formData.append("pdf", data.pdf, data.pdf.name);
    const respon = await axios.post(
      `${kalender}event/agenda/notulensi/create/`,
      formData,
      { headers: { Authorization: data.token } }
    );
    return respon?.data;
  }
);

export const deleteNotulensi = createAsyncThunk(
  "calendar/deleteNotulensi",
  async (data) => {
    const respon = await axios.delete(
      `${kalender}event/agenda/notulensi/${data.id}/destroy/`,
      { headers: { Authorization: data.token } }
    );
    return respon?.data.result;
  }
);

export const readyToApprove = createAsyncThunk(
  "calendar/readyToApprove",
  async (data) => {
    const body = {
      body: "approve",
    };
    const respon = await axios.patch(
      `${kalender}event/agenda/notulensi/${data.id}/ready/`,
      JSON.stringify(body),
      { headers: { Authorization: data.token } }
    );
    return respon?.data.result;
  }
);

export const postTodo = createAsyncThunk("calendar/postTodo", async (data) => {
  const respon = await axios.post(
    `${kalender}event/agenda/notulensi/task/create/`,
    data.payload,
    { headers: { Authorization: data.token } }
  );
  return respon;
});

export const updateTodo = createAsyncThunk(
  "calendar/updateTodo",
  async (data) => {
    const respon = await axios.put(
      `${kalender}event/agenda/notulensi/task/${data.id}/update/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon?.data.result;
  }
);

export const deleteTodo = createAsyncThunk(
  "calendar/deleteTodo",
  async ({ token, id }) => {
    const respon = await axios.delete(
      `${kalender}event/agenda/notulensi/task/${id}/destroy/`,
      { headers: { Authorization: token } }
    );
    return respon?.data.result;
  }
);

//Kalender
export const getlistKalender = createAsyncThunk(
  "calendar/getlistKalender",
  async (token) => {
    const respon = await axios.get(`${kalender}calendar/?limit=10`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

//komentar
export const postKomenTodo = createAsyncThunk(
  "calendar/postKomenTodo",
  async (data) => {
    const respon = await axios.post(
      `${kalender}event/agenda/notulensi/task/comment/create/`,
      {
        task_id: data.task_id,
        parent_id: data.parent_id,
        message: data.message,
      },
      {
        headers: {
          Authorization: data.token,
        },
      }
    );
    return {
      newComment: respon?.data.result,
      detailTodo: data.detailTodo,
      parent_id: data.parent_id,
    };
  }
);

//pegawai
export const getPegawai = createAsyncThunk(
  "calendar/getPegawai",
  async ({ token, page }) => {
    const offset = page * 10;
    const respon = await axios.get(
      `${pegawai}profile/all/?limit=10&offset=${offset}`,
      {
        headers: { Authorization: token },
      }
    );
    return respon?.data.results;
  }
);

export const getDetailPegawai = createAsyncThunk(
  "calendar/getDetailPegawai",
  async ({ token, nip }) => {
    const respon = await axios.get(`${pegawai}profile/${nip}`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

//satker
export const getBennerSatker = createAsyncThunk(
  "bridge/getBennerSatker",
  async (token) => {
    const respon = await axios.get(`${SATKER}satker/benner/`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

export const getGallerySatker = createAsyncThunk(
  "bridge/getGallerySatker",
  async (token) => {
    const respon = await axios.get(`${SATKER}satker/gallery/?page=1`, {
      headers: { Authorization: token },
    });
    return respon?.data;
  }
);

export const getSatkerNews = createAsyncThunk(
  "bridge/getSatkerNews",
  async ({ token, page }) => {
    const respon = await axios.get(`${SATKER}satker/news/?page=${page}`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

export const getDetailSatkerNews = createAsyncThunk(
  "bridge/getDetailSatkerNews",
  async (data) => {
    const respon = await axios.get(`${SATKER}satker/news/${data.id}/`, {
      headers: { Authorization: data.token },
    });
    return respon?.data.results;
  }
);

export const getPesan = createAsyncThunk("bridge/getPesan", async (token) => {
  const respon = await axios.get(`${SATKER}satker/pesan/`, {
    headers: { Authorization: token },
  });
  return respon?.data.results;
});

export const getUltah = createAsyncThunk("bridge/getUltah", async (token) => {
  const respon = await axios.get(`${SATKER}satker/birthday/`, {
    headers: { Authorization: token },
  });
  return respon?.data.results;
});

export const getSatkerLinimasa = createAsyncThunk(
  "mp/getSatkerLinimasa",
  async (token) => {
    const respon = await axios.get(`${Linimasa}linimasa/?limit=6&type=satker`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);
export const getDivision = createAsyncThunk(
  "calendar/getDivision",
  async (token) => {
    const respon = await axios.get(`${addressbook}addressbook/division/`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);
export const getEmployee = createAsyncThunk(
  "calendar/getEmployee",
  async (token) => {
    const respon = await axios.get(`${addressbook}addressbook/employee/`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);
export const getDivisionTree = createAsyncThunk(
  "calendar/getDivisionTree",
  async ({ token, id }) => {
    const respon = await axios.get(`${addressbook}addressbook/tree/${id}/`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

// repository
export const getDocument = createAsyncThunk(
  "repository/getDocument",
  async ({ token, page, type }) => {
    const respon = await axios.get(
      `${repository}my-documents/?limit=${page}&published=${type}&public=false`,
      {
        headers: { Authorization: token },
      }
    );
    return respon?.data.result;
  }
);

export const getDivisionFilter = createAsyncThunk(
  "repository/getDivisionFilter",
  async ({ token }) => {
    const respon = await axios.get(`${BASE_URL}bridge/master/division/`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

export const getSubDivisionFilter = createAsyncThunk(
  "repository/getSubDivisionFilter",
  async ({ token, id }) => {
    const respon = await axios.get(
      `${BASE_URL}bridge/master/department-div/${id}/`,
      {
        headers: { Authorization: token },
      }
    );
    return respon?.data.results;
  }
);

export const getDocumentDibagikan = createAsyncThunk(
  "repository/getDocumentDibagikan",
  async ({ token, page, general }) => {
    const respon = await axios.get(
      `${repository}shared-documents/?limit=${page}`,
      {
        headers: { Authorization: token },
      }
    );
    return respon?.data.result;
  }
);

export const getDocumentTamplate = createAsyncThunk(
  "repository/getDocumentTamplate",
  async ({ token, page, general, by_title, unker, satker }) => {
    console.log(satker);
    const respon = await axios.get(
      `${repository}my-documents/?limit=${page}&published=true&public=true&general=${general}&by_title=${by_title}&unker=${unker}&satker${satker}=`,
      {
        headers: { Authorization: token },
      }
    );
    return respon?.data.result;
  }
);

export const getDetailDocument = createAsyncThunk(
  "repository/getDetailDocument",
  async ({ token, id }) => {
    const respon = await axios.get(`${repository}${id}/document-detail/`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const postCommentRepo = createAsyncThunk(
  "repository/document-comment",
  async (data, setRefresh = undefined) => {
    const respon = await axios.post(
      `${repository}/document-comment/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon?.data;
  }
);

//profile me

export const getProfileMe = createAsyncThunk(
  "profile/getProfileMe",
  async (token) => {
    const respon = await axios.get(`${profile}me/`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

//banner

export const getBanner = createAsyncThunk("banner/getBanner", async (token) => {
  const respon = await axios.get(`${banner}`, {
    headers: { Authorization: token },
  });
  return respon?.data.results;
});

//galeri

export const getGaleri = createAsyncThunk(
  "galeri/getGaleri",
  async ({ token, page }) => {
    const respon = await axios.get(`${galeri}?page=${page}`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

//berita

export const getBerita = createAsyncThunk(
  "berita/getBerita",
  async ({ token, page }) => {
    const respon = await axios.get(`${berita}?page=${page}`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

export const getDetailBerita = createAsyncThunk(
  "berita/getDetailBerita",
  async ({ token, id }) => {
    const respon = await axios.get(`${detailBerita}${id}/`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

//mp
export const getLinimasa = createAsyncThunk(
  "mp/getLinimasa",
  async ({ token, page }) => {
    const respon = await axios.get(`${Linimasa}linimasa/?limit=${page}`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

export const patchLike = createAsyncThunk(
  "mp/patchLike",
  async ({ token, id }) => {
    const respon = await axios.patch(
      `${Linimasa}linimasa/${id}/like/`,
      undefined,
      { headers: { Authorization: token } }
    );
    return respon?.data.results;
  }
);

export const patchUnlike = createAsyncThunk(
  "mp/patchUnlike",
  async ({ token, id }) => {
    const respon = await axios.patch(
      `${Linimasa}linimasa/${id}/unlike/`,
      undefined,
      { headers: { Authorization: token } }
    );
    return respon?.data.results;
  }
);

export const getDetailLinimasa = createAsyncThunk(
  "mp/getDetailLinimasa",
  async ({ token, id }) => {
    const respon = await axios.get(`${Linimasa}linimasa/${id}`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const getViewLinimasa = createAsyncThunk(
  "mp/getViewLinimasa",
  async ({ token, id }) => {
    const respon = await axios.get(`${Linimasa}linimasa/${id}/view/list/`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

export const postComment = createAsyncThunk(
  "mp/postComment",
  async (data, setRefresh = undefined) => {
    const respon = await axios.post(
      `${Linimasa}linimasa/comment/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon?.data;
  }
);

export const getListsLike = createAsyncThunk(
  "mp/getListsLike",
  async ({ token, id }) => {
    const respon = await axios.get(`${Linimasa}linimasa/${id}/like/list/`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

//TASK MANAGEMENT
export const getTreeTM = createAsyncThunk(
  "taskmanagement/getTreeTM",
  async ({ token, page }) => {
    console.log("api tree " + page);
    const respon = await axios.get(
      `${taskManagement}project/tree/?limit=10&page=${page}`,
      {
        headers: { Authorization: token },
      }
    );
    return respon?.data.result;
  }
);

export const getListDashboardTM = createAsyncThunk(
  "taskmanagement/getListDashboardTM",
  async ({ token, page }) => {
    console.log("ini api " + page);
    const respon = await axios.get(
      `${taskManagement}dashboard/list/?limit=10&page=${page}`,
      {
        headers: { Authorization: token },
      }
    );
    return respon?.data.result;
  }
);

export const getListTaskTM = createAsyncThunk(
  "taskmanagement/getListTaskTM",
  async ({ token, id_list, type }) => {
    const respon = await axios.get(
      `${taskManagement}list-task/${id_list}/retrieve/`,
      { headers: { Authorization: token } }
    );
    return {
      data: respon?.data.result,
      type: type,
    };
  }
);

export const getDetailTaskTM = createAsyncThunk(
  "taskmanagement/getDetailTaskTM",
  async ({ token, id_task }) => {
    const respon = await axios.get(
      `${taskManagement}task/${id_task}/retrieve/`,
      { headers: { Authorization: token } }
    );
    return respon?.data.result;
  }
);

export const getDetailProjectTM = createAsyncThunk(
  "taskmanagement/getDetailProjectTM",
  async ({ token, id_project, type = "" }) => {
    const respon = await axios.get(
      `${taskManagement}project/${id_project}/retrieve/`,
      { headers: { Authorization: token } }
    );
    return {
      data: respon?.data.result,
      type: type,
    };
  }
);

export const postCommentTM = createAsyncThunk(
  "taskmanagement/postCommentTM",
  async (data, setRefresh = undefined) => {
    const respon = await axios.post(
      `${taskManagement}comment/create/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon?.data;
  }
);

export const postCategoryTM = createAsyncThunk(
  "taskmanagement/postCategoryTM",
  async (data) => {
    const respon = await axios.post(
      `${taskManagement}project/create/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon?.data;
  }
);

export const editCategoryTM = createAsyncThunk(
  "taskmanagement/editCategoryTM",
  async (data) => {
    const respon = await axios.put(
      `${taskManagement}project/${data.id_project}/update/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon?.data;
  }
);

export const postTaskTM = createAsyncThunk(
  "taskmanagement/postTaskTM",
  async (data) => {
    const respon = await axios.post(
      `${taskManagement}task/create/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon?.data;
  }
);

export const editTaskTM = createAsyncThunk(
  "taskmanagement/editTaskTM",
  async (data) => {
    const respon = await axios.put(
      `${taskManagement}task/${data.id_task}/update/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon?.data;
  }
);

export const updateStatusTaskTM = createAsyncThunk(
  "taskmanagement/updateStatusTaskTM",
  async (data) => {
    const respon = await axios.put(
      `${taskManagement}card/${data.id_task}/update/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon?.data;
  }
);

export const postAttachmentTM = createAsyncThunk(
  "taskmanagement/postAttachmentTM",
  async (data) => {
    let formData = new FormData();
    formData.append("file", data.result);
    const respon = await axios.post(
      `${taskManagement}attachment/create/`,
      formData,
      { headers: { Authorization: data.token } }
    );
    return respon?.data.result;
  }
);

//Penilian
export const getListPenilaian = createAsyncThunk(
  "mp/getListPenilaian",
  async (data) => {
    const respon = await axios.get(
      `${Linimasa}admin/evaluation/?year=${data.tahun}&quarter=${data.TW}`,
      { headers: { Authorization: data.token } }
    );
    return respon?.data.results;
  }
);

export const getTotalPenilaian = createAsyncThunk(
  "mp/getTotalPenilaian",
  async (data) => {
    const respon = await axios.get(
      `${Linimasa}admin/evaluation/count/?year=${data.tahun}&quarter=${data.TW}`,
      { headers: { Authorization: data.token } }
    );
    return respon?.data.result;
  }
);

export const getDetailPenilaian = createAsyncThunk(
  "mp/getDetailPenilaian",
  async ({ token, id }) => {
    const respon = await axios.get(`${Linimasa}admin/evaluation/${id}`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const getNilai = createAsyncThunk("mp/getNilai", async ({ token }) => {
  const respon = await axios.get(
    `${Linimasa}admin/category/?limit=10&type=penilai`,
    { headers: { Authorization: token } }
  );
  return respon?.data.results;
});

export const putAddApprove = createAsyncThunk(
  "mp/putAddApprove",
  async ({ token, id, body }) => {
    const respon = await axios.put(
      `${Linimasa}admin/evaluation/${id}/score/`,
      body,
      { headers: { Authorization: token } }
    );
    return respon?.data.result;
  }
);

export const putCancelApprove = createAsyncThunk(
  "mp/putCancelApprove",
  async ({ token, id, body }) => {
    const respon = await axios.put(
      `${Linimasa}admin/evaluation/${id}/score/cancel/`,
      body,
      { headers: { Authorization: token } }
    );
    return respon?.data.result;
  }
);

export const putTakeDown = createAsyncThunk(
  "mp/putTakeDown",
  async ({ token, id }) => {
    // const respon = await axios.put(`${Linimasa}admin/evaluation/${id}/cancel/`, { headers: { Authorization: token } })
    const respon = await fetch(`${Linimasa}admin/evaluation/${id}/cancel/`, {
      method: "put",
      headers: { Authorization: token },
    });
    return respon?.data;
  }
);

//agenda bersama
export const getListGrup = createAsyncThunk(
  "calendar/getListGrup",
  async (token) => {
    const respon = await axios.get(`${kalender}calendar/?limit=10`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

export const getListAcara = createAsyncThunk(
  "calendar/getListAcara",
  async ({ token, id }) => {
    const respon = await axios.get(`${kalender}calendar/${id}/event/`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const getListAgendaAcara = createAsyncThunk(
  "calendar/getListAgendaAcara",
  async ({ token, id }) => {
    const respon = await axios.get(
      `${kalender}calendar/agenda/?calendar_id=${id}`,
      { headers: { Authorization: token } }
    );
    return respon?.data.result;
  }
);

export const getDetailAcara = createAsyncThunk(
  "calendar/getDetailAcara",
  async ({ token, id }) => {
    const respon = await axios.get(
      `${kalender}calendar/event/${id}/retrieve/`,
      { headers: { Authorization: token } }
    );
    return respon?.data.result;
  }
);

export const getDetailAgendaAcara = createAsyncThunk(
  "calendar/getDetailAgendaAcara",
  async ({ token, id }) => {
    const respon = await axios.get(`${kalender}event/${id}/retrieve/`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const getListSubAgenda = createAsyncThunk(
  "calendar/getListSubAgenda",
  async ({ token, id }) => {
    console.log(id);
    const respon = await axios.get(`${kalender}event/${id}/agenda/`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

export const postGrup = createAsyncThunk("calendar/postGrup", async (data) => {
  console.log(data.payload);
  const respon = await axios.post(`${kalender}calendar/create/`, data.payload, {
    headers: { Authorization: data.token },
  });
  return respon?.data;
});

export const postAgendaAcara = createAsyncThunk(
  "calendar/postAgendaAcara",
  async (data) => {
    console.log(data.payload);
    const respon = await axios.post(
      `${kalender}calendar/event/create/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon?.data;
  }
);

export const getDetailGrup = createAsyncThunk(
  "calendar/getDetailGrup",
  async ({ token, id }) => {
    console.log(id);
    const respon = await axios.get(`${kalender}calendar/${id}`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const putEditGrup = createAsyncThunk(
  "calendar/putEditGrup",
  async (data) => {
    const respon = await axios.put(
      `${kalender}calendar/${data.id}/update/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon?.data.result;
  }
);

export const putEditAgendaGrup = createAsyncThunk(
  "calendar/putEditAgendaGrup",
  async (data) => {
    console.log(data);
    const respon = await axios.put(
      `${kalender}calendar/event/${data.id}/update/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon?.data.result;
  }
);
export const deleteAgendaGrup = createAsyncThunk(
  "calendar/deleteAgendaGrup",
  async (data) => {
    console.log(data);
    const respon = await axios.delete(
      `${kalender}calendar/event/${data.id}/destroy/`,
      { headers: { Authorization: data.token } }
    );
    return respon;
  }
);
export const deleteGrup = createAsyncThunk(
  "calendar/deleteGrup",
  async (data) => {
    console.log(data);
    const respon = await axios.delete(
      `${kalender}calendar/${data.id}/destroy/`,
      { headers: { Authorization: data.token } }
    );
    return respon;
  }
);

//Dashboard
export const getKesejahteraan = createAsyncThunk(
  "bridge/getKesejahteraan",
  async ({ token, value, page }) => {
    const respon = await axios.get(
      `${INFOGRAFIS}infografis/?source=${value}&limit=5&page=${page}`,
      { headers: { Authorization: token } }
    );
    return respon?.data;
  }
);

export const getPerencanaan = createAsyncThunk(
  "bridge/getPerencanaan",
  async ({ token, value, page }) => {
    const respon = await axios.get(
      `${INFOGRAFIS}infografis/?source=${value}&limit=5&page=${page}`,
      { headers: { Authorization: token } }
    );
    return respon?.data;
  }
);

export const getTeknologi = createAsyncThunk(
  "bridge/getTeknologi",
  async (token) => {
    const respon = await axios.get(`${INFOGRAFIS}teknologi-terkini/`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);
//repository
export const getSharedDocuments = createAsyncThunk(
  "repository/getSharedDocuments",
  async (token) => {
    const respon = await axios.get(`${repository}shared-documents/`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);
export const getDetailsSharedDocuments = createAsyncThunk(
  "repository/getDetailsSharedDocuments",
  async ({ token, id }) => {
    const respon = await axios.get(`${repository}${id}/document-detail/`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

//postingan saya
export const getMyPostList = createAsyncThunk(
  "mp/mypost",
  async ({ token, page }) => {
    const respon = await axios.get(`${MYPOST_LIST}?limit=${page}`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

export const getMyPostDetail = createAsyncThunk(
  "mp/mypost/detail",
  async ({ token, id }) => {
    const respon = await axios.get(`${MYPOST_DETAIL}${id}`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const getMyPostView = createAsyncThunk(
  "mp/mypost/chart/view",
  async (token) => {
    const respon = await axios.get(`${CHART_VIEW}`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const getMyPostPoint = createAsyncThunk(
  "mp/mypost/chart/point",
  async (token) => {
    const respon = await axios.get(`${CHART_POINT}`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const getMyPostLike = createAsyncThunk(
  "mp/mypost/chart/like",
  async (token) => {
    const respon = await axios.get(`${CHART_LIKE}`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const getMyPostCount = createAsyncThunk(
  "mp/mypost/chart/count",
  async (token) => {
    const respon = await axios.get(`${CHART_COUNT}`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const getSummaryTotalPost = createAsyncThunk(
  "mp/admin/summary/total-post",
  async (data) => {
    const respon = await axios.get(
      `${SUMMARY_TOTAL_POST}?year=${data.year}&quarter=${data.quarter}`,
      {
        headers: { Authorization: data.token },
      }
    );
    return respon?.data.result;
  }
);

export const getSummaryBadUser = createAsyncThunk(
  "mp/admin/summary/bad-user/",
  async (data) => {
    // console.log(data.year);
    // console.log(data.quarter);

    const respon = await axios.get(
      `${SUMMARY_BAD_USER}?year=${data.year}&quarter=${data.quarter}`,
      {
        headers: { Authorization: data.token },
      }
    );
    return respon?.data.result;
  }
);

export const getSummaryGraph = createAsyncThunk(
  "mp/admin/summary/graph/",
  async (data) => {
    const respon = await axios.get(
      `${SUMMARY_GRAPH}?year=${data.year}&quarter=${data.quarter}`,
      {
        headers: { Authorization: data.token },
      }
    );
    return respon?.data.result;
  }
);

export const getSummaryAccumulation = createAsyncThunk(
  "mp/admin/summary/accumulation/",
  async (data) => {
    const respon = await axios.get(
      `${SUMMARY_ACCUMULATION}?year=${data.year}&quarter=${data.quarter}`,
      {
        headers: { Authorization: data.token },
      }
    );
    return respon?.data.result;
  }
);

export const getSummaryReview = createAsyncThunk(
  "mp/admin/summary/review/",
  async (data) => {
    const respon = await axios.get(
      `${SUMMARY_REVIEW}?year=${data.year}&quarter=${data.quarter}`,
      {
        headers: { Authorization: data.token },
      }
    );
    return respon?.data.result;
  }
);

export const getListCategory = createAsyncThunk(
  "mp/admin/category/",
  async (token) => {
    const respon = await axios.get(`${GET_LIST_CATEGORY}`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

export const getListCompetence = createAsyncThunk(
  "mp/admin/competence/",
  async (token) => {
    const respon = await axios.get(`${GET_LIST_COMPETENCE}`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

export const getListUnitKerja = createAsyncThunk(
  "mp/admin/iku/unitkerja-choice/",
  async (token) => {
    const respon = await axios.get(`${GET_LIST_UNIT_KERJA}`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const getListPegawai = createAsyncThunk(
  "mp/admin/iku/employee",
  async (data) => {
    // console.log(data.token);
    // console.log(data.year);
    // console.log(data.quarter);
    // console.log(data.unitKerja);
    const respon = await axios.get(
      `${GET_LIST_PEGAWAI}?year=${data.year}&quarter=${data.quarter}&unit_kerja=${data.unitKerja}&limit=${data.page}`,
      {
        headers: { Authorization: data.token },
      }
    );
    console.log(data.page);
    return respon?.data.results;
  }
);

export const getListPostPegawai = createAsyncThunk(
  "mp/admin/iku/employee/id",
  async ({ token, id }) => {
    // console.log("token : " + token);
    // console.log("id : " + id);
    const respon = await axios.get(`${GET_LIST_POSTINGAN_PEGAWAI}${id}`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const getListPegawaiExport = createAsyncThunk(
  "admin/iku/employee/export",
  async (data) => {
    console.log(data.token);
    console.log(data.year);
    console.log(data.quarter);
    console.log(data.unitKerja);
    const respon = await axios.get(
      `${GET_LIST_PEGAWAI_EXPORT}?year=${data.year}&quarter=${data.quarter}&unit_kerja=${data.unitKerja}`,
      {
        headers: { Authorization: data.token },
      }
    );
    return respon?.data.result;
  }
);

// export const postMyArticle = createAsyncThunk("mp/", async (data, setRefresh = undefined) => {
//     const respon = await axios.post(`${Linimasa}linimasa/comment/`, data.payload, { headers: { Authorization: data.token } })
//     return respon?.data
// })
//Digital Signature
export const getListComposer = createAsyncThunk(
  "digitalsign/getListComposer",
  async ({ token, tipe }) => {
    const respon = await axios.get(
      `${digitalSign}document/composer/?tipe_dokumen=${tipe}`,
      { headers: { Authorization: token } }
    );
    return {
      data: respon?.data.results,
      tipe: tipe,
    };
  }
);
export const getListInProgress = createAsyncThunk(
  "digitalsign/getListInProgress",
  async ({ token, tipe }) => {
    const respon = await axios.get(
      `${digitalSign}document/inprogress/?tipe_dokumen=${tipe}`,
      { headers: { Authorization: token } }
    );
    return {
      data: respon?.data.results,
      tipe: tipe,
    };
  }
);
export const getListCompleted = createAsyncThunk(
  "digitalsign/getListCompleted",
  async ({ token, tipe }) => {
    const respon = await axios.get(
      `${digitalSign}document/completed/?tipe_dokumen=${tipe}`,
      { headers: { Authorization: token } }
    );
    return {
      data: respon?.data.results,
      tipe: tipe,
    };
  }
);
export const getListDraft = createAsyncThunk(
  "digitalsign/getListDraft",
  async ({ token, tipe }) => {
    const respon = await axios.get(
      `${digitalSign}document/draft/?tipe_dokumen=${tipe}`,
      { headers: { Authorization: token } }
    );
    return {
      data: respon?.data.results,
      tipe: tipe,
    };
  }
);

export const addDocumentDigiSign = createAsyncThunk(
  "digitalsign/addDocumentDigiSign",
  async (data) => {
    const respon = await axios.post(
      `${digitalSign}document/create/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon?.data;
  }
);

export const getListSignedDigiSign = createAsyncThunk(
  "digitalsign/getListSignedDigiSign",
  async ({ token, tipe }) => {
    const respon = await axios.get(
      `${digitalSign}document/signed/?tipe_dokumen=${tipe}`,
      { headers: { Authorization: token } }
    );
    return {
      data: respon?.data.results,
      tipe: tipe,
    };
  }
);

export const putDocumentDigiSign = createAsyncThunk(
  "digitalsign/putDocumentDigiSign",
  async (data) => {
    const respon = await axios.put(
      `${digitalSign}document/${data.id}/draft/`,
      { status: data.status },
      { headers: { Authorization: data.token } }
    );
    return respon?.data.result;
  }
);

export const addAttachmentDigiSign = createAsyncThunk(
  "digitalsign/addAttachmentDigiSign",
  async (data) => {
    const respon = await axios.post(
      `${digitalSign}attachment/create/`,
      data.payload,
      { headers: { Authorization: data.token } }
    );
    return respon?.data;
  }
);

export const getDetailDigisign = createAsyncThunk(
  "digitalsign/getDetailDigisign",
  async ({ token, id }) => {
    const respon = await axios.get(`${digitalSign}document/${id}`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const updateDocumentDigiSign = createAsyncThunk(
  "digitalsign/updateDocumentDigiSign",
  async (data) => {
    const respon = await axios.put(
      `${digitalSign}document/${data.id}/draft/`,
      { status: data.status },
      { headers: { Authorization: data.token } }
    );
    return respon?.data.result;
  }
);

export const putInProgressDigiSign = createAsyncThunk(
  "digitalsign/putInProgressDigiSign",
  async (data) => {
    const respon = await axios.put(
      `${digitalSign}document/approve/`,
      { status: data.status },
      { headers: { Authorization: data.token } }
    );
    return respon?.data.result;
  }
);

export const getCourseDigiSign = createAsyncThunk(
  "digitalsign/getCourseDigiSign",
  async (token) => {
    const respon = await axios.get(`${digitalSign}course/?limit=10`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

export const getSummaryCount = createAsyncThunk(
  "document/summary/",
  async (token) => {
    const respon = await axios.get(`${GET_SUMMARY_COUNT}`, {
      headers: { Authorization: token },
    });
    return respon?.data.result;
  }
);

export const getSummaryList = createAsyncThunk(
  "document/summary/list/",
  async (token) => {
    const respon = await axios.get(`${GET_SUMMARY_LIST}`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

//Cuti
export const getCutiPersonal = createAsyncThunk(
  "cuti/getCutiPersonal",
  async (nip) => {
    const respon = await axios.get(`${Cuti}jenis-cuti?nip=${nip}`, {
      // headers: { Authorization: token },
    });
    return respon?.data;
  }
);

export const getKuotaCuti = createAsyncThunk(
  "cuti/getKuotaCuti",
  async (nip) => {
    const respon = await axios.get(`${Cuti}kuota-cuti?nip=${nip}`, {
      // headers: { Authorization: token },
    });
    return respon?.data;
  }
);

export const getTanggalLibur = createAsyncThunk(
  "cuti/getTanggalLibur",
  async (nip) => {
    const respon = await axios.get(
      `${Cuti}tanggal-libur?nip=${nip}&tanggal_mulai=2023-01-01&tanggal_akhir=&jenis_liburan=`,
      {
        // headers: { Authorization: token },
      }
    );
    return respon?.data;
  }
);

export const getLiburKhusus = createAsyncThunk(
  "cuti/getLiburKhusus",
  async (nip) => {
    const respon = await axios.get(
      `${Cuti}tanggal-libur?nip=${nip}&tanggal_mulai=2023-01-01&tanggal_akhir=&jenis_liburan=Private Holiday`,
      {
        // headers: { Authorization: token },
      }
    );
    return respon?.data;
  }
);

export const getArsipCuti = createAsyncThunk(
  "cuti/getArsipCuti",
  async (nip) => {
    const respon = await axios.get(
      `${Cuti}dokumen-cutiku/?nip=${nip}&status=&tanggal_pembuatan_dimulai=&tanggal_pembuatan_sampai=&page=1&limit=`,
      {
        // headers: { Authorization: token },
      }
    );
    return respon?.data;
  }
);

export const getDetailArsipCuti = createAsyncThunk(
  "cuti/getDetailArsipCuti",
  async (data) => {
    const respon = await axios.get(
      `${Cuti}dokumen-detail/?nip=${data.nip}&id_dokumen=${data.id}`,
      {
        // headers: { Authorization: token },
      }
    );
    return respon?.data;
  }
);

export const getFormCuti = createAsyncThunk(
  "cuti/getFormCuti",
  async (data) => {
    const respon = await axios.get(
      `${Cuti}form-cuti?nip=${data.nip}&id_jenis_cuti=${data.id}`,
      {
        // headers: { Authorization: token },
      }
    );
    return respon?.data;
  }
);

export const getPilihApproval = createAsyncThunk(
  "cuti/getPilihApproval",
  async ({ nip, kunci }) => {
    const respon = await axios.get(
      `${Cuti}pilih-approval?nip=${nip}&kata_kunci=`,
      {
        // headers: { Authorization: token },
      }
    );
    return respon?.data;
  }
);

export const getDokumenPersetujuan = createAsyncThunk(
  "cuti/getDokumenPersetujuan",
  async (nip) => {
    const respon = await axios.get(
      `${Cuti}dokumen-persetujuanku/?nip=${nip}&status=&tanggal_pembuatan_dimulai=&tanggal_pembuatan_sampai=&page=1&limit=5`,
      {
        // headers: { Authorization: token },
      }
    );
    return respon?.data;
  }
);

//SPPD
export const getDashboardSPPD = createAsyncThunk(
  "sppd/getDashboard",
  async (token) => {
    const respon = await axios.get(`${SPPD}dashboard/`, {
      headers: { Authorization: token },
    });
    return respon?.data;
  }
);

export const getDocumentListSPPD = createAsyncThunk(
  "sppd/getDocumentListSPPD",
  async (token) => {
    const respon = await axios.get(`${SPPD}document/`, {
      headers: { Authorization: token },
    });
    return respon?.data.results;
  }
);

export const getDocumentDetailSPPD = createAsyncThunk(
  "sppd/getDocumentDetailSPPD",
  async (data) => {
    const respon = await axios.get(`${SPPD}document/${data.id}/`, {
      headers: { Authorization: data.token },
    });
    return respon?.data;
  }
);
