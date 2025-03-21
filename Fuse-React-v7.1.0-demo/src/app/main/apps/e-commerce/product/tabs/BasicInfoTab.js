import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormContext, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;
  const [categories, setCategories] = useState();

  const getCateories = async () => {
    const response = await axios.get(
      "https://crystova.cloudbusiness.cloud/api/v1/category/get"
    );
    setCategories(response.data);
  };

  useEffect(() => {
    getCateories();
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

      {/* <Controller
        name="categoryName"
        control={control}
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
                placeholder="Select multiple categories"
                label="Category Name"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      /> */}

      <Controller
        name="categoryName"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            multiple
            options={categories || []} // Use fetched categories
            getOptionLabel={(option) => option.categoryName || option} // Adjust label
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select multiple categories"
                label="Category Name"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
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
            value={value}
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
