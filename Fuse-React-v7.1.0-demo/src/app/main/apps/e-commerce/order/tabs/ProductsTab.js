import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProductsTab() {
  const order = useSelector(({ eCommerceApp }) => eCommerceApp.order);
  {
    console.log(order?.data?.orderDetails);
  }

  return (
    <div className="table-responsive">
      <table className="simple">
        <thead>
          <tr>
            <th>
              <Typography className="font-semibold">ID</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Image</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Name</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Price</Typography>
            </th>
            <th>
              <Typography className="font-semibold">Quantity</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.data?.orderDetails?.map((product) => (
            <tr key={product.id}>
              <td className="w-64">{product?.orderId}</td>
              <td className="w-80">
                <img
                  className="product-image"
                  // src={`http://localhost:3000${product?.productId?.image[0]}`}
                  src={`http://localhost:3000${product?.productId?.image?.[0] || ""}`}
                  alt={product?.productId?.productName || "Product"}
                  // alt="product"
                />
              </td>
              <td>
                <Typography
                  component={Link}
                  to={`/apps/e-commerce/products/${product?.productId?._id}`}
                  className="truncate"
                  style={{
                    color: "inherit",
                    textDecoration: "underline",
                  }}
                >
                  {product?.productId?.productName}
                </Typography>
              </td>
              <td className="w-64 text-right">
                <span className="truncate">₹{product?.productPrice?.$numberDecimal}</span>
              </td>
              <td className="w-64 text-right">
                <span className="truncate">{product?.productId?.quantity}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductsTab;