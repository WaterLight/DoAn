import React, { Component } from "react";
import ConstantList from "../../appConfig";
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
  Fab,
  Card,
} from "@material-ui/core";
// import Paper from '@material-ui/core/Paper'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Draggable from "react-draggable";
import NotificationPopup from "../Component/NotificationPopup/NotificationPopup";
import SelectUserPopup from "./SelectUserPopup";
import SelectAgencyPopup from "./SelectAgencyPopup";
import {
  saveItem,
  addItem,
  updateItem,
  checkCode,
  uploadImage,
} from "./SanPhamService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditorForm from "./EditorForm";
import DanhMucSanPham from "./DanhMucSanPham";
import AsynchronousAutocomplete from "../utilities/AsynchronousAutocomplete";
import {searchByPage as searchByPageSize} from '../ThuocTinhSanPham/ThuocTinhSanPhamService'
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

class AgentDialog extends Component {
  state = {
    id: "",
    name: "",
    code: "",
    description: "",
    type: "",
    shouldOpenNotificationPopup: false,
    Notification: "",
    shouldOpenSelectUserPopup: false,
    SelectAgencyPopup: false,
    agency: null,
    user: null,
    shouldOpenFileBrowserDialog: false,
    imageUrl: "",
    noteAvatarImage: "",
    files: [],
    shouldOpenSelectDMPopup: false,
    size: null
  };

