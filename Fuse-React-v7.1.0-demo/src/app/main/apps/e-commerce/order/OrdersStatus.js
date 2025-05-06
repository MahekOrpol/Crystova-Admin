import _ from '@lodash';
import clsx from 'clsx';
import { IoPrint } from 'react-icons/io5';
import { LuDownload } from "react-icons/lu";

function OrdersStatus() {
  

  return (
    <div
      className='inline text-12 font-semibold py-4 px-12 rounded-full truncate flex align-items-center' style={{gap:'10px'}}
    >
<IoPrint size={22}/>
<LuDownload size={22}/>
    </div>
  );
}

export default OrdersStatus;
