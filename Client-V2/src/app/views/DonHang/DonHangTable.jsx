import React, { Component } from "react";
import {
  Grid,
  IconButton,
  Icon,
  TablePagination,
  Button,
  TextField,
  FormControl,
  Input,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader,
} from "material-table";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import shortid from "shortid";
import { saveAs } from "file-saver";
import { Helmet } from "react-helmet";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
import NotificationPopup from "../Component/NotificationPopup/NotificationPopup";
import { isThisSecond } from "date-fns/esm";
import RealEstateSourceDialog from "./DonHangEditorDialog";
import {
  getAllSource,
  getSourceById,
  deleteSource,
  searchByPage,
} from "./DonHangService";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

toast.configure({
  autoClose: 2000,
  draggable: false,
  limit: 3,
});

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
    marginLeft: "-1.5em",
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
        PopperProps={{
          popperOptions: {
            modifiers: { offset: { enabled: true, offset: "10px, 0px" } },
          },
        }}
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
        PopperProps={{
          popperOptions: {
            modifiers: { offset: { enabled: true, offset: "10px, 0px" } },
          },
        }}
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

class RealEstateSourceTable extends React.Component {
  state = {
    keyword: "",
    rowsPerPage: 10,
    page: 0,
    MaintainRequestStatus: [],
    item: {},
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    selectAllItem: false,
    selectedList: [],
    totalElements: 0,
    shouldOpenConfirmationDeleteAllDialog: false,
    shouldOpenConfirmationDeleteListDialog: false,
    shouldOpenNotificationPopup: false,
    Notification: "",
    orderStatus: null,
    listStatus: [
      { id: 1, name: "Đơn hàng mới" },
      { id: 2, name: "Đơn hàng đã xác nhận" },
      { id: 3, name: "Đơn hàng đã thanh toán" },
      { id: 4, name: "Đơn hàng đã hủy" }
    ]
  };
  numSelected = 0;
  rowCount = 0;

  handleTextChange = (event) => {
    this.setState({ keyword: event.target.value }, function () { });
  };

