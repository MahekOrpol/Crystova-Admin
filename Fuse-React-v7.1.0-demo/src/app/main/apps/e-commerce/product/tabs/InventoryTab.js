import {
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

function InventoryTab() {
  const methods = useFormContext();
  const { control ,setValue} = methods;
  const [stock, setStock] = useState("");

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
              field.onChange(e); // Update react-hook-form value

              // Auto update stock based on quantity
              if (value > 0) {
                setValue("stock", "In Stock");
              } else if (value === 0) {
                setValue("stock", "Sold Out");
              } else {
                setValue("stock", ""); // Optional, if negative or empty
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
      value={value}
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
            key={index}
            label={option.toString().replace(/\[|\]/g, "")} // Removes brackets from display
            {...getTagProps({ index })}
          />
        ))
      }
    />
  )}
/>


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
