"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/ui/LazyImage";
import { BookOpen, Package, ExternalLink } from "lucide-react";
import { useAllProducts } from "@/lib/hooks/useProducts";

type TabKey = "BOOK" | "PRODUCT";

export default function ResourcesSection() {
  const [tab, setTab] = useState<TabKey>("BOOK");
  const { products: allProducts, loading, error } = useAllProducts();
  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];
    return allProducts.filter(product => product.type === tab);
  }, [allProducts, tab]);
  if (loading || error) return null;

  const tabs: { key: TabKey; label: string; Icon: any }[] = [
    { key: "BOOK", label: "Livres", Icon: BookOpen },
    { key: "PRODUCT", label: "Outils", Icon: Package },
  ];
  const getProductImage = (product: any) => {
    const typeMap = {
      BOOK: "/placeholder.svg?height=300&width=400&text=Livre",
      PRODUCT: "/placeholder.svg?height=300&width=400&text=Produit",
      TOOL: "/placeholder.svg?height=300&width=400&text=Outil",
      FORMATION: "/placeholder.svg?height=300&width=400&text=Formation"
    };
    return typeMap[product.type as keyof typeof typeMap] || "/placeholder.svg";
  };
  const getDisplayPrice = (product: any) => {
    const finalPrice = product.price - (product.discount || 0);
    return finalPrice > 0 ? `${finalPrice.toFixed(2)} €` : "Gratuit";
  };
  const hasDiscount = (product: any) => {
    return product.discount && product.discount > 0;
  };

  return (
      <section
          id="ressources"
          className="section-padding bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900"
      >
        <div className="section-container">
          {/* Header Section */}
          <header className="mb-16 text-center">
            <Badge className="bg-emerald-600 text-white px-6 py-2 rounded-full shadow">
              Centre de ressources
            </Badge>
            <h2 className="mt-5 text-3xl md:text-4xl font-semibold">
              Boostez vos connaissances
            </h2>
            <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Guides pratiques, livres blancs et outils maison pour passer au niveau supérieur.
            </p>

            {/* Dynamic Tab System */}
            <div className="relative mt-10 inline-flex rounded-full bg-slate-100 dark:bg-slate-700 p-1 shadow-inner">
              {/* Animated ink-bar indicator */}
              <motion.span
                  layoutId="inkbar"
                  className="absolute inset-0 z-0 rounded-full bg-emerald-600"
                  style={{ width: "50%" }}
                  animate={{ x: tab === "BOOK" ? 0 : "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />

              {tabs.map(({ key, label, Icon }) => (
                  <button
                      key={key}
                      onClick={() => setTab(key)}
                      className={`
                  relative z-10 flex items-center gap-1 rounded-full px-6 py-2 text-sm font-medium transition
                  ${
                          tab === key
                              ? "text-white"
                              : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                      }
                `}
                      aria-pressed={tab === key}
                  >
                    <Icon size={14} /> {label}
                  </button>
              ))}
            </div>
          </header>

          {/* Centered Products Grid with Fixed Card Heights */}
          <div className="flex flex-wrap justify-center gap-10 max-w-6xl mx-auto">
            {filteredProducts.slice(0, 6).map((product, index) => (
                <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group relative h-96 w-80 flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-slate-800 shadow-xl hover:shadow-2xl transition cursor-pointer"
                    onClick={() => window.location.href = `/ressources/${product.id}`}
                >
                  {/* Fixed Height Image Section */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <LazyImage
                        src={getProductImage(product)}
                        alt={product.title}
                        width={600}
                        height={360}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Featured Product Badge */}
                    {product.isFeatured && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-emerald-600 text-white text-xs px-2 py-1">
                            Recommandé
                          </Badge>
                        </div>
                    )}

                    {/* Discount Indicator Badge */}
                    {hasDiscount(product) && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                            -{product.discount}€
                          </Badge>
                        </div>
                    )}
                  </div>

                  {/* Flexible Content Area */}
                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold leading-tight group-hover:text-emerald-600 transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Product Characteristics Display */}
                      {product.characteristics && product.characteristics.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {product.characteristics.slice(0, 2).map((characteristic, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {characteristic}
                                </Badge>
                            ))}
                            {product.characteristics.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{product.characteristics.length - 2}
                                </Badge>
                            )}
                          </div>
                      )}
                    </div>

                    {/* Fixed Bottom Section for Pricing */}
                    <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-700">
                      <div className="flex items-center justify-between">
                        <div className="text-right">
                          {hasDiscount(product) && (
                              <p className="text-xs text-slate-400 line-through">
                                {product.price.toFixed(2)} €
                              </p>
                          )}
                          <p className="font-medium text-emerald-600">
                            {getDisplayPrice(product)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* External Link Quick Launch Button */}
                  {product.link && (
                      <Link
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute top-4 right-4 rounded-full bg-emerald-600 p-2 text-white shadow-lg opacity-0 group-hover:opacity-100 hover:scale-105 transition-all duration-300"
                          aria-label={`Accéder à ${product.title}`}
                      >
                        <ExternalLink size={16} />
                      </Link>
                  )}
                </motion.article>
            ))}
          </div>

          {/* View All Resources Button */}
          {filteredProducts.length > 6 && (
              <div className="mt-16 text-center">
                <Button
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={() => window.location.assign("/ressources")}
                >
                  Voir toute la bibliothèque
                </Button>
              </div>
          )}

          {/* Empty State for No Products */}
          {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-slate-600 dark:text-slate-400">
                  Aucun {tab === "BOOK" ? "livre" : "produit"} disponible pour le moment.
                </p>
              </div>
          )}
        </div>
      </section>
  );
}