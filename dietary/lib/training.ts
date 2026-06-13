"use client";

import { useState, useEffect } from "react";

export type QuizQuestion = {
  q: string;
  options: string[];
  correct: number;
};

export type Module = {
  id: string;
  title: string;
  duration: number;
  description: string;
  content: string;
  quiz: QuizQuestion[];
  order: number;
  createdAt: string;
};

export type Completion = {
  memberId: string;
  memberName: string;
  memberRole: string;
  moduleId: string;
  status: "not_started" | "in_progress" | "completed";
  score: number | null;
  completedAt: string | null;
};

type Listener = () => void;

let modules: Module[] = [
  {
    id: "mod_1", title: "Allergen Basics", duration: 15, order: 1,
    description: "What are food allergies vs. intolerances? Why are they serious? Legal & liability basics.",
    content: `## Module 1: Allergen Basics

### What Are Food Allergies?
A food allergy is an immune system reaction that occurs soon after eating a certain food. Even a tiny amount of the allergy-causing food can trigger signs and symptoms such as digestive problems, hives or swollen airways.

### Allergies vs. Intolerances
- **Food allergy**: Immune system response. Can be life-threatening (anaphylaxis).
- **Food intolerance**: Digestive system response. Uncomfortable but rarely dangerous.

### The Big 8 Allergens
1. Milk
2. Eggs  
3. Fish
4. Shellfish
5. Tree nuts
6. Peanuts
7. Wheat
8. Soybeans

### Legal & Liability
In the UK, food businesses must tell customers if any food they provide contains any of the 14 allergens as an ingredient. Staff must be trained to handle allergen information correctly.`,
    quiz: [
      { q: "What is the main difference between a food allergy and intolerance?", options: ["Allergies are never serious", "Allergies involve the immune system, intolerances involve digestion", "Intolerances always cause hives", "There is no difference"], correct: 1 },
      { q: "How many major food allergens are recognized in the UK?", options: ["8", "14", "5", "20"], correct: 1 },
      { q: "What should you do first when a customer mentions an allergy?", options: ["Recommend the most popular dish", "Ask clarifying questions about severity and modifications", "Tell them the kitchen is busy", "Hand them a menu"], correct: 1 },
    ],
    createdAt: "2024-01-05T10:00:00Z",
  },
  {
    id: "mod_2", title: "Menu & Ingredient Knowledge", duration: 20, order: 2,
    description: "How to read labels, hidden allergens, cross-contamination, your restaurant's specific menu.",
    content: `## Module 2: Menu & Ingredient Knowledge

### Reading Labels
Always check ingredient labels carefully. Look for:
- Allergen declarations in **bold**
- "May contain" warnings
- Hidden sources of common allergens

### Hidden Allergens
- **Soy**: Found in soy sauce, miso, tofu, edamame, and many processed foods
- **Gluten**: Found in wheat, barley, rye, and many sauces/thickeners
- **Dairy**: Found in butter, cheese, cream, whey, casein
- **Eggs**: Found in mayonnaise, some pasta, baked goods, dressings

### Cross-Contamination Risks
- Shared fryers (e.g. fries cooked in same oil as breaded items)
- Shared cutting boards
- Shared utensils and prep surfaces
- Airborne flour particles in bakeries/pizzerias

### Prevention
- Use color-coded cutting boards
- Dedicated allergen-free prep area
- Separate fryer for gluten-free items
- Clean utensils between allergen orders`,
    quiz: [
      { q: "Which of these is a hidden source of gluten?", options: ["Soy sauce", "Olive oil", "Salt", "Black pepper"], correct: 0 },
      { q: "What is a major cross-contamination risk?", options: ["Using fresh ingredients", "Shared fryers", "Cooking to temperature", "Using gloves"], correct: 1 },
      { q: "What system helps prevent cross-contamination between prep surfaces?", options: ["Labeling everything", "Color-coded cutting boards", "Using more salt", "Double cooking"], correct: 1 },
    ],
    createdAt: "2024-01-05T10:00:00Z",
  },
  {
    id: "mod_3", title: "Customer Communication", duration: 15, order: 3,
    description: "How to ask about allergies, what to say and not say, de-escalation if someone has a reaction.",
    content: `## Module 3: Customer Communication

### When a Customer Mentions an Allergy

**DO:**
- Ask clarifying questions about severity
- Explain what modifications are possible
- Offer to check with the kitchen
- Document the order clearly
- Use a separate allergen order ticket

**DON'T:**
- Say "it should be fine"
- Guess about ingredients
- Minimize the customer's concern
- Promise something you can't verify
- Rush through the conversation

### De-escalation
If a customer reports a reaction:
1. Stay calm and listen
2. Notify the manager immediately
3. Document what was ordered and when
4. Offer water and a quiet place to sit
5. Do NOT offer medical advice
6. Follow your incident reporting procedure`,
    quiz: [
      { q: "What should you do when a customer mentions an allergy?", options: ["Guess about the ingredients", "Ask clarifying questions and check with the kitchen", "Say 'it should be fine'", "Ignore it"], correct: 1 },
      { q: "If a customer reports a reaction, what is the first step?", options: ["Offer them free dessert", "Stay calm and notify the manager", "Argue that your food is safe", "Ask them to leave"], correct: 1 },
      { q: "What should you NEVER say to a customer with allergies?", options: ["Let me check with the kitchen", "I'll note this on your order", "It should be fine", "We have a separate allergy menu"], correct: 2 },
    ],
    createdAt: "2024-01-05T10:00:00Z",
  },
  {
    id: "mod_4", title: "Procedures & Safety", duration: 20, order: 4,
    description: "Your restaurant's specific procedures for handling allergen orders safely.",
    content: `## Module 4: Procedures & Safety

### Order Taking
1. Note the allergy on the order ticket in RED
2. Confirm the order with the customer before sending to kitchen
3. Use a dedicated allergen order flag

### Kitchen Prep
1. Wash hands and change gloves
2. Use clean, sanitized surfaces
3. Use separate utensils
4. Check all ingredient labels
5. Prepare allergen order separately

### Serving
1. Deliver allergen order separately from other dishes
2. Confirm with the customer: "This is your [dish], prepared without [allergen]"
3. Do not let other staff handle the dish en route

### Incident Reporting
If a reaction occurs:
1. Fill out the incident report form
2. Document all details
3. Notify management
4. Follow up with the customer within 24 hours`,
    quiz: [
      { q: "How should an allergen order be marked?", options: ["Same as any order", "In RED on the ticket", "With a smiley face", "Only verbally"], correct: 1 },
      { q: "What should you do before preparing an allergen order?", options: ["Nothing special", "Wash hands, change gloves, clean surfaces", "Just use any utensils", "Skip the hand washing"], correct: 1 },
      { q: "When serving an allergen order, what should you tell the customer?", options: ["Nothing", "Here's your food", "This is your [dish], prepared without [allergen]", "Enjoy your meal"], correct: 2 },
    ],
    createdAt: "2024-01-05T10:00:00Z",
  },
  {
    id: "mod_5", title: "DietaryID & Your Profile", duration: 10, order: 5,
    description: "Why we're on DietaryID, what reviews mean, how to encourage reviews.",
    content: `## Module 5: DietaryID & Your Profile

### Why DietaryID Matters
DietaryID helps customers with food allergies find safe restaurants. Your verified profile:
- Shows you take allergies seriously
- Attracts customers actively looking for safe dining
- Builds trust before they even walk in

### Customer Reviews
- Every review helps people with allergies feel confident
- Respond to reviews within 24-48 hours
- Thank customers for specific feedback
- Address concerns professionally

### Encouraging Reviews
- Mention DietaryID to customers who ask about allergens
- Add a small card to tables: "Find us on DietaryID"
- Display your verification badge
- Train all staff to mention DietaryID when asked about allergens`,
    quiz: [
      { q: "Why is a verified DietaryID profile valuable?", options: ["No reason", "Shows you take allergies seriously and attracts safe-seeking customers", "Only for marketing", "Required by law"], correct: 1 },
      { q: "How quickly should you respond to reviews?", options: ["Within a week", "Within 24-48 hours", "Whenever", "Never"], correct: 1 },
      { q: "What should you display to build trust?", options: ["Nothing", "Your DietaryID verification badge", "Any random certificate", "Only your menu"], correct: 1 },
    ],
    createdAt: "2024-01-05T10:00:00Z",
  },
];

