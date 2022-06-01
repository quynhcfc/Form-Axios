import { message } from "antd";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { capNhatDanhSachMonAnAction } from "../Redux/Action/food.action";
import { CAP_NHAT_MON_AN } from "../Redux/Constant/food.constant";
import { monAnService } from "../Service/food.service";

class FoodForm extends Component {
  state = {
    name: "",
    price: "",
    img: "",
    description: "",
  };

  constructor(props) {
    super(props);
    this.nameRef = createRef();
    this.formRef = createRef();
  }

  componentDidMount() {
    this.nameRef.current.focus();
    this.formRef.current.reset();
  }

  handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  // Promise chaining
  handleThemMonAn = () => {
    monAnService
      .themMonAn(this.state)
      .then((res) => {
        return monAnService.layDanhSach();
      })

      .then((res) => {
        this.props.capNhatDanhSachMonAn(res.data);
        message.success("Thêm món ăn thành công");
        console.log(res);
      })

      .catch((err) => {
        message.error("Thêm món ăn thất bại");
        console.log(err);
      });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.foodEdit) {
      this.setState({
        ...nextProps.foodEdit,
      });
    }
  }

  handleCapNhatMonAn = (id) => {
    monAnService
      .capNhatMonAn(id)
      .then((res) => {
        return monAnService.layDanhSach();
      })

      .then((res) => {
        this.props.capNhatMonAn(res.data);
        message.success("Cập nhật món ăn thành công");
        console.log(res);
      })

      .catch((err) => {
        message.error("Cập nhật món ăn thất bại");
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container text-left my-5">
        <form className="row mx-0" ref={this.formRef}>
          <div className="form-group col-6">
            <label className="font-weight-bold" htmlFor="name">
              Tên món:
            </label>
            <input
              ref={this.nameRef}
              type="text"
              value={this.state.name}
              className="form-control"
              name="name"
              id="name"
              aria-describedby="helpId"
              placeholder="Nhập tên món"
              onChange={(event) => {
                this.handleOnChange(event);
              }}
            />
          </div>
          <div className="form-group col-6">
            <label className="font-weight-bold" htmlFor="price">
              Giá món:
            </label>
            <input
              // ref={this.priceRef}
              type="text"
              value={this.state.price}
              className="form-control"
              name="price"
              id="price"
              aria-describedby="helpId"
              placeholder="Nhập tên món"
              onChange={(event) => {
                this.handleOnChange(event);
              }}
            />
          </div>
          <div className="form-group col-6">
            <label className="font-weight-bold" htmlFor="img">
              Hình ảnh món:
            </label>
            <input
              type="text"
              value={this.state.img}
              className="form-control"
              name="img"
              id="img"
              aria-describedby="helpId"
              placeholder="Nhập tên món"
              onChange={(event) => {
                this.handleOnChange(event);
              }}
            />
          </div>
          <div className="form-group col-6">
            <label className="font-weight-bold" htmlFor="name">
              Mô tả món:
            </label>
            <input
              type="text"
              value={this.state.description}
              className="form-control"
              name="description"
              id="description"
              aria-describedby="helpId"
              placeholder="Nhập tên món"
              onChange={(event) => {
                this.handleOnChange(event);
              }}
            />
          </div>
          <div className="col">
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => {
                this.handleThemMonAn();
              }}
            >
              Thêm món
            </button>
            <button
              type="button"
              className="btn btn-success mx-2"
              onClick={() => {
                this.handleCapNhatMonAn();
              }}
            >
              Cập nhật
            </button>
            {/* <button type="button" className="btn btn-success">
              Reset
            </button> */}
          </div>
        </form>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    foodEdit: state.foodEdit,
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    capNhatDanhSachMonAn: (danhSach) => {
      dispatch(capNhatDanhSachMonAnAction(danhSach));
    },

    capNhatMonAn: (id) => {
      dispatch({
        type: CAP_NHAT_MON_AN,
        payload: id,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodForm);
