import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ccyFormat(num) {
  // return `${num.toFixed(2)}`;
  let number = new Number(num);
  if (number != null) {
    let plainNumber = number.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, "$&,");
    return plainNumber.substr(0, plainNumber.length - 2);
  }
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

function subtotal(items) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow("Paperclips (Box)", 100, 1.15),
  createRow("Paper (Case)", 10, 45.99),
  createRow("Waste Basket", 2, 17.99),
];

const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default function SpanningTable(props) {
  console.log(props);
  const classes = useStyles();
  const { data, t } = props;
  let totalDate = {};
  totalDate.TotalSoLuong = 0;
  totalDate.TotalTongTienNhap = 0;
  totalDate.TotalSoLuongBan = 0;
  totalDate.TotalTongTienBan = 0;
  if(data) {
    data.map(item => {
      totalDate.TotalSoLuong += item.soLuong;
      totalDate.TotalTongTienNhap += item.tongTienNhap;
      totalDate.TotalSoLuongBan += item.soLuongBan;
      totalDate.TotalTongTienBan += item.tongTienBan;
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{maxWidth:"100px", backgroundColor:'rgb(53, 134, 0)', color: '#fff'}}>{t("general.code")}</TableCell>
            <TableCell align="center" style={{backgroundColor:'rgb(53, 134, 0)', color: '#fff'}}>{t("general.name")}</TableCell>
            <TableCell align="right" style={{backgroundColor:'rgb(53, 134, 0)', color: '#fff'}}>Số lượng nhập</TableCell>
            <TableCell align="right" style={{backgroundColor:'rgb(53, 134, 0)', color: '#fff'}}>Tổng tiền nhập</TableCell>
            <TableCell align="right" style={{backgroundColor:'rgb(53, 134, 0)', color: '#fff'}}>Số lượng bán</TableCell>
            <TableCell align="right" style={{backgroundColor:'rgb(53, 134, 0)', color: '#fff'}}>Tổng tiền bán</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{row.maSP}</TableCell>
              <TableCell align="center">{row.tenSP}</TableCell>
              <TableCell align="right">{ccyFormat(row.soLuong)}</TableCell>
              <TableCell align="right">{ccyFormat(row.tongTienNhap)}</TableCell>
              <TableCell align="right">{ccyFormat(row.soLuongBan)}</TableCell>
              <TableCell align="right">{ccyFormat(row.tongTienBan)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            {/* <TableCell rowSpan={3} /> */}
            <TableCell style={{fontWeight: 'bold'}} align="right" colSpan={2}>
              Total
            </TableCell>
            <TableCell align="right" style={{fontWeight: 'bold'}}>{totalDate?.TotalSoLuong ? ccyFormat(totalDate.TotalSoLuong) : 0}</TableCell>
            <TableCell align="right" style={{fontWeight: 'bold'}}>{totalDate?.TotalSoLuong ? ccyFormat(totalDate.TotalTongTienNhap) : 0 }</TableCell>
            <TableCell align="right" style={{fontWeight: 'bold'}}>{totalDate?.TotalSoLuong ? ccyFormat(totalDate.TotalSoLuongBan) : 0 }</TableCell>
            <TableCell align="right" style={{fontWeight: 'bold'}}>{totalDate?.TotalSoLuong ? ccyFormat(totalDate.TotalTongTienBan) : 0 }</TableCell>
          </TableRow>

          {/* <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
