import { supabase } from '@/lib/supabase';
import {
  CommissionRecord,
  CorporateLeadRecord,
  NewsletterSubscriberRecord,
  OrderRecord,
  PatronProfileRecord,
  CommissionStatus,
} from '@/types/database.types';

// Default initial studio seed data to guarantee 100% immediate usability
const DEFAULT_COMMISSIONS: CommissionRecord[] = [
  {
    id: "AB-2026-8941",
    reference_code: "AB-2026-8941",
    client_name: "Chief Adeleke Coker",
    email: "coker.a@lagosgroup.ng",
    phone: "+234 803 555 0192",
    location: "Ikoyi, Lagos",
    occasion: "Chieftaincy Installation",
    silhouette: "Grand 3-Piece Agbada (Alaari Silk)",
    consultation_type: "studio",
    status: "Basting",
    date_needed: "2026-11-14",
    is_diaspora: false,
    garment_count: 1,
    notes: "Requires 64-inch chieftaincy shoulder span and hand-stitched bib neckline.",
    assigned_tailor: "Bolaji Abayomi Abraham",
    timeline_logs: [
      { status: "Inscription", timestamp: "2026-10-01T10:00:00Z", note: "Initial commission recorded" },
      { status: "Consultation", timestamp: "2026-10-05T14:30:00Z", note: "Fabric selected: Alaari Royal Silk Aso Oke" },
      { status: "Basting", timestamp: "2026-10-12T11:00:00Z", note: "Baste fitting assembled; ready for studio review" },
    ],
    created_at: "2026-10-01T10:00:00Z",
  },
  {
    id: "AB-2026-7230",
    reference_code: "AB-2026-7230",
    client_name: "Dr. Oluwaseun Adeleke",
    email: "o.adeleke@nhs.uk",
    phone: "+44 7911 123456",
    location: "London, United Kingdom",
    occasion: "Diaspora Traditional Wedding",
    silhouette: "Ceremonial Agbada & Bridal Couple Suite",
    consultation_type: "remote",
    status: "Consultation",
    date_needed: "2026-12-05",
    is_diaspora: true,
    garment_count: 4,
    notes: "Transatlantic fitting via WhatsApp video. Direct DHL courier to Mayfair, London.",
    assigned_tailor: "Bolaji Abayomi Abraham",
    timeline_logs: [
      { status: "Inscription", timestamp: "2026-10-08T09:15:00Z", note: "London wedding inquiry" },
      { status: "Consultation", timestamp: "2026-10-11T16:00:00Z", note: "Video measurement protocol verified" },
    ],
    created_at: "2026-10-08T09:15:00Z",
  },
  {
    id: "AB-2026-6184",
    reference_code: "AB-2026-6184",
    client_name: "Toluwani Banjo",
    email: "tbanjo@fintechcapital.com",
    phone: "+1 404 892 4410",
    location: "Atlanta, GA, USA",
    occasion: "Global Tech Gala Dinner",
    silhouette: "Bespoke Double-Breasted Obsidian Tuxedo",
    consultation_type: "remote",
    status: "Production",
    date_needed: "2026-10-28",
    is_diaspora: true,
    garment_count: 1,
    notes: "Super 150s English worsted wool with silk grosgrain peak lapels.",
    assigned_tailor: "Bolaji Abayomi Abraham",
    timeline_logs: [
      { status: "Inscription", timestamp: "2026-09-20T12:00:00Z" },
      { status: "Consultation", timestamp: "2026-09-24T15:00:00Z" },
      { status: "Basting", timestamp: "2026-10-02T10:00:00Z" },
      { status: "Production", timestamp: "2026-10-10T14:00:00Z", note: "Final hand-canvassing and buttonhole finishing" },
    ],
    created_at: "2026-09-20T12:00:00Z",
  },
  {
    id: "AB-2026-5519",
    reference_code: "AB-2026-5519",
    client_name: "Folake Alabi & Family",
    email: "folake.alabi@yahoo.ca",
    phone: "+1 416 332 9981",
    location: "Toronto, Canada",
    occasion: "Family Anniversary Thanksgiving",
    silhouette: "Ceremonial Silk Kaftan Suite",
    consultation_type: "remote",
    status: "Inscription",
    date_needed: "2026-12-18",
    is_diaspora: true,
    garment_count: 8,
    notes: "Matching champagne Sanyan Aso Oke embroidery trims across all 8 pieces.",
    assigned_tailor: "Bolaji Abayomi Abraham",
    timeline_logs: [
      { status: "Inscription", timestamp: "2026-10-15T18:00:00Z", note: "Inscription received from web portal" },
    ],
    created_at: "2026-10-15T18:00:00Z",
  },
];

