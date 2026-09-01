import { Store, Bell, Search, Menu } from 'lucide-react';

export const Navbar = () => {
    return (
        <nav className="bg-[#0a0a0a] border-b border-zinc-800/50 w-full z-50">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                
                {/* Left Section: Logo & Title */}
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-8 h-8 text-white rounded flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                            <Store className="w-4 h-4" />
                        </div>
                        <h1 className="text-lg font-medium tracking-tight text-white flex items-center gap-1.5 whitespace-nowrap">
                            Among Tindahan
                        </h1>
                    </div>
                </div>
            </div>
        </nav>
    );
}