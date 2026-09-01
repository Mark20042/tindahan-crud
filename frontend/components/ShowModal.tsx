import { motion, AnimatePresence } from 'motion/react';
import { X, Package, Activity } from 'lucide-react';
import { Product } from '@/types/products';

type ShowModalProps = {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
};

export const ShowModal = ({ isOpen, onClose, product }: ShowModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && product && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-white/95 backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-4xl flex flex-col md:flex-row items-center"
                    >
                        {/* Image Section */}
                        <div className="w-full md:w-1/2 h-64 md:h-[400px] relative flex items-center justify-center p-4 md:p-8">
                            <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-full h-full object-contain "
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/600x800/eeeeee/999999?text=No+Image';
                                }}
                            />
                          
                        </div>

                        {/* Details Section */}
                        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col relative">
                            <button onClick={onClose} className="absolute top-4 right-4 text-zinc-900  transition-colors cursor-pointer  p-2">
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex-1 mt-4">
                                <div className="mb-6">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{product.category}</span>
                                    <h2 className="text-2xl font-bold text-zinc-900 mt-1 leading-tight">{product.name}</h2>
                                </div>
                                
                                <div className="space-y-5">
                                    <div className="flex items-center gap-4 border-b border-zinc-100 pb-4">
                                        <div className="w-10 h-10 rounded-full  flex items-center justify-center text-zinc-600 ">
                                            <span className="text-[17px] font-semibold leading-none">₱</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Price</p>
                                            <p className="text-lg font-bold text-zinc-900">₱{Number(product.price).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-4 border-b border-zinc-100 pb-4">
                                        <div className="w-10 h-10 rounded-full  flex items-center justify-center text-zinc-600 ">
                                            <Package className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Stock</p>
                                            <p className="text-lg font-bold text-zinc-900">{product.stock} Stocks</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 pb-2">
                                        <div className="w-10 h-10 rounded-full  flex items-center justify-center text-zinc-600 ">
                                            <Activity className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">Status</p>
                                            <p className="text-lg font-bold text-zinc-900 capitalize">{product.status}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
