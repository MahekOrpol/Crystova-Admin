import FusePageCarded from '@fuse/core/FusePageCarded';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { useTheme, styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from '../store';
import { resetOrder, getOrder } from '../store/orderSlice';
import InvoiceTab from './tabs/InvoiceTab';
import OrderDetailsTab from './tabs/OrderDetailsTab';
import ProductsTab from './tabs/ProductsTab';

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {
    minHeight: 72,
    height: 72,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minHeight: 136,
      height: 136,
    },
  },
}));

function Order(props) {
  const dispatch = useDispatch();
  const order = useSelector(({ eCommerceApp }) => eCommerceApp.order);
  const theme = useTheme();

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noOrder, setNoOrder] = useState(false);

  useDeepCompareEffect(() => {
    dispatch(getOrder(routeParams)).then((action) => {
      if (!action.payload) {
        setNoOrder(true);
      }
    });
  }, [dispatch, routeParams]);

  useEffect(() => {
    return () => {
      dispatch(resetOrder());
      setNoOrder(false);
    };
  }, [dispatch]);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  if (noOrder) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There is no such order!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/e-commerce/orders"
          color="inherit"
        >
          Go to Orders Page
        </Button>
      </motion.div>
    );
  }

  return (
    <Root
      header={
        order && (
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-1 flex-col items-center sm:items-start">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
              >
                <Typography
                  className="flex items-center sm:mb-12"
                  component={Link}
                  role="button"
                  to="/apps/e-commerce/orders"
                  color="inherit"
                >
                  <Icon className="text-20">
                    {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                  </Icon>
                  <span className="mx-4 font-medium">Orders</span>
                </Typography>
              </motion.div>

              <div className="flex flex-col min-w-0 items-center sm:items-start">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
                >
                  <Typography className="text-16 sm:text-20 truncate font-semibold">
                    {`Order`}
                  </Typography>
                  <Typography variant="caption" className="font-medium">
                    {`#${order.data.order.orderId}`}
                  </Typography>
                </motion.div>
              </div>
            </div>
          </div>
        )
      }
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: 'w-full h-64' }}
        >
          <Tab className="h-64" label="Order Details" />
          <Tab className="h-64" label="Products" />
          <Tab className="h-64" label="Invoice" />
        </Tabs>
      }
      content={
        order && (
          <div className="p-16 sm:p-24 max-w-2xl w-full">
            {tabValue === 0 && <OrderDetailsTab />}
            {tabValue === 1 && <ProductsTab />}
            {tabValue === 2 && <InvoiceTab order={order} />}
          </div>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Order);
