import {
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

function InventoryTab() {
  const methods = useFormContext();
  const { control, setValue, watch } = methods;
  const [stock, setStock] = useState("");

  // const [variations, setVariations] = useState([]);
  // const selectedSizes = watch("productSize") || [];
  
  // useEffect(() => {
  //   const newVariations = selectedSizes.map((size) => {
  //     const existing = variations.find((v) => v.size === size);
  //     return existing || { size, price: "", quantity: "" };
  //   });
  
  //   // Compare stringified JSON to detect real changes
  //   if (JSON.stringify(newVariations) !== JSON.stringify(variations)) {
  //     setVariations(newVariations);
  //     setValue("productVariations", newVariations);
  //   }
  // }, [selectedSizes]);
    
  // // Handle price/quantity updates in variations
  // const handleVariationChange = (index, field, value) => {
  //   const updated = [...variations];
  //   updated[index][field] = value;
  //   setVariations(updated);
  //   setValue("productVariations", updated);
  // };

  const handleStockChange = (event) => {
    setStock(event.target.value);
  };

  return (
    <div>
      <Controller
        name="sku"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            required
            label="SKU"
            autoFocus
            id="sku"
            variant="outlined"
            fullWidth
          />
        )}
      />

{/* <Controller
  name="quantity"
  control={control}
  render={({ field }) => (
    <TextField
      {...field}
      className="mt-8 mb-16"
      label="Quantity"
      id="quantity"
      variant="outlined"
      type="number"
      fullWidth
      onChange={(e) => {
        const value = parseInt(e.target.value, 10);
        field.onChange(e); // update form state
        if (value > 0) {
          setValue("stock", "In Stock");
        } else if (value === 0) {
          setValue("stock", "Sold Out");
        } else {
          setValue("stock", "");
        }
      }}
    />
  )}
/> */}


<Controller
  name="quantity"
  control={control}
  // defaultValue=""
  render={({ field }) => (
    <TextField
      {...field}
      className="mt-8 mb-16"
      label="Quantity"
      id="quantity"
      variant="outlined"
      type="number"
      fullWidth
      onChange={(e) => {
        const value = parseInt(e.target.value, 10);

        field.onChange(e); // Ensure value is properly updated

        // Auto-update stock based on quantity
        if (value > 0) {
          setValue("stock", "In Stock");
        } else if (value === 0) {
          setValue("stock", "Sold Out");
        } else {
          setValue("stock", ""); // Optional, for negative or invalid values
        }
      }}
    />
  )}
/>


<Controller
  name="productSize"
  control={control}
  id="productSize"
  defaultValue={[]} 
  render={({ field: { onChange, value } }) => (
    <Autocomplete
      className="mt-8 mb-16"
      multiple
      freeSolo
      options={[]}
      value={value || []}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Select multiple product Size"
          label="Product Size"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            key={`${option}-${index}`}  // Ensures uniqueness
            label={option.toString().replace(/\[|\]/g, "")} 
            {...getTagProps({ index })}
          />
        ))
      }

    />
  )}
/>

{/* <Controller
        name="productSize"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            multiple
            freeSolo
            options={[]}
            value={value || []}
            onChange={(event, newValue) => onChange(newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select multiple product sizes"
                label="Product Size"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
            )}
            renderTags={(tagValue, getTagProps) =>
              tagValue.map((option, index) => (
                <Chip
                  key={`${option}-${index}`}
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
          />
        )}
      /> */}

      {/* Dynamic Size-Price-Quantity Inputs
      {variations.map((variation, index) => (
        <div key={index} className="flex gap-4 mb-4">
          <TextField
            label={`Size: ${variation.size}`}
            value={variation.size}
            variant="outlined"
            disabled
            style={{ width: "150px" }}
          />
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            value={variation.price}
            onChange={(e) =>
              handleVariationChange(index, "price", e.target.value)
            }
          />
          <TextField
            label="Price"
            type="number"
            variant="outlined"
            value={variation.price}
            onChange={(e) =>
              handleVariationChange(index, "price", e.target.value)
            }
          />
          <TextField
            label="Quantity"
            type="number"
            variant="outlined"
            value={variation.quantity}
            onChange={(e) =>
              handleVariationChange(index, "quantity", e.target.value)
            }
          />
        </div>
      ))} */}


      {/* <FormControl fullWidth className="mt-8 mb-16">
        <InputLabel id="stock-label">Stock</InputLabel>
        <Select
        name="stock"
          labelId="stock-label"
          id="stock"
          value={stock}
          label="Stock"
          onChange={handleStockChange}
        >
          <MenuItem value="In Stock">In Stock</MenuItem>
          <MenuItem value="Sold Out">Sold Out</MenuItem>
        </Select>
      </FormControl> */}
       <Controller
        name="stock"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl fullWidth className="mt-8 mb-16">
            <InputLabel id="stock-label">Stock</InputLabel>
            <Select
              {...field}
              labelId="stock-label"
              id="stock"
              label="Stock"
            >
              <MenuItem value="In Stock">In Stock</MenuItem>
              <MenuItem value="Sold Out">Sold Out</MenuItem>
            </Select>
          </FormControl>
        )}
      />
       <Controller
        name="gender"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl fullWidth className="mt-8 mb-16">
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              {...field}
              labelId="gender-label"
              value={field.value || ""} onChange={field.onChange}
              id="gender"
              label="gender"
            >
              <MenuItem value="Men">Men</MenuItem>
              <MenuItem value="Women">Women</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      {/* <Controller
  name="stock"
  control={control}
  defaultValue=""
  render={({ field }) => (
    <FormControl fullWidth className="mt-8 mb-16">
      <InputLabel id="stock-label">Stock</InputLabel>
      <Select
        {...field}
        labelId="stock-label"
        id="stock"
        label="Stock"
      >
        <MenuItem value="In Stock">In Stock</MenuItem>
        <MenuItem value="Sold Out">Sold Out</MenuItem>
      </Select>
    </FormControl>
  )}
/> */}

 

    </div>
  );
}

export default InventoryTab;