let completions: Completion[] = [
  { memberId: "marco_rossi", memberName: "Marco Rossi", memberRole: "Owner", moduleId: "mod_1", status: "completed", score: 92, completedAt: "2024-01-15" },
  { memberId: "marco_rossi", memberName: "Marco Rossi", memberRole: "Owner", moduleId: "mod_2", status: "completed", score: 88, completedAt: "2024-01-18" },
  { memberId: "sofia_bianchi", memberName: "Sofia Bianchi", memberRole: "Manager", moduleId: "mod_1", status: "completed", score: 95, completedAt: "2024-01-18" },
  { memberId: "sofia_bianchi", memberName: "Sofia Bianchi", memberRole: "Manager", moduleId: "mod_2", status: "completed", score: 90, completedAt: "2024-01-20" },
  { memberId: "james_park", memberName: "James Park", memberRole: "Manager", moduleId: "mod_1", status: "completed", score: 78, completedAt: "2024-01-22" },
];

const listeners = new Set<Listener>();

function emit() { listeners.forEach((fn) => fn()); }

export function getModules(): Module[] { return modules; }

export function getCompletions(): Completion[] { return completions; }

export function addModule(m: Omit<Module, "id" | "createdAt">) {
  modules.push({ ...m, id: `mod_${Date.now()}`, createdAt: new Date().toISOString() });
  emit();
}

