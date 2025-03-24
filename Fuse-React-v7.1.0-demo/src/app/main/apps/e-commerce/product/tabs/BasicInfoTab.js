import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useFormContext, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

function BasicInfoTab({product}) {
  const methods = useFormContext();
  const { control,reset, formState:{errors} } = methods;
  const [categories, setCategories] = useState();

  // const methods = useForm({
  //   defaultValues: {
  //     categoryName: [], // Ensure it's initialized as an array
  //   },
  // });
  
  // useEffect(() => {
  //   if (props.product) {
  //     methods.reset({
  //       ...props.product,
  //       categoryName: Array.isArray(props.product.categoryName)
  //         ? props.product.categoryName
  //         : [props.product.categoryName], // Convert to array if necessary
  //     });
  //   }
  // }, [props.product, methods]);
  
  // const getCateories = async () => {
  //   const response = await axios.get(
  //     "http://localhost:3000/api/v1/category/get"
  //   );
  //   // setCategories(response.data);
  //   setCategories(Array.isArray(response.data) ? response.data : []);

  // };

  // useEffect(() => {
  //   if (product) {
  //     reset({
  //       ...product,
  //       categoryName: Array.isArray(product.categoryName)
  //         ? product.categoryName
  //         : [product.categoryName], // Ensure it's always an array
  //     });
  //   }
  // }, [product, reset]);

  useEffect(() => {
    if (product) {
      reset({
        ...product,
        categoryName: Array.isArray(product.categoryName)
          ? product.categoryName
          : product.categoryName ? [product.categoryName] : [], // ✅ Ensures it's always an array
      });
    }
  }, [product, reset]);
  

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/category/get");
      setCategories(Array.isArray(response.data) ? response.data : []); // ✅ Ensure it's always an array
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

      {/* <Controller
        name="categoryName"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            multiple
            options={categories || []} // Use fetched categories
            // getOptionLabel={(option) => option.categoryName || option} // Adjust label
            getOptionLabel={(option) => (typeof option === "string" ? option : option.categoryName)}

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
  defaultValue={[]} // Ensure default value is an array
  render={({ field: { onChange, value } }) => (
    <Autocomplete
      className="mt-8 mb-16"
      multiple
      options={categories || []}
      getOptionLabel={(option) =>
        option && typeof option === "object" && option.categoryName
          ? option.categoryName
          : "Unknown Category" // ✅ Safe fallback
      }
      value={Array.isArray(value) ? value : []} 
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


{/* <Controller
  name="categoryName"
  control={control}
  defaultValue={[]} // Ensure default value is an array
  render={({ field: { onChange, value } }) => (
    <Autocomplete
      className="mt-8 mb-16"
      multiple
      options={categories || []}
      getOptionLabel={(option) => (typeof option === "string" ? option : option.categoryName)}
      value={Array.isArray(value) ? value : []} // Ensure value is always an array
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
