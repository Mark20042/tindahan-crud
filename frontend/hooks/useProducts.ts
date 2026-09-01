'use client'
import api from "@/lib/axios";
import { useEffect, useState } from 'react';
import { Product } from '@/types/products';


export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [stockFilter, setStockFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("None");

    useEffect(() => {
       
        const fetchProducts = async() => {
            try {
                const response = await api.get('/products');
                const data = response.data;
                const productsArray = Array.isArray(data) ? data : (data.products || []);
                setProducts(productsArray);
                setLoading(false);
            } catch (err: any) {
                setError(err);
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        let matchesStatus = true;
        if (statusFilter !== "All") {
            matchesStatus = product.status.toLowerCase() === statusFilter.toLowerCase();
        }

        let matchesStock = true;
        if (stockFilter === "Sold Out") {
            matchesStock = product.stock === 0;
        } else if (stockFilter === "In Stock") {
            matchesStock = product.stock > 0;
        } else if (stockFilter === "Low Stock") {
            matchesStock = product.stock > 0 && product.stock <= 20;
        } else if (stockFilter === "Medium Stock") {
            matchesStock = product.stock > 20 && product.stock <= 49;
        } else if (stockFilter === "High Stock") {
            matchesStock = product.stock >= 50;
        }

        return matchesSearch && matchesStatus && matchesStock;
    }).sort((a, b) => {
        if (sortOrder === "Lowest Price") {
            return a.price - b.price;
        } else if (sortOrder === "Highest Price") {
            return b.price - a.price;
        }
        return 0;
    });

    
    
    const updateProductStatus = async (product: Product, newStatus: string) => {
        try {
          
            const updatedProductData = { ...product, status: newStatus };
            
            
            const response = await api.put(`/products/${product.id}`, updatedProductData);
            
           
            const updatedProduct = response.data;
            setProducts(currentProducts => 
                currentProducts.map(p => p.id === product.id ? updatedProduct : p)
            );
        } catch (err: any) {
            console.error("Failed to update status:", err);
           
        }
    }

    const showOneProduct = async (productId: number) => {
        try {
            const response = await api.get(`/products/${productId}`);
            const product = response.data;
            return product;
        } catch (err: any) {
            console.error("Failed to fetch product:", err);
            return null;
        }
    }

    const addProduct = async (product: Product) => {
        try {
            const response = await api.post('/products', product);
            const newProduct = response.data;
            setProducts(currentProducts => [...currentProducts, newProduct]);
        } catch (err: any) {
            console.error("Failed to add product:", err);
        }
    }

    const deleteProduct = async (productId: number) => {
        try {
            await api.delete(`/products/${productId}`);
            setProducts(currentProducts => currentProducts.filter(p => p.id !== productId));
        } catch (err: any) {
            console.error("Failed to delete product:", err);
        }
    }

    const editProduct = async (product: Product) => {
        try {
            const response = await api.put(`/products/${product.id}`, product);
            const updatedProduct = response.data;
            setProducts(currentProducts => currentProducts.map(p => p.id === product.id ? updatedProduct : p));
        } catch (err: any) {
            console.error("Failed to edit product:", err);
        }
    }

    return { 
        products: filteredProducts, 
        allProducts: products,
        loading, 
        error,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        stockFilter,
        setStockFilter,
        sortOrder,
        setSortOrder,
        updateProductStatus,
        showOneProduct,
        addProduct,
        deleteProduct,
        editProduct
    };
    
}