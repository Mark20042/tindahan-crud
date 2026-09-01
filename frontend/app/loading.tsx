import { Store } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a]">
            
            {/* Center icon box */}
            <div className="w-14 h-14 bg-white text-black rounded-xl flex items-center justify-center shadow-lg mb-6">
                <Store className="w-7 h-7" />
            </div>
            
            {/* Text & dots */}
            <div className="flex flex-col items-center gap-3">
                <h1 className="text-[13px] font-bold tracking-[0.15em] text-white font-mono">
                    AMONG TINDAHAN
                </h1>
                
                <div className="flex gap-1.5 opacity-50">
                    <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>
                    <span className="w-1 h-1 bg-white rounded-full animate-pulse [animation-delay:200ms]"></span>
                    <span className="w-1 h-1 bg-white rounded-full animate-pulse [animation-delay:400ms]"></span>
                </div>
            </div>

        </div>
    );
}
