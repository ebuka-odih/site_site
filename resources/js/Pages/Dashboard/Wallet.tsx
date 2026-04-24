import { Link, useForm, usePage } from '@inertiajs/react';
import { ArrowDownCircle, ArrowUpCircle, CheckCircle, Copy, QrCode } from 'lucide-react';
import { useEffect, useState } from 'react';
import DashboardLayout, { formatCurrency, formatDate, StatusBadge } from '../../Components/DashboardLayout';
import type { Deposit, PageProps, PaginatedData, Wallet, Withdrawal } from '../../types';

interface Props extends PageProps {
    wallets: Wallet[];
    deposits: PaginatedData<Deposit>;
    withdrawals: PaginatedData<Withdrawal>;
    balance: number;
}

export default function WalletPage() {
    const { wallets, deposits, withdrawals, balance } = usePage<Props>().props;
    const initialTab = new URLSearchParams(window.location.search).get('tab') === 'withdraw' ? 'withdraw' : 'deposit';
    const [activeTab, setActiveTab] = useState<'deposit' | 'withdraw'>(initialTab);

    return (
        <DashboardLayout title="Wallet" breadcrumb={[{ label: 'Dashboard', href: '/user/dashboard' }, { label: 'Wallet' }]}>
            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-[var(--color-dash-text)]">Wallet</h1>
                        <p className="mt-1 text-sm text-[var(--color-dash-muted)]">Deposit from admin-approved wallets or request withdrawals for review.</p>
                    </div>
                    <div className="rounded-lg border border-[var(--color-dash-border)] bg-[var(--color-dash-surface)] px-4 py-2">
                        <p className="text-xs text-[var(--color-dash-muted)]">Available Balance</p>
                        <p className="text-lg font-semibold text-gold">{formatCurrency(balance)}</p>
                    </div>
                </div>

                <div className="flex rounded-lg border border-[var(--color-dash-border)] bg-[var(--color-dash-surface)] p-1">
                    <TabButton active={activeTab === 'deposit'} onClick={() => setActiveTab('deposit')} icon={<ArrowDownCircle size={16} />} label="Deposit" />
                    <TabButton active={activeTab === 'withdraw'} onClick={() => setActiveTab('withdraw')} icon={<ArrowUpCircle size={16} />} label="Withdraw" />
                </div>

                {activeTab === 'deposit' ? (
                    <DepositPanel wallets={wallets} />
                ) : (
                    <WithdrawPanel wallets={wallets} balance={balance} />
                )}

                <div className="grid gap-6 xl:grid-cols-2">
                    <History title="Deposit History" rows={deposits.data.map(item => ({ id: item.id, amount: item.amount, currency: item.currency, status: item.status, date: item.created_at, detail: item.wallet_address ?? '' }))} links={deposits.links} />
                    <History title="Withdrawal History" rows={withdrawals.data.map(item => ({ id: item.id, amount: item.amount, currency: item.currency, status: item.status, date: item.created_at, detail: item.wallet_address }))} links={withdrawals.links} />
                </div>
            </div>
        </DashboardLayout>
    );
}

