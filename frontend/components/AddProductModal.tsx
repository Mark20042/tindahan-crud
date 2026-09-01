import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown } from 'lucide-react';
import { useState, FormEvent } from 'react';

type AddProductModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (product: any) => void;
};

export const AddProductModal = ({ isOpen, onClose, onAdd }: AddProductModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        image: '',
        status: 'active'
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onAdd({
            ...formData,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock, 10)
        });
        setFormData({ name: '', category: '', price: '', stock: '', image: '', status: 'active' });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-100"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-zinc-100">
                            <h2 className="text-xl font-semibold text-zinc-900 tracking-tight">Add New Product</h2>
                            <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100 p-2">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">Product Name</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all text-sm" placeholder="e.g. Classic White T-Shirt" />
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">Category</label>
                                <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all text-sm" placeholder="e.g. Apparel" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">Price (₱)</label>
                                    <input required type="number" step="0.01" min="0" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all text-sm" placeholder="0.00" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">Stock</label>
                                    <input required type="number" min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all text-sm" placeholder="0" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">Image URL</label>
                                <input required type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all text-sm" placeholder="https://..." />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold text-zinc-600 uppercase tracking-wider">Status</label>
                                <div className="relative">
                                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all text-sm appearance-none cursor-pointer">
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-zinc-100 flex justify-end gap-3">
                                <button type="button" onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="px-5 py-2.5 bg-zinc-900 text-white text-sm font-semibold rounded-lg hover:bg-zinc-800 transition-all shadow-md hover:shadow-lg transform active:scale-95">
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}