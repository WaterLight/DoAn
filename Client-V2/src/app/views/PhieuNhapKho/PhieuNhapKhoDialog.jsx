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
} from "@material-ui/core";
// import Paper from '@material-ui/core/Paper'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Draggable from "react-draggable";
import NotificationPopup from "../Component/NotificationPopup/NotificationPopup";
import ChonKho from "./ChonKhoNhap";
import ChonNhanVien from "./ChonNhanVien";
import {
  saveItem,
  addItem,
  updateItem,
  checkCode,
} from "./PhieuNhapKhoService";
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader,
} from "material-table";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MultipleProduct from "./MultipleProduct";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

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
class PhieuNhapKhoDialog extends Component {
  state = {
    id: "",
    name: "",
    code: "",
    description: "",
    type: "",
    ngayNhap: new Date(),
    shouldOpenNotificationPopup: false,
    Notification: "",
    shouldOpenChonKho: false,
    ChonNhanVien: false,
    agency: null,
    user: null,
    shouldOpenMultipleDialog: false,
  };

  handleDialogClose = () => {
    this.setState({
      shouldOpenNotificationPopup: false,
      shouldOpenChonKho: false,
      shouldOpenChonNhanVien: false,
      shouldOpenMultipleDialog: false,
    });
  };
  handleDialogCancel = () => {
    this.setState({
      shouldOpenMultipleDialog: false,
    });
  };
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
    let { ma } = this.state;
    var { t } = this.props;
    checkCode(id, ma).then((result) => {
      //Nếu trả về true là code đã được sử dụng
      if (result.data) {
        toast.warning(t("general.dupli_code"));
        // alert("Code đã được sử dụng");
      } else {
        //Nếu trả về false là code chưa sử dụng có thể dùng
        if (id) {
          updateItem({
            ...this.state,
          }).then(() => {
            toast.success(t("general.updateSuccess"));
            this.props.handleOKEditClose();
          });
        } else {
          saveItem({
            ...this.state,
          }).then(() => {
            toast.success(t("general.addSuccess"));
            this.props.handleOKEditClose();
          });
        }
      }
    });
  };

  componentWillMount() {
    //getUserById(this.props.uid).then(data => this.setState({ ...data.data }));
    let { open, handleClose, item } = this.props;
    this.setState({ ...item });
  }
  handleSelectUser = (item) => {
    this.setState({ kho: item ? item : null, shouldOpenChonKho: false });
  };
  handleSelectAgency = (item) => {
    this.setState({
      nguoiNhap: item ? item : null,
      shouldOpenChonNhanVien: false,
    });
  };
  handleChangeSL = (item, e) => {
    let { sanPhamPhieuNhap } = this.state;
    if (sanPhamPhieuNhap == null) {
      sanPhamPhieuNhap = [];
      let p = {};
      p.sanPham = item;
      p.soluong = e.target.value;
      sanPhamPhieuNhap.push(p);
    }
    if (sanPhamPhieuNhap != null && sanPhamPhieuNhap.length > 0) {
      sanPhamPhieuNhap.forEach((el) => {
        if (el.sanPham.id == item.sanPham.id) {
          // let p ={}
          el.soLuong = e.target.value;
        }
      });
    }
    this.setState({ sanPhamPhieuNhap: sanPhamPhieuNhap });
  };
  //
  handleChangeGia = (item, e) => {
    let { sanPhamPhieuNhap } = this.state;
    if (sanPhamPhieuNhap == null) {
      sanPhamPhieuNhap = [];
      let p = {};
      p.sanPham = item;
      p.gia = e.target.value;
      sanPhamPhieuNhap.push(p);
    }
    if (sanPhamPhieuNhap != null && sanPhamPhieuNhap.length > 0) {
      sanPhamPhieuNhap.forEach((el) => {
        if (el.sanPham.id == item.sanPham.id) {
          // let p ={}
          el.gia = e.target.value;
        }
      });
    }
    this.setState({ sanPhamPhieuNhap: sanPhamPhieuNhap }, () => {
      console.log(this.state.sanPhamPhieuNhap);
    });
  };
  handleSelectSP = (item) => {
    let data = item.map((row) => ({ ...row, tableData: { checked: false } }));
    this.setState({ sanPhamPhieuNhap: data }, () => {
      console.log(this.state.sanPhamPhieuNhap);
    });
    this.handleDialogCancel();
  };
  handleDateChange = (date, name) => {
    this.setState({
      [name]: date,
    });
  };
  render() {
    let { id, ma, ten, description, sanPhamPhieuNhap, ngayNhap } = this.state;

    let { open, handleClose, handleOKEditClose, t, i18n } = this.props;

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
                sanPhamPhieuNhap.map((pro, index) => {
                  if (pro.sanPham.maSP === rowData.sanPham.maSP) {
                    sanPhamPhieuNhap.splice(index, 1);
                  }
                });
                this.setState({ sanPhamPhieuNhap: sanPhamPhieuNhap });
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
        title: t("Số lượng"),
        field: "code",
        align: "left",
        render: (row) => (
          <TextValidator
            className="w-100 "
            onChange={(e) => this.handleChangeSL(row, e)}
            type="number"
            value={row.soLuong}
            validators={["required"]}
            errorMessages={[t("general.required")]}
          />
        ),
      },
      {
        title: t("Giá"),
        field: "code",
        align: "left",
        render: (row) => (
          <TextValidator
            className="w-100 "
            onChange={(e) => this.handleChangeGia(row, e)}
            type="number"
            value={row.gia}
            validators={["required"]}
            errorMessages={[t("general.required")]}
          />
        ),
      },
    ];
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
          <h4 className="">{id ? t("general.update") : t("general.addNew")}</h4>
        </DialogTitle>

        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
          <DialogContent>
            <Grid className="" container spacing={2}>
              <Grid item sm={4} xs={12}>
                <TextValidator
                  className="w-100 "
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
                  errorMessages={[t("general.required")]}
                />
              </Grid>

              <Grid item sm={4} xs={12}>
                <TextValidator
                  className="w-100 "
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
                  errorMessages={[t("general.required")]}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="none"
                    fullWidth
                    id="date-picker-dialog mt-2"
                    // style={{marginTop:'2px'}}
                    label={t("Ngày nhập")}
                    format="dd/MM/yyyy"
                    value={ngayNhap}
                    onChange={(date) => this.handleDateChange(date, "ngayNhap")}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    invalidDateMessage={t("general.invalidDateFormat")}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item sm={6} xs={12}>
                <Button
                  size="small"
                  style={{ float: "right" }}
                  className=" mt-16"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.setState({ shouldOpenChonNhanVien: true });
                  }}
                >
                  {t("general.select")}
                </Button>
                <TextValidator
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                  label={
                    <span>
                      <span style={{ color: "red" }}></span>
                      {t("Người nhập")}
                    </span>
                  }
                  // className="w-80"
                  style={{ width: "80%" }}
                  value={
                    this.state.nguoiNhap != null
                      ? this.state.nguoiNhap.displayName
                      : ""
                  }
                />

                {this.state.shouldOpenChonNhanVien && (
                  <ChonNhanVien
                    open={this.state.shouldOpenChonNhanVien}
                    handleSelect={this.handleSelectAgency}
                    selectedItem={
                      this.state.nguoiNhap != null ? this.state.nguoiNhap : {}
                    }
                    handleClose={this.handleDialogClose}
                    t={t}
                    i18n={i18n}
                  />
                )}
              </Grid>
              <Grid item sm={6} xs={12}>
                <Button
                  size="small"
                  style={{ float: "right" }}
                  className=" mt-16"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.setState({ shouldOpenChonKho: true });
                  }}
                >
                  {t("general.select")}
                </Button>
                <TextValidator
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    readOnly: true,
                  }}
                  label={
                    <span>
                      <span style={{ color: "red" }}></span>
                      {t("Kho")}
                    </span>
                  }
                  // className="w-80"
                  style={{ width: "80%" }}
                  value={this.state.kho != null ? this.state.kho.tenKho : ""}
                />

                {this.state.shouldOpenChonKho && (
                  <ChonKho
                    open={this.state.shouldOpenChonKho}
                    handleSelect={this.handleSelectUser}
                    selectedItem={this.state.kho != null ? this.state.kho : {}}
                    handleClose={this.handleDialogClose}
                    t={t}
                    i18n={i18n}
                  />
                )}

                {this.state.shouldOpenMultipleDialog && (
                  <MultipleProduct
                    open={this.state.shouldOpenMultipleDialog}
                    selected={this.state.sanPhamPhieuNhap}
                    handleSelect={this.handleSelectSP}
                    handleClose={this.handleDialogCancel}
                    t={t}
                    i18n={i18n}
                    khoId={this.state.kho ? this.state.kho.id : ""}
                  />
                )}
              </Grid>
              <Grid item sm={5} xs="12">
                <Button
                  className=" mt-10 mb-10"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.setState({
                      shouldOpenMultipleDialog: true,
                      item: {},
                    });
                  }}
                >
                  {t("general.select")}
                </Button>
              </Grid>
              <Grid item sm={12} xs="12" className="mt-10">
                <MaterialTable
                  data={
                    this.state.sanPhamPhieuNhap
                      ? this.state.sanPhamPhieuNhap
                      : []
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
            <div className="flex flex-space-between flex-middle mt-12">
              <Button
                variant="contained"
                className="mr-12"
                color="secondary"
                onClick={() => this.props.handleClose()}
              >
                {t("general.cancel")}
              </Button>
              <Button
                variant="contained"
                style={{ marginRight: "15px" }}
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

export default PhieuNhapKhoDialog;
