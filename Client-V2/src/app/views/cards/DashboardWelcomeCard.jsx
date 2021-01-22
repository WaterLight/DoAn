import React from "react";
import { Card, Grid, Icon, Fab, withStyles } from "@material-ui/core";
import ConstantList from "../../appConfig";
const styles = theme => ({
  root: {
    background: `url("/assets/images/dots.png"),
    linear-gradient(90deg, ${theme.palette.primary.main} -19.83%, ${theme.palette.primary.light} 189.85%)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%"
  }
});

const DashboardWelcomeCard = ({ classes, analytics, t }) => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <Card
          elevation={3}
          className={`p-16 py-28 text-center h-100 w-100 ${classes.root}`}
        >
          <a href={ConstantList.ROOT_PATH + "directory/sanpham"} >
            <div className="font-weight-300 flex flex-space-between">
              <div className="text-white margin-auto">
                <div className="font-size-32"><b>{analytics? analytics.sanPhamNum:0}</b></div>
                <p className="uppercase bold m-0"><b>{t('Sản phẩm')}</b></p>
              </div>
            </div>
          </a>
        </Card>
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <Card
          elevation={3}
          className={`p-16 py-28 text-center h-100 w-100 ${classes.root}`}
        >
          <a href={ConstantList.ROOT_PATH + "directory/donHang"} >
          <div className="font-weight-300 flex flex-space-between">
            <div className="text-white margin-auto">
              <div className="font-size-32"><b>{analytics ? analytics.donHangNum:0}</b></div>
              <p className="uppercase m-0"><b>{t('Đơn hàng')}</b></p>
            </div>
          </div>
          </a>
        </Card>
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <Card
          elevation={3}
          className={`p-16 py-28 text-center h-100 w-100 ${classes.root}`}
        >
          <a href={ConstantList.ROOT_PATH + "directory/kho"} >
          <div className="font-weight-300  flex flex-space-between">
            <div className="text-white margin-auto">
              <div className="font-size-32"><b>{analytics ? analytics.khoNum : 0}</b></div>
              <p className="uppercase m-0"><b>{t('Kho')}</b></p>
            </div>
          </div>
          </a>
        </Card>
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <Card
          elevation={3}
          className={`p-16 py-28 text-center h-100 w-100 ${classes.root}`}
        >
          <a href={ConstantList.ROOT_PATH + "user_manager/user"} >
          <div className="font-weight-300 flex flex-space-between">
            <div className="text-white margin-auto">
              <div className="font-size-32"><b>{analytics ? analytics.userNum :0}</b></div>
              <p className="uppercase m-0"><b>{t('Người dùng')}</b></p>
            </div>
          </div>
          </a>
        </Card>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(DashboardWelcomeCard);
