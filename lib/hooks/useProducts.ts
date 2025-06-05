"use client";

import { useState, useEffect } from "react";
import { productAPI, type Product } from "@/lib/api/products";


export function useAllProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await productAPI.getAllProducts();
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err instanceof Error ? err.message : "Failed to fetch products");
                setProducts([]); // Fallback to empty array
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, loading, error };
}


export function useProduct(id: string) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await productAPI.getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError(err instanceof Error ? err.message : "Failed to fetch product");
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return { product, loading, error };
}


export function useFeaturedProducts(limit = 6) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await productAPI.getFeaturedProducts(limit);
                setProducts(data);
            } catch (err) {
                console.error("Error fetching featured products:", err);
                setError(err instanceof Error ? err.message : "Failed to fetch featured products");
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, [limit]);

    return { products, loading, error };
}


export function useProductsByType(type: Product['type']) {
    const { products: allProducts, loading, error } = useAllProducts();

    const filteredProducts = allProducts.filter(product => product.type === type);

    return { products: filteredProducts, loading, error };
}