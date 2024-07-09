

export default function Invoice() {
  return (
    <div className="w-[80mm] h-[297mm] bg-white p-4 text-xs">
    {/* Header */}
    <div className="text-center mb-4">
      <h1 className="font-bold text-lg">Iconic Leather BD</h1>
      <p>445, Level-4, Shyamoli Square Shopping Mall, Dhaka</p>
      <p>Mobile: 01754493353</p>
      <p>Email: info@iconicleatherbd.com</p>
    </div>
    
    {/* Invoice Info */}
    <div className="mb-4">
      <div className="flex justify-between">
        <span>Invoice ID: IN-10000741</span>
        <span>Date: 25 Jun 2024</span>
      </div>
      <div className="flex justify-between">
        <span>Time: 06:28pm</span>
      </div>
    </div>
    
    {/* Customer Info */}
    <div className="mb-4">
      <p>Customer Name: জনাব আব্দুল্লাহ</p>
      <p>Phone: +8801885969501</p>
      <p>Address: কালিয়া পুকুর, নারায়নগঞ্জ</p>
      <p>Delivery Company: Steadfast</p>
    </div>
    
    {/* Item List */}
    <table className="w-full mb-4">
      <thead>
        <tr className="border-t border-b border-gray-400">
          <th className="text-left">Sl. Name</th>
          <th className="text-right">Price</th>
          <th className="text-center">Qty</th>
          <th className="text-right">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-400">
          <td>SP-504 13333308 (40 - Black)</td>
          <td className="text-right">1,099.00</td>
          <td className="text-center">1 Pair</td>
          <td className="text-right">1,099.00</td>
        </tr>
        <tr className="border-b border-gray-400">
          <td>SP-505 15179183 (40 - Coffee)</td>
          <td className="text-right">1,099.00</td>
          <td className="text-center">1 Pair</td>
          <td className="text-right">1,099.00</td>
        </tr>
      </tbody>
    </table>
    
    {/* Totals */}
    <div className="mb-4">
      <div className="flex justify-between">
        <span>Subtotal (Including VAT):</span>
        <span>2,198.00</span>
      </div>
      <div className="flex justify-between">
        <span>Discount:</span>
        <span>438.00</span>
      </div>
      <div className="flex justify-between">
        <span>After Discount:</span>
        <span>1,760.00</span>
      </div>
      <div className="flex justify-between">
        <span>VAT:</span>
        <span>0.00</span>
      </div>
      <div className="flex justify-between">
        <span>Delivery Charge:</span>
        <span>130.00</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>Total:</span>
        <span>1,890.00</span>
      </div>
    </div>
    
    {/* Payment Info */}
    <div className="mb-4">
      <div className="flex justify-between">
        <span>Paid:</span>
        <span>0.00</span>
      </div>
      <div className="flex justify-between">
        <span>Invoice Due:</span>
        <span>1,890.00</span>
      </div>
      <div className="flex justify-between">
        <span>Due Left/Due Remaining:</span>
        <span>1,890.00</span>
      </div>
      <div className="text-center">
        <p>In Words: One Thousand Eight Hundred Ninety BDT Only</p>
      </div>
    </div>
    
    {/* Payment Method */}
    <div className="mb-4">
      <table className="w-full">
        <thead>
          <tr className="border-t border-b border-gray-400">
            <th>Payments</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-400">
            <td>Cash: 0.00</td>
            <td>Redeem: 0</td>
          </tr>
          <tr className="border-b border-gray-400">
            <td>Card: 0.00</td>
            <td>Points Available: 0</td>
          </tr>
          <tr>
            <td>Total: 0.00</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  )
}
