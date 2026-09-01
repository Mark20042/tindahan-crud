import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

type ConfirmationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
};

export const ConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title = "Confirm Deletion", 
    message = "Are you sure you want to delete this item? This action cannot be undone." 
}: ConfirmationModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-0">
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
                        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden border border-zinc-100 p-6"
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 transition-colors rounded-full hover:bg-zinc-100 p-1.5">
                            <X className="w-5 h-5" />
                        </button>
                        
                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-600">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-900 mb-2">{title}</h3>
                            <p className="text-sm text-zinc-500 mb-6">{message}</p>
                            
                            <div className="flex w-full gap-3">
                                <button 
                                    onClick={onClose} 
                                    className="flex-1 py-2.5 text-sm font-semibold text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => {
                                        onConfirm();
                                        onClose();
                                    }} 
                                    className="flex-1 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}