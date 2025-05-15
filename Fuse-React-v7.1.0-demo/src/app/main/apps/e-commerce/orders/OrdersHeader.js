import Icon from "@mui/material/Icon";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import { setOrdersSearchText } from "../store/ordersSlice";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";

function OrdersHeader({ selectedFilter, setSelectedFilter }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // const [selectedFilter, setSelectedFilter] = useState('Today');

  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
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
    const filteredOrders = filterOrdersByDate(orders, selectedFilter); // ← fix here

    const doc = new jsPDF();

    // Add title
    doc.setFontSize(16);
    doc.text("Orders Report", 14, 15);

    // Prepare table data
    const tableData = filteredOrders.map((order) => [
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

  const filterOrdersByDate = (orders, filterType) => {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);
    const startOfLastWeek = new Date(startOfToday);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);
    const startOfLastMonth = new Date(startOfToday);
    startOfLastMonth.setMonth(startOfLastMonth.getMonth() - 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      switch (filterType) {
        case "Today":
          return orderDate >= startOfToday;
        case "Yesterday":
          return orderDate >= startOfYesterday && orderDate < startOfToday;
        case "Last Week":
          return orderDate >= startOfLastWeek;
        case "Last Month":
          return orderDate >= startOfLastMonth;
        case "This Year":
          return orderDate >= startOfYear;
        default:
          return true;
      }
    });
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
          <FormControl fullWidth>
            {/* <InputLabel  className="flex justify-between items-center cursor-pointer text-white">
          Filter <FaFilter />
        </InputLabel> */}
            <Select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border" // Tailwind fallback if needed
              sx={{
                color: "white",
                "& .MuiSelect-select": {
                  padding: "12px",
                  width: "70px",
                },
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
              }}
            >
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="Yesterday">Yesterday</MenuItem>
              <MenuItem value="Last Week">Last Week</MenuItem>
              <MenuItem value="Last Month">Last Month</MenuItem>
              <MenuItem value="This Year">This Year</MenuItem>
            </Select>
          </FormControl>
          <div className="text-white border border-solid w-224 p-4 rounded border-gray-200">
            <Button className="text-white" onClick={handleDownloadPDF}>
              Download All
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersHeader;
