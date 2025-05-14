import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React, { memo } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const Root = styled("div")(({ theme }) => ({
  "& table ": {
    "& th:first-child, & td:first-child": {
      paddingLeft: `${0}!important`,
    },
    "& th:last-child, & td:last-child": {
      paddingRight: `${0}!important`,
    },
  },

  "& .divider": {
    width: 1,
    backgroundColor: theme.palette.divider,
    height: "200px",
  },

  "& .seller": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),

    width: 480,
    "& .divider": {
      backgroundColor: theme.palette.getContrastText(
        theme.palette.primary.dark
      ),
      opacity: 0.5,
    },
  },
}));

const InvoiceTab = (props) => {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  const calculateSubtotal = () => {
    return props?.order?.data?.orderDetails.reduce((total, product) => {
      const price = parseFloat(product?.productPrice?.$numberDecimal || 0);
      const quantity = parseInt(
        props?.order?.data?.order?.selectedqty || 0,
        10
      );
      return total + price * quantity;
    }, 0);
  };

  return (
    <div>
      {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Print</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
              </Select>
            </FormControl> */}
      <Root className="grow shrink-0 p-0">
        {props.order && (
          <Card className="w-xl mx-auto shadow-0">
            <CardContent className=" print:p-0">
              <Typography color="textSecondary" className="mb-32">
                {new Date(props.order.data.order.createdAt)
                  .toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short", // This gives "Jan", "Feb", etc.
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(",", " at")}
              </Typography>

              <div className="flex justify-between">
                <div>
                  <table className="mb-16">
                    <tbody>
                      <tr>
                        <td className="pb-4">
                          <Typography
                            className="font-light"
                            variant="h6"
                            color="textSecondary"
                          >
                            INVOICE
                          </Typography>
                        </td>
                        <td className="pb-4 px-8">
                          <Typography
                            className="font-light"
                            variant="h6"
                            color="inherit"
                          >
                            {props.order.reference}
                          </Typography>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <Typography color="textSecondary">
                    {props.order.data.order.userId.name}
                  </Typography>

                  {/* {props.order.data.order && (
                  <Typography color="textSecondary">
                    {props?.order?.customer?.invoiceAddress?.address}
                  </Typography>
                )} */}
                  {props?.order?.data?.order?.userId?.phone && (
                    <Typography color="textSecondary">
                      {props?.order?.data?.order?.userId?.phone}
                    </Typography>
                  )}
                  {props?.order?.data?.order?.userId?.email && (
                    <Typography color="textSecondary">
                      {props?.order?.data?.order?.userId?.email}
                    </Typography>
                  )}
                </div>

                <div
                  className="seller flex flex-col items-center p-16"
                  style={{ gap: "2rem", borderRadius: "10px" }}
                >
                  <img
                    className="w-224"
                    src={require("../../../Img/crystovalogowhite (1) 2 (1).png")}
                    alt="logo"
                  />

                  <hr
                    style={{ width: "100%", border: "1px solid", opacity: 0.5 }}
                  />

                  <div className="px-0">
                    <Typography color="inherit">Crystova Jewels</Typography>

                    <Typography color="inherit">
                      B-714 IT Park, Opp. AR Mall, Mota Varachha, Surat -
                      394101
                    </Typography>
                    <Typography color="inherit">+ 72650 77755</Typography>
                    <Typography color="inherit">
                      info@crystovajewels.com{" "}
                    </Typography>
                    <Typography color="inherit">
                      crystovajewels.com
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="mt-64">
                <Table className="simple">
                  <TableHead>
                    <TableRow>
                      <TableCell>PRODUCT</TableCell>
                      <TableCell>PRICE</TableCell>
                      <TableCell align="left">SIZE</TableCell>
                      <TableCell align="left">QUANTITY</TableCell>
                      <TableCell align="left">TOTAL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props?.order?.data?.orderDetails.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>
                          <Typography variant="subtitle1">
                            {product?.productId?.productName}
                            {/* {console.log(
                        "props?.order?.data?.order :>> ",
                        product?.productId?.productName                 
                      )} */}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          {product.productPrice?.$numberDecimal}
                        </TableCell>
                        <TableCell align="left">
                          {props?.order?.data?.order?.selectedSize}
                        </TableCell>
                        <TableCell align="left">
                          {props?.order?.data?.order?.selectedqty}
                        </TableCell>
                        <TableCell align="left">
                          {product.productPrice?.$numberDecimal}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Table className="simple mt-32">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Typography
                          className="font-normal"
                          variant="subtitle1"
                          color="textSecondary"
                        >
                          SUBTOTAL
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          className="font-normal"
                          variant="subtitle1"
                          color="textSecondary"
                        >
                          {/* {formatter.format(props.order.subtotal)} */}
                          {formatter.format(calculateSubtotal())}

                          {console.log("object :>> ", props?.order?.data)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          className="font-normal"
                          variant="subtitle1"
                          color="textSecondary"
                        >
                          TAX
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          className="font-normal"
                          variant="subtitle1"
                          color="textSecondary"
                        >
                          {formatter.format(props.order.tax || 0)}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          className="font-normal"
                          variant="subtitle1"
                          color="textSecondary"
                        >
                          DISCOUNT
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          className="font-normal"
                          variant="subtitle1"
                          color="textSecondary"
                        >
                          {formatter.format(
                            props?.order?.data?.order?.discountTotal
                              ?.$numberDecimal || 0
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Typography
                          className="font-light"
                          variant="h4"
                          color="textSecondary"
                        >
                          TOTAL
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          className="font-light"
                          variant="h4"
                          color="textSecondary"
                        >
                          {formatter.format(
                            props?.order?.data?.order?.totalPrice
                              ?.$numberDecimal || 0
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </Root>
    </div>
  );
};

export default memo(InvoiceTab);
