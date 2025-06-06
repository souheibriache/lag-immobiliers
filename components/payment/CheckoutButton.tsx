"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderForm from "@/components/forms/OrderForm";

interface CheckoutButtonProps {
  productId: string;
  productTitle: string;
  price: number;
  discount: number;
  size?: "default" | "sm" | "lg";
  className?: string;
  productType: string;
}

export default function CheckoutButton({
  productId,
  productTitle,
  price,
  discount,
  size = "default",
  className = "",
  productType,
}: CheckoutButtonProps) {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);

  const finalPrice = price - (discount || 0);

  if (finalPrice <= 0) {
    return null;
  }

  const product = {
    id: productId,
    title: productTitle,
    price,
    discount,
    type: productType,
  };

  return (
    <>
      <Button
        size={size}
        onClick={() => setIsOrderFormOpen(true)}
        className={`bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white ${className}`}
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Acheter maintenant ({finalPrice.toFixed(2)} €)
      </Button>

      <OrderForm
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        product={product}
      />
    </>
  );
}
