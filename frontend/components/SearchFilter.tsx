import { Search, Plus, Filter, ChevronDown, X } from 'lucide-react';
import { Product } from '@/types/products';

type SearchFilterProps = {
    allProducts: Product[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    statusFilter: string;
    setStatusFilter: (status: string) => void;
    stockFilter: string;
    setStockFilter: (stock: string) => void;
    sortOrder: string;
    setSortOrder: (sort: string) => void;
    onAddProduct: () => void;
    onClearFilters: () => void;
};

export const SearchFilter = ({ allProducts, searchQuery, setSearchQuery, statusFilter, setStatusFilter, stockFilter, setStockFilter, sortOrder, setSortOrder, onAddProduct, onClearFilters }: SearchFilterProps) => {
    
    const statusOptions = [
        { value: 'All', label: 'All Status' },
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' }
    ];

    const stockOptions = [
        { value: 'All', label: 'All Stock' },
        { value: 'In Stock', label: 'In Stock' },
        { value: 'Low Stock', label: 'Low Stock' },
        { value: 'Medium Stock', label: 'Medium Stock' },
        { value: 'High Stock', label: 'High Stock' },
        { value: 'Sold Out', label: 'Sold Out' }
    ];

    const sortOptions = [
        { value: 'None', label: 'Sort Price' },
        { value: 'Highest Price', label: 'Highest Price' },
        { value: 'Lowest Price', label: 'Lowest Price' }
    ];

    const hasActiveFilters = searchQuery !== '' || statusFilter !== 'All' || stockFilter !== 'All' || sortOrder !== 'None';

    return (
        <div className="w-full flex flex-col items-center sticky top-0 z-20 bg-zinc-50">
            <div className="w-full max-w-6xl mx-auto px-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-8 border-b border-zinc-200 pb-6 mb-8">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-96 group">
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search ug Products..." 
                        className="w-full border-b border-zinc-300 bg-transparent py-2.5 pl-2 pr-10 text-sm focus:outline-none focus:border-zinc-900 transition-colors placeholder:text-zinc-400 text-zinc-900" 
                    />
                    <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                </div>
                
                {/* Filters and Actions */}
                <div className="flex gap-6 items-center">
                    
                    {/* Status Dropdown */}
                    <div className="relative flex items-center gap-1.5 group cursor-pointer border-b border-transparent hover:border-zinc-900 transition-colors pb-1">
                        <select 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none bg-transparent text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400 focus:outline-none focus:text-zinc-900 cursor-pointer pr-4 group-hover:text-zinc-900 transition-colors"
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                            <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                        </div>
                    </div>

                    {/* Stock Dropdown */}
                    <div className="relative flex items-center gap-1.5 group cursor-pointer border-b border-transparent hover:border-zinc-900 transition-colors pb-1">
                        <select 
                            value={stockFilter}
                            onChange={(e) => setStockFilter(e.target.value)}
                            className="appearance-none bg-transparent text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400 focus:outline-none focus:text-zinc-900 cursor-pointer pr-4 group-hover:text-zinc-900 transition-colors"
                        >
                            {stockOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                            <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                        </div>
                    </div>
                    
                    {/* Sort Dropdown */}
                    <div className="relative flex items-center gap-1.5 group cursor-pointer border-b border-transparent hover:border-zinc-900 transition-colors pb-1">
                        <select 
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="appearance-none bg-transparent text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400 focus:outline-none focus:text-zinc-900 cursor-pointer pr-4 group-hover:text-zinc-900 transition-colors"
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2">
                            <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                        </div>
                    </div>

                    <div className="h-4 w-px bg-zinc-200 hidden md:block"></div>

                    {/* Clear Filters Button */}
                    {hasActiveFilters && (
                        <button 
                            onClick={onClearFilters}
                            className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                        >
                            <X className="w-3.5 h-3.5" />
                            Clear
                        </button>
                    )}

                    {/* Add Product Button */}
                    <button 
                        onClick={onAddProduct}
                        className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-900 border-b border-zinc-900 pb-1 hover:text-zinc-600 hover:border-zinc-600 transition-all cursor-pointer"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
}