export function updateModule(id: string, data: Partial<Omit<Module, "id" | "createdAt">>) {
  modules = modules.map((m) => m.id === id ? { ...m, ...data } : m);
  emit();
}

export function deleteModule(id: string) {
  modules = modules.filter((m) => m.id !== id);
  completions = completions.filter((c) => c.moduleId !== id);
  emit();
}

export function completeModule(memberId: string, memberName: string, memberRole: string, moduleId: string, score: number) {
  const existing = completions.find((c) => c.memberId === memberId && c.moduleId === moduleId);
  if (existing) {
    completions = completions.map((c) => c.memberId === memberId && c.moduleId === moduleId
      ? { ...c, status: "completed" as const, score, completedAt: new Date().toISOString().slice(0, 10) }
      : c);
  } else {
    completions.push({ memberId, memberName, memberRole, moduleId, status: "completed", score, completedAt: new Date().toISOString().slice(0, 10) });
  }
  emit();
}

export function assignModule(memberId: string, memberName: string, memberRole: string, moduleId: string) {
  if (completions.some((c) => c.memberId === memberId && c.moduleId === moduleId)) return;
  completions.push({ memberId, memberName, memberRole, moduleId, status: "not_started", score: null, completedAt: null });
  emit();
}

export function getMemberModules(memberId: string): Completion[] {
  return completions.filter((c) => c.memberId === memberId);
}

export function useModules() {
  const [list, setList] = useState(modules);
  useEffect(() => { const unsub = subscribe(() => setList([...modules])); return unsub; }, []);
  return list;
}

export function useCompletions() {
  const [list, setList] = useState(completions);
  useEffect(() => { const unsub = subscribe(() => setList([...completions])); return unsub; }, []);
  return list;
}

function subscribe(fn: Listener) { listeners.add(fn); return () => { listeners.delete(fn); }; }
