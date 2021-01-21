import React, { Component, Fragment } from "react";
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Button,
  Checkbox,
  Fab,
  Avatar,
  Hidden,
} from "@material-ui/core";

import { Breadcrumb, SimpleCard, EgretProgressBar } from "egret";
import DashboardWelcomeCard from "../cards/DashboardWelcomeCard";
import AreaChart from "../charts/echarts/AreaChart";
import { getDashboardAnalytics } from "./DashboardService";
import { format } from "date-fns";
import ModifiedAreaChart from "./ModifiedAreaChart";
import { withStyles } from "@material-ui/styles";
import { Helmet } from "react-helmet";
import { useTranslation, withTranslation, Trans } from "react-i18next";

class Dashboard1 extends Component {
  state = {
    analytics: {},
    sanPhamCountByDate: [],
    donHangCountByDate: [],
    khoCountByDate: [],
    userCountByDate: [],
  };

  componentDidMount() {
    this.updatePageData();
  }
  updatePageData = () => {
    getDashboardAnalytics().then(({ data }) => {
      this.setState({
        analytics: data,
        sanPhamCountByDate: data.sanPhamCountByDate,
        donHangCountByDate: data.donHangCountByDate,
        khoCountByDate: data.khoCountByDate,
        userCountByDate: data.userCountByDate,
      });
    });
  };

  render() {
    const { theme } = this.props;
    const { t, i18n } = this.props;
    let TitlePage = t("Dashboard.dashboard");

    let {
      analytics,
      sanPhamCountByDate,
      donHangCountByDate,
      khoCountByDate,
      userCountByDate,
    } = this.state;
    return (
      <div className="analytics m-sm-30">
        <Helmet>
          <title>
            {t("Dashboard.dashboard")} | {t("web_site")}
          </title>
        </Helmet>
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: t("Dashboard.dashboard") }]} />
        </div>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <DashboardWelcomeCard t={t} analytics={analytics} />
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <SimpleCard title={t("Sản Phẩm")}>
              <ModifiedAreaChart
                height="280px"
                option={{
                  xAxis: {
                    data: sanPhamCountByDate.map(function (item) {
                      return new Date(item["date"]).toLocaleDateString();
                    }),
                  },
                  series: [
                    {
                      data: sanPhamCountByDate.map(function (item) {
                        return item["count"];
                      }),
                      type: "bar",
                      areaStyle: {},
                      smooth: true,
                      lineStyle: {
                        width: 3,
                        color: theme.palette.primary.main,
                      },
                      markLine: {
                        silent: true,
                        data: [
                          {
                            yAxis: 50,
                          },
                          {
                            yAxis: 100,
                          },
                          {
                            yAxis: 150,
                          },
                          {
                            yAxis: 200,
                          },
                          {
                            yAxis: 300,
                          },
                        ],
                      },
                    },
                  ],
                  yAxis: {
                    axisLabel: {
                      color: theme.palette.text.secondary,
                    },
                  },
                  color: [
                    {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: theme.palette.primary.light, // color at 0% position
                        },
                        {
                          offset: 1,
                          color: "rgba(255,255,255,0)", // color at 100% position
                        },
                      ],
                      global: false, // false by default
                    },
                  ],
                }}
              ></ModifiedAreaChart>
            </SimpleCard>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <SimpleCard title={t("Đơn Hàng")}>
              <ModifiedAreaChart
                height="280px"
                option={{
                  xAxis: {
                    data: donHangCountByDate.map(function (item) {
                      return new Date(item["date"]).toLocaleDateString();
                    }),
                  },
                  series: [
                    {
                      data: donHangCountByDate.map(function (item) {
                        return item["count"];
                      }),
                      type: "bar",
                      areaStyle: {},
                      smooth: true,
                      lineStyle: {
                        width: 3,
                        color: theme.palette.primary.main,
                      },
                      markLine: {
                        silent: true,
                        data: [
                          {
                            yAxis: 50,
                          },
                          {
                            yAxis: 100,
                          },
                          {
                            yAxis: 150,
                          },
                          {
                            yAxis: 200,
                          },
                          {
                            yAxis: 300,
                          },
                        ],
                      },
                    },
                  ],
                  yAxis: {
                    axisLabel: {
                      color: theme.palette.text.secondary,
                    },
                  },
                  color: [
                    {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: theme.palette.primary.light, // color at 0% position
                        },
                        {
                          offset: 1,
                          color: "rgba(255,255,255,0)", // color at 100% position
                        },
                      ],
                      global: false, // false by default
                    },
                  ],
                }}
              ></ModifiedAreaChart>
            </SimpleCard>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <SimpleCard title={t("Kho")}>
              <ModifiedAreaChart
                height="280px"
                option={{
                  xAxis: {
                    data: khoCountByDate.map(function (item) {
                      return new Date(item["date"]).toLocaleDateString();
                    }),
                  },
                  series: [
                    {
                      data: khoCountByDate.map(function (item) {
                        return item["count"];
                      }),
                      type: "bar",
                      areaStyle: {},
                      smooth: true,
                      lineStyle: {
                        width: 3,
                        color: theme.palette.primary.main,
                      },
                      markLine: {
                        silent: true,
                        data: [
                          {
                            yAxis: 50,
                          },
                          {
                            yAxis: 100,
                          },
                          {
                            yAxis: 150,
                          },
                          {
                            yAxis: 200,
                          },
                          {
                            yAxis: 300,
                          },
                        ],
                      },
                    },
                  ],
                  yAxis: {
                    axisLabel: {
                      color: theme.palette.text.secondary,
                    },
                  },
                  color: [
                    {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: theme.palette.primary.light, // color at 0% position
                        },
                        {
                          offset: 1,
                          color: "rgba(255,255,255,0)", // color at 100% position
                        },
                      ],
                      global: false, // false by default
                    },
                  ],
                }}
              ></ModifiedAreaChart>
            </SimpleCard>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <SimpleCard title={t("Tài Khoản")}>
              <ModifiedAreaChart
                height="280px"
                option={{
                  xAxis: {
                    data: userCountByDate.map(function (item) {
                      return new Date(item["date"]).toLocaleDateString();
                    }),
                  },
                  series: [
                    {
                      data: userCountByDate.map(function (item) {
                        return item["count"];
                      }),
                      type: "bar",
                      areaStyle: {},
                      smooth: true,
                      lineStyle: {
                        width: 3,
                        color: theme.palette.primary.main,
                      },
                      markLine: {
                        silent: true,
                        data: [
                          {
                            yAxis: 50,
                          },
                          {
                            yAxis: 100,
                          },
                          {
                            yAxis: 150,
                          },
                          {
                            yAxis: 200,
                          },
                          {
                            yAxis: 300,
                          },
                        ],
                      },
                    },
                  ],
                  yAxis: {
                    axisLabel: {
                      color: theme.palette.text.secondary,
                    },
                  },
                  color: [
                    {
                      type: "linear",
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [
                        {
                          offset: 0,
                          color: theme.palette.primary.light, // color at 0% position
                        },
                        {
                          offset: 1,
                          color: "rgba(255,255,255,0)", // color at 100% position
                        },
                      ],
                      global: false, // false by default
                    },
                  ],
                }}
              ></ModifiedAreaChart>
            </SimpleCard>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles({}, { withTheme: true })(Dashboard1);
