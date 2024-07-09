import OrderTracking from "@/components/OrderTracking";

export const metadata = {
  title: {
    default: "Order Tracking || Iconic Leather BD",
    template: "%s-iconic leather BD",
  },
  description:
    "Iconic Leather Shoes BD - Your trusted store for premium leather footwear. you can tracking your order  ",
  
};



export default function OrderTacking() {


  return (
    <div>
        <OrderTracking/>
    </div>
  )
}
