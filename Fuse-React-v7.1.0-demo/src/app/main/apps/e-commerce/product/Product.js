import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useDeepCompareEffect } from '@fuse/hooks';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import withReducer from 'app/store/withReducer';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import _ from '@lodash';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { styled } from '@mui/material/styles';
import { resetProduct, newProduct, getProduct } from '../store/productSlice';
import reducer from '../store';
import ProductHeader from './ProductHeader';
import BasicInfoTab from './tabs/BasicInfoTab';
import InventoryTab from './tabs/InventoryTab';
import PricingTab from './tabs/PricingTab';
import ProductImagesTab from './tabs/ProductImagesTab';
import ShippingTab from './tabs/ShippingTab';
import { Box, FormControlLabel, Switch } from '@mui/material';

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

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup
    .string()
    .required('You must enter a product name')
    .min(5, 'The product name must be at least 5 characters'),
});

function Product(props) {
  const dispatch = useDispatch();
  const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);

  const [bestSelling, setBestSelling] = useState(
    product?.bestSelling ? product.bestSelling.toString() === "true" : false
  );
  
  const handleSwitchChange = (event) => {
    const isChecked = event.target.checked;
    setBestSelling(isChecked);
  
    // Update the form data when switch is toggled
    methods.setValue("bestSelling", isChecked ? "1" : "0");
  };
  

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {},
    // productSize: [],
    resolver: yupResolver(schema),
  });
 
  
  const { reset, watch, control, onChange, formState } = methods;
  const form = watch();
  const [loading, setLoading] = useState(true);

  
  useDeepCompareEffect(() => {
    function updateProductState() {
      let { productId, "*": wildcardId } = routeParams;

      if (productId === "details" && wildcardId) {
        productId = wildcardId;
      }

      setLoading(true); // Set loading state before fetching

      if (productId === "new") {
        dispatch(newProduct());
        setLoading(false);
      } else if (productId) {
        dispatch(getProduct({ productId }))
          .then((action) => {
            if (!action.payload || typeof action.payload !== "object") {
              setNoProduct(true);
            }
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }

    updateProductState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset Product on component unload
       */
      dispatch(resetProduct());
      setNoProduct(false);
    };
  }, [dispatch]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }
  /**
   * Show Message if the requested products is not exists
   */
  if (noProduct) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          There is no such product!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/e-commerce/products"
          color="inherit"
        >
          Go to Products Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while product data is loading and form is setted
   */
  // if (
  //   _.isEmpty(form) ||
  //   (product && routeParams.productId !== product.id && routeParams.productId !== 'new')
  // ) {
  //   return <FuseLoading />;
  // }

  if (!product || _.isEmpty(form)) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods}>
   <Root
  header={<ProductHeader productId={routeParams.productId} />}
  contentToolbar={
    <Box display="flex" alignItems="center" justifyContent="space-between" className="w-full h-64">
      {/* Tabs on the left */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab className="h-64" label="Basic Info" />
        <Tab className="h-64" label="Product Images" />
        <Tab className="h-64" label="Pricing" />
        <Tab className="h-64" label="Inventory" />
        <Tab className="h-64" label="Shipping" />
      </Tabs>

      {/* Best Selling Switch on the right */}
      <FormControlLabel
        control={<Switch checked={bestSelling} onChange={handleSwitchChange} />}
        label="Best Selling"
        sx={{ ml: 'auto' }} // Pushes the switch to the right
      />
    </Box>
  }
  content={
    <div className="p-16 sm:p-24 max-w-2xl">
      <div className={tabValue !== 0 ? 'hidden' : ''}>
        <BasicInfoTab product={product}/>
      </div>

      <div className={tabValue !== 1 ? 'hidden' : ''}>
        <ProductImagesTab product={product} />
      </div>

      <div className={tabValue !== 2 ? 'hidden' : ''}>
        <PricingTab product={product}/>
      </div>

      <div className={tabValue !== 3 ? 'hidden' : ''}>
        <InventoryTab />
      </div>

      <div className={tabValue !== 4 ? 'hidden' : ''}>
        <ShippingTab />
      </div>
    </div>
  }
  innerScroll
/>


    </FormProvider>
  );
}

export default withReducer('eCommerceApp', reducer)(Product);
