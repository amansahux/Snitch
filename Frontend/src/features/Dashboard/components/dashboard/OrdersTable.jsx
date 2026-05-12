import React from "react";
import { Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";

const TABLE_HEADERS = [
  { id: "id", label: "Order ID", align: "left" },
  { id: "customer", label: "Customer", align: "left" },
  { id: "date", label: "Date", align: "left" },
  { id: "status", label: "Status", align: "left" },
  { id: "payment", label: "Payment", align: "left" },
  { id: "total", label: "Total", align: "left" },
  { id: "actions", label: "Actions", align: "right" },
];

const OrdersTable = ({ orders, onViewDetails, isDark = false }) => {
  return (
    <div
      className={`rounded-3xl border transition-all duration-500 overflow-hidden ${
        isDark
          ? "bg-slate-900/40 backdrop-blur-xl border-white/5 shadow-2xl"
          : "bg-white border-amber-100 shadow-luxury"
      }`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className={`${isDark ? "bg-white/5 border-white/5" : "bg-amber-50/50 border-amber-100"} border-b`}
            >
              {TABLE_HEADERS.map((header) => (
                <th
                  key={header.id}
                  className={`px-12 py-5 text-[10px] font-bold uppercase tracking-[0.2em] ${
                    header.align === "right" ? "text-right" : "text-left"
                  } ${isDark ? "text-white/40" : "text-slate-400"}`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className={`divide-y ${isDark ? "divide-white/5" : "divide-amber-50"}`}
          >
            {orders.map((order) => (
              <tr
                key={order._id}
                className="group hover:bg-gold/5 transition-colors duration-300"
              >
                {/* Order ID */}
                <td className="px-8 py-5">
                  <span
                    className={`text-sm font-serif ${isDark ? "text-gold" : "text-slate-900"}`}
                  >
                    {order?._id}
                  </span>
                </td>

                {/* Customer */}
                <td className="px-8 py-5">
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
                    >
                      {order?.shippingAddress?.fullName}
                    </span>
                    <span
                      className={`text-[10px] tracking-widest ${isDark ? "text-white/40" : "text-slate-400"}`}
                    >
                      {order?.user?.email}
                    </span>
                  </div>
                </td>

                {/* Date */}
                <td className="px-8 py-5">
                  <span
                    className={`text-xs font-medium tracking-wide whitespace-nowrap ${isDark ? "text-white/60" : "text-slate-500"}`}
                  >
                    {order?.createdAt?.slice(0, 10)}
                  </span>
                </td>

                {/* Status */}
                <td className="px-8 py-5">
                  <StatusBadge status={order?.orderStatus} isDark={isDark} />
                </td>

                {/* Payment Status */}
                <td className="px-8 py-5">
                  <StatusBadge
                    status={order?.paymentStatus}
                    isDark={isDark}
                  />
                </td>

                {/* Total */}
                <td className="px-8 py-5">
                  <span
                    className={`text-sm font-bold tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}
                  >
                    ₹{order.totalAmount?.toLocaleString()}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-8 py-5 text-right">
                  <div className="flex items-center justify-end space-x-2 xl:opacity-0 xl:group-hover:opacity-100 opacity-100 transition-opacity">
                    <button
                      onClick={() => onViewDetails(order)}
                      className={`p-2 rounded-xl transition-all cursor-pointer ${isDark ? "hover:bg-white/10 text-white/40 hover:text-gold" : "hover:bg-amber-50 text-slate-400 hover:text-gold"}`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
