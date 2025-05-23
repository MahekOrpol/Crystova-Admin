import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Checkbox from '@mui/material/Checkbox';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import OrdersStatus from '../order/OrdersStatus';
import { selectOrders, getOrders } from '../store/ordersSlice';
import OrdersTableHead from './OrdersTableHead';

function OrdersTable({selectedFilter}) {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const searchText = useSelector(({ eCommerceApp }) => eCommerceApp.orders.searchText);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(orders);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  useEffect(() => {
    dispatch(getOrders()).then(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (searchText.length !== 0) {
      setData(FuseUtils.filterArrayByString(orders, searchText));
      setPage(0);
    } else {
      setData(orders);
    }
  }, [orders, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }

    setOrder({
      direction,
      id,
    });
  }

  useEffect(() => {
    let filteredData = orders;

    if (searchText.length !== 0) {
      filteredData = FuseUtils.filterArrayByString(orders, searchText);
    }

    if (selectedFilter) {
      filteredData = filterOrdersByDate(filteredData, selectedFilter);
    }

    setData(filteredData);
    setPage(0);
  }, [orders, searchText, selectedFilter]);
  
  const statusMap = {
    pending: { name: 'Pending', color: 'orange' },
    shipped: { name: 'Shipped', color: 'blue' },
    delivered: { name: 'Delivered', color: 'green' },
    cancelled: { name: 'Cancelled', color: 'red' },
  };
  
  
  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  function handleDeselect() {
    setSelected([]);
  }

  function handleClick(item) {
    props.navigate(`/apps/e-commerce/orders/${item.orderId}`);
  }

  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (loading) {
    return <FuseLoading />;
  }

  function filterOrdersByDate(orders, filterType) {
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
        case 'Today':
          return orderDate >= startOfToday;
        case 'Yesterday':
          return (
            orderDate >= startOfYesterday && orderDate < startOfToday
          );
        case 'Last Week':
          return orderDate >= startOfLastWeek;
        case 'Last Month':
          return orderDate >= startOfLastMonth;
        case 'This Year':
          return orderDate >= startOfYear;
        default:
          return true;
      }
    });
  }

  
  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There are no orders!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <OrdersTableHead
            selectedOrderIds={selected}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            onMenuItemClick={handleDeselect}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case 'id': {
                      return parseInt(o.id, 10);
                    }
                    case 'customer': {
                      return o.customer.firstName;
                    }
                    case 'payment': {
                      return o.payment.method;
                    }
                    case 'status': {
                      return o.status[0].name;
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                },
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n,index) => {
                const isSelected = selected.indexOf(n?.data?.id || n?.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n?.id || n?.id || `row-${index}`}
                    selected={isSelected}
                    onClick={(event) => handleClick(n)}
                  >
                    <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                    #{n?.orderId }
                    </TableCell>

                 <TableCell>
                   {new Date(n.createdAt).toLocaleString('en-GB', {
                     day: '2-digit',
                     month: 'short', // This gives "Jan", "Feb", etc.
                     hour: 'numeric',
                     minute: '2-digit',
                     hour12: true,
                   }).replace(',', ' at')}
                 </TableCell>
                 

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                    {n?.userId?.name}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" >
                      <span>₹</span>
                      {n?.totalPrice?.$numberDecimal}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row" >
                      {n?.discountTotal?.$numberDecimal}
                      <span>%</span>
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n?.paymentStatus}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                    <OrdersStatus status={statusMap[n?.status]} orderId={n?.orderId} />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(OrdersTable);

