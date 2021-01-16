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
} from "./SanPhamService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditorForm from "./EditorForm";
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
    agency:null,
    user:null,
  };

  handleDialogClose = () => {
    this.setState({ shouldOpenNotificationPopup: false,
                    shouldOpenSelectUserPopup:false,
                    shouldOpenSelectAgencyPopup: false,
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
    this.setState({...item});
  }
  handleSelectUser =(item)=>{
      this.setState({user:item ? item : null,shouldOpenSelectUserPopup: false, })
  }
  handleSelectAgency =(item) =>{
    this.setState({agency:item ? item : null,shouldOpenSelectAgencyPopup: false, })
  }
  render() {
    let {
      id,
      maSP,
      tenSP,
      description,
      shouldOpenNotificationPopup,
    } = this.state;
    let { open, handleClose, handleOKEditClose, t, i18n } = this.props;
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
              <Grid item sm={12} xs={12}>
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

              <Grid item sm={12} xs={12}>
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
              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>*</span>
                      {t("Giá Bán")}
                    </span>
                  }
                  onChange={this.handleChange}
                  type="text"
                  name="giaBanHienThoi"
                  value={this.state.giaBanHienThoi}
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <Button
                  size="small"
                  style={{ float: "right" }}
                  className=" mt-16"
                  variant="contained"
                  color="primary"
                  onClick={()=>{
                      this.setState({shouldOpenSelectAgencyPopup:true})
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
                      {t("Đơn vị tính")}
                    </span>
                  }
                  // className="w-80"
                  style ={{width: "80%"}}
                  value={
                    this.state.agency != null ? this.state.agency.name : ""
                  }
                />

                {this.state.shouldOpenSelectAgencyPopup && (
                  <SelectAgencyPopup
                    open={this.state.shouldOpenSelectAgencyPopup}
                    handleSelect={this.handleSelectAgency}
                    selectedItem={
                      this.state.agency != null
                        ? this.state.agency
                        : {}
                    }
                    handleClose={this.handleDialogClose}
                    t={t}
                    i18n={i18n}
                  />
                )}
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
