import _ from '@lodash';
import clsx from 'clsx';
import { IoPrint } from 'react-icons/io5';
import { LuDownload } from "react-icons/lu";
import { useDispatch } from 'react-redux';
import { getOrder } from '../store/orderSlice';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

function OrdersStatus({ status, orderId }) {
  const dispatch = useDispatch();

  const handleDownloadPDF = async (e) => {
    // Prevent default navigation
    e.preventDefault();
    e.stopPropagation();

    if (!orderId) {
      console.error('Order ID is missing');
      return;
    }

    try {
      // Get order details
      const response = await dispatch(getOrder({ orderId })).unwrap();
      if (!response || !response.data) {
        console.error('No order data received');
        return;
      }
      const order = response.data.order;
      const orderDetails = response.data.orderDetails || [];

      // Create PDF
      const doc = new jsPDF();
      let y = 15;
      // Title
      doc.setFontSize(16);
      doc.text('Order Invoice', 14, y);
      y += 10;

      // Order Info
      doc.setFontSize(12);
      doc.text('Order Information', 14, y);
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
      doc.text(`Coupon Code: ${order.couponCode || 'N/A'}`, 14, y);
      y += 10;

      // Customer Info
      doc.setFontSize(12);
      doc.text('Customer Information', 14, y);
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
      doc.text('Payment Information', 14, y);
      y += 7;
      doc.setFontSize(10);
      const payment = order.payment || {};
      doc.text(`TransactionID: ${payment.transactionId || ''}`, 14, y);
      y += 6;
      doc.text(`Payment Method: ${payment.method || ''}`, 14, y);
      y += 6;
      doc.text(`Amount: Rs. ${payment.amount || ''}`, 14, y);
      y += 6;
      doc.text(`Date: ${payment.date ? new Date(payment.date).toLocaleString() : ''}`, 14, y);
      y += 10;

      // Product Table
      doc.setFontSize(12);
      doc.text('Products', 14, y);
      y += 4;
      autoTable(doc, {
        startY: y,
        head: [['Product', 'Price', 'Size', 'Quantity', 'Total']],
        body: orderDetails.map(product => [
          product.productId?.productName || '',
          `Rs. ${product.productPrice?.$numberDecimal || 0}`,
          order.selectedSize || '',
          order.selectedqty || '',
          `Rs. ${product.productPrice?.$numberDecimal || 0}`
        ]),
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 5 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 }
      });
      y = doc.lastAutoTable.finalY + 6;

      // Summary Table
      autoTable(doc, {
        startY: y,
        head: [['Label', 'Amount']],
        body: [
          ['Subtotal', `Rs. ${order.totalPrice?.$numberDecimal || 0}`],
          ['Discount', `Rs. ${order.discountTotal?.$numberDecimal || 0}`],
          ['Tax', `Rs. ${order.tax || 0}`],
          ['Grand Total', `Rs. ${order.totalPrice?.$numberDecimal || 0}`]
        ],
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 5 },
        headStyles: { fillColor: [41, 128, 185], textColor: 255 }
      });

      // Save the PDF
      doc.save(`order-${order.orderId}.pdf`);
    } catch (error) {
      console.error('Error downloading PDF:', error);
    }
  };

  // Default status if not provided
  const defaultStatus = { name: 'Unknown', color: 'gray' };
  const currentStatus = status || defaultStatus;

  return (
    <div
      className='inline text-12 font-semibold py-4 px-12 rounded-full truncate flex align-items-center' 
      style={{gap:'10px'}}
    >
           <IoPrint size={22}/>
      <div onClick={handleDownloadPDF} style={{ cursor: 'pointer' }}>
        <LuDownload size={22} />
      </div>
    </div>
  );
}

export default OrdersStatus;
