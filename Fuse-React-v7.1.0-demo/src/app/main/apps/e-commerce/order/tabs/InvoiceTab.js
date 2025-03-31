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
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <div >

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
            <Button>Print</Button>
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
                    2B-714 IT Park, Opp. AR Mall, Mota Varachha, Surat - 394101
                  </Typography>
                  <Typography color="inherit">+ 72650 77755</Typography>
                  <Typography color="inherit">
                    info@crystovajewels.com{" "}
                  </Typography>
                  <Typography color="inherit">
                    crystovajewels.cloudbusiness.cloud
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
                        {props?.order?.data?.order?.selectedSize}{" "}
                      </TableCell>
                      <TableCell align="left">
                        {props?.order?.data?.order?.selectQuantity}
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
                        {formatter.format(
                          props?.order?.data?.order?.totalPrice
                            ?.$numberDecimal || 0
                        )}
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
                        {formatter.format(props.order.tax)}
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
                        {formatter.format(props.order.discount)}
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
                        {formatter.format(props.order.total)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-96">
              <Typography className="mb-24 print:mb-12" variant="body1">
                Please pay within 15 days. Thank you for your business.
              </Typography>

              <div className="flex">
                <div className="shrink-0">
                  <img
                    className="w-32"
                    src="assets/images/logos/fuse.svg"
                    alt="logo"
                  />
                </div>

                <Typography
                  className="font-normal mb-64 px-24"
                  variant="caption"
                  color="textSecondary"
                >
                  In condimentum malesuada efficitur. Mauris volutpat placerat
                  auctor. Ut ac congue dolor. Quisque scelerisque lacus sed
                  feugiat fermentum. Cras aliquet facilisis pellentesque. Nunc
                  hendrerit quam at leo commodo, a suscipit tellus dapibus.
                  Etiam at felis volutpat est mollis lacinia. Mauris placerat
                  sem sit amet velit mollis, in porttitor ex finibus. Proin eu
                  nibh id libero tincidunt lacinia et eget eros.
                </Typography>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </Root>
    </div>
  );
};

export default memo(InvoiceTab);