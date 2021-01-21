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
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
// import Paper from '@material-ui/core/Paper'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Draggable from "react-draggable";
import NotificationPopup from "../Component/NotificationPopup/NotificationPopup";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  DateTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { addNewUrbanArea, updateUrbanArea, checkCode } from "./NhanVienService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

class UrbanAreaDialog extends Component {
  state = {
    id: "",
    maNV: "",
    type: "",
    name: "",
    staffCode: "",
    firstName: "",
    lastName: "",
    birthDate: new Date(),
    birthPlaceame: "",
    displayName: "",
    phoneNumber: "",
    userName: null,
    email: "",
    gender: "",
    description: "",
    type: "",
    shouldOpenNotificationPopup: false,
    Notification: "",
  };

  listGender = [
    { id: "M", name: "Nam" },
    { id: "F", name: "Nữ" },
    { id: "U", name: "Không rõ" },
  ];

  handleDialogClose = () => {
    this.setState({ shouldOpenNotificationPopup: false });
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
    let { maNV } = this.state;
    var { t } = this.props;
    checkCode(id, maNV).then((result) => {
      //Nếu trả về true là code đã được sử dụng
      if (result.data) {
        toast.warning(t("general.dupli_code"));

        // alert("Code đã được sử dụng");
      } else {
        //Nếu trả về false là code chưa sử dụng có thể dùng
        if (id) {
          updateUrbanArea({
            ...this.state,
          }).then(() => {
            toast.success(t("general.updateSuccess"));
            this.props.handleOKEditClose();
          });
        } else {
          addNewUrbanArea({
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
    this.setState(item);
  }

  handleDateChange = (date, name) => {
    this.setState({
      [name]: date
    });
  };

  render() {
    let {
      id,
      maNV,
      type,
      displayName,
      gender,
      birthDate,
      phoneNumber,
      email,
      staffCode,
      description,
      shouldOpenNotificationPopup,
    } = this.state;
    let { open, handleClose, handleOKEditClose, t, i18n } = this.props;
    return (
      <Dialog
        open={open}
        PaperComponent={PaperComponent}
        maxWidth="sm"
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
            <Grid className=" w-100" container spacing={2}>
              <Grid item sm={5} xs={12}>
                <TextValidator
                  className=" w-100"
                  label={
                    <span>
                      <span style={{ color: "red" }}>*</span>
                      {t("staff.displayName")}
                    </span>
                  }
                  onChange={this.handleChange}
                  type="text"
                  name="displayName"
                  value={displayName}
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="gender-simple">
                    {t("staff.gender")}
                  </InputLabel>
                  <Select
                    value={gender}
                    onChange={(gender) => this.handleChange(gender, "gender")}
                    inputProps={{
                      name: "gender",
                      id: "gender-simple",
                    }}
                  >
                    {this.listGender.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={4} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="none"
                    fullWidth
                    id="date-picker-dialog mt-2"
                    // style={{marginTop:'2px'}}
                    label={t("staff.birthDate")}
                    format="dd/MM/yyyy"
                    value={birthDate}
                    onChange={(date) =>
                      this.handleDateChange(date, "birthDate")
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    invalidDateMessage={t("general.invalidDateFormat")}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item sm={3} xs={12}>
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
                  name="maNV"
                  value={maNV}
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
                />
              </Grid>
              <Grid item sm={3} xs={12}>
                <TextValidator
                  className=" w-100"
                  label={
                    <span>
                      <span style={{ color: "red" }}>*</span>
                      {t("staff.phoneNumber")}
                    </span>
                  }
                  onChange={this.handleChange}
                  type="text"
                  name="phoneNumber"
                  value={phoneNumber}
                  validators={["required", "minNumber:0"]}
                  errorMessages={[
                    t("general.required"),
                    t("general.invalidFormat"),
                  ]}
                />
              </Grid>
              <Grid item sm={4} xs={12}>
                <TextValidator
                  className=" w-100"
                  label={
                    <span>
                      <span style={{ color: "red" }}>*</span>
                      {t("staff.email")}
                    </span>
                  }
                  onChange={this.handleChange}
                  type="text"
                  name="email"
                  value={email}
                  validators={["required", "isEmail"]}
                  errorMessages={[t("general.required"), t("general.invalidFormat"),]}
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                <TextValidator
                  className="w-100 "
                  label={
                    <span>
                      <span style={{ color: "red" }}>*</span>
                      {t("Loại")}
                    </span>
                  }
                  onChange={this.handleChange}
                  type="number"
                  name="type"
                  value={type}
                  validators={["required"]}
                  errorMessages={[t("general.required")]}
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

export default UrbanAreaDialog;
