import React from 'react';
import { X, Printer, CheckCircle2, FileText, ShieldCheck } from 'lucide-react';

export default function InvoiceModal({ isOpen, onClose, order }) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const invoiceNumber = `INV-${order.orderNumber.replace('#', '')}`;
  const formattedDate = new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const billingAddr = order.billingAddress || order.shippingAddress || {};
  const shippingAddr = order.shippingAddress || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#121212] border border-white/15 rounded-3xl shadow-2xl w-full max-w-3xl text-[#F5F2EE] max-h-[92vh] flex flex-col overflow-hidden my-auto">
        
        {/* Modal Top Actions (Hidden on Print) */}
        <div className="print:hidden flex items-center justify-between border-b border-white/10 p-4 sm:p-5 shrink-0 bg-[#080808]">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#B4171E]" />
            <h3 className="font-sora text-lg sm:text-xl font-semibold text-[#F5F2EE]">
              ÉLAVA ELECTRONIC INVOICE
            </h3>
          </div>
          <div className="flex items-center gap-3 font-manrope">
            <button
              onClick={handlePrint}
              className="bg-[#B4171E] hover:bg-[#C72A35] text-[#F5F2EE] px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-md btn-interactive"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT / DOWNLOAD PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#B8B3AF] hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Document Sheet */}
        <div id="printable-invoice" className="p-6 sm:p-10 overflow-y-auto flex-1 bg-white text-neutral-900 font-manrope space-y-6">
          
          {/* Document CSS for Print */}
          <style>{`
            @media print {
              body * {
                visibility: hidden;
              }
              #printable-invoice, #printable-invoice * {
                visibility: visible;
              }
              #printable-invoice {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                padding: 20px;
                background: white !important;
                color: black !important;
              }
              .print\\:hidden {
                display: none !important;
              }
            }
          `}</style>

          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-neutral-200 pb-6 gap-4">
            <div>
              <h1 className="font-sora text-2xl font-semibold tracking-tight text-neutral-900">
                ÉLAVA PERFUMES
              </h1>
              <p className="text-xs text-neutral-500 font-medium mt-1 font-manrope">
                Artisanal Eau de Parfum Collection · Ahmedabad, Gujarat, India
              </p>
              <p className="text-xs text-neutral-500 font-manrope">
                Support: support@elavaperfumes.com
              </p>
            </div>

            <div className="text-left sm:text-right space-y-1 font-manrope">
              <div className="inline-block bg-neutral-900 text-white font-mono text-xs px-3 py-1 rounded uppercase font-bold tracking-wider">
                TAX INVOICE
              </div>
              <div className="text-xs font-mono text-neutral-700 font-bold">{invoiceNumber}</div>
              <div className="text-xs text-neutral-500 font-medium">Date: {formattedDate}</div>
              <div className="text-xs font-mono text-neutral-700">Order Ref: {order.orderNumber}</div>
            </div>
          </div>

          {/* Customer & Address Snapshots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-neutral-700">
            {/* Billed To */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 space-y-1">
              <div className="font-extrabold uppercase text-[10px] tracking-wider text-neutral-500 mb-1">
                BILLED TO:
              </div>
              <div className="font-bold text-neutral-900 text-sm">
                {billingAddr.fullName || order.email}
              </div>
              <p>{billingAddr.addressLine1}{billingAddr.addressLine2 ? `, ${billingAddr.addressLine2}` : ''}</p>
              <p>{billingAddr.city}{billingAddr.state ? `, ${billingAddr.state}` : ''} {billingAddr.postalCode ? `- ${billingAddr.postalCode}` : ''}</p>
              <p>Email: {order.email}</p>
              {billingAddr.phone && <p>Phone: {billingAddr.phone}</p>}
            </div>

            {/* Shipped To */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 space-y-1">
              <div className="font-extrabold uppercase text-[10px] tracking-wider text-neutral-500 mb-1">
                DELIVERY SHIPPING ADDRESS:
              </div>
              <div className="font-bold text-neutral-900 text-sm">
                {shippingAddr.fullName || order.email}
              </div>
              <p>{shippingAddr.addressLine1}{shippingAddr.addressLine2 ? `, ${shippingAddr.addressLine2}` : ''}</p>
              <p>{shippingAddr.city}{shippingAddr.state ? `, ${shippingAddr.state}` : ''} {shippingAddr.postalCode ? `- ${shippingAddr.postalCode}` : ''}</p>
              <p>Country: {shippingAddr.country || 'India'}</p>
              {shippingAddr.phone && <p>Phone: {shippingAddr.phone}</p>}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-neutral-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-100 border-b border-neutral-200 text-[10px] font-extrabold uppercase text-neutral-600 tracking-wider">
                  <th className="py-3 px-4">Item & Description</th>
                  <th className="py-3 px-2 text-center">Size</th>
                  <th className="py-3 px-2 text-center">Qty</th>
                  <th className="py-3 px-3 text-right">Unit Price</th>
                  <th className="py-3 px-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-800">
                {order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/50">
                    <td className="py-3.5 px-4 font-bold text-neutral-900">
                      {item.name}
                    </td>
                    <td className="py-3.5 px-2 text-center font-medium text-neutral-600">
                      {item.size || '60 ML'}
                    </td>
                    <td className="py-3.5 px-2 text-center font-bold">
                      {item.quantity || 1}
                    </td>
                    <td className="py-3.5 px-3 text-right font-medium">
                      ₹{item.price?.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-neutral-900">
                      ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                    </td>
                  </tr>
                ))}

                {/* Free 10ml Sample Item */}
                {order.freeSample && (
                  <tr className="bg-amber-50/40">
                    <td className="py-3 px-4 font-bold text-neutral-900">
                      FREE 10ML SAMPLE — {order.freeSample.name}
                      <div className="text-[10px] text-amber-700 font-normal uppercase">{order.freeSample.family}</div>
                    </td>
                    <td className="py-3 px-2 text-center font-medium">10 ML</td>
                    <td className="py-3 px-2 text-center font-bold">1</td>
                    <td className="py-3 px-3 text-right text-emerald-700 font-bold">COMPLIMENTARY</td>
                    <td className="py-3 px-4 text-right text-emerald-700 font-bold">₹0</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pricing Totals Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start pt-2 gap-6 text-xs">
            {/* Gifting & Notes */}
            <div className="w-full sm:w-1/2 space-y-3">
              {order.giftDetails?.isGift && (
                <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-3.5 space-y-1">
                  <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">GIFT SELECTION DETAILS</div>
                  {order.giftDetails.recipientName && <p><strong className="text-amber-900">Recipient:</strong> {order.giftDetails.recipientName}</p>}
                  {order.giftDetails.giftMessage && <p><strong className="text-amber-900">Gift Note:</strong> "{order.giftDetails.giftMessage}"</p>}
                </div>
              )}

              {/* GST / Tax Compliance Note */}
              <div className="text-[11px] text-neutral-500 space-y-1 pt-1">
                <p className="font-semibold text-neutral-700">Prices are inclusive of all applicable GST & taxes.</p>
                <p>Insured Express Delivery across India.</p>
              </div>
            </div>

            {/* Subtotal & Final Total */}
            <div className="w-full sm:w-1/2 bg-neutral-50 border border-neutral-200 rounded-xl p-4 space-y-2 text-neutral-800">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>₹{order.subtotal?.toLocaleString()}</span>
              </div>

              {order.discountAmount > 0 && (
                <div className="flex justify-between text-amber-700 font-bold">
                  <span>Referral Discount ({order.referralCode})</span>
                  <span>-₹{order.discountAmount?.toLocaleString()}</span>
                </div>
              )}

              {order.giftWrappingAmount > 0 && (
                <div className="flex justify-between text-neutral-700">
                  <span>Signature Gift Wrapping</span>
                  <span>+₹100</span>
                </div>
              )}

              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Insured Express Shipping</span>
                <span>FREE</span>
              </div>

              <div className="border-t border-neutral-300 pt-2 flex justify-between font-bold text-sm text-neutral-900 uppercase">
                <span>Grand Total Paid</span>
                <span className="text-base font-mono">₹{order.totalAmount?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Status & Transaction Info */}
          <div className="bg-neutral-900 text-white rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold uppercase tracking-wider text-white">PAYMENT STATUS: {order.paymentStatus?.toUpperCase() || 'PAID'}</div>
                <div className="text-[11px] text-neutral-400">Method: Razorpay Online Payment</div>
              </div>
            </div>
            {order.razorpayPaymentId && (
              <div className="font-mono text-[11px] bg-neutral-800 px-3 py-1.5 rounded text-neutral-300 border border-neutral-700">
                Txn Ref: {order.razorpayPaymentId}
              </div>
            )}
          </div>

          {/* Footer Note */}
          <div className="text-center text-[10px] text-neutral-400 border-t border-neutral-200 pt-4">
            Thank you for choosing ÉLAVA. This is a computer-generated tax invoice and requires no physical signature.
          </div>

        </div>

      </div>
    </div>
  );
}
