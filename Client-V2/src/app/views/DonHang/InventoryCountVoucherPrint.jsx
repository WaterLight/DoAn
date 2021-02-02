import React, { Component, useRef } from "react";
import {
  Dialog,
  Button,
  Grid,
  Checkbox,
  IconButton,
  Icon,
  DialogActions,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader,
} from "material-table";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const pTextAlign = {
  textAlign: "center",
  fontWeight: "bold",
};

const pBold = {
  fontWeight: "bold",
};

const abc = {
  margin: "0",
  fontWeight: "bold",
  fontSize: "12px",
};

const b = {
  borderBottom: "solid 1px",
  borderRight: "solid 1px",
};

function MaterialButton(props) {
  const { t, i18n } = useTranslation();
  const item = props.item;
  return (
    <div>
      <IconButton onClick={() => props.onSelect(item, 1)}>
        <Icon color="error">delete</Icon>
      </IconButton>
    </div>
  );
}
export default class InventoryCountVoucherPrint extends Component {
  state = {};

  handleFormSubmit = () => {
    let content = document.getElementById("divcontents");
    let pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();

    pri.document.write(content.innerHTML);

    pri.document.close();
    pri.focus();
    pri.print();
  };

  componentWillMount() {
    let { open, handleClose, item } = this.props;

    this.setState(
      {
        ...this.props.item,
      },
      function () {}
    );
  }
  componentDidMount() {}

  render() {
    let { open, handleClose, handleOKEditClose, t, i18n, item } = this.props;
    console.log(item);
    let now = new Date();
    let total = 0;
    return (
      <Dialog
        open={open}
        PaperComponent={PaperComponent}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          style={{ cursor: "move", paddingBottom: "0px" }}
          id="draggable-dialog-title"
        >
          <span className="">{t("Hoá đơn")}</span>
        </DialogTitle>
        <iframe
          id="ifmcontentstoprint"
          style={{
            height: "0px",
            width: "0px",
            position: "absolute",
            print: { size: "auto", margin: "0mm" },
          }}
        ></iframe>

        <ValidatorForm
          className="validator-form-scroll-dialog"
          ref="form"
          onSubmit={this.handleFormSubmit}
        >
          <DialogContent id="divcontents">
            <Grid>
              <div>
                <div style={{ display: "flex" }}>
                  <div style={(pBold, { flexGrow: 1 })}>
                    <p style={abc}>Mẫu số:...........</p>
                    <p style={abc}>Kí hiệu:..........</p>
                    <p style={abc}>Số:..........</p>
                  </div>

                  <div style={{ flexGrow: 3 }}>
                    <p
                      style={{
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        marginLeft: "22%",
                        fontSize: "17px",
                      }}
                    >
                      Hoá đơn
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: "center", fontSize: "12px" }}>
                  <i>
                    Ngày {now.getDay()} tháng {now.getMonth()} năm{" "}
                    {now.getFullYear()}
                  </i>
                </div>
                <div style={(abc, { display: "grid" })}>
                  <strong>Số hoá đơn xác thực: {item.ma}</strong>
                  <strong>Mã xác thực: {`${item.ma}/${item.id}`}</strong>
                </div>

                <div
                  style={{
                    border: "solid 1px",
                    borderRadius: "10px",
                    marginTop: "12px",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      borderRadius: "12px",
                      borderCollapse: "collapse",
                    }}
                  >
                    <tr>
                      <th
                        style={{
                          borderBottom: "solid 1px #d2bfbf",
                          borderRight: "solid 1px",
                          textTransform: "uppercase",
                          fontSize: "15px",
                        }}
                      >
                        Thông tin đơn vị bán
                      </th>
                      <th
                        style={{
                          borderBottom: "solid 1px #d2bfbf",
                          textTransform: "uppercase",
                          fontSize: "15px",
                        }}
                      >
                        Thông tin Khánh Hàng
                      </th>
                    </tr>
                    <tr>
                      <td
                        style={{ borderRight: "solid 1px", paddingLeft: "6px" }}
                      >
                        <p style={abc}>Đơn vị bán: </p>
                        <p style={abc}>Mã số thuế:</p>
                        <p style={abc}>Địa chỉ:</p>
                        <p style={abc}>Điện thoại:</p>
                        <p style={abc}>Số tài khoản:</p>
                      </td>
                      <td style={{ paddingLeft: "6px" }}>
                        <p style={abc}>Họ tên người mua: </p>
                        <p style={abc}>Tên đơn vị:</p>
                        <p style={abc}>Mã số thuế:</p>
                        <p style={abc}>Địa chỉ:</p>
                        <p style={abc}>Số tài khoản:</p>
                      </td>
                    </tr>
                  </table>
                </div>

                <div
                  style={{
                    marginTop: "8px",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <strong>Phương thức thanh toán: </strong>
                    Tiền mặt
                  </div>
                  <div>
                    <strong>Loại tiền: VND</strong>
                  </div>
                </div>

                <div
                  style={{
                    border: "solid 1px",
                    borderRadius: "10px",
                    marginTop: "12px",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      borderRadius: "12px",
                      borderCollapse: "collapse",
                    }}
                  >
                    <tr>
                      <th style={b}>STT</th>
                      <th style={b}>Mã hàng hoá</th>
                      <th style={b}>Tên hàng hoá</th>
                      <th style={b}>Đơn vị tính</th>
                      <th style={b}>Số lượng</th>
                      <th style={b}>Đơn giá trước thuế</th>
                      <th style={b}>Thuế GTGT</th>
                      <th style={{ borderBottom: "solid 1px" }}>
                        Thành tiền trước thuế
                      </th>
                    </tr>
                    {item.sanPhamDonHang?.map((donHang, index) => {
                      return (
                        <tr>
                          <td style={{ borderRight: "solid 1px" }}>
                            {index + 1}
                          </td>
                          <td style={{ borderRight: "solid 1px" }}>
                            {donHang.sanPham.maSP}
                          </td>
                          <td style={{ borderRight: "solid 1px" }}>
                            {donHang.sanPham.tenSP}
                          </td>
                          <td style={{ borderRight: "solid 1px" }}>
                            {donHang.sanPham.donViTinh.ten}
                          </td>
                          <td style={{ borderRight: "solid 1px" }}>
                            {donHang.soLuong}
                          </td>
                          <td style={{ borderRight: "solid 1px" }}>
                            {donHang.donGia}
                          </td>
                          <td style={{ borderRight: "solid 1px" }}>0%</td>
                          <td>{donHang.donGia}</td>
                        </tr>
                      );
                    })}
                  </table>
                </div>
                <div style={{ margin: "8px 0px" }}>
                  <strong>Số tiền viết bằng chữ: </strong>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div><strong>Người mua hàng</strong></div>
                  <div><strong>Người bán hàng</strong></div>
                </div>
              </div>
            </Grid>
          </DialogContent>
          <DialogActions>
            <div className="flex flex-space-between flex-middle">
              <Button
                variant="contained"
                color="secondary"
                className="mr-12"
                onClick={() => this.props.handleClose()}
              >
                {t("general.cancel")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="mr-16"
                type="submit"
              >
                {t("In")}
              </Button>
            </div>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}
