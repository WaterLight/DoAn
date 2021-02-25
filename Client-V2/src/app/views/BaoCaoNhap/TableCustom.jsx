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
  let totalData = {};
  totalData.Total = 0;
  if(data) {
    data.map(item => {
      totalData.Total += item.soLuong;
    })
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{maxWidth:"100px", backgroundColor:'rgb(53, 134, 0)', color: '#fff'}}>{t("general.code")}</TableCell>
            <TableCell align="center" style={{backgroundColor:'rgb(53, 134, 0)', color: '#fff'}}>{t("general.name")}</TableCell>
            <TableCell align="right" style={{backgroundColor:'rgb(53, 134, 0)', color: '#fff'}}>Kho</TableCell>
            <TableCell align="right" style={{backgroundColor:'rgb(53, 134, 0)', color: '#fff'}}>Số lượng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{row.maSP}</TableCell>
              <TableCell align="center">{row.tenSP}</TableCell>
              <TableCell align="right">{row.tenKho}</TableCell>
              <TableCell align="right">{ccyFormat(row.soLuong)}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            {/* <TableCell rowSpan={3} /> */}
            <TableCell style={{fontWeight: 'bold'}} align="right" colSpan={3}>
              Total
            </TableCell>
            <TableCell align="right" style={{fontWeight: 'bold'}}>{totalData?.Total ? ccyFormat(totalData.Total) : 0}</TableCell>
          </TableRow>

        </TableBody>
      </Table>
    </TableContainer>
  );
}
