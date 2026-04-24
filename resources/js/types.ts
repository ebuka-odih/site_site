export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  balance: number;
  is_verified: boolean;
  member_id: string | null;
  avatar: string | null;
  phone: string | null;
  address: string | null;
  created_at: string | null;
}

export interface PageProps {
  auth: { user: AuthUser | null };
  flash: { success?: string; error?: string };
}

export interface Deposit {
  id: number;
  user_id: number;
  amount: string;
  currency: string;
  wallet_address: string | null;
  tx_hash: string | null;
  proof_path: string | null;
  status: 'pending' | 'approved' | 'rejected';
  admin_notes: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  user?: AuthUser;
}

export interface Withdrawal {
  id: number;
  user_id: number;
  amount: string;
  currency: string;
  wallet_address: string;
  network: string | null;
  status: 'pending' | 'approved' | 'processing' | 'completed' | 'rejected';
  admin_notes: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  user?: AuthUser;
}

export interface PaginatedData<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  links: { url: string | null; label: string; active: boolean }[];
}

export type StatusVariant = 'pending' | 'approved' | 'rejected' | 'processing' | 'completed';
