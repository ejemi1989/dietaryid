"use client";

import { useState, useEffect } from "react";

export type SupportTicket = {
  id: string;
  restaurantName: string;
  restaurantEmail: string;
  subject: string;
  type: string;
  priority: "Low" | "Medium" | "High";
  contactMethod: string;
  description: string;
  status: "open" | "in_progress" | "resolved";
  createdAt: string;
  replies: { from: string; text: string; time: string }[];
};

type Listener = () => void;

let tickets: SupportTicket[] = [
  {
    id: "tkt_001", restaurantName: "The Italian Kitchen", restaurantEmail: "owner@italiankitchen.com",
    subject: "Menu verification taking too long", type: "Technical", priority: "Medium", contactMethod: "Email",
    description: "We submitted our full menu 2 weeks ago but only 40% has been verified. Is there a way to expedite this?",
    status: "open", createdAt: "2024-10-20T14:30:00Z",
    replies: [],
  },
  {
    id: "tkt_002", restaurantName: "Green Garden Cafe", restaurantEmail: "owner@greengarden.com",
    subject: "Cannot update allergen info on menu item", type: "Technical", priority: "High", contactMethod: "Email",
    description: "When I try to edit the allergen info on our Quinoa Bowl entry, the page freezes and doesn't save. This is urgent — customers rely on this.",
    status: "open", createdAt: "2024-10-21T09:15:00Z",
    replies: [],
  },
  {
    id: "tkt_003", restaurantName: "Bella Italia", restaurantEmail: "manager@bellaitalia.com",
    subject: "Question about review response best practices", type: "Reviews", priority: "Low", contactMethod: "Email",
    description: "A customer left a concerning review about cross-contamination. What's the best way to respond publicly while also addressing their concerns privately?",
    status: "in_progress", createdAt: "2024-10-19T11:00:00Z",
    replies: [
      { from: "admin_001", text: "Hi Bella Italia — we recommend responding publicly first to acknowledge the concern, then offering a private channel (DM/email) for detailed follow-up. Would you like me to draft a response?", time: "Oct 19, 2024 · 2:30 PM" },
      { from: "Bella Italia", text: "Yes please, that would be helpful. We want to show we take this seriously.", time: "Oct 19, 2024 · 3:00 PM" },
    ],
  },
];

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
};

let faqs: FAQItem[] = [
  { id: "faq_1", question: "How do I claim my restaurant?", answer: "Search for your restaurant on DietaryID. Click 'Claim this restaurant' and verify ownership via email.", category: "Getting Started", order: 1 },
  { id: "faq_2", question: "What does 'Verified' mean?", answer: "Your menu items have been reviewed and confirmed safe. We cross-check ingredients against allergen databases.", category: "Verification", order: 2 },
  { id: "faq_3", question: "How long does verification take?", answer: "Initial verification takes 30 minutes to set up. Full verification typically completes within 48 hours.", category: "Verification", order: 3 },
  { id: "faq_4", question: "Can I respond to reviews?", answer: "Yes! Respond to any review from your dashboard. We recommend responding within 24-48 hours.", category: "Reviews", order: 4 },
  { id: "faq_5", question: "How many customers will I reach?", answer: "This depends on your location and offering. Restaurants typically reach 200-500 relevant customers monthly.", category: "Getting Started", order: 5 },
  { id: "faq_6", question: "Is this free?", answer: "Yes, basic features are free. Premium analytics and advanced marketing tools are $49/month.", category: "Pricing", order: 6 },
  { id: "faq_7", question: "Can I add multiple team members?", answer: "Yes! Go to Settings → Team Management to invite staff with different permission levels.", category: "Account", order: 7 },
  { id: "faq_8", question: "How do I update my menu?", answer: "Go to Menu Management. You can add items, edit allergen info, and batch verify.", category: "Verification", order: 8 },
];

const listeners = new Set<Listener>();
function emit() { listeners.forEach((fn) => fn()); }

export function getTickets(): SupportTicket[] { return tickets; }
export function getFAQs(): FAQItem[] { return faqs; }

export function addTicket(t: Omit<SupportTicket, "id" | "createdAt" | "replies" | "status">) {
  tickets.unshift({ ...t, id: `tkt_${Date.now()}`, createdAt: new Date().toISOString(), replies: [], status: "open" });
  emit();
}

export function addReply(ticketId: string, from: string, text: string) {
  tickets = tickets.map((t) => t.id === ticketId ? { ...t, replies: [...t.replies, { from, text, time: new Date().toLocaleString() }], status: "in_progress" as const } : t);
  emit();
}

export function resolveTicket(id: string) {
  tickets = tickets.map((t) => t.id === id ? { ...t, status: "resolved" } : t);
  emit();
}

export function addFAQ(faq: Omit<FAQItem, "id">) {
  faqs.push({ ...faq, id: `faq_${Date.now()}` });
  emit();
}

export function updateFAQ(id: string, data: Partial<Omit<FAQItem, "id">>) {
  faqs = faqs.map((f) => f.id === id ? { ...f, ...data } : f);
  emit();
}

export function deleteFAQ(id: string) {
  faqs = faqs.filter((f) => f.id !== id);
  emit();
}

export function useTickets() {
  const [list, setList] = useState(tickets);
  useEffect(() => { const unsub = subscribe(() => setList([...tickets])); return unsub; }, []);
  return list;
}

export function useFAQs() {
  const [list, setList] = useState(faqs);
  useEffect(() => { const unsub = subscribe(() => setList([...faqs])); return unsub; }, []);
  return list;
}

function subscribe(fn: Listener) { listeners.add(fn); return () => { listeners.delete(fn); }; }
