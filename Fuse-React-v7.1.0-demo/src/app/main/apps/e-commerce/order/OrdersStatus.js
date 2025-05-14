import _ from "@lodash";
import clsx from "clsx";
import { IoPrint } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { getOrder } from "../store/orderSlice";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { Divider, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

function OrdersStatus({ status, orderId }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadPDF = async (e) => {
    // Prevent default navigation
    e.preventDefault();
    e.stopPropagation();

    if (!orderId) {
      console.error("Order ID is missing");
      return;
    }

    try {
      // Get order details
      const response = await dispatch(getOrder({ orderId })).unwrap();
      if (!response || !response.data) {
        console.error("No order data received");
        return;
      }
      const order = response.data.order;
      const orderDetails = response.data.orderDetails || [];

      // Create PDF
      const doc = new jsPDF();
      let y = 15;
      // Title
      doc.setFontSize(16);
      doc.text("Order Invoice", 14, y);
      y += 10;

      // Order Info
      doc.setFontSize(12);
      doc.text("Order Information", 14, y);
      y += 7;
      doc.setFontSize(10);
      doc.text(`Order ID: #${order.orderId}`, 14, y);
      y += 6;
      doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 14, y);
      y += 6;
      doc.text(`Status: ${order.status}`, 14, y);
      y += 6;
      doc.text(`Payment Status: ${order.paymentStatus}`, 14, y);
      y += 6;
      doc.text(`Coupon Code: ${order.couponCode || "N/A"}`, 14, y);
      y += 10;

      // Customer Info
      doc.setFontSize(12);
      doc.text("Customer Information", 14, y);
      y += 7;
      doc.setFontSize(10);
      doc.text(`Name: ${order.userId.name}`, 14, y);
      y += 6;
      doc.text(`Email: ${order.userId.email}`, 14, y);
      y += 6;
      doc.text(`Phone: ${order.userId.phone}`, 14, y);
      y += 10;

      // Payment Info
      doc.setFontSize(12);
      doc.text("Payment Information", 14, y);
      y += 7;
      doc.setFontSize(10);
      const payment = order.payment || {};
      doc.text(`TransactionID: ${payment.transactionId || ""}`, 14, y);
      y += 6;
      doc.text(`Payment Method: ${payment.method || ""}`, 14, y);
      y += 6;
      doc.text(`Amount: Rs. ${payment.amount || ""}`, 14, y);
      y += 6;
      doc.text(
        `Date: ${payment.date ? new Date(payment.date).toLocaleString() : ""}`,
        14,
        y
      );
      y += 10;

      // Product Table
      doc.setFontSize(12);
      doc.text("Products", 14, y);
      y += 4;
      autoTable(doc, {
        startY: y,
        head: [["Product", "Price", "Size", "Quantity", "Total"]],
        body: orderDetails.map((product) => [
          product.productId?.productName || "",
          `Rs. ${product.productPrice?.$numberDecimal || 0}`,
          order.selectedSize || "",
          order.selectedqty || "",
          `Rs. ${product.productPrice?.$numberDecimal || 0}`,
        ]),
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 5 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      });
      y = doc.lastAutoTable.finalY + 6;

      // Summary Table
      autoTable(doc, {
        startY: y,
        head: [["Label", "Amount"]],
        body: [
          ["Subtotal", `Rs. ${order.totalPrice?.$numberDecimal || 0}`],
          ["Discount", `Rs. ${order.discountTotal?.$numberDecimal || 0}`],
          ["Tax", `Rs. ${order.tax || 0}`],
          ["Grand Total", `Rs. ${order.totalPrice?.$numberDecimal || 0}`],
        ],
        theme: "grid",
        styles: { fontSize: 10, cellPadding: 5 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      });

      // Save the PDF
      doc.save(`order-${order.orderId}.pdf`);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  const handlePrintOrderPage = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  
    if (!orderId) {
      console.error("Order ID is missing");
      return;
    }
  
    try {
      const response = await dispatch(getOrder({ orderId })).unwrap();
      if (!response || !response.data) {
        console.error("No order data received");
        return;
      }
  
      const order = response.data.order;
      const orderDetails = response.data.orderDetails || [];
      const payment = order.payment || {};
  
      const printWindow = window.open("", "_blank");
      const htmlContent = `
        <html>
        <head>
          <title>Order Invoice - ${order.orderId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { color: #2c3e50; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #2980b9; color: white; }
          </style>
        </head>
        <body>
          <h2>Order Invoice</h2>
          <p><strong>Order ID:</strong> #${order.orderId}</p>
          <p><strong>Date:</strong> ${new Date(
            order.createdAt
          ).toLocaleString()}</p>
          <p><strong>Status:</strong> ${order.status}</p>
          <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
          <p><strong>Coupon Code:</strong> ${order.couponCode || "N/A"}</p>
  
          <h3>Customer Information</h3>
          <p><strong>Name:</strong> ${order.userId.name}</p>
          <p><strong>Email:</strong> ${order.userId.email}</p>
          <p><strong>Phone:</strong> ${order.userId.phone}</p>
  
          <h3>Payment Information</h3>
          <p><strong>Transaction ID:</strong> ${payment.transactionId || ""}</p>
          <p><strong>Method:</strong> ${payment.method || ""}</p>
          <p><strong>Amount:</strong> Rs. ${payment.amount || ""}</p>
          <p><strong>Date:</strong> ${
            payment.date ? new Date(payment.date).toLocaleString() : ""
          }</p>
  
          <h3>Products</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderDetails
                .map((product) => {
                  const price = product.productPrice?.$numberDecimal || 0;
                  return `
                    <tr>
                      <td>${product.productId?.productName || ""}</td>
                      <td>Rs. ${price}</td>
                      <td>${order.selectedSize || ""}</td>
                      <td>${order.selectedqty || ""}</td>
                      <td>Rs. ${price}</td>
                    </tr>
                  `;
                })
                .join("")}
            </tbody>
          </table>
  
          <h3>Summary</h3>
          <table>
            <tbody>
              <tr><th>Subtotal</th><td>Rs. ${
                order.totalPrice?.$numberDecimal || 0
              }</td></tr>
              <tr><th>Discount</th><td>Rs. ${
                order.discountTotal?.$numberDecimal || 0
              }</td></tr>
              <tr><th>Tax</th><td>Rs. ${order.tax || 0}</td></tr>
              <tr><th>Grand Total</th><td>Rs. ${
                order.totalPrice?.$numberDecimal || 0
              }</td></tr>
            </tbody>
          </table>
  
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
        </html>
      `;
  
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    } catch (error) {
      console.error("Error printing order:", error);
    }
  };

  const handlePrintPackingSlips = async (e) => {
    e.preventDefault();
    e.stopPropagation();
  
    if (!orderId) {
      console.error("Order ID is missing");
      return;
    }
  
    try {
      const response = await dispatch(getOrder({ orderId })).unwrap();
      if (!response || !response.data) {
        console.error("No order data received");
        return;
      }
  
      const order = response.data.order;
      const orderDetails = response.data.orderDetails || [];
      const payment = order.payment || {};
  
      const printWindow = window.open("", "_blank");
      const htmlContent = `
        <html>
        <head>
          <title>Packing Slip - ${order.orderId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
            h2 { color: #2c3e50; margin-bottom: 20px; }
            .packing-info { margin: 20px 0; background: #f8f9fa; padding: 15px; border-radius: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            th, td { border: 1px solid #dee2e6; padding: 12px; text-align: left; }
            th { background-color: #2980b9; color: white; }
            tr:nth-child(even) { background-color: #f8f9fa; }
            .shipping-box { border: 1px solid #dee2e6; padding: 20px; margin: 20px 0; border-radius: 5px; background: #fff; }
            .print-button { 
              position: fixed; 
              bottom: 20px; 
              right: 20px; 
              padding: 10px 20px; 
              background: #2980b9; 
              color: white; 
              border: none; 
              border-radius: 5px; 
              cursor: pointer; 
              box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            }
            .print-button:hover { background: #2471a3; }
            @media print {
              .print-button { display: none; }
              body { max-width: 100%; }
            }
          </style>
        </head>
        <body>
          <h2>Packing Slip</h2>
          <div class="packing-info">
            <p><strong>Order ID:</strong> #${order.orderId}</p>
            <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Status:</strong> ${order.status}</p>
            <p><strong>Payment Status:</strong> ${order.paymentStatus}</p>
            <p><strong>Coupon Code:</strong> ${order.couponCode || "N/A"}</p>
          </div>
  
          <div class="shipping-box">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${order.userId.name}</p>
            <p><strong>Email:</strong> ${order.userId.email}</p>
            <p><strong>Phone:</strong> ${order.userId.phone}</p>
          </div>
  
          <h3>Items to Pack</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>SKU</th>
              </tr>
            </thead>
            <tbody>
              ${orderDetails
                .map(
                  (product) => {
                    const price = product.productPrice?.$numberDecimal || 0;
                    return `
                      <tr>
                        <td>${product.productId?.productName || ""}</td>
                        <td>Rs. ${price}</td>
                        <td>${order.selectedSize || ""}</td>
                        <td>${order.selectedqty || ""}</td>
                        <td>Rs. ${price}</td>
                        <td>${product.productId?.sku || "N/A"}</td>
                      </tr>
                    `;
                  }
                )
                .join("")}
            </tbody>
          </table>

          <h3>Summary</h3>
          <table>
            <tbody>
              <tr><th>Subtotal</th><td>Rs. ${order.totalPrice?.$numberDecimal || 0}</td></tr>
              <tr><th>Discount</th><td>Rs. ${order.discountTotal?.$numberDecimal || 0}</td></tr>
              <tr><th>Tax</th><td>Rs. ${order.tax || 0}</td></tr>
              <tr><th>Grand Total</th><td>Rs. ${order.totalPrice?.$numberDecimal || 0}</td></tr>
            </tbody>
          </table>
  
          <div style="margin-top: 30px;">
            <p><strong>Special Instructions:</strong> ${order.specialInstructions || "None"}</p>
          </div>

          <button class="print-button" onclick="window.print()">Print Packing Slip</button>
        </body>
        </html>
      `;
  
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    } catch (error) {
      console.error("Error displaying packing slips:", error);
    }
  };

  return (
    <div
      className="inline text-12 font-semibold py-4 px-12 rounded-full truncate flex align-items-center"
      style={{ gap: "10px" }}
    >
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleClick(e);
        }}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <IoPrint size={22} />
      </div>

      <div onClick={handleDownloadPDF} style={{ cursor: "pointer" }}>
        <LuDownload size={22} />
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
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handlePrintOrderPage}>
           Print Order Page
        </MenuItem>
        <Divider />
        <MenuItem onClick={handlePrintPackingSlips}>
          Print Packing Slips
        </MenuItem>
        
      </Menu>
    </div>
  );
}

export default OrdersStatus;
