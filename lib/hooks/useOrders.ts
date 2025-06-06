"use client";

import { useState } from "react";

export interface CreateOrderData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://api.lag-services.com/api/v1";

export const useCreateOrder = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = async (productId: string, orderData: CreateOrderData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseUrl}/orders/${productId}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la commande");
      }

      const session = await response.json();
      return session;
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrder, isLoading, error };
};

export const useGetCheckoutSession = (sessionId: string | null) => {
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useState(() => {
    const fetchSession = async () => {
      if (!sessionId) {
        setError("ID de session requis");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/orders/checkout/${sessionId}`);

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de la session");
        }

        const sessionData = await response.json();
        setSession(sessionData);
      } catch (err: any) {
        setError(
          err.message || "Impossible de récupérer les détails de la session"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  });

  return { session, isLoading, error };
};
