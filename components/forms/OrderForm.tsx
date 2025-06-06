"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingCart,
  Loader2,
  MapPin,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCreateOrder, type CreateOrderData } from "@/lib/hooks/useOrders";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    title: string;
    price: number;
    discount: number;
    type: string;
  };
}

export default function OrderForm({
  isOpen,
  onClose,
  product,
}: OrderFormProps) {
  const { createOrder, isLoading, error } = useCreateOrder();
  const [formData, setFormData] = useState<CreateOrderData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "France",
    },
  });

  const finalPrice = product.price - (product.discount || 0);

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("address.")) {
      const addressField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const session = await createOrder(product.id, formData);
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
    }
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.phoneNumber.trim() &&
      formData.address.street.trim() &&
      formData.address.city.trim() &&
      formData.address.postalCode.trim()
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="border-0 shadow-none">
              <CardHeader className="bg-gradient-to-r from-[hsl(var(--brand-light))] to-[hsl(var(--brand))] text-white relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-full">
                    <ShoppingCart className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold">
                      Finaliser votre achat
                    </CardTitle>
                    <p className="text-white/90 mt-1">
                      Remplissez vos informations pour continuer
                    </p>
                  </div>
                </div>

                {/* Product Summary */}
                <div className="mt-6 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-white">
                        {product.title}
                      </h3>
                      <Badge className="bg-white/20 text-white border-white/30 mt-1">
                        {product.type === "BOOK" ? "Livre" : "Produit"}
                      </Badge>
                    </div>
                    <div className="text-right">
                      {product.discount > 0 && (
                        <div className="text-sm text-white/70 line-through">
                          {product.price.toFixed(2)} €
                        </div>
                      )}
                      <div className="text-xl font-bold text-white">
                        {finalPrice > 0
                          ? `${finalPrice.toFixed(2)} €`
                          : "Gratuit"}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-5 h-5 text-[hsl(var(--brand))]" />
                      <h3 className="text-lg font-semibold text-slate-900">
                        Informations personnelles
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          placeholder="Votre prénom"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          placeholder="Votre nom"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="votre@email.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phoneNumber"
                        className="flex items-center gap-2"
                      >
                        <Phone className="w-4 h-4" />
                        Téléphone *
                      </Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) =>
                          handleInputChange("phoneNumber", e.target.value)
                        }
                        placeholder="+33 1 23 45 67 89"
                        required
                      />
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-5 h-5 text-[hsl(var(--brand))]" />
                      <h3 className="text-lg font-semibold text-slate-900">
                        Adresse de facturation
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="street">Adresse *</Label>
                      <Input
                        id="street"
                        value={formData.address.street}
                        onChange={(e) =>
                          handleInputChange("address.street", e.target.value)
                        }
                        placeholder="123 Rue de la Paix"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Code postal *</Label>
                        <Input
                          id="postalCode"
                          value={formData.address.postalCode}
                          onChange={(e) =>
                            handleInputChange(
                              "address.postalCode",
                              e.target.value
                            )
                          }
                          placeholder="75001"
                          required
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="city">Ville *</Label>
                        <Input
                          id="city"
                          value={formData.address.city}
                          onChange={(e) =>
                            handleInputChange("address.city", e.target.value)
                          }
                          placeholder="Paris"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Pays</Label>
                      <Input
                        id="country"
                        value={formData.address.country}
                        onChange={(e) =>
                          handleInputChange("address.country", e.target.value)
                        }
                        placeholder="France"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={onClose}
                      className="flex-1 border-slate-300 hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))]"
                      disabled={isLoading}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isFormValid() || isLoading}
                      className="flex-1 bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Traitement...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Procéder au paiement (
                          {finalPrice > 0
                            ? `${finalPrice.toFixed(2)} €`
                            : "Gratuit"}
                          )
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
