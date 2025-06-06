"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft, RotateCcw } from "lucide-react";

import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentCanceledPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navigation />

      <main className="flex-1 pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-orange-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="mx-auto w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center mb-6"
                >
                  <XCircle className="h-10 w-10 text-orange-600" />
                </motion.div>

                <CardTitle className="text-3xl font-bold text-orange-700 mb-2">
                  Paiement annulé
                </CardTitle>

                <p className="text-orange-600 text-lg">
                  Votre paiement a été annulé. Aucun montant n'a été débité.
                </p>
              </CardHeader>

              <CardContent className="pt-8 pb-8">
                <div className="text-center space-y-6">
                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="font-semibold text-slate-900 mb-3">
                      Que s'est-il passé ?
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      Vous avez annulé le processus de paiement ou fermé la
                      fenêtre de paiement. Votre commande n'a pas été traitée et
                      aucun montant n'a été prélevé sur votre compte.
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-6">
                    <h3 className="font-semibold text-slate-900 mb-3">
                      Vous voulez réessayer ?
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                      Vous pouvez retourner à la page du produit et relancer le
                      processus d'achat à tout moment.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button
                      onClick={() => router.back()}
                      className="bg-[hsl(var(--brand))] hover:bg-[hsl(var(--brand-dark))] text-white px-6"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Réessayer l'achat
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => router.push("/ressources")}
                      className="border-slate-300 hover:border-[hsl(var(--brand))] hover:text-[hsl(var(--brand))] px-6"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Voir d'autres ressources
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
