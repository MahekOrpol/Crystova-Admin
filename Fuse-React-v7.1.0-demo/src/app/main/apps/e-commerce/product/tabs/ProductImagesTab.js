import { orange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import Icon from "@mui/material/Icon";
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
    transition: "box-shadow 200ms ease-in-out",
  },
  "& .productImageItem": {
    transition: "box-shadow 200ms ease-in-out",
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
    zIndex: 1,
  },
}));

function ProductImagesTab({ product }) {
  const { control, setValue, getValues } = useFormContext();

  useEffect(() => {
    if (product && Array.isArray(product.image) && product.image.length > 0) {
      console.log("Raw product.image:", product.image);

      const existingImages = product.image.map((img, index) => {
        const extension = img.split(".").pop().toLowerCase();
        const isVideo = ["mp4", "webm", "ogg"].includes(extension);

        return {
          id: `existing-${index}`,
          url: `https://dev.crystovajewels.com${img}`,
          type: isVideo ? "video" : "image",
          isExisting: true,
          path: img,
        };
      });
      setValue("images", existingImages);
      console.log("Set existing images:", existingImages);
    }
  }, [product?.image, setValue]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newImages = await Promise.all(
      files.map(async (file) => {
        const extension = file.name.split(".").pop().toLowerCase();
        const isVideo = ["mp4", "webm", "ogg"].includes(extension);
        return {
          id: FuseUtils.generateGUID(),
          url: URL.createObjectURL(file),
          file,
          type: isVideo ? "video" : "image",
          isExisting: false,
          name: file.name,
        };
      })
    );
    return newImages;
  };

  const handleRemoveImage = (imageToRemove, onChange, currentImages) => {
    const filteredImages = currentImages.filter(
      (img) => img.id !== imageToRemove.id
    );
    onChange(filteredImages);
  };

  return (
    <Root>
      <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
        <Controller
          name="images"
          control={control}
          defaultValue={[]}
          render={({ field: { value = [], onChange } }) => (
            <>
              {/* Upload Button */}
              <label
                htmlFor="button-file"
                className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg bg-gray-100"
              >
                <input
                  accept="image/*"
                  className="hidden"
                  id="button-file"
                  type="file"
                  multiple
                  onChange={async (e) => {
                    const newImages = await handleImageUpload(e);
                    onChange([...value, ...newImages]);
                  }}
                />
                <div className="flex flex-col items-center justify-center">
                  <Icon fontSize="large" color="action">
                    cloud_upload
                  </Icon>
                  <span className="mt-4 text-xs">Upload Images</span>
                </div>
              </label>

              {/* Images Preview */}
              <div className="flex flex-wrap">
                {value && value.map((img, index) => (
                  <div
                    key={img.id}
                    className="relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden shadow hover:shadow-lg productImageItem"
                  >
                    {img.type === "video" ? (
                      <video
                        className="w-full h-full object-cover"
                        src={img.url}
                        controls
                      />
                    ) : (
                      <img
                        className="w-full h-full object-cover"
                        src={img.url}
                        alt={`Product ${index + 1}`}
                      />
                    )}
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
