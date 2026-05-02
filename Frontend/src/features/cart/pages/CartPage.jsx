import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Heart,
  LockKeyhole,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import toast from "react-hot-toast";
import useCart from "../hooks/useCart.js";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";

const formatCurrency = (value) =>
  `₹${Math.round(Number(value || 0)).toLocaleString("en-IN")}`;

const CartPage = () => {
  const navigate = useNavigate();
  const { items, totalSelling, totalMrp, totalDiscount, isLoading, error } =
    useSelector((state) => state.cart);
  const {
    handleGetCart,
    handleUpdateCart,
    handleRemoveCartItem,
    handleCreateCartPaymentOrder,
  } = useCart();
  const {
    error: razorpayError,
    isLoading: razorpayLoading,
    Razorpay,
  } = useRazorpay();
  const { user } = useSelector((state) => state.auth);

  const [updatingItemId, setUpdatingItemId] = useState(null);
  const [removingItemId, setRemovingItemId] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await handleGetCart();
      } catch (fetchError) {
        const message =
          fetchError?.response?.data?.message ||
          "Unable to load cart right now";
        toast.error(message);
      }
    };
    fetchCart();
  }, []);

  const itemCount = items?.length || 0;

  const updateQuantity = async (item, nextQuantity) => {
    const variant =
      item?.variantId && typeof item.variantId === "object"
        ? item.variantId
        : {};

    const maxStock = Number(variant?.stock ?? Infinity);

    if (nextQuantity < 1) return;
    if (Number.isFinite(maxStock) && nextQuantity > maxStock) {
      toast.error("No more stock available for this variant");
      return;
    }

    try {
      setUpdatingItemId(item._id);
      await handleUpdateCart(item._id, nextQuantity);
    } catch (updateError) {
      const message =
        updateError?.response?.data?.message || "Could not update quantity";
      toast.error(message);
    } finally {
      setUpdatingItemId(null);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      setRemovingItemId(itemId);
      await handleRemoveCartItem(itemId);
      toast.success("Item removed from cart");
    } catch (removeError) {
      const message =
        removeError?.response?.data?.message || "Could not remove cart item";
      toast.error(message);
    } finally {
      setRemovingItemId(null);
    }
  };

  // const proceedToCheckout = async () => {
  //   if (!items.length) {
  //     toast.error("Your cart is currently empty");
  //     return;
  //   }
  //   const order = await handleCreateCartPaymentOrder();
  //   console.log(order);
  //   const options = {
  //     key: "rzp_test_ShNSkpxt3emQVJ",
  //     amount: order.data.amount, // Amount in paise
  //     currency: "INR",
  //     name: "Snitch",
  //     description: "Payment for your order",
  //     order_id: order.data.id,
  //     handler: (response) => {
  //       console.log(response);
  //       alert("Payment Successful!");
  //     },
  //     prefill: {
  //       name: user.fullName,
  //       email: user.email,
  //       contact: user.phone,
  //     },
  //     theme: {
  //       color: "#c9a96e",
  //     },
  //   };

  //   const razorpay = new Razorpay(options);
  //   razorpay.on("payment.failed", (response) => {
  //     console.log(response);
  //     toast.error("Payment Failed");
  //   });
  //   razorpay.open();
  // };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f7f4ef] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1280px] space-y-6">
          <div className="h-10 w-80 animate-pulse rounded-xl bg-[#ece7df]" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-8">
              <div className="h-52 animate-pulse rounded-[2rem] bg-white/70" />
              <div className="h-52 animate-pulse rounded-[2rem] bg-white/70" />
            </div>
            <div className="h-96 animate-pulse rounded-[2rem] bg-[#f3eee8] lg:col-span-4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] pb-24 font-sans text-[#1b1c1a] lg:pb-10">
      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="mb-7 flex items-end justify-between gap-4 border-b border-[#e6dfd5] pb-5">
          <h1 className="font-serif text-4xl font-medium tracking-tight text-[#1b1c1a] sm:text-5xl">
            Your Wardrobe Selection
          </h1>
          <p className="font-serif text-sm italic text-[#7a6e63]">
            {itemCount} {itemCount === 1 ? "Item" : "Items"}
          </p>
        </header>

        {error && (
          <div className="mb-5 rounded-2xl border border-[#f0d5d5] bg-[#fff8f8] px-4 py-3 text-sm text-[#9f2f2f]">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <section className="space-y-5 lg:col-span-8">
            {items.length === 0 ? (
              <div className="animate-cart-fade rounded-[2rem] border border-[#e6dfd5] bg-white p-7 text-center shadow-[0_18px_40px_rgba(27,28,26,0.03)] sm:p-10">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f3eee8] text-[#7a6e63]">
                  <ShoppingBag size={26} />
                </div>
                <h2 className="font-serif text-3xl text-[#1b1c1a]">
                  Your cart is empty
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#7a6e63]">
                  Add timeless pieces to your wardrobe and they will appear
                  here.
                </p>
                <button
                  onClick={() => navigate("/shop")}
                  className="mt-7 cursor-pointer rounded-full bg-[#1b1c1a] px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-[#C9A96E] active:scale-[0.98]"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              items.map((item, index) => {
                const product =
                  item?.productId && typeof item.productId === "object"
                    ? item.productId
                    : {};
                const variant =
                  item?.variantId && typeof item.variantId === "object"
                    ? item.variantId
                    : {};

                const selling = Number(variant?.price?.selling ?? 0);
                const mrp = Number(variant?.price?.mrp ?? selling);
                const stockValue = Number(variant?.stock);
                const stock = Number.isFinite(stockValue)
                  ? stockValue
                  : Infinity;
                const inStock = stock > 0;
                const title = product?.title || "Untitled Product";
                const description =
                  product?.description ||
                  "Precision-crafted silhouette in premium textile.";
                const category = product?.category || "Ready-to-Wear";
                const imageUrl =
                  variant?.images?.[0]?.url ||
                  product?.coverImage?.url ||
                  "/placeholder-image.jpg";

                return (
                  <article
                    key={item._id}
                    className="animate-cart-fade rounded-[2rem] border border-[#e6dfd5] bg-white p-4 shadow-[0_18px_40px_rgba(27,28,26,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_rgba(27,28,26,0.06)] sm:p-6"
                    style={{ animationDelay: `${Math.min(index * 60, 240)}ms` }}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                      <div className="h-40 w-full overflow-hidden rounded-[1.5rem] bg-[#f3eee8] sm:h-36 sm:w-28 sm:shrink-0">
                        <img
                          onClick={() =>
                            navigate(`/shop/product/${product._id}`)
                          }
                          src={imageUrl}
                          alt={title}
                          className="h-full w-full cursor-pointer object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                          <div className="min-w-0">
                            <p className="mb-1 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#C9A96E]">
                              {category}
                            </p>
                            <h2 className="font-serif text-[2rem] leading-none text-[#1b1c1a]">
                              {title}
                            </h2>
                            <p className="mt-2 truncate text-sm text-[#7a6e63]">
                              {description}
                            </p>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              <span className="rounded-full bg-[#f3eee8] px-3 py-1 text-[11px] text-[#7a6e63]">
                                Size: {variant?.size || "M"}
                              </span>
                              <span className="rounded-full bg-[#f3eee8] px-3 py-1 text-[11px] text-[#7a6e63]">
                                Color: {variant?.color || "Charcoal"}
                              </span>
                              <span className="rounded-full bg-[#f3eee8] px-3 py-1 text-[11px] text-[#7a6e63]">
                                Fit: {variant?.fit || "Regular"}
                              </span>
                            </div>
                          </div>

                          <div className="sm:pl-4 sm:text-right">
                            <p className="text-3xl font-semibold leading-none font-sans text-[#1b1c1a]">
                              {formatCurrency(selling)}
                            </p>
                            <p className="mt-1 text-sm text-[#9a9085] line-through font-sans">
                              {formatCurrency(mrp)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                          <div className="flex flex-wrap items-center gap-3">
                            <div className="inline-flex items-center rounded-full border border-[#e6dfd5] bg-[#f7f4ef] px-1 py-1">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item,
                                    Number(item.quantity || 1) - 1,
                                  )
                                }
                                disabled={
                                  Number(item.quantity || 1) <= 1 ||
                                  updatingItemId === item._id
                                }
                                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#1b1c1a] transition-all duration-200 hover:bg-[#ebe4da] disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="min-w-8 px-3 text-center text-sm font-semibold text-[#1b1c1a]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item,
                                    Number(item.quantity || 1) + 1,
                                  )
                                }
                                disabled={
                                  updatingItemId === item._id ||
                                  (Number.isFinite(stock) &&
                                    Number(item.quantity || 1) >= stock)
                                }
                                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#1b1c1a] transition-all duration-200 hover:bg-[#ebe4da] disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <span
                              className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                                inStock ? "text-[#137f4e]" : "text-[#b63b3b]"
                              }`}
                            >
                              <span
                                className={`h-2 w-2 rounded-full ${
                                  inStock ? "bg-[#13a15c]" : "bg-[#d85a5a]"
                                }`}
                              />
                              {inStock ? "In Stock" : "Out of Stock"}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleRemove(item._id)}
                              disabled={removingItemId === item._id}
                              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#8a8178] transition-all duration-200 hover:bg-[#f3eee8] hover:text-[#1b1c1a] disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                            <button
                              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all duration-200 active:scale-95 `}
                              aria-label="Add to wishlist"
                            >
                              <Heart size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </section>

          <aside className="lg:col-span-4">
            <div className="animate-cart-fade rounded-[2rem] border border-[#e6dfd5] bg-[#f3eee8] p-6 sm:p-7 lg:sticky lg:top-8">
              <h2 className="font-serif text-[2.2rem] leading-none text-[#1b1c1a]">
                Order Summary
              </h2>

              <div className="mt-6 space-y-3 text-sm text-[#7a6e63]">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1b1c1a]">
                    {formatCurrency(totalMrp)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Exclusive Discount</span>
                  <span className="font-medium text-[#1b1c1a]">
                    -{formatCurrency(totalDiscount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>White-Glove Shipping</span>
                  <span className="font-medium text-[#1b1c1a]">
                    Complimentary
                  </span>
                </div>
              </div>

              <div className="my-6 border-t border-[#ddd4c9]" />

              <div className="flex items-center justify-between">
                <span className="text-[1.7rem] font-serif text-[#1b1c1a]">
                  Total
                </span>
                <span className="text-[2.2rem] font-semibold leading-none text-[#1b1c1a]">
                  {formatCurrency(totalSelling)}
                </span>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  className="w-full cursor-pointer rounded-full bg-[#1b1c1a] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-white transition-all duration-300 hover:bg-[#C9A96E] active:scale-[0.99]"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={() => navigate("/shop")}
                  className="w-full cursor-pointer rounded-full border border-[#d7cec2] bg-transparent px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1b1c1a] transition-all duration-300 hover:border-[#C9A96E] hover:text-[#C9A96E] active:scale-[0.99]"
                >
                  Continue Shopping
                </button>
              </div>

              <div className="mt-7 border-t border-[#ddd4c9] pt-6">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="flex flex-col items-center gap-2 text-[#7a6e63]">
                    <LockKeyhole size={14} className="text-[#9b7d45]" />
                    <span className="text-[9px] font-semibold uppercase tracking-[0.15em]">
                      Secure Checkout
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-[#7a6e63]">
                    <Truck size={14} className="text-[#9b7d45]" />
                    <span className="text-[9px] font-semibold uppercase tracking-[0.15em]">
                      Express Delivery
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {items.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-[#e2dacd] bg-[#f7f4ef]/95 px-4 py-3 backdrop-blur lg:hidden">
          <div className="mx-auto flex max-w-[1280px] items-center gap-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#7a6e63]">
                Total
              </p>
              <p className="truncate font-serif text-2xl text-[#1b1c1a]">
                {formatCurrency(totalSelling)}
              </p>
            </div>
            <button
              className="ml-auto cursor-pointer rounded-full bg-[#1b1c1a] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 active:scale-[0.98]"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
