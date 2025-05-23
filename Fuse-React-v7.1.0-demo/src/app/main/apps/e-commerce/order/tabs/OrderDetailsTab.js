import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Avatar from "@mui/material/Avatar";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GoogleMap from "google-map-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import OrdersStatus from "../OrdersStatus";

function Marker(props) {
  return (
    <Tooltip title={props.text} placement="top">
      <Icon className="text-red">place</Icon>
    </Tooltip>
  );
}

function OrderDetailsTab() {
  const order = useSelector(({ eCommerceApp }) => eCommerceApp.order);
  const [map, setMap] = useState("shipping");

  return (
    <div>
      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">account_circle</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
            Customer
          </Typography>
        </div>

        <div className="mb-24">
          <div className="table-responsive mb-48">
            <table className="simple">
              <thead>
                <tr>
                  <th>
                    <Typography className="font-semibold">Name</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Email</Typography>
                  </th>
                  <th>
                    <Typography className="font-semibold">Phone</Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="flex items-center">
                      {/* <Avatar src={order.customer.avatar} /> */}
                      <Typography className="truncate mx-8">
                        {`${order?.data?.order?.userId?.name}`}
                      </Typography>
                    </div>
                  </td>
                  <td>
                    <Typography className="truncate">
                      {order?.data?.order?.userId?.email}
                    </Typography>
                  </td>
                  <td>
                    <Typography className="truncate">
                      {order?.data?.order?.userId?.phone}
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* <Accordion
            className="border-0 shadow-0 overflow-hidden"
            expanded={map === 'shipping'}
            onChange={() => setMap(map !== 'shipping' ? 'shipping' : false)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{ root: 'border border-solid rounded-16 mb-16' }}
            >
              <Typography className="font-semibold">Shipping Address</Typography>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col md:flex-row -mx-8">
              <Typography className="w-full md:max-w-256 mb-16 md:mb-0 mx-8 text-16">
              {order.customer.shippingAddress.address} 
              </Typography>
              <div className="w-full h-320 rounded-16 overflow-hidden mx-8">
                <GoogleMap
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_MAP_KEY,
                  }}
                  defaultZoom={15}
                  defaultCenter={[
                    // order.customer.shippingAddress.lat,
                    // order.customer.shippingAddress.lng,
                  ]}
                >
                 <Marker
                    text={order.customer.shippingAddress.address}
                    lat={order.customer.shippingAddress.lat}
                    lng={order.customer.shippingAddress.lng}
                  /> 
                </GoogleMap>
              </div>
            </AccordionDetails>
          </Accordion>

          <Accordion
            className="shadow-0 border-0 overflow-hidden"
            expanded={map === 'invoice'}
            onChange={() => setMap(map !== 'invoice' ? 'invoice' : false)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              classes={{ root: 'border border-solid rounded-16 mb-16' }}
            >
              <Typography className="font-semibold">Invoice Address</Typography>
            </AccordionSummary>
            <AccordionDetails className="flex flex-col md:flex-row -mx-8">
              <Typography className="w-full md:max-w-256 mb-16 md:mb-0 mx-8 text-16">
                {order.customer.invoiceAddress.address}
              </Typography>
              <div className="w-full h-320 rounded-16 overflow-hidden mx-8">
                <GoogleMap
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_MAP_KEY,
                  }}
                  defaultZoom={15}
                  defaultCenter={[
                    order.customer.invoiceAddress.lat,
                    order.customer.invoiceAddress.lng,
                  ]}
                >
                  <Marker
                    text={order.customer.invoiceAddress.address}
                    lat={order.customer.invoiceAddress.lat}
                    lng={order.customer.invoiceAddress.lng}
                  />
                </GoogleMap>
              </div>
            </AccordionDetails>
          </Accordion> */}
        </div>
      </div>

      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">access_time</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
            Order Status
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">Status</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Updated On</Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="flex items-center">
                    {/* <Avatar src={order.customer.avatar} /> */}
                    <Typography className="truncate ">
                      {order?.data?.order?.status}
                    </Typography>
                  </div>
                </td>
                <td>
                <div className="flex items-center">
                    <Typography className="truncate ">
                      {new Date(order?.data?.order?.updatedAt)
                        .toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "short", // This gives "Jan", "Feb", etc.
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                        .replace(",", " at")}
                    </Typography>
                    </div>
                    </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">attach_money</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
            Payment
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">
                    TransactionID
                  </Typography>
                </th>
                <th>
                  <Typography className="font-semibold">
                    Payment Method
                  </Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Amount</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Date</Typography>
                </th>
              </tr>
            </thead>
            {/* <tbody>
              <tr>
                <td>
                  <span className="truncate">{order.payment.transactionId}</span>
                </td>
                <td>
                  <span className="truncate">{order.payment.method}</span>
                </td>
                <td>
                  <span className="truncate">{order.payment.amount}</span>
                </td>
                <td>
                  <span className="truncate">{order.payment.date}</span>
                </td>
              </tr>
            </tbody> */}
          </table>
        </div>
      </div>

      <div className="pb-48">
        <div className="pb-16 flex items-center">
          <Icon color="action">local_shipping</Icon>
          <Typography className="h2 mx-12 font-medium" color="textSecondary">
            Shipping
          </Typography>
        </div>

        <div className="table-responsive">
          <table className="simple">
            <thead>
              <tr>
                <th>
                  <Typography className="font-semibold">
                    Tracking Code
                  </Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Carrier</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Weight</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Fee</Typography>
                </th>
                <th>
                  <Typography className="font-semibold">Date</Typography>
                </th>
              </tr>
            </thead>
            {/* <tbody>
              {order.shippingDetails.map((shipping) => (
                <tr key={shipping.date}>
                  <td>
                    <span className="truncate">{shipping.tracking}</span>
                  </td>
                  <td>
                    <span className="truncate">{shipping.carrier}</span>
                  </td>
                  <td>
                    <span className="truncate">{shipping.weight}</span>
                  </td>
                  <td>
                    <span className="truncate">{shipping.fee}</span>
                  </td>
                  <td>
                    <span className="truncate">{shipping.date}</span>
                  </td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsTab;
