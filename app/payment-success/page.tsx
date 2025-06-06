"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ArrowLeft,
  Mail,
  Package,
  Loader2,
  AlertCircle,
} from "lucide-react";

import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetCheckoutSession } from "@/lib/hooks/useOrders";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sessionId = searchParams.get("session_id");
  const { session, isLoading, error } = useGetCheckoutSession(sessionId);

  useEffect(() => {
    if (!sessionId) {
      router.push("/ressources");
    }
  }, [sessionId, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center pt-16">
          <div className="text-center max-w-md mx-auto px-4">
            <Loader2 className="h-12 w-12 animate-spin text-[hsl(var(--brand))] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 mb-2">
              Vérification du paiement...
            </h2>
            <p className="text-slate-600">
              Nous vérifions les détails de votre transaction.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center pt-16">
          <div className="max-w-2xl mx-auto px-4">
            <Card className="border-red-200 shadow-lg">
              <CardHeader className="bg-red-50 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-red-600">
                  Erreur de paiement
                </CardTitle>
                <p className="text-red-700 mt-2">
                  {error ||
                    "Impossible de récupérer les détails de la transaction"}
                </p>
              </CardHeader>
              <CardContent className="text-center pt-6 pb-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => router.push("/ressources")}
                    className="border-slate-300 hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))]"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour aux ressources
                  </Button>
                  <Button
                    onClick={() => window.location.reload()}
                    className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white"
                  >
                    Réessayer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navigation />

      <main className="flex-1 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Success Header */}
            <Card className="border-green-200 shadow-xl mb-8">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </motion.div>

                <CardTitle className="text-3xl font-bold text-green-700 mb-2">
                  Paiement réussi !
                </CardTitle>

                <p className="text-green-600 text-lg">
                  Merci pour votre achat. Votre commande a été traitée avec
                  succès.
                </p>

                <div className="mt-6">
                  <Badge className="bg-green-600 text-white px-4 py-2 text-sm">
                    Commande confirmée
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Payment Details */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Details */}
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Package className="h-6 w-6 text-[hsl(var(--brand))]" />
                      Détails de la commande
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Transaction Info */}
                    <div className="bg-slate-50 rounded-xl p-6">
                      <h3 className="font-semibold text-slate-900 mb-4">
                        Informations de transaction
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-600">
                              ID de session:
                            </span>
                            <span className="font-mono text-sm text-slate-900">
                              {session.id.slice(-12)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Statut:</span>
                            <Badge className="bg-green-100 text-green-800">
                              {session.payment_status === "paid"
                                ? "Payé"
                                : session.payment_status}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Montant:</span>
                            <span className="font-semibold text-slate-900">
                              {formatPrice(
                                session.amount_total,
                                session.currency
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Date:</span>
                            <span className="text-slate-900">
                              {formatDate(session.created)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Customer Details */}
                    {session.customer_details && (
                      <div className="bg-slate-50 rounded-xl p-6">
                        <h3 className="font-semibold text-slate-900 mb-4">
                          Informations client
                        </h3>
                        <div className="space-y-3">
                          {session.customer_details.email && (
                            <div className="flex items-center gap-3">
                              <Mail className="h-4 w-4 text-slate-400" />
                              <span className="text-slate-700">
                                {session.customer_details.email}
                              </span>
                            </div>
                          )}
                          {session.customer_details.name && (
                            <div className="flex items-center gap-3">
                              <span className="text-slate-600">Nom:</span>
                              <span className="text-slate-900">
                                {session.customer_details.name}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Product Details */}
                    {session.metadata && (
                      <div className="bg-slate-50 rounded-xl p-6">
                        <h3 className="font-semibold text-slate-900 mb-4">
                          Détails de la commande
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-600">ID Commande:</span>
                            <span className="font-mono text-sm text-slate-900">
                              {session.metadata.orderId}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">
                              Mode de paiement:
                            </span>
                            <span className="text-slate-900">
                              Carte bancaire
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Actions Sidebar */}
              <div className="space-y-6">
                {/* Next Steps */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Prochaines étapes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-green-600">
                            1
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Confirmation par email
                          </p>
                          <p className="text-xs text-slate-600">
                            Vous recevrez un email de confirmation sous peu
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">
                            2
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Accès au produit
                          </p>
                          <p className="text-xs text-slate-600">
                            Lien de téléchargement envoyé par email
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-purple-600">
                            3
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Support client
                          </p>
                          <p className="text-xs text-slate-600">
                            Notre équipe reste à votre disposition
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card className="shadow-lg">
                  <CardContent className="pt-6 space-y-3">
                    <Button
                      onClick={() => router.push("/ressources")}
                      className="w-full bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Voir d'autres ressources
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => router.push("/")}
                      className="w-full border-slate-300 hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Retour à l'accueil
                    </Button>
                  </CardContent>
                </Card>

                {/* Contact Support */}
                <Card className="shadow-lg border-slate-200">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="font-medium text-slate-900 mb-2">
                        Besoin d'aide ?
                      </h3>
                      <p className="text-sm text-slate-600 mb-4">
                        Notre équipe support est là pour vous aider
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push("/#contact")}
                        className="border-slate-300 hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))]"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Contacter le support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
