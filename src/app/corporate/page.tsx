"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

export default function CorporatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const company_name = formData.get("orgName") as string;
    const contact_person = formData.get("contactPerson") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const industry = formData.get("industry") as string;
    const employees_count = formData.get("employees") as string;
    const garments = formData.get("garments") as string;
    const estimated_quantity = parseInt(formData.get("quantity") as string) || null;
    const delivery_location = formData.get("location") as string;
    const required_date = formData.get("date") as string;
    const existing_design = formData.get("existingDesign") as string;
    const project_description = formData.get("description") as string;

    const { error } = await supabase.from('corporate_leads').insert([{
      company_name,
      contact_person,
      email,
      phone,
      industry,
      employees_count,
      garment_types: garments ? [garments] : [],
      estimated_quantity,
      delivery_location,
      required_date: required_date || null,
      project_description: `${existing_design ? 'Has Existing Design: ' + existing_design + '\n' : ''}${project_description}`
    }]);

    setIsSubmitting(false);
    
    if (error) {
      console.error(error);
      alert("There was an error submitting your enquiry. Please try again.");
    } else {
      setSubmitted(true);
    }
  }

  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-brand-black text-brand-white flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 border-l-2 border-brand-gold bg-black/60 text-brand-gold text-[10px] tracking-ultra-wide uppercase font-medium mb-6 backdrop-blur-md">
            <span>Abraham Collection For Business</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl mb-8 leading-[1.1]">
            When your people wear your brand.
          </h1>
          <p className="text-lg font-light text-brand-white/80 mb-10 leading-relaxed">
            Uniforms and corporate clothing developed for organisations that understand presentation is part of identity.
          </p>
          <a href="#enquiry" className="inline-flex items-center justify-center px-8 py-4 border border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black transition-colors duration-300 text-sm tracking-wider uppercase">
            Corporate Enquiries
          </a>
        </div>
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-8 p-6 border border-brand-white/20">
            <h3 className="font-display text-2xl">25+ Years Experience</h3>
            <p className="font-light text-brand-white/70 text-sm">Decades of institutional production capability.</p>
          </div>
          <div className="flex flex-col gap-8 p-6 border border-brand-white/20">
            <h3 className="font-display text-2xl">Custom Design</h3>
            <p className="font-light text-brand-white/70 text-sm">In-house fabric sourcing and styling.</p>
          </div>
          <div className="flex flex-col gap-8 p-6 border border-brand-white/20">
            <h3 className="font-display text-2xl">Scalable Fulfilment</h3>
            <p className="font-light text-brand-white/70 text-sm">Reliable delivery and repeat production.</p>
          </div>
          <div className="flex flex-col gap-8 p-6 border border-brand-white/20">
            <h3 className="font-display text-2xl">Quality Control</h3>
            <p className="font-light text-brand-white/70 text-sm">Rigorous fitting and precision tailoring.</p>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquiry" className="py-24 px-8 md:px-16 lg:px-24 bg-brand-white text-brand-black max-w-4xl mx-auto w-full">
        {submitted ? (
          <div className="text-center py-20 border border-brand-black/10 p-12">
            <h2 className="font-display text-4xl mb-6">Enquiry Received.</h2>
            <p className="font-light text-brand-black/70 mb-8 max-w-lg mx-auto">
              Thank you for considering Abraham Collection for your organisation. A corporate specialist will review your requirements and be in touch shortly.
            </p>
            <div className="text-xs uppercase tracking-widest font-medium">This is intentional.</div>
          </div>
        ) : (
          <>
            <h2 className="font-display text-4xl mb-4">Request Corporate Consultation</h2>
            <p className="font-light text-brand-black/70 mb-12">
              Please provide details about your organisation and your project requirements.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="orgName" className="text-xs uppercase tracking-widest font-medium">Organisation Name</label>
                  <input type="text" id="orgName" name="orgName" required className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy font-light" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contactPerson" className="text-xs uppercase tracking-widest font-medium">Contact Person</label>
                  <input type="text" id="contactPerson" name="contactPerson" required className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy font-light" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs uppercase tracking-widest font-medium">Email Address</label>
                  <input type="email" id="email" name="email" required className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy font-light" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-xs uppercase tracking-widest font-medium">Phone Number</label>
                  <input type="tel" id="phone" name="phone" className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy font-light" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="industry" className="text-xs uppercase tracking-widest font-medium">Industry</label>
                  <input type="text" id="industry" name="industry" className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy font-light" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="employees" className="text-xs uppercase tracking-widest font-medium">Number of Employees</label>
                  <select id="employees" name="employees" className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy font-light text-brand-black/70 dark:text-white/70">
                    <option value="">Select range</option>
                    <option value="1-50">1 - 50</option>
                    <option value="51-200">51 - 200</option>
                    <option value="201-1000">201 - 1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="garments" className="text-xs uppercase tracking-widest font-medium">Required Garment Types</label>
                  <input type="text" id="garments" name="garments" placeholder="e.g. Polos, Suits, Coveralls" className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy font-light" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="quantity" className="text-xs uppercase tracking-widest font-medium">Estimated Quantity</label>
                  <input type="number" id="quantity" name="quantity" placeholder="e.g. 500" className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy font-light" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="location" className="text-xs uppercase tracking-widest font-medium">Delivery Location</label>
                  <input type="text" id="location" name="location" placeholder="City, Country" className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy font-light" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="date" className="text-xs uppercase tracking-widest font-medium">Required Delivery Date</label>
                  <input type="date" id="date" name="date" className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy font-light" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="existingDesign" className="text-xs uppercase tracking-widest font-medium">Existing Designs?</label>
                  <select id="existingDesign" name="existingDesign" className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy font-light text-brand-black/70 dark:text-white/70">
                    <option value="">Select</option>
                    <option value="yes">Yes, we have designs</option>
                    <option value="no">No, we need custom design</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="budget" className="text-xs uppercase tracking-widest font-medium">Budget Range (Optional)</label>
                  <input type="text" id="budget" name="budget" className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy font-light" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-xs uppercase tracking-widest font-medium">Project Description</label>
                <textarea id="description" name="description" rows={4} className="border-b border-brand-black/20 dark:border-white/20 bg-transparent py-2 outline-none focus:border-brand-burgundy font-light resize-none"></textarea>
              </div>

              <div className="pt-8 flex justify-end">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-brand-black dark:bg-white text-brand-white dark:text-black hover:bg-brand-burgundy dark:hover:bg-brand-burgundy dark:hover:text-white transition-colors duration-300 text-sm tracking-wider uppercase disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Submit Corporate Enquiry"}
                </button>
              </div>
            </form>
          </>
        )}
      </section>
    </main>
  );
}
