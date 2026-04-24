import { Link, usePage } from '@inertiajs/react';
import { ArrowDownCircle, ArrowUpCircle, Clock, Plus, TrendingUp } from 'lucide-react';
import DashboardLayout, { StatusBadge, formatCurrency, formatDate } from '../../Components/DashboardLayout';
import type { Deposit, PageProps, Withdrawal } from '../../types';

interface Snapshot {
    date: string;
    balance: number;
}

interface Stats {
    total_deposited: number;
    total_withdrawn: number;
    pending_deposits: number;
    pending_withdrawals: number;
}

interface Props extends PageProps {
    dashUser: {
        name: string;
        balance: number;
        is_verified: boolean;
        member_id: string | null;
        created_at: string;
    };
    snapshots: Snapshot[];
    recentDeposits: Deposit[];
    recentWithdrawals: Withdrawal[];
    stats: Stats;
}

function PortfolioChart({ data }: { data: Snapshot[] }) {
    if (data.length < 2) {
        return (
            <div className="flex items-center justify-center h-40 text-[var(--color-dash-muted)] text-sm">
                <TrendingUp size={16} className="mr-2" />
                Chart will appear after first approved deposit
            </div>
        );
    }

    const w = 600, h = 180;
    const pad = { top: 16, right: 16, bottom: 32, left: 64 };

    const values = data.map(d => d.balance);
    const minV = Math.min(...values);
    const maxV = Math.max(...values);
    const range = maxV - minV || 1;

    const xs = (i: number) => pad.left + (i / (data.length - 1)) * (w - pad.left - pad.right);
    const ys = (v: number) => pad.top + (1 - (v - minV) / range) * (h - pad.top - pad.bottom);

    const linePts = data.map((d, i) => `${xs(i)},${ys(d.balance)}`).join(' ');
    const areaPts = `${xs(0)},${h - pad.bottom} ${linePts} ${xs(data.length - 1)},${h - pad.bottom}`;

    const yTicks = [0, 0.5, 1].map(p => ({
        v: minV + p * range,
        y: ys(minV + p * range),
    }));

    const xLabels = [0, Math.floor((data.length - 1) / 2), data.length - 1];

    const change = data[data.length - 1].balance - data[0].balance;
    const changePct = ((change / (data[0].balance || 1)) * 100).toFixed(2);
    const positive = change >= 0;

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-[var(--color-dash-muted)]">Portfolio Performance</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${positive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'}`}>
                    {positive ? '+' : ''}{changePct}%
                </span>
            </div>
            <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 160 }}>
                <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#d4af37" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* Grid */}
                {yTicks.map(t => (
                    <line key={t.v} x1={pad.left} y1={t.y} x2={w - pad.right} y2={t.y}
                        stroke="rgba(255,255,255,0.05)" strokeDasharray="3 5" />
                ))}
                {/* Area */}
                <polygon points={areaPts} fill="url(#chartGrad)" />
                {/* Line */}
                <polyline points={linePts} fill="none" stroke="#d4af37" strokeWidth="1.8"
                    strokeLinejoin="round" strokeLinecap="round" />
                {/* Last point dot */}
                <circle cx={xs(data.length - 1)} cy={ys(data[data.length - 1].balance)}
                    r="3.5" fill="#d4af37" />
                {/* Y labels */}
                {yTicks.map(t => (
                    <text key={t.v} x={pad.left - 6} y={t.y + 4} textAnchor="end"
                        fontSize="10" fill="#6b7a99">
                        {t.v >= 1000 ? `$${(t.v / 1000).toFixed(0)}k` : `$${t.v.toFixed(0)}`}
                    </text>
                ))}
                {/* X labels */}
                {xLabels.map(i => (
                    <text key={i} x={xs(i)} y={h - pad.bottom + 14} textAnchor="middle"
                        fontSize="10" fill="#6b7a99">
                        {data[i].date}
                    </text>
                ))}
            </svg>
        </div>
    );
}

