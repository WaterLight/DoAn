import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  DialogActions,
  FormControl,
  Paper,
  DialogTitle,
  DialogContent,
  Icon,
  IconButton,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  getAllStores,
  addNewSource,
  updateSource,
  searchByPage,
  checkCode,
} from "./DonHangService";
import Draggable from "react-draggable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectNhanVienPopup from "./SelectNhanVienPopup";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
  DateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader,
} from "material-table";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import DateFnsUtils from "@date-io/date-fns";
import MultipleProduct from "./MultipleProduct";
toast.configure();

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

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    position: "absolute",
    top: "-10px",
    left: "-25px",
    width: "80px",
  },
}))(Tooltip);

function MaterialButton(props) {
  const { t, i18n } = useTranslation();
  const item = props.item;
  return (
    <div className="none_wrap">
      <LightTooltip
        title={t("general.editIcon")}
        placement="right-end"
        enterDelay={300}
        leaveDelay={200}
      >
        <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
          <Icon fontSize="small" color="primary">
            edit
          </Icon>
        </IconButton>
      </LightTooltip>
      <LightTooltip
        title={t("general.deleteIcon")}
        placement="right-end"
        enterDelay={300}
        leaveDelay={200}
      >
        <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
          <Icon fontSize="small" color="error">
            delete
          </Icon>
        </IconButton>
      </LightTooltip>
    </div>
  );
}

