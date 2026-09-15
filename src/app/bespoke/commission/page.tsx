"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

function CommissionFormInner() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const searchParams = useSearchParams();
  const defaultGarment = searchParams.get("garment") || "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const occasion = formData.get("occasion") as string;
    const desired_garment = formData.get("garment") as string;
    const event_date = formData.get("date") as string;
    const location = formData.get("location") as string;
    const budget_guidance = formData.get("budget") as string;
    const consultation_preference = formData.get("consultation") as string;
    const additional_details = formData.get("details") as string;
    const contact_name = formData.get("contact_name") as string;
    const contact_email = formData.get("contact_email") as string;
    const contact_phone = formData.get("contact_phone") as string;

    const { error } = await supabase.from('commissions').insert([{
      occasion,
      desired_garment,
      event_date: event_date || null,
      location,
      budget_guidance,
      consultation_preference,
      additional_details,
      contact_name,
      contact_email,
      contact_phone
    }]);

    setIsSubmitting(false);
    
    if (error) {
      console.error(error);
      alert("There was an error submitting your request. Please try again.");
    } else {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center">
        <div className="font-display text-4xl mb-6">Commission Request Received.</div>
        <p className="font-light text-brand-black/70 max-w-md mx-auto mb-8">
          Thank you for trusting Abraham Collection with your occasion. Our bespoke team will review your requirements and contact you shortly to confirm your consultation.
        </p>
        <div className="text-xs uppercase tracking-widest font-medium">This is intentional.</div>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-24 px-8">
      <h1 className="font-display text-5xl mb-4">Begin a Commission</h1>
      <p className="font-light opacity-70 mb-12">
        Please provide details about the garment you wish to commission. We will use this information to prepare for your initial consultation.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="occasion" className="text-xs uppercase tracking-widest font-medium">Occasion</label>
            <input 
              type="text" 
              id="occasion" 
              name="occasion"
              placeholder="e.g. Traditional Wedding, Corporate Award"
              className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy transition-colors font-light"
              required 
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="garment" className="text-xs uppercase tracking-widest font-medium">Desired Garment</label>
            <input 
              type="text" 
              id="garment" 
              name="garment"
              defaultValue={defaultGarment}
              placeholder="e.g. 3-Piece Agbada, Bespoke Suit"
              className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy transition-colors font-light"
              required 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-xs uppercase tracking-widest font-medium">Event Date</label>
            <input 
              type="date" 
              id="date" 
              name="date"
              className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy transition-colors font-light"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="location" className="text-xs uppercase tracking-widest font-medium">Event Location</label>
            <input 
              type="text" 
              id="location" 
              name="location"
              placeholder="City, Country"
              className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy transition-colors font-light"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="budget" className="text-xs uppercase tracking-widest font-medium">Budget Guidance (Optional)</label>
            <select 
              id="budget" 
              name="budget"
              className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy transition-colors font-light text-brand-black/70 dark:text-white/70"
            >
              <option value="">Select a range</option>
              <option value="standard">Standard Bespoke</option>
              <option value="premium">Premium Hand-Finished</option>
              <option value="luxury">Luxury / Rare Fabrics</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="consultation" className="text-xs uppercase tracking-widest font-medium">Consultation Preference</label>
            <select 
              id="consultation" 
              name="consultation"
              className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy transition-colors font-light text-brand-black/70 dark:text-white/70"
              required
            >
              <option value="">Select preference</option>
              <option value="studio">In-Studio (Lagos)</option>
              <option value="remote">Remote / Video Call</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="details" className="text-xs uppercase tracking-widest font-medium">Additional Details / References</label>
          <textarea 
            id="details" 
            name="details"
            rows={4}
            placeholder="Describe any specific fabric preferences, colors, or reference styles."
            className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy transition-colors font-light resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-brand-black/10 dark:border-white/10 pt-8 mt-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact_name" className="text-xs uppercase tracking-widest font-medium">Full Name</label>
            <input 
              type="text" 
              id="contact_name" 
              name="contact_name"
              className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy transition-colors font-light"
              required 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="contact_email" className="text-xs uppercase tracking-widest font-medium">Email Address</label>
            <input 
              type="email" 
              id="contact_email" 
              name="contact_email"
              className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy transition-colors font-light"
              required 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="contact_phone" className="text-xs uppercase tracking-widest font-medium">Phone Number</label>
            <input 
              type="tel" 
              id="contact_phone" 
              name="contact_phone"
              className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy transition-colors font-light"
              required 
            />
          </div>
        </div>

        <div className="pt-8 flex justify-end">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="px-8 py-4 bg-brand-black dark:bg-white text-white dark:text-black hover:bg-brand-burgundy dark:hover:bg-brand-burgundy dark:hover:text-white transition-colors duration-300 text-sm tracking-wider uppercase disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Commission Request"}
          </button>
        </div>

      </form>
    </main>
  );
}

export default function CommissionForm() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center font-display text-2xl">Loading...</div>}>
      <CommissionFormInner />
    </Suspense>
  );
}
