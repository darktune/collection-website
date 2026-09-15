"use client";

import { useState } from 'react';
import { Users, Briefcase, Ruler, Package, Settings, LogOut, ChevronRight } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <main className="flex min-h-screen bg-brand-white dark:bg-black text-brand-black dark:text-white pt-24 pb-12 px-8">
      
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 pr-8 border-r border-brand-black/10 dark:border-white/10 hidden md:block">
        <h1 className="font-display text-2xl mb-12">Studio Admin</h1>
        <nav className="flex flex-col gap-2 font-medium text-sm tracking-wide">
          <button onClick={() => setActiveTab('dashboard')} className={`flex items-center gap-3 p-3 text-left transition-colors ${activeTab === 'dashboard' ? 'bg-brand-black text-brand-white dark:bg-white dark:text-black' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}>
            <Package size={16} /> Dashboard
          </button>
          <button onClick={() => setActiveTab('bespoke')} className={`flex items-center gap-3 p-3 text-left transition-colors ${activeTab === 'bespoke' ? 'bg-brand-black text-brand-white dark:bg-white dark:text-black' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}>
            <Ruler size={16} /> Bespoke Orders
          </button>
          <button onClick={() => setActiveTab('corporate')} className={`flex items-center gap-3 p-3 text-left transition-colors ${activeTab === 'corporate' ? 'bg-brand-black text-brand-white dark:bg-white dark:text-black' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}>
            <Briefcase size={16} /> Corporate Leads
          </button>
          <button onClick={() => setActiveTab('clients')} className={`flex items-center gap-3 p-3 text-left transition-colors ${activeTab === 'clients' ? 'bg-brand-black text-brand-white dark:bg-white dark:text-black' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}>
            <Users size={16} /> Client Vault
          </button>
          <button onClick={() => setActiveTab('products')} className={`flex items-center gap-3 p-3 text-left transition-colors ${activeTab === 'products' ? 'bg-brand-black text-brand-white dark:bg-white dark:text-black' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}>
            <Package size={16} /> Product Catalog
          </button>
        </nav>
        <div className="mt-auto pt-12">
          <button className="flex items-center gap-3 p-3 w-full text-left hover:bg-black/5 dark:hover:bg-white/5 text-sm font-medium tracking-wide text-brand-burgundy transition-colors">
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 pl-0 md:pl-12">
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <header className="mb-10">
              <h2 className="font-display text-4xl mb-2">Welcome Back.</h2>
              <p className="font-light opacity-70">Here is what is happening at the studio today.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border border-brand-black/10 dark:border-white/10 flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest opacity-60">Active Bespoke</span>
                <span className="font-display text-4xl">12</span>
                <span className="text-xs text-green-600 mt-2">+3 this week</span>
              </div>
              <div className="p-6 border border-brand-black/10 dark:border-white/10 flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest opacity-60">Corporate Leads</span>
                <span className="font-display text-4xl">4</span>
                <span className="text-xs opacity-60 mt-2">2 pending review</span>
              </div>
              <div className="p-6 border border-brand-black/10 dark:border-white/10 flex flex-col gap-2">
                <span className="text-xs uppercase tracking-widest opacity-60">Vault Clients</span>
                <span className="font-display text-4xl">145</span>
                <span className="text-xs opacity-60 mt-2">Measurements on file</span>
              </div>
            </div>

            <div className="pt-8">
              <h3 className="font-display text-2xl mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 border border-brand-black/10 dark:border-white/10 flex justify-between items-center hover:border-brand-burgundy transition-colors cursor-pointer group">
                    <div>
                      <div className="font-medium mb-1">New Bespoke Commission</div>
                      <div className="text-xs opacity-60">Adebayo O. - Traditional Agbada - 2 hours ago</div>
                    </div>
                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bespoke' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <header className="mb-10">
              <h2 className="font-display text-4xl mb-2">Bespoke Orders</h2>
              <p className="font-light opacity-70">Manage active commissions and fittings.</p>
            </header>
            <div className="border border-brand-black/10 dark:border-white/10 rounded-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/5 dark:bg-white/5 border-b border-brand-black/10 dark:border-white/10">
                  <tr>
                    <th className="p-4 font-medium">Client</th>
                    <th className="p-4 font-medium">Garment</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Date Needed</th>
                    <th className="p-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-black/10 dark:divide-white/10">
                  <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4">David N.</td>
                    <td className="p-4">Double Breasted Suit</td>
                    <td className="p-4"><span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs rounded-full">Fitting</span></td>
                    <td className="p-4">Oct 12, 2026</td>
                    <td className="p-4 text-right"><button className="text-brand-burgundy font-medium hover:underline">View</button></td>
                  </tr>
                  <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4">Oluwaseun A.</td>
                    <td className="p-4">Ceremonial Dandogo</td>
                    <td className="p-4"><span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs rounded-full">Production</span></td>
                    <td className="p-4">Nov 05, 2026</td>
                    <td className="p-4 text-right"><button className="text-brand-burgundy font-medium hover:underline">View</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'corporate' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <header className="mb-10">
              <h2 className="font-display text-4xl mb-2">Corporate Leads</h2>
              <p className="font-light opacity-70">Review B2B manufacturing and uniform enquiries.</p>
            </header>
            <div className="border border-brand-black/10 dark:border-white/10 rounded-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/5 dark:bg-white/5 border-b border-brand-black/10 dark:border-white/10">
                  <tr>
                    <th className="p-4 font-medium">Organisation</th>
                    <th className="p-4 font-medium">Contact</th>
                    <th className="p-4 font-medium">Quantity</th>
                    <th className="p-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-black/10 dark:divide-white/10">
                  <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4">Lagos Heritage Bank</td>
                    <td className="p-4">info@lhb.com</td>
                    <td className="p-4">500+</td>
                    <td className="p-4 text-right"><button className="text-brand-burgundy font-medium hover:underline">Review</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <header className="mb-10">
              <h2 className="font-display text-4xl mb-2">Client Vault</h2>
              <p className="font-light opacity-70">Secure measurement profiles and order histories.</p>
            </header>
            <div className="flex items-center gap-4 mb-6">
              <input type="text" placeholder="Search clients..." className="flex-1 max-w-md p-3 border border-brand-black/20 dark:border-white/20 bg-transparent outline-none focus:border-brand-burgundy" />
              <button className="px-6 py-3 bg-brand-black dark:bg-white text-white dark:text-black font-medium text-sm">Add Client</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-6 border border-brand-black/10 dark:border-white/10 hover:border-brand-burgundy transition-colors cursor-pointer">
                  <h3 className="font-display text-2xl mb-1">David N.</h3>
                  <p className="text-sm opacity-60 mb-4">david.n@example.com</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-black/5 dark:bg-white/5 text-xs">Measurements: Active</span>
                    <span className="px-2 py-1 bg-black/5 dark:bg-white/5 text-xs">Orders: 3</span>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <header className="mb-10 flex justify-between items-end">
              <div>
                <h2 className="font-display text-4xl mb-2">Product Catalog</h2>
                <p className="font-light opacity-70">Manage collections and enquiry pieces.</p>
              </div>
              <button className="px-6 py-3 bg-brand-black dark:bg-white text-white dark:text-black font-medium text-sm">Add Product</button>
            </header>
            <div className="border border-brand-black/10 dark:border-white/10 rounded-sm overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-black/5 dark:bg-white/5 border-b border-brand-black/10 dark:border-white/10">
                  <tr>
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Category</th>
                    <th className="p-4 font-medium">Type</th>
                    <th className="p-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-black/10 dark:divide-white/10">
                  <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4">The Double Breasted Suit</td>
                    <td className="p-4"><span className="capitalize">Men</span></td>
                    <td className="p-4">Bespoke Enquiry</td>
                    <td className="p-4 text-right"><button className="text-brand-burgundy font-medium hover:underline">Edit</button></td>
                  </tr>
                  <tr className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4">The Structured Midi</td>
                    <td className="p-4"><span className="capitalize">Women</span></td>
                    <td className="p-4">Bespoke Enquiry</td>
                    <td className="p-4 text-right"><button className="text-brand-burgundy font-medium hover:underline">Edit</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