function DepositPanel({ wallets }: { wallets: Wallet[] }) {
    const [step, setStep] = useState<'form' | 'pay'>('form');
    const [copied, setCopied] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(900);
    const form = useForm({ amount: '', wallet_id: wallets[0]?.id ? String(wallets[0].id) : '', tx_hash: '' });
    const selectedWallet = wallets.find(wallet => String(wallet.id) === form.data.wallet_id);

    useEffect(() => {
        if (step !== 'pay') {
            return;
        }
        setSecondsLeft(900);
        const timer = window.setInterval(() => setSecondsLeft(value => Math.max(value - 1, 0)), 1000);
        return () => window.clearInterval(timer);
    }, [step, form.data.wallet_id]);

    function copyAddress() {
        if (!selectedWallet) {
            return;
        }
        navigator.clipboard.writeText(selectedWallet.address);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
    }

    function submit(event: React.FormEvent) {
        event.preventDefault();
        form.post('/user/wallet/deposits', {
            preserveScroll: true,
            onSuccess: () => {
                form.reset('amount', 'tx_hash');
                setStep('form');
            },
        });
    }

    return (
        <section className="rounded-lg border border-[var(--color-dash-border)] bg-[var(--color-dash-surface)] p-4">
            {step === 'form' ? (
                <div className="grid gap-4 lg:grid-cols-[1fr_1fr_auto]">
                    <Field label="Amount">
                        <input type="number" min="10" step="0.01" value={form.data.amount} onChange={event => form.setData('amount', event.target.value)} placeholder="Enter amount" className={inputClass(Boolean(form.errors.amount))} />
                        {form.errors.amount && <ErrorText message={form.errors.amount} />}
                    </Field>
                    <Field label="Select Wallet">
                        <select value={form.data.wallet_id} onChange={event => form.setData('wallet_id', event.target.value)} className={inputClass(Boolean(form.errors.wallet_id))}>
                            {wallets.map(wallet => <option key={wallet.id} value={wallet.id}>{wallet.currency} · {wallet.network ?? wallet.name}</option>)}
                        </select>
                        {form.errors.wallet_id && <ErrorText message={form.errors.wallet_id} />}
                    </Field>
                    <button disabled={!form.data.amount || !form.data.wallet_id} onClick={() => setStep('pay')} className="mt-6 h-10 rounded-lg bg-gold px-5 text-sm font-semibold text-black disabled:opacity-50">
                        Proceed to Deposit
                    </button>
                </div>
            ) : (
                <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[220px_1fr]">
                    <div className="rounded-lg border border-[var(--color-dash-border)] bg-[var(--color-dash-bg)] p-4">
                        <QrVisual value={selectedWallet?.address ?? ''} />
                        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[var(--color-dash-muted)]">
                            <QrCode size={14} />
                            QR Code
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-xs text-[var(--color-dash-muted)]">Send exactly</p>
                                <p className="text-2xl font-semibold text-gold">{formatCurrency(form.data.amount || 0)}</p>
                            </div>
                            <div className="rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-amber-300">
                                {formatTimer(secondsLeft)}
                            </div>
                        </div>
                        <div className="rounded-lg border border-[var(--color-dash-border)] bg-[var(--color-dash-bg)] p-3">
                            <p className="mb-1 text-xs text-[var(--color-dash-muted)]">{selectedWallet?.currency} · {selectedWallet?.network ?? selectedWallet?.name}</p>
                            <div className="flex gap-2">
                                <p className="min-w-0 flex-1 break-all font-mono text-xs text-[var(--color-dash-text)]">{selectedWallet?.address}</p>
                                <button type="button" onClick={copyAddress} className="h-8 rounded bg-gold/10 px-2 text-gold hover:bg-gold/20">
                                    {copied ? <CheckCircle size={15} /> : <Copy size={15} />}
                                </button>
                            </div>
                        </div>
                        <Field label="Transaction Hash (optional)">
                            <input value={form.data.tx_hash} onChange={event => form.setData('tx_hash', event.target.value)} placeholder="Paste transaction hash" className={inputClass(Boolean(form.errors.tx_hash))} />
                            {form.errors.tx_hash && <ErrorText message={form.errors.tx_hash} />}
                        </Field>
                        <div className="flex gap-2">
                            <button type="button" onClick={() => setStep('form')} className="flex-1 rounded-lg border border-[var(--color-dash-border)] px-4 py-2 text-sm text-[var(--color-dash-muted)] hover:text-[var(--color-dash-text)]">Back</button>
                            <button disabled={form.processing} className="flex-1 rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-black disabled:opacity-60">I have sent deposit</button>
                        </div>
                    </div>
                </form>
            )}
        </section>
    );
}

