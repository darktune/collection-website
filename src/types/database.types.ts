/**
 * Database Type Definitions for Abraham Collection
 * Matches supabase/schema.sql
 */

export type MemberTier = 'Guest Patron' | 'Atelier Circle' | 'Royal Benefactor';
export type CommissionStatus = 'Inscription' | 'Consultation' | 'Basting' | 'Production' | 'Delivered';
export type PaymentGateway = 'paystack' | 'flutterwave' | 'korapay' | 'kora' | 'transfer' | 'whatsapp';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';


export interface PatronProfileRecord {
  id: string;
  user_id?: string | null;
  email: string;
  full_name: string;
  phone?: string | null;
  city?: string | null;
  country?: string | null;
  member_tier: MemberTier;

  // Measurement Vault
  chest_circ?: number | null;
  stomach_circ?: number | null;
  waist_circ?: number | null;
  hip_circ?: number | null;
  shoulder_span?: number | null;
  sleeve_length?: number | null;
  bicep_circ?: number | null;
  wrist_circ?: number | null;
  neck_circ?: number | null;
  trouser_waist?: number | null;
  trouser_length?: number | null;
  trouser_inseam?: number | null;
  thigh_circ?: number | null;
  knee_circ?: number | null;
  ankle_circ?: number | null;
  agbada_drop_length?: number | null;
  agbada_wing_span?: number | null;
  kaftan_shirt_length?: number | null;
  posture_notes?: string | null;

  avatar_url?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CommissionRecord {
  id: string;
  reference_code: string;
  user_id?: string | null;
  client_name: string;
  email: string;
  phone: string;
  location: string;
  occasion: string;
  silhouette: string;
  consultation_type: 'studio' | 'remote';
  status: CommissionStatus;
  date_needed?: string | null;
  is_diaspora: boolean;
  garment_count: number;
  notes?: string | null;
  assigned_tailor?: string;
  timeline_logs?: Array<{
    status: CommissionStatus;
    timestamp: string;
    note?: string;
  }>;
  created_at?: string;
  updated_at?: string;
}

export interface CorporateLeadRecord {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  industry?: string | null;
  employees_count?: string | null;
  garment_types?: string[];
  estimated_quantity?: number | null;
  delivery_location?: string | null;
  required_date?: string | null;
  project_description?: string | null;
  budget_range?: string | null;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface NewsletterSubscriberRecord {
  id: string;
  email: string;
  source: string;
  is_active: boolean;
  created_at?: string;
}

export interface OrderRecord {
  id: string;
  reference: string;
  user_id?: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone?: string | null;
  delivery_address?: string | null;
  items: Array<{
    id: string;
    name: string;
    priceNgn: number;
    priceUsd: number;
    size: string;
    quantity: number;
    image?: string;
  }>;
  amount_ngn: number;
  amount_usd: number;
  gateway: PaymentGateway;
  status: PaymentStatus;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface TextileInventoryRecord {
  id: string;
  fabric_name: string;
  origin: string;
  composition: string;
  color: string;
  yardage_available: number;
  unit_cost_ngn?: number | null;
  is_low_stock?: boolean;
  created_at?: string;
  updated_at?: string;
}
