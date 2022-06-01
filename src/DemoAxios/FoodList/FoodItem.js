import { message } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { capNhatDanhSachMonAnAction } from "../Redux/Action/food.action";
import { CHINH_SUA_MON_AN } from "../Redux/Constant/food.constant";
import { monAnService } from "../Service/food.service";

class FoodItem extends Component {
  handleXoaMonAn = (id) => {
    monAnService
      .xoaMonAn(id)
      .then((res) => {
        return monAnService.layDanhSach();
        // console.log(res);
      })

      .then((res) => {
        this.props.capNhatDanhSachMonAn(res.data);
        message.success("Xóa món ăn thành công");
        console.log(res);
      })

      .catch((err) => {
        message.success("Xóa món ăn thất bại");
        console.log(err);
      });
  };

  handleSuaMonAn = (id) => {
    monAnService
      .layThongTinMonAn(id)
      .then((res) => {
        this.props.suaMonAn(res.data);
        message.success("Mời bạn sửa món ăn");
        console.log(res);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    let { id, name, price, img, description } = this.props.monAn;
    return (
      <tr className="row mx-0">
        <td className="col-1">{id}</td>
        <td className="col-2">{name}</td>
        <td className="col-1">{price}</td>
        <td className="col-3">
          <img
            src={img}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </td>
        <td className="col-3">{description}</td>
        <td className="col-2">
          <button
            className="btn btn-success m-1"
            onClick={() => {
              this.handleSuaMonAn(id);
            }}
          >
            Sửa
          </button>
          <button
            className="btn btn-danger m-1"
            onClick={() => {
              this.handleXoaMonAn(id);
            }}
          >
            Xóa
          </button>
        </td>
      </tr>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    capNhatDanhSachMonAn: (danhSach) => {
      dispatch(capNhatDanhSachMonAnAction(danhSach));
    },

    suaMonAn: (monAn) => {
      dispatch({
        type: CHINH_SUA_MON_AN,
        payload: monAn,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(FoodItem);
