import React, { Component } from "react";
import { connect } from "react-redux";
import FoodForm from "./FoodForm/FoodForm";
import FoodList from "./FoodList/FoodList";
import { capNhatDanhSachMonAnAction } from "./Redux/Action/food.action";
import { monAnService } from "./Service/food.service";

class DemoAxios extends Component {
  componentDidMount() {
    monAnService
      .layDanhSach()
      .then((res) => {
        this.props.capNhatDanhSachMonAn(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container">
        <FoodForm />
        <FoodList />
      </div>
    );
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    capNhatDanhSachMonAn: (danhSach) => {
      dispatch(capNhatDanhSachMonAnAction(danhSach));
    },
  };
};

export default connect(null, mapDispatchToProps)(DemoAxios);
