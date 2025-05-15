import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { styled } from '@mui/material/styles';
import reducer from '../store';
import OrdersHeader from './OrdersHeader';
import OrdersTable from './OrdersTable';
import { useState } from 'react';

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
  '& .FusePageCarded-content': {
    display: 'flex',
  },
  '& .FusePageCarded-contentCard': {
    overflow: 'hidden',
  },
}));

function Orders() {
  const [selectedFilter, setSelectedFilter] = useState('Today');
  return <Root header={<OrdersHeader selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />} content={<OrdersTable selectedFilter={selectedFilter}  />} innerScroll />;
}

export default withReducer('eCommerceApp', reducer)(Orders);
