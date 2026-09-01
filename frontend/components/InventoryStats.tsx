import { Product } from '@/types/products';

type InventoryStatsProps = {
    allProducts: Product[];
};

export const InventoryStats = ({ allProducts = [] }: InventoryStatsProps) => {
    const activeCount = allProducts.filter(p => p.status.toLowerCase() === 'active').length;
    const inactiveCount = allProducts.filter(p => p.status.toLowerCase() === 'inactive').length;
    
    const inStockCount = allProducts.filter(p => p.stock > 0).length;
    const soldOutCount = allProducts.filter(p => p.stock === 0).length;

    const stats = [
        { label: 'All Products', count: allProducts.length, border: 'border-zinc-200' },
        { label: 'Active', count: activeCount, border: 'border-emerald-100' },
        { label: 'Inactive', count: inactiveCount, border: 'border-zinc-200' },
        { label: 'In Stock', count: inStockCount, border: 'border-blue-100' },
        { label: 'Sold Out', count: soldOutCount, border: 'border-red-100' },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto px-8 mt-10 mb-2">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {stats.map((stat, idx) => (
                    <div 
                        key={idx} 
                        className={`bg-white p-5 rounded-2xl border ${stat.border} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-center`}
                    >
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{stat.label}</span>
                        <span className="text-4xl font-black text-zinc-900 tracking-tight">{stat.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
