import { useState, type FormEvent } from 'react';

import { motion } from 'motion/react';
import { ChevronRight, Key } from 'lucide-react';

export default function PortalPage() {
    const [pin, setPin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setTimeout(() => {
            alert('Invalid Portal Credentials. Please contact your Northshore account manager.');
            setLoading(false);
        }, 1500);
    };

    return (
        <main className="flex min-h-screen items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md rounded-2xl border border-elegant-border bg-elegant-card p-10 shadow-2xl"
            >
                <div className="mb-10 text-center">
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-gold/20 bg-gold/5 text-gold">
                        <Key className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-white">Client Portal Access</h2>
                    <p className="mt-2 text-sm uppercase tracking-widest text-white/40 font-medium">Secured Terminal V0.4</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="ml-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                            Access PIN
                        </label>
                        <input
                            required
                            type="password"
                            maxLength={6}
                            value={pin}
                            onChange={(event) => setPin(event.target.value.replace(/\D/g, ''))}
                            placeholder="••••••"
                            className="w-full border-b border-elegant-border bg-transparent py-4 text-center text-2xl tracking-[1em] text-gold outline-none transition placeholder:text-white/10 focus:border-gold"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="ml-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
                            Password
                        </label>
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Password"
                            className="w-full border-b border-elegant-border bg-transparent py-4 text-sm text-white outline-none transition placeholder:text-white/10 focus:border-gold"
                        />
                    </div>

                    <button
                        disabled={loading}
                        type="submit"
                        className="flex w-full items-center justify-center gap-3 rounded-sm bg-white py-5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-neutral-200 disabled:opacity-50"
                    >
                        {loading ? 'Decrypting...' : 'Establish Secure Link'}
                        {!loading && <ChevronRight className="h-4 w-4" />}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] leading-relaxed text-white/20">
                        Unauthorized access attempts are logged. <br /> Account registration is strictly invite-only.
                    </p>
                </div>
            </motion.div>
        </main>
    );
}