class DonHangEditorDialog extends Component {
  state = {
    id: "",
    ten: "",
    ma: "",
    ngayDatHang: new Date(),
    ngayGiaoHang: null,
    tongGia: "",
    giamGia: "",
    thanhTien: "",
    trangThai: "",
    nguoiBan: null,
    ghiChu: "",
    sanPhamDonHang: [],
    shouldOpenNotificationPopup: false,
    Notification: "",
    shouldOpenSelectAgencyPopup: false,
    shouldOpenMultipleDialog: false,
  };
  listStatus =[
    {id:1, name:"Đơn hàng mới"},
    {id:2, name:"Đơn hàng đã xác nhận"},
    {id:3, name:"Đơn hàng đã thanh toán"},
    {id:4, name:"Đơn hàng đã hủy"}
  ]
  handleChange = (event, source) => {
    event.persist();
    if (source === "switch") {
      this.setState({ isActive: event.target.checked });
      return;
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFormSubmit = () => {
    let { id } = this.state;
    let { t } = this.props;
    if (id) {
      updateSource({
        ...this.state,
      }).then((response) => {
        if (response.data && response.status == 200) {
          toast.info("Cập nhật thành công thông tin đơn hàng");
          this.props.handleOKEditClose();
        } else {
          toast.error("Có lỗi xảy ra khi cập nhật thông tin đơn hàng");
        }
      });
    } else {
      addNewSource({
        ...this.state,
      }).then((response) => {
        if (response.data && response.status == 200) {
          toast.info("Tạo mới thành công đơn hàng");
          this.props.handleOKEditClose();
        } else {
          toast.error("Có lỗi xảy ra khi tạo mới đơn hàng");
        }
      });
    }
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

  handleDateChange = (date, name) => {
    this.setState({
      [name]: date,
    });
  };

  handleDialogClose = () => {
    this.setState({
      shouldOpenNotificationPopup: false,
      shouldOpenSelectUserPopup: false,
      shouldOpenSelectAgencyPopup: false,
      shouldOpenSelectDMPopup: false,
    });
  };

  handleSelectAgency = (item) => {
    this.setState({
      nguoiBan: item ? item : null,
      shouldOpenSelectAgencyPopup: false,
    });
  };

  handleSelectSP = (item) => {
    let data = item.map((row) => ({ ...row, tableData: { checked: false } }));
    this.setState({ sanPhamDonHang: data }, () => {
      console.log(this.state.sanPhamDonHang);
    });
    this.handleDialogCancel();
  };

  handleDialogCancel = () => {
    this.setState({
      shouldOpenMultipleDialog: false,
    });
  };

  handleChangeSL = (item, e) => {
    let { sanPhamDonHang } = this.state;
    if (sanPhamDonHang == null) {
      sanPhamDonHang = [];
      let p = {};
      p.sanPham = item;
      p.soluong = e.target.value;
      sanPhamDonHang.push(p);
    }
    if (sanPhamDonHang != null && sanPhamDonHang.length > 0) {
      sanPhamDonHang.forEach((el) => {
        if (el.sanPham.id == item.sanPham.id) {
          // let p ={}
          el.soLuong = e.target.value;
        }
      });
    }
    this.setState({ sanPhamDonHang: sanPhamDonHang });
  };

  handleChangeGia = (item, e) => {
    let { sanPhamDonHang } = this.state;
    if (sanPhamDonHang == null) {
      sanPhamDonHang = [];
      let p = {};
      p.sanPham = item;
      p.donGia = e.target.value;
      sanPhamDonHang.push(p);
    }
    if (sanPhamDonHang != null && sanPhamDonHang.length > 0) {
      sanPhamDonHang.forEach((el) => {
        if (el.sanPham.id == item.sanPham.id) {
          // let p ={}
          el.donGia = e.target.value;
        }
      });
    }
    this.setState({ sanPhamDonHang: sanPhamDonHang }, () => {
      console.log(this.state.sanPhamDonHang);
    });
  };

  render() {
    let { open, handleClose, handleOKEditClose, t, i18n } = this.props;
    let {
      id,
      ten,
      ma,
      ngayDatHang,
      ngayGiaoHang,
      tongGia,
      giamGia,
      thanhTien,
      trangThai,
      nguoiBan,
      ghiChu,
      sanPhamDonHang,
      shouldOpenMultipleDialog,
    } = this.state;

    let columns = [
      {
        title: t("general.action"),
        field: "custom",
        align: "left",
        width: "90px",
        headerStyle: {
          padding: "0px",
        },
        cellStyle: {
          padding: "0px",
        },
        render: (rowData) => (
          <MaterialButton
            item={rowData}
            onSelect={(rowData, method) => {
              if (method === 0) {
                this.setState({
                  shouldOpenLabTestPropertyEditDialog: true,
                  item: rowData,
                });
              } else if (method === 1) {
                sanPhamDonHang.map((pro, index) => {
                  if (pro.sanPham.maSP === rowData.sanPham.maSP) {
                    sanPhamDonHang.splice(index, 1);
                  }
                });
                this.setState({ sanPhamDonHang: sanPhamDonHang });
              } else {
                alert("Call Selected Here:" + rowData.id);
              }
            }}
          />
        ),
      },
      {
        title: t("Tên sản phẩm"),
        field: "sanPham.tenSP",
        width: "300",
      },
      {
        title: t("Mã sản phẩm"),
        field: "sanPham.maSP",
        width: "300",
      },
      {
        title: "Size",
        field: "size.ma",
        width: "300",
      },
      {
        title: t("Số lượng"),
        field: "code",
        align: "left",
        render: (row) => (
          <TextValidator
            className="w-30"
            onChange={(e) => this.handleChangeSL(row, e)}
            type="number"
            value={row.soLuong}
            validators={["required"]}
            errorMessages={[t("general.required")]}
          />
        ),
      },
      {
        title: "Đơn giá",
        align: "left",
        render: (row) => (
          <TextValidator
            className="w-50"
            onChange={(e) => this.handleChangeGia(row, e)}
            type="number"
            value={row.donGia}
            validators={["required"]}
            errorMessages={[t("general.required")]}
          />
        ),
      },
      {
        title: "Thành tiền",
        align: "left",
        render: (row) => (
          <TextValidator
            className="w-50"
            onChange={(e) => this.handleChangeGia(row, e)}
            type="number"
            value={row.thanhTien}
            validators={["required"]}
            errorMessages={[t("general.required")]}
          />
        ),
      },
    ];

    return (
      <Dialog open={open} PaperComponent={PaperComponent} maxWidth="md">
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <span className="mb-20">{t("general.saveUpdate")}</span>
        </DialogTitle>
        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
          <DialogContent>
            <Grid className="mb-16" container spacing={1}>
              <Grid item md={3} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span>
                      <span style={{ color: "red" }}>*</span>
                      {t("general.name")}
                    </span>
                  }
                  onChange={this.handleChange}
                  type="text"
                  name="ten"
                  value={ten}
                  validators={["required"]}
                  errorMessages={t("general.required")}
                />
              </Grid>
              <Grid item md={3} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span>
                      <span style={{ color: "red" }}>*</span>
                      {t("general.code")}
                    </span>
                  }
                  onChange={this.handleChange}
                  type="text"
                  name="ma"
                  value={ma}
                  validators={["required"]}
                  errorMessages={t("general.required")}
                />
              </Grid>
              <Grid item md={3} sm={12} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    fullWidth
                    margin="none"
                    id="mui-pickers-date"
                    // label={t("purchaseRequest.requestDate")}
                    label={
                      <span>
                        <span style={{ color: "red" }}>*</span>
                        {t("Ngày đặt hàng")}
                      </span>
                    }
                    inputVariant="standard"
                    type="text"
                    autoOk={false}
                    format="dd/MM/yyyy hh:mm"
                    name={"ngayDatHang"}
                    value={ngayDatHang}
                    invalidDateMessage={t("general.invalidDateFormat")}
                    onChange={(date) =>
                      this.handleDateChange(date, "ngayDatHang")
                    }
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={3} sm={12} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    fullWidth
                    margin="none"
                    id="mui-pickers-date"
                    // label={t("purchaseRequest.requestDate")}
                    label={
                      <span>
                        <span style={{ color: "red" }}></span>
                        {t("Ngày giao hàng")}
                      </span>
                    }
                    inputVariant="standard"
                    type="text"
                    autoOk={false}
                    format="dd/MM/yyyy hh:mm"
                    name={"ngayGiaoHang"}
                    value={ngayGiaoHang}
                    // invalidDateMessage={t("general.invalidDateFormat")}
                    onChange={(date) =>
                      this.handleDateChange(date, "ngayGiaoHang")
                    }
                    minDate={Date(ngayGiaoHang)}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={3} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span>
                      <span style={{ color: "red" }}>*</span>
                      {t("Tổng giá")}
                    </span>
                  }
                  onChange={this.handleChange}
                  type="number"
                  name="tongGia"
                  value={tongGia}
                  validators={["required"]}
                  errorMessages={t("general.required")}
                />
              </Grid>
              <Grid item md={3} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span>
                      <span style={{ color: "red" }}>*</span>
                      {t("Giảm giá")}
                    </span>
                  }
                  onChange={this.handleChange}
                  type="number"
                  name="giamGia"
                  value={giamGia}
                  validators={["required"]}
                  errorMessages={t("general.required")}
                />
              </Grid>
              <Grid item md={3} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span>
                      <span style={{ color: "red" }}>*</span>
                      {t("Thành tiền")}
                    </span>
                  }
                  onChange={this.handleChange}
                  type="number"
                  name="thanhTien"
                  value={thanhTien}
                  validators={["required"]}
                  errorMessages={t("general.required")}
                />
              </Grid>
              <Grid item md={3} sm={12} xs={12}>
                <FormControl fullWidth={true}
                  size="small">
                  <InputLabel htmlFor="gender-simple">{<span className="font"><span style={{ color: "red" }}>*</span>Trạng thái</span>}</InputLabel>
                  <Select
                    value={trangThai}
                    onChange={trangThai => this.handleChange(trangThai, "trangThai")}
                    inputProps={{
                      name: "trangThai",
                      id: "trangThai-simple"
                    }}
                  >
                    {this.listStatus.map(item => {
                      return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Button
                  size="small"
                  style={{ float: "right" }}
                  className=" mt-16"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.setState({ shouldOpenSelectAgencyPopup: true });
                  }}
                >
                  {t("general.select")}
                </Button>
                <TextValidator
                  InputLabelProps={{ shrink: true }}
                  label={
                    <span>
                      <span style={{ color: "red" }}></span>
                      {t("Nhân viên")}
                    </span>
                  }
                  style={{ width: "80%" }}
                  value={
                    this.state.nguoiBan != null
                      ? this.state.nguoiBan.displayName
                      : ""
                  }
                />

                {this.state.shouldOpenSelectAgencyPopup && (
                  <SelectNhanVienPopup
                    open={this.state.shouldOpenSelectAgencyPopup}
                    handleSelect={this.handleSelectAgency}
                    selectedItem={
                      this.state.agency != null ? this.state.agency : {}
                    }
                    handleClose={this.handleDialogClose}
                    t={t}
                    i18n={i18n}
                  />
                )}
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span>
                      <span style={{ color: "red" }}></span>
                      {t("Ghi chú")}
                    </span>
                  }
                  onChange={this.handleChange}
                  type="text"
                  name="ghiChu"
                  value={ghiChu}
                />
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <Button
                  className=" mt-10 mb-10"
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() =>
                    this.setState({
                      shouldOpenMultipleDialog: true,
                      item: {},
                    })
                  }
                >
                  {t("general.select")}
                </Button>
              </Grid>
              {this.state.shouldOpenMultipleDialog && (
                <MultipleProduct
                  open={this.state.shouldOpenMultipleDialog}
                  selected={this.state.sanPhamDonHang}
                  handleSelect={this.handleSelectSP}
                  handleClose={this.handleDialogCancel}
                  t={t}
                  i18n={i18n}
                />
              )}
              <Grid item sm={12} xs="12" className="mt-10">
                <MaterialTable
                  data={
                    this.state.sanPhamDonHang ? this.state.sanPhamDonHang : []
                  }
                  columns={columns}
                  options={{
                    selection: false,
                    actionsColumnIndex: 0,
                    paging: false,
                    search: false,
                    rowStyle: (rowData) => ({
                      backgroundColor:
                        rowData.tableData.id % 2 === 1 ? "#EEE" : "#FFF",
                    }),
                    maxBodyHeight: "253px",
                    minBodyHeight: "253px",
                    headerStyle: {
                      backgroundColor: "#358600",
                      color: "#fff",
                    },
                    padding: "dense",
                    toolbar: false,
                  }}
                  components={{
                    Toolbar: (props) => <MTableToolbar {...props} />,
                  }}
                  onSelectionChange={(rows) => {
                    this.data = rows;
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <div className="flex flex-space-between flex-middle">
              <Button
                className="mr-12"
                variant="contained"
                color="secondary"
                onClick={() => this.props.handleClose()}
              >
                {t("general.cancel")}
              </Button>
              <Button
                variant="contained"
                className="mr-12"
                color="primary"
                type="submit"
              >
                {t("general.save")}
              </Button>
            </div>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default DonHangEditorDialog;
