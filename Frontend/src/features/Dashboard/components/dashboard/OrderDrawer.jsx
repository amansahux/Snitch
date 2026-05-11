import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Truck, CreditCard, User, Mail, MapPin } from 'lucide-react';
import StatusBadge from './StatusBadge';
import ShipmentTimeline from './ShipmentTimeline';

const OrderDrawer = ({ isOpen, onClose, order }) => {
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Order Details</h3>
                <p className="text-xs text-slate-500 font-medium uppercase mt-1">{order.id}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Status Section */}
              <div className="mb-8 p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Status</p>
                  <StatusBadge status={order.status} />
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-500 uppercase mb-1">Payment</p>
                  <span className="text-sm font-bold text-slate-900">{order.paymentStatus || 'Paid'}</span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center">
                  <User className="w-4 h-4 mr-2 text-slate-400" />
                  Customer Information
                </h4>
                <div className="space-y-3 pl-6">
                  <div className="flex items-center text-sm">
                    <User className="w-3.5 h-3.5 mr-3 text-slate-400" />
                    <span className="text-slate-600">{order.customerName}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="w-3.5 h-3.5 mr-3 text-slate-400" />
                    <span className="text-slate-600">{order.customerEmail}</span>
                  </div>
                  <div className="flex items-start text-sm">
                    <MapPin className="w-3.5 h-3.5 mr-3 mt-0.5 text-slate-400" />
                    <span className="text-slate-600 leading-relaxed">
                      123 Fashion Ave, <br />
                      New York, NY 10001
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center">
                  <Package className="w-4 h-4 mr-2 text-slate-400" />
                  Order Items
                </h4>
                <div className="space-y-4">
                  {(order.items || [
                    { name: 'Oversized Cotton Tee', qty: 1, price: 1499 },
                    { name: 'Slim Fit Denim', qty: 1, price: 2999 }
                  ]).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg mr-3"></div>
                        <div>
                          <p className="font-medium text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-500">Qty: {item.qty}</p>
                        </div>
                      </div>
                      <p className="font-bold text-slate-900">₹{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Timeline */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center">
                  <Truck className="w-4 h-4 mr-2 text-slate-400" />
                  Shipment Timeline
                </h4>
                <ShipmentTimeline />
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-white">
              <div className="flex justify-between mb-4">
                <span className="text-slate-500 font-medium">Total Amount</span>
                <span className="text-lg font-bold text-slate-900">₹{order.total.toLocaleString()}</span>
              </div>
              <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
                Update Status
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderDrawer;
