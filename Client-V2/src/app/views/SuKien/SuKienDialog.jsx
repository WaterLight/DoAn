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
import {
    saveItem,
    addItem,
    updateItem
} from "./SuKienService";
import MaterialTable, {
    MTableToolbar,
    Chip,
    MTableBody,
    MTableHeader,
} from "material-table";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectMultiProductsPopup from "../Component/Product/SelectMultiProductsPopup";
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
class SuKienDialog extends Component {
    state = {
        id: "",
        tieuDe: "",
        tieuDePhu: "",
        tomTat: "",
        noiDung: "",
        phanTramGiamGia: "",
        tienGiamGia: "",
        ngayBatDau: new Date(),
        ngayKetThuc: null,
        lstProduct: [],
        sanPham: [],
        danhMucSanPham: [],
        shouldOpenNotificationPopup: false,
        Notification: "",
        shouldOpenMultipleChoiseProductDialog: false,
    };

    handleDialogClose = () => {
        this.setState({
            shouldOpenNotificationPopup: false,
            shouldOpenMultipleChoiseProductDialog: false,
        });
    };
    handleMultipleChoiseProductDialogClose = () => {
        this.setState({
            shouldOpenMultipleChoiseProductDialog: false,
        });
    };
    handleDialogCancel = () => {
        this.setState({
            shouldOpenMultipleChoiseProductDialog: false,
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
        let { id,ngayKetThuc,ngayBatDau } = this.state;
        var { t } = this.props;
        if(!ngayKetThuc){
            toast.warning("Thời gian kết thúc không được để trống!");
            return;
        }
        if(!id && ngayBatDau && ngayKetThuc){
            if(ngayBatDau.getTime() > ngayKetThuc.getTime()){
                toast.warning("Thời gian bắt đầu diễn ra sự kiện không được lớn hơn thời gian kết thúc!");
                return;
            }
        }else{
            if(ngayBatDau > ngayKetThuc){
                toast.warning("Thời gian bắt đầu diễn ra sự kiện không được lớn hơn thời gian kết thúc!");
                return;
            }
        }
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
    };

    componentWillMount() {
        //getUserById(this.props.uid).then(data => this.setState({ ...data.data }));
        let { open, handleClose, item } = this.props;
        this.setState({ ...item });
    }
    handleSelectAgency = (item) => {
        this.setState({
            nguoiNhap: item ? item : null,
        });
    };
    handleChangeSL = (item, e) => {
        let { sanPham } = this.state;
        if (sanPham == null) {
            sanPham = [];
            let p = {};
            p.sanPham = item;
            p.soluong = e.target.value;
            sanPham.push(p);
        }
        if (sanPham != null && sanPham.length > 0) {
            sanPham.forEach((el) => {
                if (el.sanPham.id == item.sanPham.id) {
                    // let p ={}
                    el.soLuong = e.target.value;
                }
            });
        }
        this.setState({ sanPham: sanPham });
    };
    //
    handleChangeGia = (item, e) => {
        let { sanPham } = this.state;
        if (sanPham == null) {
            sanPham = [];
            let p = {};
            p.sanPham = item;
            p.gia = e.target.value;
            sanPham.push(p);
        }
        if (sanPham != null && sanPham.length > 0) {
            sanPham.forEach((el) => {
                if (el.sanPham.id == item.sanPham.id) {
                    // let p ={}
                    el.gia = e.target.value;
                }
            });
        }
        this.setState({ sanPham: sanPham }, () => {
            console.log(this.state.sanPham);
        });
    };
    handleSelectSP = (item) => {
        let data = item.map((row) => ({ ...row, tableData: { checked: false } }));
        this.setState({ sanPham: data }, () => {
            console.log(this.state.sanPham);
        });
        this.handleDialogCancel();
    };

    handleDateChange = (date, name) => {
        this.setState({
            [name]: date,
        });
    };
    render() {
        let { id, tieuDe, tieuDePhu, tomTat, noiDung, phanTramGiamGia, tienGiamGia, ngayBatDau, ngayKetThuc, lstProduct, sanPham, danhMucSanPham, shouldOpenMultipleChoiseProductDialog } = this.state;

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
                                sanPham.map((pro, index) => {
                                    if (pro.sanPham.maSP === rowData.sanPham.maSP) {
                                        sanPham.splice(index, 1);
                                    }
                                });
                                this.setState({ sanPham: sanPham });
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
                        className="w-100 mt-8"
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
                        className="w-100 mt-8"
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
                    <span className="">{id ? t("general.update") : t("general.addNew")}</span>
                </DialogTitle>
                <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
                    <DialogContent>
                        <Grid className="" container spacing={2}>
                            <Grid item sm={12} xs={12}>
                                <TextValidator
                                    className="w-100 mt-8"
                                    label={
                                        <span>
                                            <span style={{ color: "red" }}>*</span>
                                        Tiêu đề
                                        </span>
                                    }
                                    onChange={this.handleChange}
                                    type="text"
                                    name="tieuDe"
                                    value={tieuDe}
                                    validators={["required"]}
                                    errorMessages={[t("general.required")]}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12}>
                                <TextValidator
                                    className="w-100 mt-8"
                                    label={
                                        <span>
                                            Tiêu đề phụ
                                        </span>
                                    }
                                    onChange={this.handleChange}
                                    type="text"
                                    name="tieuDePhu"
                                    value={tieuDePhu}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12}>
                                <TextValidator
                                    className="w-100 mt-8"
                                    label={
                                        <span>
                                            <span style={{ color: "red" }}>*</span>
                                        Tóm tắt
                                        </span>
                                    }
                                    onChange={this.handleChange}
                                    type="text"
                                    name="tomTat"
                                    value={tomTat}
                                    validators={["required"]}
                                    errorMessages={[t("general.required")]}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12}>
                                <TextValidator
                                    className="w-100 mt-8"
                                    label={
                                        <span>
                                            <span style={{ color: "red" }}>*</span>
                                        Nội dung
                                        </span>
                                    }
                                    onChange={this.handleChange}
                                    type="text"
                                    name="noiDung"
                                    value={noiDung}
                                    validators={["required"]}
                                    errorMessages={[t("general.required")]}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextValidator
                                    className="w-100 mt-8"
                                    label={
                                        <span>
                                            Phần trăm giảm giá
                                        </span>
                                    }
                                    onChange={this.handleChange}
                                    type="text"
                                    name="phanTramGiamGia"
                                    value={phanTramGiamGia}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <TextValidator
                                    className="w-100 mt-8"
                                    label={
                                        <span>
                                            <span style={{ color: "red" }}>*</span>
                                            Số tiền giảm giá
                                        </span>
                                    }
                                    onChange={this.handleChange}
                                    type="number"
                                    name="tienGiamGia"
                                    value={tienGiamGia}
                                    validators={["required"]}
                                    errorMessages={[t("general.required")]}
                                />
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <span style={{ color: "red" }}>*</span>
                                    <KeyboardDatePicker
                                        margin="none"
                                        fullWidth
                                        id="date-picker-dialog mt-2"
                                        label={t("Ngày bắt đầu")}
                                        format="dd/MM/yyyy"
                                        value={ngayBatDau}
                                        onChange={(date) => this.handleDateChange(date, "ngayBatDau")}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                        invalidDateMessage={t("general.invalidDateFormat")}
                                        validators={["required"]}
                                        errorMessages={[t("general.required")]}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                    <span style={{ color: "red" }}>*</span>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            margin="none"
                                            fullWidth
                                            id="date-picker-dialog mt-2"
                                            label={t("Ngày kết thúc")}
                                            format="dd/MM/yyyy"
                                            value={ngayKetThuc}
                                            onChange={(date) => this.handleDateChange(date, "ngayKetThuc")}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date",
                                            }}
                                            invalidDateMessage={t("general.invalidDateFormat")}
                                            validators={["required"]}
                                            errorMessages={[t("general.required")]}
                                        />
                                    </MuiPickersUtilsProvider>
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

export default SuKienDialog;
