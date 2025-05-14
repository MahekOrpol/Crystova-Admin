import Icon from "@mui/material/Icon";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import { setOrdersSearchText } from "../store/ordersSlice";
import { Button, Divider, Menu, MenuItem } from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";

function OrdersHeader(props) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchText = useSelector(
    ({ eCommerceApp }) => eCommerceApp.orders.searchText
  );
  const mainTheme = useSelector(selectMainTheme);
  const orders = useSelector(
    ({ eCommerceApp }) => eCommerceApp.orders.entities
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text("Orders Report", 14, 15);

    // Prepare table data
    const tableData = Object.values(orders).map((order) => [
      order.orderId,
      order.userId.name,
      order.userId.email,
      order.userId.phone,
      order.totalPrice.$numberDecimal,
      order.status,
      order.paymentStatus,
      new Date(order.createdAt).toLocaleDateString(),
    ]);

    // Generate table
    autoTable(doc, {
      head: [
        [
          "Order ID",
          "Customer Name",
          "Email",
          "Phone",
          "Total Price",
          "Status",
          "Payment Status",
          "Date",
        ],
      ],
      body: tableData,
      startY: 25,
      theme: "grid",
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
      },
    });

    // Save the PDF
    doc.save("orders-report.pdf");
  };

  return (
    <>
      <div className="flex flex-1 w-full items-center justify-between">
        <div className="flex items-center">
          <Icon
            component={motion.span}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.2 } }}
            className="text-24 md:text-32"
          >
            receipt
          </Icon>
          <Typography
            component={motion.span}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            delay={300}
            className="text-16 md:text-24 mx-12 font-semibold"
          >
            Orders
          </Typography>
        </div>

        <div className="flex flex-1 items-center justify-center px-12">
          <ThemeProvider theme={mainTheme}>
            <Paper
              component={motion.div}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
              className="flex items-center w-full max-w-512 px-8 py-4 rounded-16 shadow"
            >
              <Icon color="action">search</Icon>

              <Input
                placeholder="Search"
                className="flex flex-1 mx-8"
                disableUnderline
                fullWidth
                value={searchText}
                inputProps={{
                  "aria-label": "Search",
                }}
                onChange={(ev) => dispatch(setOrdersSearchText(ev))}
              />
            </Paper>
          </ThemeProvider>
        </div>
        <div className="flex items-center justify-end" style={{ gap: "10px" }}>
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClick(e);
            }}
            className="text-white border border-solid w-128 p-12 rounded border-gray-200 flex justify-between items-center cursor-pointer"
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            Filter <FaFilter />
          </div>
          <div className="text-white border border-solid w-128 p-4 rounded border-gray-200">
            <Button className="text-white" onClick={handleDownloadPDF}>
              Download All
            </Button>
          </div>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>Today</MenuItem>
        <Divider />
        <MenuItem> Yesterday </MenuItem>
        <Divider />
        <MenuItem> Last Week </MenuItem>
        <Divider />
        <MenuItem> Last Month </MenuItem>
        <Divider />
        <MenuItem> This Year </MenuItem>
      </Menu>
    </>
  );
}

export default OrdersHeader;
