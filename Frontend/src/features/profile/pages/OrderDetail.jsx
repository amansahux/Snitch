import { useParams } from "react-router-dom"

const OrderDetail = () => {
    const params = useParams();
    const {id} = params;
  return (
    <div>
        <h1>Order Detail: {id}</h1>
    </div>
  )
}

export default OrderDetail