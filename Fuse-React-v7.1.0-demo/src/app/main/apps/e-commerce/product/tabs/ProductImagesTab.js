import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import clsx from 'clsx';
import FuseUtils from '@fuse/utils';
import { Controller, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

const Root = styled('div')(({ theme }) => ({
  '& .productImageFeaturedStar': {
    position: 'absolute',
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0,
  },

  '& .productImageUpload': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },

  '& .productImageItem': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:hover': {
      '& .productImageFeaturedStar': {
        opacity: 0.8,
      },
    },
    '&.featured': {
      pointerEvents: 'none',
      boxShadow: theme.shadows[3],
      '& .productImageFeaturedStar': {
        opacity: 1,
      },
      '&:hover .productImageFeaturedStar': {
        opacity: 1,
      },
    },
  },
}));

function ProductImagesTab({product }) {
  const methods = useFormContext();
  const { control, watch, setValue } = methods;

  // const productImages = product?.image || [];
  const productImages = Array.isArray(product?.image) && product.image.length > 0 ? product.image : [];

  // const formattedImages = product.image.map((img, index) => ({
  //   id: index.toString(), // Unique ID for each image
  //   url: `http://localhost:3000${img}`,
  //   file: null,
  //   type: 'image',
  // }));
  
  
  // useEffect(() => {
  //   if (productImages.length > 0) {
  //     const formattedImages = productImages.map((img, index) => ({
  //       id: index.toString(),
  //       url: `http://localhost:3000${img}`,
  //       file: null,
  //       type: 'image',
  //     }));
  
  //     setValue('images', formattedImages, { shouldValidate: true, shouldDirty: true });
  //     console.log('productImages', productImages)
  //   }
  // }, [productImages, setValue]);
  
  useEffect(() => {
    console.log('product.image:', product?.image); // Debugging
    if (Array.isArray(product?.image) && product.image.length > 0) {
      const formattedImages = product.image.map((img, index) => ({
        id: index.toString(),
        url: `http://localhost:3000${img}`,
        file: null,
        type: 'image',
      }));
  
      setValue('images', formattedImages, { shouldValidate: true, shouldDirty: true });
      console.log('Formatted Images:', formattedImages); // Debugging
    } else {
      setValue('images', []); // 👈 Ensures images is never undefined
    }
  }, [product?.image, setValue]);
  
  // useEffect(() => {
  //   if (productImages.length > 0) {
  //     const formattedImages = productImages.map((img, index) => ({
  //       id: index.toString(),
  //       url: `http://localhost:3000${img}`, // Fixed image URL formatting
  //       file: null,
  //       type: 'image',
  //     }));

  //     setValue('images', formattedImages);
  //   }
  // }, [productImages, setValue]); // Runs only when productImages changes

  // setValue('images', formattedImages);
  
  // if (productImages.length > 0) {
  //   setValue('images', formattedImages);
  // }  

  const images = watch('images') || [];

  return (
    // <Root>
    //   <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
    //     <Controller
    //       name="images"
    //       control={control}
    //       render={({ field: { onChange, value } }) => (
    //         <label
    //           htmlFor="button-file"
    //           className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
    //         >
    //           <input
    //             accept="image/*"
    //             className="hidden"
    //             id="button-file"
    //             type="file"
    //             onChange={async (e) => {
    //               function readFileAsync() {
    //                 return new Promise((resolve, reject) => {
    //                   const file = e.target.files[0];
    //                   if (!file) {
    //                     return;
    //                   }
    //                   const reader = new FileReader();

    //                   reader.onload = () => {
    //                     resolve({
    //                       id: FuseUtils.generateGUID(),
    //                       // url: `data:${file.type};base64,${btoa(reader.result)}`,
    //                       url: URL.createObjectURL(file),
    //                       file: file,
    //                       type: 'image',
    //                     });
    //                   };

    //                   reader.onerror = reject;

    //                   reader.readAsBinaryString(file);
    //                 });
    //               }

    //               const newImage = await readFileAsync();

    //               onChange([newImage, ...(value || [])]);
    //             }}
    //           />
    //           <Icon fontSize="large" color="action">
    //             cloud_upload
    //           </Icon>
    //         </label>
    //       )}
    //     />
    //     <Controller
    //       name="featuredImageId"
    //       control={control}
    //       defaultValue=""
    //       render={({ field: { onChange, value } }) =>
    //         (images || []).map((media) => (
    //           <div
    //             onClick={() => onChange(media.id)}
    //             onKeyDown={() => onChange(media.id)}
    //             role="button"
    //             tabIndex={0}
    //             className={clsx(
    //               'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
    //               media.id === value && 'featured'
    //             )}
    //             key={media.id}
    //           >
    //             <Icon className="productImageFeaturedStar">star</Icon>
    //             <img className="max-w-none w-auto h-full" src={media.url} alt="product" />
    //           </div>
    //         ))
    //       }
    //     />
    //   </div>
    // </Root>
    <Root>
    <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
      <Controller
        name="images"
        control={control}
        render={({ field: { onChange, value } }) => (
          <label
            htmlFor="button-file"
            className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
          >
            <input
              accept="image/*"
              className="hidden"
              id="button-file"
              type="file"
              onChange={async (e) => {
                function readFileAsync() {
                  return new Promise((resolve, reject) => {
                    const file = e.target.files[0];
                    if (!file) {
                      return;
                    }
                    const reader = new FileReader();

                    reader.onload = () => {
                      resolve({
                        id: FuseUtils.generateGUID(),
                        url: URL.createObjectURL(file),
                        file: file,
                        type: 'image',
                      });
                    };

                    reader.onerror = reject;

                    reader.readAsDataURL(file);
                  });
                }

                const newImage = await readFileAsync();

                onChange([newImage, ...(value || [])]);
              }}
            />
            <Icon fontSize="large" color="action">
              cloud_upload
            </Icon>
          </label>
        )}
      />
      <Controller
        name="featuredImageId"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) =>
          images.map((media) => (
            <div
              onClick={() => onChange(media.id)}
              onKeyDown={() => onChange(media.id)}
              role="button"
              tabIndex={0}
              className={clsx(
                'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
                media.id === value && 'featured'
              )}
              key={media.id}
            >
              <Icon className="productImageFeaturedStar">star</Icon>
              <img className="max-w-none w-auto h-full" src={media.url} alt="product" />
            </div>
          ))
        }
      />
    </div>
  </Root>
  );
}

export default ProductImagesTab;
