import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormContext, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
function BasicInfoTab({ product }) {
  const methods = useFormContext();
  const {
    control,
    reset,
    formState: { errors },
  } = methods;
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (product && categories.length) {
      const matchedCategories = categories.filter((cat) =>
        product.categoryName?.includes(cat.categoryName)
      );
      reset({
        ...product,
        categoryName: matchedCategories,
      });
    }
  }, [product, categories, reset]);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          "https://dev.crystovajewels.com/api/v1/category/get"
        );
        const rawCategories = Array.isArray(response.data)
          ? response.data
          : response.data.categories || [];
        const flattened = [];
        rawCategories.forEach((cat) => {
          // Add category
          flattened.push({
            id: cat.id,
            type: "Category",
            categoryName: cat.categoryName,
            displayName: cat.categoryName,
            isCategory: true
          });
          // Add its subcategories right after
          (cat.subcategories || []).forEach((sub) => {
            flattened.push({
              id: sub._id,
              type: "Subcategory",
              categoryName: `${cat.categoryName}  ${sub.subcategoryName}`,
              displayName: ` ${sub.subcategoryName}`,
              parentCategory: cat.categoryName,
              isSubcategory: true
            });
          });
        });
        setCategories(flattened);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };
    getCategories();
  }, []);
  return (
    <div>
      <Controller
        name="productName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.productName}
            required
            helperText={errors?.name?.message}
            label="Name"
            autoFocus
            id="productName"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="productsDescription"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="productsDescription"
            label="Description"
            type="text"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Controller
        name="categoryName"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => {
          return (
            <Autocomplete
              className="mt-8 mb-16"
              multiple
              options={categories}
              getOptionLabel={(option) => option?.displayName || ""}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              value={Array.isArray(value) ? value : []}
              onChange={(event, newValue) => onChange(newValue)}
              renderOption={(props, option) => (
                <li {...props} style={{
                  paddingLeft: option.isSubcategory ? '48px' : '16px',
                  backgroundColor: option.isSubcategory ? '#F5F5F5' : 'white'
                }}>
                  {option.displayName}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select categories or subcategories"
                  label="Category Name"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          );
        }}
      />
      <Controller
        name="tags"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            multiple
            freeSolo
            options={[]}
            value={Array.isArray(value) ? value : []}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select multiple tags"
                label="Tags"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
    </div>
  );
}
export default BasicInfoTab;





