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

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://dev.crystovajewels.com/api/v1/category/get"
      );
      console.log(response.data);
      setCategories(
        Array.isArray(response.data)
          ? response.data
          : response.data.categories || []
      );

      // setCategories(
      //   Array.isArray(response.data.categories) ? response.data.categories : []
      // );
      // setCategories(Array.isArray(response.data) ? response.data : response.data.categories || []);
      // const fetchedCategories = response.data?.categories;
      // setCategories(Array.isArray(fetchedCategories) ? fetchedCategories : []);
      // setCategories(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]); // ✅ Fallback to empty array on error
    }
  };

  useEffect(() => {
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
        defaultValue={[]} // Ensure default is always an array
        render={({ field: { onChange, value } }) => {
          console.log("Categories:", categories); // Log categories from API
          console.log("Selected Categories:", value); // Log selected values

          return (
            <Autocomplete
              className="mt-8 mb-16"
              multiple
              options={categories || []} // ✅ Ensure API data is used
              getOptionLabel={(option) => option?.categoryName || ""} // ✅ Correct label field
              isOptionEqualToValue={(option, value) => option?.id === value?.id} // ✅ Proper ID matching
              value={Array.isArray(value) ? value : []}
              onChange={(event, newValue) => onChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select multiple categories"
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