function WithdrawPanel({ wallets, balance }: { wallets: Wallet[]; balance: number }) {
    const form = useForm({ amount: '', wallet_id: wallets[0]?.id ? String(wallets[0].id) : '', wallet_address: '' });
    const insufficientBalance = Number(form.data.amount || 0) > balance;

    function submit(event: React.FormEvent) {
        event.preventDefault();
        form.post('/user/wallet/withdrawals', {
            preserveScroll: true,
            onSuccess: () => form.reset('amount', 'wallet_address'),
        });
    }

    return (
        <section className="rounded-lg border border-[var(--color-dash-border)] bg-[var(--color-dash-surface)] p-4">
            <form onSubmit={submit} className="grid gap-4 lg:grid-cols-[1fr_1fr_2fr_auto]">
                <Field label="Amount">
                    <input type="number" min="10" step="0.01" value={form.data.amount} onChange={event => form.setData('amount', event.target.value)} placeholder="Enter amount" className={inputClass(Boolean(form.errors.amount) || insufficientBalance)} />
                    {insufficientBalance && <ErrorText message="Exceeds available balance." />}
                    {form.errors.amount && <ErrorText message={form.errors.amount} />}
                </Field>
                <Field label="Select Wallet">
                    <select value={form.data.wallet_id} onChange={event => form.setData('wallet_id', event.target.value)} className={inputClass(Boolean(form.errors.wallet_id))}>
                        {wallets.map(wallet => <option key={wallet.id} value={wallet.id}>{wallet.currency} · {wallet.network ?? wallet.name}</option>)}
                    </select>
                    {form.errors.wallet_id && <ErrorText message={form.errors.wallet_id} />}
                </Field>
                <Field label="Destination Address">
                    <input value={form.data.wallet_address} onChange={event => form.setData('wallet_address', event.target.value)} placeholder="Enter receiving wallet address" className={inputClass(Boolean(form.errors.wallet_address))} />
                    {form.errors.wallet_address && <ErrorText message={form.errors.wallet_address} />}
                </Field>
                <button disabled={form.processing || insufficientBalance || !form.data.amount || !form.data.wallet_address} className="mt-6 h-10 rounded-lg bg-gold px-5 text-sm font-semibold text-black disabled:opacity-50">
                    Proceed
                </button>
            </form>
        </section>
    );
}

function TabButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
    return (
        <button onClick={onClick} className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium ${active ? 'bg-gold text-black' : 'text-[var(--color-dash-muted)] hover:text-[var(--color-dash-text)]'}`}>
            {icon}
            {label}
        </button>
    );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-[var(--color-dash-muted)]">{label}</span>
            {children}
        </label>
    );
}

function inputClass(hasError: boolean) {
    return `h-10 w-full rounded-lg border bg-[var(--color-dash-bg)] px-3 text-sm text-[var(--color-dash-text)] outline-none focus:border-gold/50 ${hasError ? 'border-red-500/60' : 'border-[var(--color-dash-border)]'}`;
}

function ErrorText({ message }: { message: string }) {
    return <span className="mt-1 block text-xs text-red-400">{message}</span>;
}

function formatTimer(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes}:${String(remainder).padStart(2, '0')} remaining`;
}

function QrVisual({ value }: { value: string }) {
    return (
        <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=176x176&data=${encodeURIComponent(value)}`}
            alt="Deposit wallet QR code"
            className="mx-auto h-44 w-44 rounded-lg bg-white p-2"
        />
    );
}

function History({ title, rows, links }: { title: string; rows: { id: number; amount: string; currency: string; status: string; date: string; detail: string }[]; links: { url: string | null; label: string; active: boolean }[] }) {
    return (
        <section className="rounded-lg border border-[var(--color-dash-border)] bg-[var(--color-dash-surface)]">
            <h2 className="border-b border-[var(--color-dash-border)] px-4 py-3 text-sm font-semibold text-[var(--color-dash-text)]">{title}</h2>
            <div className="divide-y divide-[var(--color-dash-border)]">
                {rows.length ? rows.map(row => (
                    <div key={row.id} className="px-4 py-3">
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-[var(--color-dash-text)]">{formatCurrency(row.amount)} <span className="text-xs font-normal text-[var(--color-dash-muted)]">{row.currency}</span></p>
                                <p className="mt-1 truncate font-mono text-[10px] text-[var(--color-dash-muted)]">{row.detail}</p>
                            </div>
                            <div className="shrink-0 text-right">
                                <StatusBadge status={row.status} />
                                <p className="mt-1 text-xs text-[var(--color-dash-muted)]">{formatDate(row.date)}</p>
                            </div>
                        </div>
                    </div>
                )) : <p className="p-6 text-center text-sm text-[var(--color-dash-muted)]">No transactions yet.</p>}
            </div>
            <div className="flex flex-wrap gap-2 border-t border-[var(--color-dash-border)] p-3">
                {links.filter(link => link.url).map((link, index) => (
                    <Link key={`${link.label}-${index}`} href={link.url ?? '#'} preserveScroll className={`rounded px-2.5 py-1 text-xs ${link.active ? 'bg-gold text-black' : 'bg-[var(--color-dash-surface-2)] text-[var(--color-dash-muted)] hover:text-[var(--color-dash-text)]'}`} dangerouslySetInnerHTML={{ __html: link.label }} />
                ))}
            </div>
        </section>
    );
}