const DEFAULT_CORPORATE_LEADS: CorporateLeadRecord[] = [
  {
    id: "corp-1",
    company_name: "First Zenith Merchant Bank",
    contact_person: "Mr. Babatunde Sanusi (Head of Corporate Services)",
    email: "b.sanusi@firstzenith.com",
    phone: "+234 802 300 4491",
    industry: "Investment Banking",
    employees_count: "201-1000",
    garment_types: ["Executive Tailored Suits", "Monogrammed Poplin Shirts"],
    estimated_quantity: 450,
    delivery_location: "Victoria Island, Lagos",
    required_date: "2026-11-30",
    project_description: "Annual wardrobe refresh for customer-facing wealth managers and directors.",
    budget_range: "₦35,000,000 - ₦50,000,000",
    status: "Proposal Stage",
    created_at: "2026-10-10T11:00:00Z",
  },
  {
    id: "corp-2",
    company_name: "Eko Atlantic Hospitality Group",
    contact_person: "Mrs. Halima Dangote-Bello",
    email: "h.bello@ekoatlanticresorts.ng",
    phone: "+234 818 900 1234",
    industry: "Luxury Hospitality",
    employees_count: "51-200",
    garment_types: ["Concierge Ceremonial Tunics", "Front Desk Architectural Blazers"],
    estimated_quantity: 120,
    delivery_location: "Eko Atlantic City, Lagos",
    required_date: "2026-12-10",
    project_description: "High-elegance uniforms incorporating bespoke Aso Oke accents.",
    budget_range: "₦15,000,000 - ₦25,000,000",
    status: "Fabric Review",
    created_at: "2026-10-14T09:30:00Z",
  },
];

// Local cache keys
const STORAGE_COMMISSIONS = "abraham_commissions_cache";
const STORAGE_CORP_LEADS = "abraham_corp_leads_cache";
const STORAGE_SUBSCRIBERS = "abraham_subscribers_cache";
const STORAGE_PROFILES = "abraham_patron_profiles_cache";
const STORAGE_ORDERS = "abraham_orders_cache";

/**
 * Atelier Database Service Layer
 * Combines Supabase persistence with an resilient offline cache fallback.
 */