export default function DashboardIndex() {
    const { dashUser, snapshots, recentDeposits, recentWithdrawals, stats } =
        usePage<Props>().props;

    const allActivity = [
        ...recentDeposits.map(d => ({ ...d, type: 'deposit' as const })),
        ...recentWithdrawals.map(w => ({ ...w, type: 'withdrawal' as const })),
    ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 8);

    return (
        <DashboardLayout
            title="Overview"
            breadcrumb={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Overview' }]}
        >
            {/* Welcome + Balance hero */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                {/* Balance card */}
                <div className="lg:col-span-1 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1c2e] to-[#111827] border border-gold/20 p-6">
                    <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/20 rounded-full blur-2xl" />
                    </div>
                    <div className="relative">
                        <p className="text-xs text-[var(--color-dash-muted)] uppercase tracking-wider mb-1">Total Balance</p>
                        <p className="text-3xl font-bold text-white mb-1">
                            {formatCurrency(dashUser.balance)}
                        </p>
                        <p className="text-xs text-[var(--color-dash-muted)]">
                            {dashUser.is_verified ? (
                                <span className="text-emerald-400">● Verified Account</span>
                            ) : (
                                <span className="text-amber-400">● Pending Verification</span>
                            )}
                        </p>
                        {dashUser.member_id && (
                            <p className="mt-3 text-[10px] font-mono text-[var(--color-dash-muted)] bg-white/5 px-2 py-1 rounded w-fit">
                                {dashUser.member_id}
                            </p>
                        )}
                        <div className="mt-4 flex gap-2">
                            <Link
                                href="/dashboard/deposits"
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gold text-black text-xs font-semibold hover:bg-gold/90 transition-all"
                            >
                                <ArrowDownCircle size={14} />
                                Deposit
                            </Link>
                            <Link
                                href="/dashboard/withdrawals"
                                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/15 border border-white/10 transition-all"
                            >
                                <ArrowUpCircle size={14} />
                                Withdraw
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                    {[
                        {
                            label: 'Total Deposited',
                            value: formatCurrency(stats.total_deposited),
                            icon: <ArrowDownCircle size={18} className="text-emerald-400" />,
                            sub: stats.pending_deposits > 0 ? `${stats.pending_deposits} pending` : 'All confirmed',
                            color: 'text-emerald-400',
                        },
                        {
                            label: 'Total Withdrawn',
                            value: formatCurrency(stats.total_withdrawn),
                            icon: <ArrowUpCircle size={18} className="text-blue-400" />,
                            sub: stats.pending_withdrawals > 0 ? `${stats.pending_withdrawals} pending` : 'All processed',
                            color: 'text-blue-400',
                        },
                        {
                            label: 'Pending Deposits',
                            value: stats.pending_deposits,
                            icon: <Clock size={18} className="text-amber-400" />,
                            sub: 'Awaiting review',
                            color: 'text-amber-400',
                        },
                        {
                            label: 'Pending Withdrawals',
                            value: stats.pending_withdrawals,
                            icon: <Clock size={18} className="text-purple-400" />,
                            sub: 'Awaiting processing',
                            color: 'text-purple-400',
                        },
                    ].map(stat => (
                        <div
                            key={stat.label}
                            className="rounded-2xl bg-[var(--color-dash-surface)] border border-[var(--color-dash-border)] p-4"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-xs text-[var(--color-dash-muted)]">{stat.label}</p>
                                {stat.icon}
                            </div>
                            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
                            <p className="text-[10px] text-[var(--color-dash-muted)] mt-1">{stat.sub}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Portfolio Chart */}
            <div className="rounded-2xl bg-[var(--color-dash-surface)] border border-[var(--color-dash-border)] p-5 mb-6">
                <h2 className="text-sm font-semibold text-[var(--color-dash-text)] mb-4">Portfolio Chart</h2>
                <PortfolioChart data={snapshots} />
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl bg-[var(--color-dash-surface)] border border-[var(--color-dash-border)]">
                <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-dash-border)]">
                    <h2 className="text-sm font-semibold text-[var(--color-dash-text)]">Recent Activity</h2>
                    <Link href="/dashboard/deposits" className="text-xs text-gold hover:text-gold/80 transition-colors">
                        View all
                    </Link>
                </div>

                {allActivity.length === 0 ? (
                    <div className="px-5 py-10 text-center text-[var(--color-dash-muted)] text-sm">
                        <Plus size={20} className="mx-auto mb-2 opacity-50" />
                        No transactions yet. Make your first deposit to get started.
                    </div>
                ) : (
                    <div className="divide-y divide-[var(--color-dash-border)]">
                        {allActivity.map(item => (
                            <div key={`${item.type}-${item.id}`} className="flex items-center gap-4 px-5 py-3.5">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                    item.type === 'deposit'
                                        ? 'bg-emerald-500/15'
                                        : 'bg-blue-500/15'
                                }`}>
                                    {item.type === 'deposit'
                                        ? <ArrowDownCircle size={15} className="text-emerald-400" />
                                        : <ArrowUpCircle size={15} className="text-blue-400" />
                                    }
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-[var(--color-dash-text)] font-medium capitalize">
                                        {item.type} · {item.currency}
                                    </p>
                                    <p className="text-xs text-[var(--color-dash-muted)]">{formatDate(item.created_at)}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className={`text-sm font-semibold ${item.type === 'deposit' ? 'text-emerald-400' : 'text-blue-400'}`}>
                                        {item.type === 'deposit' ? '+' : '-'}{formatCurrency(item.amount)}
                                    </p>
                                    <StatusBadge status={item.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
