import React, { Component } from "react";
import { connect } from "react-redux";
import FoodItem from "./FoodItem";

class FoodList extends Component {
  renderFoodList = () => {
    return this.props.danhSach?.map((item, index) => {
      return <FoodItem monAn={item} key={index} />;
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row mx-0">
          <table className="table">
            <thead>
              <tr className="row mx-0">
                <th className="col-1">ID</th>
                <th className="col-2">Tên món</th>
                <th className="col-1">Giá món</th>
                <th className="col-3">Hinh ảnh</th>
                <th className="col-3">Mô tả</th>
                <th className="col-2">Chức năng</th>
              </tr>
            </thead>
            <tbody>{this.renderFoodList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    danhSach: state.danhSachMonAn,
  };
};

export default connect(mapStateToProps, null)(FoodList);
