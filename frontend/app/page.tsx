"use client";
import { useState } from "react";
import { SearchFilter } from "@/components/SearchFilter";
import { ProductCards } from "@/components/ProductCards";
import { AddProductModal } from "@/components/AddProductModal";
import { EditProductModal } from "@/components/EditProductModal";
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { ShowModal } from "@/components/ShowModal";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types/products";
import { InventoryStats } from "@/components/InventoryStats";

export default function Home() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [productToShow, setProductToShow] = useState<Product | null>(null);

  const { 
    products, 
    allProducts,
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
    addProduct,
    editProduct,
    deleteProduct
  } = useProducts();

  return (
    <div className="flex flex-col flex-1 items-center justify-start bg-zinc-50 font-sans text-black min-h-screen w-full">
      <InventoryStats allProducts={allProducts} />
      <SearchFilter 
        allProducts={allProducts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onClearFilters={() => {
          setSearchQuery("");
          setStatusFilter("All");
          setStockFilter("All");
          setSortOrder("None");
        }}
        onAddProduct={() => setIsAddModalOpen(true)}
      />
      
      <ProductCards 
        products={products} 
        loading={loading} 
        error={error} 
        updateProductStatus={updateProductStatus}
        onEdit={(product) => setProductToEdit(product)}
        onDelete={(product) => setProductToDelete(product)}
        onShow={(product) => setProductToShow(product)}
      />

      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={addProduct} 
      />

      <EditProductModal 
        isOpen={!!productToEdit} 
        onClose={() => setProductToEdit(null)} 
        onEdit={editProduct}
        product={productToEdit}
      />

      <ShowModal
        isOpen={!!productToShow}
        onClose={() => setProductToShow(null)}
        product={productToShow}
      />

      <ConfirmationModal 
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={() => {
            if (productToDelete) {
                deleteProduct(productToDelete.id);
            }
        }}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
