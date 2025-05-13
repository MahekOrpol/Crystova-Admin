import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { Controller, useForm, useFormContext } from 'react-hook-form';

function PricingTab({product}) {
  const methods = useFormContext();
  // const { control } = methods;
  const { control, reset } = useFormContext(); // ✅ Use useFormContext() only if inside FormProvider

  useEffect(() => {
    if (product) {
      reset({
        priceTaxIncl: product?.regularPrice?.$numberDecimal || "",
        salePriceTaxIncl: product?.salePrice?.$numberDecimal || "",
        disRate: product?.discount?.$numberDecimal || "",
      });
    }
  }, [product, reset]);

  return (
    <div>
     
      <Controller
        name="priceTaxIncl"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Regular Price"
            id="priceTaxIncl"
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
            type="number"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="salePriceTaxIncl"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Sale Price"
            id="salePriceTaxIncl"
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
            type="number"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="disRate"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Discount"
            id="disRate"
            InputProps={{
              startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
            type="number"
            variant="outlined"
            fullWidth
          />
        )}
      />

    </div>
  );
}

export default PricingTab;
