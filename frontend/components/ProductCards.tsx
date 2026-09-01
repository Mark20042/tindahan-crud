'use client'
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShoppingCart, Edit2, Trash2 } from 'lucide-react';
import { Product } from "@/types/products";
import { ErrorToast } from "./ErrorToast";

type ProductCardsProps = {
    products: Product[];
    loading: boolean;
    error: Error | null;
    updateProductStatus: (product: Product, newStatus: string) => Promise<void>;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
    onShow: (product: Product) => void;
};

export const ProductCards = ({ products, loading, error, updateProductStatus, onEdit, onDelete, onShow }: ProductCardsProps) => {
    
    const [dismissedError, setDismissedError] = useState(false);

    useEffect(() => {
        if (error) {
            setDismissedError(false);
        }
    }, [error]);

    if (loading) {
        return (
            <div className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-12 gap-y-16 p-8 w-full max-w-6xl mx-auto">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="flex flex-col animate-pulse">
                            <div className="w-full aspect-[4/5] mb-5 bg-zinc-200"></div>
                            <div className="flex flex-col mt-3">
                                <div className="h-3 bg-zinc-200 w-1/3 mb-2 rounded-sm"></div>
                                <div className="h-4 bg-zinc-200 w-3/4 mb-1 rounded-sm"></div>
                                <div className="flex justify-between mt-2 mb-3">
                                    <div className="h-4 bg-zinc-200 w-1/4 rounded-sm"></div>
                                    <div className="h-4 bg-zinc-200 w-1/4 rounded-sm"></div>
                                </div>
                                <div className="flex justify-between mt-2 mb-4">
                                    <div className="h-3 bg-zinc-200 w-1/4 rounded-sm"></div>
                                    <div className="h-3 bg-zinc-200 w-1/4 rounded-sm"></div>
                                </div>
                                <div className="w-full h-9 bg-zinc-200 mb-2 rounded-sm"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
    return (
        <div className="w-full relative">
            
            <ErrorToast error={error} dismissed={dismissedError} onDismiss={() => setDismissedError(true)} />

            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 px-4 w-full max-w-6xl mx-auto text-center">
                    <svg className="w-16 h-16 text-zinc-200 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <h3 className="text-xl font-medium text-zinc-900 mb-2 tracking-wide">No products found</h3>
                    <p className="text-sm text-zinc-500">We couldn't find anything matching your current filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-12 gap-y-16 p-8 w-full max-w-6xl mx-auto">
                    {products.map((product, index) => {
                        const isUnavailable = product.stock === 0 || product.status.toLowerCase() === 'inactive';
                        
                        let btnText = 'Sold Out';
                        if (product.status.toLowerCase() === 'inactive') {
                            btnText = 'Inactive';
                        } else if (product.stock === 0) {
                            btnText = 'Sold Out';
                        } else if (product.stock >= 50) {
                            btnText = 'High Stock';
                        } else if (product.stock > 20) {
                            btnText = 'Medium Stock';
                        } else {
                            btnText = 'Low Stock';
                        }

                        // Calculate percentage (assuming 150+ is "full" for visual purposes)
                        const stockPercentage = Math.min((product.stock / 150) * 100, 100);

                        return (
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                            key={product.id} 
                            className="group flex flex-col cursor-pointer"
                            onClick={() => onShow(product)}
                        >
                            <div className="relative w-full aspect-[4/5] mb-5 overflow-hidden bg-zinc-100">
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = 'https://placehold.co/400x500/eeeeee/999999?text=No+Image';
                                    }}
                                />
                            </div>
                            
                            <div className="flex flex-col mt-3">
                                <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">
                                    {product.category}
                                </span>
                                <h3 className="text-sm font-medium text-zinc-900 group-hover:underline decoration-1 underline-offset-4 transition-all line-clamp-2 mb-1">
                                    {product.name}
                                </h3>
                                
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-semibold text-zinc-900">
                                        ₱{Number(product.price).toFixed(2)}
                                    </span>
                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${product.status.toLowerCase() === 'active' ? 'text-emerald-600' : 'text-red-500'}`}>
                                        {product.status}
                                    </span>
                                </div>
                                
                                {/* Edit and Delete Actions */}
                                <div className="flex justify-between items-center mb-4">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onEdit(product); }}
                                        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                                    >
                                        <Edit2 className="w-3 h-3" /> Edit
                                    </button>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onDelete(product); }}
                                        className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-red-500 hover:text-red-600 transition-colors cursor-pointer"
                                    >
                                        <Trash2 className="w-3 h-3" /> Delete
                                    </button>
                                </div>
                                
                                <button 
                                    disabled={isUnavailable}
                                    className={`relative w-full h-9 border text-[10px] font-semibold uppercase tracking-wider overflow-hidden transition-colors ${
                                        isUnavailable 
                                            ? 'border-zinc-200 bg-zinc-50 cursor-not-allowed text-zinc-400'
                                            : 'border-zinc-200 bg-white hover:border-zinc-900 group/btn'
                                    }`}
                                >
                                    {/* The Progress Bar Fill */}
                                    {!isUnavailable && (
                                        <div 
                                            className="absolute left-0 top-0 h-full bg-zinc-900 transition-all duration-500 ease-out" 
                                            style={{ width: `${stockPercentage}%` }}
                                        />
                                    )}
                                    
                                    {/* The Text */}
                                    <div className={`absolute inset-0 flex items-center justify-center w-full h-full ${
                                        isUnavailable ? 'text-zinc-400' : 'text-white z-10 mix-blend-difference'
                                    }`}>
                                        {btnText}
                                    </div>
                                </button>

                                {(btnText === 'Low Stock' || btnText === 'Sold Out') && (
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); onEdit(product); }}
                                        className="mt-2 w-full h-8 border border-red-500 bg-red-500 text-[9px] font-bold uppercase tracking-widest text-white hover:bg-red-600 hover:border-red-600 transition-all duration-300 flex items-center justify-center gap-1.5 group/restock cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover/restock:rotate-180 transition-transform duration-500 ease-out">
                                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                                            <path d="M3 3v5h5"/>
                                        </svg>
                                       E Restock
                                    </button>
                                )}

                                 <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateProductStatus(product, product.status.toLowerCase() === 'active' ? 'inactive' : 'active');
                                    }}
                                    className="mt-3 text-[9px] uppercase font-bold tracking-[0.2em] text-zinc-400 hover:text-zinc-900 transition-colors w-full text-center cursor-pointer"
                                >
                                  SET TO  {product.status.toLowerCase() === 'active' ? 'Inactive' : 'Active'}
                                </button>
                            </div>
                        </motion.div>
                    )})}
                </div>
            )}
        </div>
    );
}