  handleDialogClose = () => {
    this.setState({
      shouldOpenNotificationPopup: false,
      shouldOpenSelectUserPopup: false,
      shouldOpenSelectAgencyPopup: false,
      shouldOpenSelectDMPopup: false,
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
    let { maSP } = this.state;
    var { t } = this.props;
    checkCode(id, maSP).then((result) => {
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
  handleChangeContent = (content) => {
    this.setState({ baiViet: content });
  };
  componentWillMount() {
    //getUserById(this.props.uid).then(data => this.setState({ ...data.data }));
    let { open, handleClose, item } = this.props;
    this.setState({ ...item });
  }
  handleSelectUser = (item) => {
    this.setState({
      user: item ? item : null,
      shouldOpenSelectUserPopup: false,
    });
  };
  handleSelectAgency = (item) => {
    this.setState({
      donViTinh: item ? item : null,
      shouldOpenSelectAgencyPopup: false,
    });
  };
  handleSelectDM = (item) => {
    this.setState({
      danhMucSanPham: item ? item : null,
      shouldOpenSelectDMPopup: false,
    });
  };
  handleFileBrowserDialogClose = () => {
    this.setState({ shouldOpenFileBrowserDialog: false });
  };

  handleFileSelect = (event) => {
    event.preventDefault();
    let files = event.target.files;
    let file = files[0];
    let list = [];
    console.log(file);
    if (
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/png"
    ) {
      toast.error("File incorrect format!");
    } else {
      if (file.size >= 7097152) {
        toast.error("File can't be larger than 7mb!");
      } else {
        for (const iterator of files) {
          list.push({
            file: iterator,
            uploading: false,
            error: false,
            progress: 0,
          });
        }
        this.setState(
          {
            files: list,
          },
          () => {
            let file = this.state.files[0];
            console.log(file.file);
            //alert(file);
            const formData = new FormData();
            if (file) {
              formData.append("uploadfile", file.file);
              uploadImage(formData).then(({ data }) => {
                this.setState({ imageUrl: data.name });
              });
            }
          }
        );
      }
    }
  };
  uploadSingleFile = (index) => {
    let allFiles = [...this.state.files];
    let file = this.state.files[index];

    allFiles[index] = { ...file, uploading: true, error: false };

    this.setState({
      files: [...allFiles],
    });
    const formData = new FormData();
    formData.append("uploadfile", file.file);
    if (file) {
      uploadImage(formData).then(({ data }) => {
        this.setState({ imageUrl: data.name });
      });
    }
  };
  getImageNameAndType = (name) => {
    if (name) {
      // debugger
      return name.split(".")[0] + "/" + name.split(".")[1];
    }
    return "";
  };

  selectSize = (item) => {
    this.setState({ size: item }, function () {});
  };

  render() {
    let {
      id,
      maSP,
      tenSP,
      description,
      shouldOpenNotificationPopup,
      imageUrl,
      files,
      noteAvatarImage,
      size
    } = this.state;
    let { open, handleClose, handleOKEditClose, t, i18n } = this.props;
    let searchObject = { keyword: "", pageIndex: 0, pageSize: 10000, thuocTinhSanPhamType: ConstantList.THUOCTINHSANPHAM_TYPE.size };
    let isEmpty = files.length === 0;
    if (imageUrl) {
      isEmpty = false;
    }
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
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                className={"container-create-category mt-16"}
              >
                <Grid item xs={12} sm={12} md={10}>
                  <div className="flex flex-wrap mb-16">
                    <label htmlFor="upload-single-file" className="w-100">
                      <Fab
                        className="capitalize"
                        color="secondary"
                        component="span"
                        variant="extended"
                        size="small"
                      >
                        <div className="flex flex-middle ">
                          <Icon className="pr-8">cloud_upload</Icon>
                          <span>Chọn ảnh đại diện</span>
                        </div>
                      </Fab>
                    </label>
                    <input
                      className="display-none"
                      onChange={this.handleFileSelect}
                      id="upload-single-file"
                      type="file"
                    />
                  </div>
                </Grid>
                <Grid
                  xs={12}
                  sm={12}
                  md={12}
                  className={"custom-image-article mb-16"}
                >
                  {!isEmpty && (
                    <span>
                      <Card className="" elevation={2}>
                        {/* {isEmpty && <p className="px-16 py-16">Que is empty</p>} */}
                        {/* var imageUrl = ConstantList.API_ENPOINT+"/public/file/downloadbyid/"+result.data.id; */}
                        <img
                          className="custom-image"
                          src={
                            ConstantList.API_ENPOINT +
                            "/public/getImage/" +
                            this.getImageNameAndType(imageUrl)
                          }
                        />
                      </Card>
                      <TextValidator
                        size="small"
                        className="w-100 mb-16 mt-16"
                        label={t("general.noteAvatarImage")}
                        onChange={this.handleChange}
                        type="text"
                        name="noteAvatarImage"
                        value={noteAvatarImage}
                        variant="outlined"
                        size="small"
                      />
                    </span>
                  )}
                </Grid>
              </Grid>
              <Grid item sm={12} xs={12} md={4}>
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
                  name="tenSP"
                  value={tenSP}
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                />
              </Grid>

              <Grid item sm={12} xs={12} md={4}>
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
                  name="maSP"
                  value={maSP}
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                />
              </Grid>
              <Grid item sm={12} xs={12} md={4}>
                <TextValidator
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>*</span>
                      {t("Giá Bán")}
                    </span>
                  }
                  onChange={this.handleChange}
                  type="number"
                  name="giaBanHienThoi"
                  value={this.state.giaBanHienThoi}
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                />
              </Grid>
              <Grid item sm={12} xs={12} md={6}>
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
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  label={
                    <span>
                      <span style={{ color: "red" }}></span>
                      {t("Đơn vị tính")}
                    </span>
                  }
                  style={{ width: "70%" }}
                  value={
                    this.state.donViTinh != null ? this.state.donViTinh.ten : ""
                  }
                />

                {this.state.shouldOpenSelectAgencyPopup && (
                  <SelectAgencyPopup
                    open={this.state.shouldOpenSelectAgencyPopup}
                    handleSelect={this.handleSelectAgency}
                    selectedItem={
                      this.state.donViTinh != null ? this.state.donViTinh : {}
                    }
                    handleClose={this.handleDialogClose}
                    t={t}
                    i18n={i18n}
                  />
                )}
              </Grid>
              <Grid item sm={12} xs={12} md={6}>
                <Button
                  size="small"
                  style={{ float: "right" }}
                  className=" mt-16"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    this.setState({ shouldOpenSelectDMPopup: true });
                  }}
                >
                  {t("general.select")}
                </Button>
                <TextValidator
                  size="small"
                  InputLabelProps={{ shrink: true }}
                  // InputProps={{
                  //   readOnly: true,
                  // }}
                  label={
                    <span>
                      <span style={{ color: "red" }}></span>
                      {t("Danh mục sản phẩm")}
                    </span>
                  }
                  // className="w-80"
                  style={{ width: "70%" }}
                  value={
                    this.state.danhMucSanPham != null
                      ? this.state.danhMucSanPham.ten
                      : ""
                  }
                />

                {this.state.shouldOpenSelectDMPopup && (
                  <DanhMucSanPham
                    open={this.state.shouldOpenSelectDMPopup}
                    handleSelect={this.handleSelectDM}
                    selectedItem={
                      this.state.danhMucSanPham != null
                        ? this.state.danhMucSanPham
                        : {}
                    }
                    handleClose={this.handleDialogClose}
                    t={t}
                    i18n={i18n}
                  />
                )}
              </Grid>
              <Grid className="" item md={12} sm={12} xs={12}>
                <AsynchronousAutocomplete
                  label={
                    <span>
                      <span style={{ color: "red" }}>* </span>{" "}
                      <span> {t("Kích thước")}</span>
                    </span>
                  }
                  multiple = {true}
                  searchFunction={searchByPageSize}
                  searchObject={searchObject}
                  defaultValue={size}
                  displayLable={"ten"}
                  value={size}
                  onSelect={this.selectSize}
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                />
              </Grid>

              <Grid item sm={12} xs={12}>
                <EditorForm
                  content={this.state.baiViet ? this.state.baiViet : ""}
                  handleChangeContent={this.handleChangeContent}
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

export default AgentDialog;
