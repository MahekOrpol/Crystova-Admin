import {
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

function InventoryTab() {
  const methods = useFormContext();
  const { control, setValue, watch } = methods;
  const [stock, setStock] = useState("");
  const [enableVariations, setEnableVariations] = useState(false);
  const [variations, setVariations] = useState([]);
  const hasVariations = watch("hasVariations");

  const selectedSizes = watch("productSize") || [];

  useEffect(() => {
    if (hasVariations === "true" || hasVariations === true) {
      setEnableVariations(true);
    } else {
      setEnableVariations(false);
    }
  }, [hasVariations]);
  
  useEffect(() => {
    const r = watch("regularPrice");
    const s = watch("salePrice");
    const d = watch("discount");
  
    console.log("Default values before variations:");
    console.log("Regular Price:", r);
    console.log("Sale Price:", s);
    console.log("Discount:", d);
  }, []);
  
  useEffect(() => {
    if (enableVariations) {

      const variationMap = new Map(
        variations.map((v) => {
          console.log("Mapping variation productSize:", v.productSize);
          return [v.productSize, v];
        })
      );
      
          // const parseDecimal = (val) => {
          //   if (typeof val === "object" && val?.$numberDecimal) return val.$numberDecimal;
          //   return val ?? "";
          // };
          const parseDecimal = (val) =>{
            typeof val === "object" && val?.$numberDecimal ? val.$numberDecimal : val ?? "";
          return val ?? "";
        };
        
      const newVariations = selectedSizes.map((size) => {
        const existing = variationMap.get(size);
        const now = new Date().toISOString(); // current time in ISO format
      
        console.log(variationMap)
        return existing
          ? {
              ...existing,
              regularPrice: parseDecimal(existing.regularPrice),
              salePrice: parseDecimal(existing.salePrice),
              discount: parseDecimal(existing.discount),
              createdAt: existing.createdAt || now // Keep existing or assign new
            }
          : {
              productSize: size,
              regularPrice: watch("regularPrice") || "",
              salePrice: watch("salePrice") || "",
              discount: watch("discount") || "",
              createdAt: now // Assign new time on creation
            };
      });
      
  
      if (JSON.stringify(newVariations) !== JSON.stringify(variations)) {
        console.log("Updated variations from selectedSizes:", newVariations);
        setVariations(newVariations);
        setValue("productVariations", newVariations);
        setValue("variations", JSON.stringify(newVariations));
      }
    } else {
      if (variations.length > 0) {
        console.log("Clearing variations due to disable toggle");
        setVariations([]);
        setValue("productVariations", []);
        setValue("variations", "[]");
      }
    }
  }, [enableVariations, selectedSizes]);
  
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
              field.onChange(e);

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
      />

      <Controller
        name="enableVariations"
        control={control}
        render={({ field }) => (
          <Switch
            checked={enableVariations}
            onChange={(e) => {
              const isEnabled = e.target.checked;
              field.onChange(isEnabled);
              setEnableVariations(isEnabled);
              setValue("hasVariations", isEnabled); // Ensure payload includes hasVariations
              if (!isEnabled) {
                setVariations([]);
                setValue("productVariations", []);
              }
            }}
          />
        )}
      />
      <Controller
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
                <Chip key={`${option}-${index}`} label={option} {...getTagProps({ index })} />
              ))
            }
          />
        )}
      />

      {enableVariations &&
        variations.map((variation, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <TextField label={`Size: ${variation.productSize}`} variant="outlined" disabled />
            <TextField
  label="Regular Price"
  type="number"
  variant="outlined"
  value={variation.regularPrice}
  onChange={(e) => {
    const updated = variations.map((v, i) =>
      i === index ? { ...v, regularPrice: e.target.value } : v
    );
    console.log(`Regular Price updated for size ${variation.productSize}:`, updated);
    setVariations(updated);
    setValue("variations", JSON.stringify(updated));
  }}
/>


<TextField
  label="Sale Price"
  type="number"
  variant="outlined"
  value={variation.salePrice}
  onChange={(e) => {
    const updated = variations.map((v, i) =>
      i === index ? { ...v, salePrice: e.target.value } : v
    );
    setVariations(updated);
    setValue("productVariations", updated);
  }}
/>

<TextField
  label="Discount"
  type="number"
  variant="outlined"
  value={variation.discount}
  onChange={(e) => {
    const updated = variations.map((v, i) =>
      i === index ? { ...v, discount: e.target.value } : v
    );
    setVariations(updated);
    setValue("productVariations", updated);
  }}
/>

          </div>
        ))}

      <Controller
        name="stock"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl fullWidth className="mt-8 mb-16">
            <InputLabel id="stock-label">Stock</InputLabel>
            <Select {...field} labelId="stock-label" id="stock" label="Stock">
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
              value={field.value || ""}
              onChange={field.onChange}
              id="gender"
              label="gender"
            >
              <MenuItem value="Men">Men</MenuItem>
              <MenuItem value="Women">Women</MenuItem>
            </Select>
          </FormControl>
        )}
      />
    </div>
  );
}

export default InventoryTab;