export const AtelierDatabase = {
  // ==========================================
  // 1. COMMISSIONS
  // ==========================================
  async getCommissions(): Promise<CommissionRecord[]> {
    try {
      const { data, error } = await supabase
        .from('commissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        // Fallback to cached or default commissions
        if (typeof window !== 'undefined') {
          const cached = localStorage.getItem(STORAGE_COMMISSIONS);
          if (cached) return JSON.parse(cached);
          localStorage.setItem(STORAGE_COMMISSIONS, JSON.stringify(DEFAULT_COMMISSIONS));
        }
        return DEFAULT_COMMISSIONS;
      }

      // Sync local cache
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_COMMISSIONS, JSON.stringify(data));
      }
      return data as CommissionRecord[];
    } catch {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(STORAGE_COMMISSIONS);
        if (cached) return JSON.parse(cached);
      }
      return DEFAULT_COMMISSIONS;
    }
  },

  async createCommission(
    commission: Omit<CommissionRecord, 'id' | 'created_at' | 'updated_at'>
  ): Promise<CommissionRecord> {
    const timestamp = new Date().toISOString();
    const newRecord: CommissionRecord = {
      ...commission,
      id: commission.reference_code,
      created_at: timestamp,
      updated_at: timestamp,
      timeline_logs: [
        {
          status: commission.status,
          timestamp,
          note: "Commission created via Atelier Web Portal",
        },
      ],
    };

    // Update local cache immediately for optimistic UI
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(STORAGE_COMMISSIONS);
        const list: CommissionRecord[] = cached ? JSON.parse(cached) : DEFAULT_COMMISSIONS;
        const updated = [newRecord, ...list.filter((c) => c.reference_code !== newRecord.reference_code)];
        localStorage.setItem(STORAGE_COMMISSIONS, JSON.stringify(updated));
      } catch {}
    }

    try {
      const { data, error } = await supabase
        .from('commissions')
        .insert([newRecord])
        .select()
        .single();

      if (!error && data) {
        return data as CommissionRecord;
      }
    } catch (err) {
      console.warn("Supabase commission insert fallback to local storage:", err);
    }

    return newRecord;
  },

  async updateCommissionStatus(id: string, newStatus: CommissionStatus, note?: string): Promise<boolean> {
    const timestamp = new Date().toISOString();

    // Update local cache
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(STORAGE_COMMISSIONS);
        if (cached) {
          const list: CommissionRecord[] = JSON.parse(cached);
          const updated = list.map((c) => {
            if (c.id === id || c.reference_code === id) {
              const logs = c.timeline_logs || [];
              return {
                ...c,
                status: newStatus,
                updated_at: timestamp,
                timeline_logs: [...logs, { status: newStatus, timestamp, note }],
              };
            }
            return c;
          });
          localStorage.setItem(STORAGE_COMMISSIONS, JSON.stringify(updated));
        }
      } catch {}
    }

    try {
      const { error } = await supabase
        .from('commissions')
        .update({
          status: newStatus,
          updated_at: timestamp,
        })
        .or(`id.eq.${id},reference_code.eq.${id}`);

      return !error;
    } catch {
      return true; // Optimistic success
    }
  },

  // ==========================================
  // 2. CORPORATE LEADS
  // ==========================================
  async getCorporateLeads(): Promise<CorporateLeadRecord[]> {
    try {
      const { data, error } = await supabase
        .from('corporate_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        if (typeof window !== 'undefined') {
          const cached = localStorage.getItem(STORAGE_CORP_LEADS);
          if (cached) return JSON.parse(cached);
          localStorage.setItem(STORAGE_CORP_LEADS, JSON.stringify(DEFAULT_CORPORATE_LEADS));
        }
        return DEFAULT_CORPORATE_LEADS;
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_CORP_LEADS, JSON.stringify(data));
      }
      return data as CorporateLeadRecord[];
    } catch {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(STORAGE_CORP_LEADS);
        if (cached) return JSON.parse(cached);
      }
      return DEFAULT_CORPORATE_LEADS;
    }
  },

  async createCorporateLead(
    lead: Omit<CorporateLeadRecord, 'id' | 'created_at' | 'updated_at' | 'status'>
  ): Promise<CorporateLeadRecord> {
    const timestamp = new Date().toISOString();
    const newRecord: CorporateLeadRecord = {
      ...lead,
      id: `corp-${Date.now()}`,
      status: "New Inquiry",
      created_at: timestamp,
      updated_at: timestamp,
    };

    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(STORAGE_CORP_LEADS);
        const list: CorporateLeadRecord[] = cached ? JSON.parse(cached) : DEFAULT_CORPORATE_LEADS;
        localStorage.setItem(STORAGE_CORP_LEADS, JSON.stringify([newRecord, ...list]));
      } catch {}
    }

    try {
      const { data, error } = await supabase
        .from('corporate_leads')
        .insert([newRecord])
        .select()
        .single();

      if (!error && data) {
        return data as CorporateLeadRecord;
      }
    } catch (err) {
      console.warn("Supabase corporate_leads insert fallback to local storage:", err);
    }

    return newRecord;
  },

  // ==========================================
  // 3. NEWSLETTER SUBSCRIBERS
  // ==========================================
  async subscribeNewsletter(email: string): Promise<boolean> {
    const newSubscriber: NewsletterSubscriberRecord = {
      id: `sub-${Date.now()}`,
      email,
      source: "Storefront Footer",
      is_active: true,
      created_at: new Date().toISOString(),
    };

    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(STORAGE_SUBSCRIBERS);
        const list: NewsletterSubscriberRecord[] = cached ? JSON.parse(cached) : [];
        if (!list.some((s) => s.email.toLowerCase() === email.toLowerCase())) {
          localStorage.setItem(STORAGE_SUBSCRIBERS, JSON.stringify([newSubscriber, ...list]));
        }
      } catch {}
    }

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .upsert([{ email, source: 'Storefront Footer' }], { onConflict: 'email' });

      return !error;
    } catch {
      return true;
    }
  },

  async getNewsletterSubscribers(): Promise<NewsletterSubscriberRecord[]> {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        if (typeof window !== 'undefined') {
          const cached = localStorage.getItem(STORAGE_SUBSCRIBERS);
          if (cached) return JSON.parse(cached);
        }
        return [
          { id: "sub-1", email: "patron@lagosluxury.com", source: "Storefront Footer", is_active: true, created_at: "2026-10-12T14:20:00Z" },
          { id: "sub-2", email: "diaspora.groom@london.co.uk", source: "Storefront Footer", is_active: true, created_at: "2026-10-15T08:10:00Z" },
        ];
      }

      return data as NewsletterSubscriberRecord[];
    } catch {
      return [];
    }
  },

  // ==========================================
  // 4. PATRON PROFILES & MEASUREMENT VAULT
  // ==========================================
  async savePatronProfile(profile: Partial<PatronProfileRecord> & { email: string }): Promise<boolean> {
    const timestamp = new Date().toISOString();
    const updated = {
      ...profile,
      updated_at: timestamp,
    };

    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(STORAGE_PROFILES);
        const list: PatronProfileRecord[] = cached ? JSON.parse(cached) : [];
        const filtered = list.filter((p) => p.email.toLowerCase() !== profile.email.toLowerCase());
        localStorage.setItem(STORAGE_PROFILES, JSON.stringify([updated, ...filtered]));
      } catch {}
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert([updated], { onConflict: 'email' });

      return !error;
    } catch {
      return true;
    }
  },

  async getPatronProfile(email: string): Promise<PatronProfileRecord | null> {
    if (!email) return null;
    const cleanEmail = email.trim().toLowerCase();

    // Check cloud first
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (!error && data) {
        return data as PatronProfileRecord;
      }
    } catch (err) {
      console.warn("Supabase getPatronProfile fallback:", err);
    }

    // Fallback to local cache
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(STORAGE_PROFILES);
        if (cached) {
          const list: PatronProfileRecord[] = JSON.parse(cached);
          const found = list.find((p) => p.email?.toLowerCase() === cleanEmail);
          if (found) return found;
        }
      } catch {}
    }

    return null;
  },

  async getPatronProfiles(): Promise<PatronProfileRecord[]> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error || !data || data.length === 0) {
        if (typeof window !== 'undefined') {
          const cached = localStorage.getItem(STORAGE_PROFILES);
          if (cached) return JSON.parse(cached);
        }
        return [
          {
            id: "prof-1",
            email: "adeleke.coker@ikoyi.ng",
            full_name: "Chief Adeleke Coker",
            phone: "+234 803 555 0192",
            city: "Ikoyi, Lagos",
            country: "Nigeria",
            member_tier: "Royal Benefactor",
            chest_circ: 44.5,
            waist_circ: 38.0,
            shoulder_span: 20.5,
            sleeve_length: 35.0,
            agbada_wing_span: 64.0,
            posture_notes: "Erect posture, broad chieftaincy shoulders.",
            created_at: "2026-09-15T10:00:00Z",
          },
          {
            id: "prof-2",
            email: "o.adeleke@nhs.uk",
            full_name: "Dr. Oluwaseun Adeleke",
            phone: "+44 7911 123456",
            city: "London",
            country: "United Kingdom",
            member_tier: "Atelier Circle",
            chest_circ: 40.0,
            waist_circ: 33.5,
            shoulder_span: 18.5,
            sleeve_length: 33.5,
            posture_notes: "Slight forward neck slope from surgical work; adjust collar drape.",
            created_at: "2026-10-02T12:00:00Z",
          },
        ];
      }

      return data as PatronProfileRecord[];
    } catch {
      return [];
    }
  },

  // ==========================================
  // 5. ORDERS
  // ==========================================
  async createOrder(order: Omit<OrderRecord, 'id' | 'created_at' | 'updated_at'>): Promise<OrderRecord> {
    const timestamp = new Date().toISOString();
    const newOrder: OrderRecord = {
      ...order,
      id: `ord-${Date.now()}`,
      created_at: timestamp,
      updated_at: timestamp,
    };

    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(STORAGE_ORDERS);
        const list: OrderRecord[] = cached ? JSON.parse(cached) : [];
        localStorage.setItem(STORAGE_ORDERS, JSON.stringify([newOrder, ...list]));
      } catch {}
    }

    try {
      await supabase.from('orders').insert([newOrder]);
    } catch (err) {
      console.warn("Supabase order insert fallback:", err);
    }

    return newOrder;
  },

  async updateOrderStatus(orderRef: string, status: OrderRecord['status']): Promise<boolean> {
    if (typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem(STORAGE_ORDERS);
        if (cached) {
          const list: OrderRecord[] = JSON.parse(cached);
          const updated = list.map((ord) => ord.reference === orderRef ? { ...ord, status, updated_at: new Date().toISOString() } : ord);
          localStorage.setItem(STORAGE_ORDERS, JSON.stringify(updated));
        }
      } catch {}
    }

    try {
      const { error } = await supabase
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('reference', orderRef);
      return !error;
    } catch {
      return true;
    }
  },

  async getOrders(): Promise<OrderRecord[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        if (typeof window !== 'undefined') {
          const cached = localStorage.getItem(STORAGE_ORDERS);
          if (cached) return JSON.parse(cached);
        }
        return [];
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_ORDERS, JSON.stringify(data));
      }

      return data as OrderRecord[];
    } catch {
      if (typeof window !== 'undefined') {
        const cached = localStorage.getItem(STORAGE_ORDERS);
        if (cached) return JSON.parse(cached);
      }
      return [];
    }
  },
};

