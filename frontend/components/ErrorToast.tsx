'use client';
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

type ErrorToastProps = {
    error: Error | null;
    dismissed: boolean;
    onDismiss: () => void;
};

export const ErrorToast = ({ error, dismissed, onDismiss }: ErrorToastProps) => {
    return (
        <AnimatePresence>
            {error && !dismissed && (
                <motion.div 
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed bottom-8 right-8 bg-white px-5 py-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-red-100 flex items-start gap-4 z-50 max-w-sm"
                >
                    <div className="bg-red-50 p-2.5 rounded-full mt-0.5">
                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div className="flex-1 pr-2">
                        <h4 className="font-semibold text-sm text-zinc-900">Oops, something went wrong</h4>
                        <p className="font-medium text-xs mt-1 text-zinc-500 leading-relaxed">{error.message}</p>
                    </div>
                    <button 
                        onClick={onDismiss}
                        className="text-zinc-400 hover:text-zinc-800 transition-colors cursor-pointer p-1 -mr-2"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
