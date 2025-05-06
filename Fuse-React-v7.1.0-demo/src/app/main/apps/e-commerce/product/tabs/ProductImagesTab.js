import { orange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Icon from "@mui/material/Icon";
import clsx from "clsx";
import FuseUtils from "@fuse/utils";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";
const Root = styled("div")(({ theme }) => ({
  "& .productImageFeaturedStar": {
    position: "absolute",
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },
  "& .productImageUpload": {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  "& .productImageItem": {
    transitionProperty: "box-shadow",
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    "&:hover": {
      "& .productImageFeaturedStar": {
        opacity: 0.8,
      },
    },
    "&.featured": {
      pointerEvents: "none",
      boxShadow: theme.shadows[3],
      "& .productImageFeaturedStar": {
        opacity: 1,
      },
      "&:hover .productImageFeaturedStar": {
        opacity: 1,
      },
    },
  },
  "& .mediaTypeLabel": {
    position: "absolute",
    bottom: 8,
    left: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "white",
    padding: "2px 8px",
    borderRadius: 4,
    fontSize: 12,
  },
}));
function ProductImagesTab({ product }) {
  const methods = useFormContext();
  const { control, watch, setValue } = methods;
  useEffect(() => {
    if (product) {
      // Format existing images from the server
      const existingImages = Array.isArray(product.image)
        ? product.image.map((img, index) => ({
            id: `existing-${index}`,
            url: `https://dev.crystovajewels.com${img}`,
            type: 'image',
            isExisting: true,
            path: img
          }))
        : [];
      setValue("images", existingImages);
    }
  }, [product, setValue]);
  const images = watch("images") || [];
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newImages = await Promise.all(
      files.map(async (file) => {
        return {
          id: FuseUtils.generateGUID(),
          url: URL.createObjectURL(file),
          file: file, // Keep the actual file object
          type: 'image',
          isExisting: false,
          name: file.name // Add file name for reference
        };
      })
    );
    return newImages;
  };
  const handleRemoveImage = (imageToRemove, onChange, currentImages) => {
    const filteredImages = currentImages.filter(image => image.id !== imageToRemove.id);
    onChange(filteredImages);
  };
  return (
    <Root>
      <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
        <Controller
          name="images"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <>
              <label
                htmlFor="button-file"
                className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
              >
                <input
                  accept="image/*"
                  className="hidden"
                  id="button-file"
                  type="file"
                  multiple // Allow multiple file selection
                  onChange={async (e) => {
                    const newImages = await handleImageUpload(e);
                    onChange([...(value || []), ...newImages]);
                  }}
                />
                <div className="flex flex-col items-center justify-center">
                  <Icon fontSize="large" color="action">cloud_upload</Icon>
                  <span className="mt-4">Upload Images</span>
                </div>
              </label>
              <div className="flex flex-wrap">
                {value && value.map((img, index) => (
                  <div
                    key={img.id}
                    className="relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden shadow hover:shadow-lg"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={img.url}
                      alt={`Product ${index + 1}`}
                    />
                    <div
                      className="absolute top-0 right-0 p-8 cursor-pointer"
                      onClick={() => handleRemoveImage(img, onChange, value)}
                    >
                      <Icon className="text-red-600">delete</Icon>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        />
      </div>
    </Root>
  );
}
export default ProductImagesTab;