  handleKeyDownEnterSearch = (e) => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  setPage = (page) => {
    this.setState({ page }, function () {
      this.updatePageData();
    });
  };

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
      this.updatePageData();
    });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  search() {
    this.setState({ page: 0 }, function () {
      var searchObject = {};
      searchObject.keyword = this.state.keyword;
      searchObject.pageIndex = this.state.page + 1;
      searchObject.pageSize = this.state.rowsPerPage;
      searchByPage(searchObject)
        .then((res) => {
          this.setState({
            itemList: [...res.data.content],
            totalElements: res.data.totalElements,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  checkData = () => {
    let { t } = this.props;
    if (!this.data || this.data.length === 0) {
      toast.warning(t("general.noti_check_data"));
      // this.setState({
      //   shouldOpenNotificationPopup: true,
      //   Notification: "general.noti_check_data",
      // });
    } else if (this.data.length === this.state.itemList.length) {
      this.setState({ shouldOpenConfirmationDeleteAllDialog: true });
    } else {
      this.setState({ shouldOpenConfirmationDeleteListDialog: true });
    }
  };

  updatePageData = () => {
    var searchObject = {};
    if(this.state.orderStatus != null){
      searchObject.statusOrder = this.state.orderStatus;
    }
    searchObject.keyword = this.state.keyword;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    searchByPage(searchObject).then((res) => {
      this.setState({
        itemList: [...res.data.content],
        totalElements: res.data.totalElements,
      });
    });
  };

  handleDownload = () => {
    var blob = new Blob(["Hello, world!"], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "hello world.txt");
  };
  handleDialogClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenConfirmationDeleteAllDialog: false,
      shouldOpenConfirmationDeleteListDialog: false,
      shouldOpenNotificationPopup: false,
    });
  };

  handleOKEditClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
    });
    this.updatePageData();
  };

  handleDeleteMaintainRequestStatus = (id) => {
    this.setState({
      id,
      shouldOpenConfirmationDialog: true,
    });
  };

  handleEditMaintainRequestStatus = (item) => {
    getSourceById(item.id).then((result) => {
      this.setState({
        item: result.data,
        shouldOpenEditorDialog: true,
      });
    });
  };

  handleConfirmationResponse = () => {
    var { t } = this.props;
    console.log(this.state.id);
    console.log(this.state.itemList[this.state.itemList.length - 1].id);
    if (
      this.state.itemList.length % this.state.rowsPerPage === 1 &&
      this.state.itemList.length > 1 &&
      this.state.id === this.state.itemList[this.state.itemList.length - 1].id
    ) {
      var page = this.state.page - 1;
      this.setState({
        page: page,
      });
    }
    deleteSource(this.state.id)
      .then((res) => {
        toast.success(t("general.deleteSuccess"));
        this.handleDialogClose();
        this.updatePageData();
      })
      .catch(() => {
        toast.warning(t("source.warning-delete"));
      });
  };

  componentDidMount() {
    this.updatePageData();
  }

  handleEditItem = (item) => {
    this.setState({
      item: item,
      shouldOpenEditorDialog: true,
    });
  };

  handleClick = (event, item) => {
    let { MaintainRequestStatus } = this.state;
    if (item.checked == null) {
      item.checked = true;
    } else {
      item.checked = !item.checked;
    }
    var selectAllItem = true;
    for (var i = 0; i < MaintainRequestStatus.length; i++) {
      if (
        MaintainRequestStatus[i].checked == null ||
        MaintainRequestStatus[i].checked == false
      ) {
        selectAllItem = false;
      }
      if (MaintainRequestStatus[i].id == item.id) {
        MaintainRequestStatus[i] = item;
      }
    }
    this.setState({
      selectAllItem: selectAllItem,
      MaintainRequestStatus: MaintainRequestStatus,
    });
  };

  handleSelectAllClick = (event) => {
    let { MaintainRequestStatus } = this.state;
    for (var i = 0; i < MaintainRequestStatus.length; i++) {
      MaintainRequestStatus[i].checked = !this.state.selectAllItem;
    }
    this.setState({
      selectAllItem: !this.state.selectAllItem,
      MaintainRequestStatus: MaintainRequestStatus,
    });
  };

  handleDelete = (id) => {
    this.setState({
      id,
      shouldOpenConfirmationDialog: true,
    });
  };

  async handleDeleteList(list) {
    let listAlert = [];
    var { t } = this.props;
    for (var i = 0; i < list.length; i++) {
      // deleteItem(list[i].id)
      try {
        await deleteSource(list[i].id);
      } catch (error) {
        listAlert.push(list[i].name);
      }
    }
    // toast.success(t("general.deleteSuccess"));
    this.handleDialogClose();
    if (listAlert.length === list.length) {
      toast.warning(t("source.use_all"));
      // alert("Các trạng thái đều đã sử dụng");
    } else if (listAlert.length > 0) {
      toast.warning(t("source.deleted_unused"));
      // alert("Đã xoá các trạng thái chưa sử dụng");
    }
  }

  handleDeleteAll = (event) => {
    //alert(this.data.length);
    this.handleDeleteList(this.data)
      .then(() => {
        this.updatePageData();
        // this.handleDialogClose();
        this.data = null;
      })
      .catch((err) => {
        console.log("loi");
      });
  };
  handleSelectStatus = (value, status) => {
    if (status != null && status.id != null) {
      this.setState({ orderStatus: status.id })
    }else{
      this.setState({ orderStatus: null })
    }
    this.updatePageData();
  }

  render() {
    const { t, i18n } = this.props;
    let {
      keyword,
      rowsPerPage,
      page,
      totalElements,
      itemList,
      item,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog,
      shouldOpenConfirmationDeleteAllDialog,
      shouldOpenNotificationPopup,
      listStatus,
      orderStatus
    } = this.state;
    let TitlePage = t("Đơn Hàng");

    let columns = [
      {
        title: t("general.action"),
        field: "custom",
        align: "left",
        width: "120px",
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
                getSourceById(rowData.id)
                  .then(({ data }) => {
                    console.log(data);
                    if (data === null) {
                      data = {};
                    }
                    this.setState({
                      item: data,
                      shouldOpenEditorDialog: true,
                    });
                  })
                  .catch((err) => {
                    console.log("loi");
                  });
              } else if (method === 1) {
                this.handleDelete(rowData.id);
              } else {
                alert("Call Selected Here:" + rowData.id);
              }
            }}
          />
        ),
      },
      {
        title: t("general.name"),
        field: "ten",
        align: "left",
        width: "150",
      },
      {
        title: t("general.code"),
        field: "ma",
        width: "150",
      },
      {
        title: t("Ngày đặt hàng"),
        field: "ngayDatHang",
        width: "150",
        render: (rowData) =>
          rowData.ngayDatHang ? (
            <span> {moment(rowData.ngayDatHang).format('DD/MM/YYYY hh:mm')}</span>
          ) : (
              ""
            ),
      },
      {
        title: t("Ngày giao hàng"),
        field: "ngayGiaoHang",
        width: "150",
        render: (rowData) =>
          rowData.ngayGiaoHang ? (
            <span>{moment(rowData.ngayGiaoHang).format("DD/MM/YYYY HH:MM")}</span>
          ) : (
              ""
            ),
      },
      {
        title: t("Tổng giá"),
        field: "tongGia",
        width: "150",
      },
      {
        title: t("Giảm giá"),
        field: "giamGia",
        width: "150",
      },
      {
        title: t("Thành tiền"),
        field: "thanhTien",
        width: "150",
      },
      {
        title: "Trạng thái",
        width: "150",
        render: rowData => {
          if (rowData.trangThai === 1) return 'Đơn hàng mới';
          else if (rowData.trangThai === 2) return 'Đơn hàng đã xác nhận';
          else if (rowData.trangThai === 3) return 'Đơn hàng đã thanh toán';
          else if (rowData.trangThai === 4) return 'Đơn hàng đã hủy';
          else return "";
        }
      },
      {
        title: t("Người bán"),
        field: "nguoiBan.displayName",
        width: "150",
      },
      // {
      //   title: t("Ghi chú"),
      //   field: "ghiChu",
      //   width: "150",
      // },
    ];

    return (
      <div className="m-sm-30">
        <Helmet>
          <title>
            {TitlePage} | {t("web_site")}
          </title>
        </Helmet>
        <div className="mb-sm-30">
          {/* <Breadcrumb routeSegments={[{ name: t('maintainRequestStatus.title') }]} /> */}
          <Breadcrumb
            routeSegments={[
              {
                name: t("Dashboard.category"),
                path: "/directory/source",
              },
              { name: TitlePage },
            ]}
          />
        </div>

        <Grid container spacing={2} justify="space-between">
          <Grid item md={3} xs={12}>
            <Button
              className="mb-16 mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => {
                this.handleEditItem({
                  startDate: new Date(),
                  endDate: new Date(),
                });
              }}
            >
              {t("general.add")}
            </Button>

            <Button
              className="mb-16 mr-36 align-bottom"
              variant="contained"
              color="primary"
              // onClick={() => this.setState({ shouldOpenConfirmationDeleteAllDialog: true })}
              onClick={() => this.checkData()}
            >
              {t("general.delete")}
            </Button>

            {shouldOpenNotificationPopup && (
              <NotificationPopup
                title={t("general.noti")}
                open={shouldOpenNotificationPopup}
                // onConfirmDialogClose={this.handleDialogClose}
                onYesClick={this.handleDialogClose}
                text={t(this.state.Notification)}
                agree={t("general.agree")}
              />
            )}

            {shouldOpenConfirmationDeleteAllDialog && (
              <ConfirmationDialog
                open={shouldOpenConfirmationDeleteAllDialog}
                onConfirmDialogClose={this.handleDialogClose}
                onYesClick={this.handleDeleteAll}
                text={t("general.deleteAllConfirm")}
                agree={t("general.agree")}
                cancel={t("general.cancel")}
              />
            )}
            {this.state.shouldOpenConfirmationDeleteListDialog && (
              <ConfirmationDialog
                open={this.state.shouldOpenConfirmationDeleteListDialog}
                onConfirmDialogClose={this.handleDialogClose}
                onYesClick={this.handleDeleteAll}
                text={t("general.deleteConfirm")}
                agree={t("general.agree")}
                cancel={t("general.cancel")}
              />
            )}
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
              <Autocomplete
              size="small"
              id="combo-box"
              options={listStatus}
              className="flex-end w-80 mb-10"
              getOptionLabel={option => option.name}
              onChange={this.handleSelectStatus}
              value={orderStatus ? orderStatus :null}
              defaultValue = {orderStatus ? orderStatus :null}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Lọc theo trạng thái"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth>
              <Input
                className="search_box w-100"
                onChange={this.handleTextChange}
                onKeyDown={this.handleKeyDownEnterSearch}
                placeholder={t("general.enterKeyword")}
                id="search_box"
                startAdornment={
                  <InputAdornment>
                    <Link>
                      {" "}
                      <SearchIcon
                        onClick={() => this.search(keyword)}
                        style={{ position: "absolute", top: "0", right: "0" }}
                      />
                    </Link>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <div>
              {shouldOpenEditorDialog && (
                <RealEstateSourceDialog
                  t={t}
                  i18n={i18n}
                  handleClose={this.handleDialogClose}
                  open={shouldOpenEditorDialog}
                  handleOKEditClose={this.handleOKEditClose}
                  item={item}
                />
              )}

              {shouldOpenConfirmationDialog && (
                <ConfirmationDialog
                  title={t("general.confirm")}
                  open={shouldOpenConfirmationDialog}
                  onConfirmDialogClose={this.handleDialogClose}
                  onYesClick={this.handleConfirmationResponse}
                  text={t("general.deleteConfirm")}
                  agree={t("general.agree")}
                  cancel={t("general.cancel")}
                />
              )}
            </div>
            <MaterialTable
              title={t("general.list")}
              data={itemList}
              columns={columns}
              //parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
              parentChildData={(row, rows) => {
                var list = rows.find((a) => a.id === row.parentId);
                return list;
              }}
              localization={{
                body: {
                  emptyDataSourceMessage: `${t(
                    "general.emptyDataMessageTable"
                  )}`,
                },
                toolbar: {
                  // nRowsSelected: '${t('general.selects')}',
                  nRowsSelected: `${t("general.selects")}`,
                },
              }}
              options={{
                selection: true,
                actionsColumnIndex: -1,
                paging: false,
                search: false,
                rowStyle: (rowData) => ({
                  backgroundColor:
                    rowData.tableData.id % 2 === 1 ? "#EEE" : "#FFF",
                }),
                maxBodyHeight: "450px",
                minBodyHeight: "370px",
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
                // this.setState({selectedItems:rows});
              }}
            />
            <TablePagination
              align="left"
              className="px-16"
              rowsPerPageOptions={[1, 2, 3, 5, 10, 25, 50, 100]}
              component="div"
              labelRowsPerPage={t("general.rows_per_page")}
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} ${t("general.of")} ${count !== -1 ? count : `more than ${to}`
                }`
              }
              count={totalElements}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                "aria-label": "Previous Page",
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page",
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.setRowsPerPage}
            />
          </Grid>
        </Grid >
      </div >
    );
  }
}

export default RealEstateSourceTable;
