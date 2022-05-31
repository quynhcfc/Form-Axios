import axios from "axios";
import { BASE_URL } from "../configURL";

export let monAnService = {
  layDanhSach: () => {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },

  themMonAn: (monAn) => {
    return axios({
      url: BASE_URL,
      method: "POST",
      data: monAn,
    });
  },

  xoaMonAn: (id) => {
    return axios({
      url: `${BASE_URL}/${id}`,
      method: "DELETE",
    });
  },

  layThongTinMonAn: (id) => {
    return axios({
      url: `${BASE_URL}/${id}`,
      method: "GET",
    });
  },

  capNhatMonAn: (id, monAn) => {
    return axios({
      url: `${BASE_URL}/${id}`,
      method: "PUT",
      data: monAn,
    });
  },
};
