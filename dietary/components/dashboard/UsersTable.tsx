"use client";

import { useState } from "react";

type User = {
  name: string;
  app: string;
  role: string;
  city: string;
  status: "Active" | "New" | "Non-targeted" | "VIP";
};

const data: User[] = [
  { name: "Amelia Evans", app: "FreshTrack", role: "Gluten-free Lead", city: "Niagara Falls", status: "Active" },
  { name: "Ava Thompson", app: "NutriMap", role: "Vegan Curator", city: "Saratoga Springs", status: "New" },
  { name: "Benjamin Taylor", app: "DietaryID", role: "Allergy Analyst", city: "Troy", status: "Active" },
  { name: "Charlotte Campbell", app: "PureMeal", role: "Diet Manager", city: "Ithaca", status: "Non-targeted" },
  { name: "Emma Collins", app: "GreenPlate", role: "Recipe Lead", city: "Syracuse", status: "Active" },
  { name: "Ethan Cooper", app: "BioRoots", role: "Nutrition Director", city: "White Plains", status: "VIP" },
  { name: "Isabella Stewart", app: "LeafLink", role: "Wellness Coord", city: "Binghamton", status: "Active" },
  { name: "James Davis", app: "CalorieWave", role: "Data Analyst", city: "Poughkeepsie", status: "New" },
  { name: "Liam Parker", app: "Solaris Edge", role: "Macro Analyst", city: "Rochester", status: "New" },
  { name: "Lucas Bennett", app: "Vaulted", role: "Compliance Mgr", city: "Mount Vernon", status: "Non-targeted" },
  { name: "Mason Brooks", app: "EcoZen Foods", role: "Data Analyst", city: "Schenectady", status: "Active" },
  { name: "Mia Bryant", app: "Iron Ledger", role: "Labeling Spec", city: "New Rochelle", status: "Active" },
  { name: "Noah Mitchell", app: "ByteBloom", role: "Product Owner", city: "Yonkers", status: "Non-targeted" },
  { name: "Oliver Baker", app: "NeuralFlow", role: "Allergen Lead", city: "Albany", status: "Active" },
  { name: "Sophia Dougherty", app: "Quantum Mint", role: "Diet Coach", city: "Buffalo", status: "New" },
];

const initialChecked = new Set([3, 9, 12]);

const statusStyles: Record<User["status"], string> = {
  Active: "bg-admin-active-bg text-admin-active-text",
  New: "bg-admin-new-bg text-admin-new-text",
  "Non-targeted": "bg-admin-non-bg text-admin-non-text",
  VIP: "bg-admin-vip-bg text-admin-vip-text",
};

type Props = {
  searchQuery: string;
  selected: Set<number>;
  setSelected: (s: Set<number>) => void;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function UsersTable({ searchQuery, selected, setSelected }: Props) {
  const toggleRow = (i: number) => {
    const next = new Set(selected);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === data.length) setSelected(new Set());
    else setSelected(new Set(data.map((_, i) => i)));
  };

  const filtered = data.filter((r) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return [r.name, r.app, r.role, r.city, r.status].join(" ").toLowerCase().includes(q);
  });

  const allSelected = selected.size === data.length;

  return (
    <div className="flex-1 overflow-y-auto relative">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold w-[42px]">
              <Checkbox checked={allSelected} onClick={toggleAll} />
            </th>
            <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">
              Name ▾
            </th>
            <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">
              App / Diet
            </th>
            <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold hidden lg:table-cell">
              Role
            </th>
            <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold hidden lg:table-cell">
              City
            </th>
            <th className="sticky top-0 bg-admin-bg text-left text-[11.5px] tracking-[0.05em] text-admin-muted uppercase py-3 px-[14px] border-b border-admin-border font-semibold">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => {
            const isSelected = selected.has(i);
            const matches = filtered.includes(row);
            return (
              <tr
                key={i}
                onClick={() => toggleRow(i)}
                className={`cursor-pointer ${isSelected ? "bg-admin-sel-row" : "hover:bg-admin-hover"}`}
                style={{ display: matches ? "" : "none" }}
              >
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-admin-text">
                  <Checkbox checked={isSelected} onClick={() => toggleRow(i)} />
                </td>
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-admin-text">
                  <div className="flex items-center gap-3">
                    <div className="w-[30px] h-[30px] rounded-full bg-admin-avatar-bg flex items-center justify-center text-[11px] font-semibold text-admin-avatar-text flex-shrink-0">
                      {getInitials(row.name)}
                    </div>
                    {row.name}
                  </div>
                </td>
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-admin-nav-text">
                  {row.app}
                </td>
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-admin-nav-text hidden lg:table-cell">
                  {row.role}
                </td>
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border text-admin-nav-text hidden lg:table-cell">
                  {row.city}
                </td>
                <td className="py-[13px] px-[14px] text-[14.5px] border-b border-admin-border">
                  <span className={`text-[12.5px] py-[3px] px-[11px] rounded-[7px] inline-block ${statusStyles[row.status]}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Checkbox({ checked, onClick }: { checked: boolean; onClick: () => void }) {
  return (
    <span
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`w-[18px] h-[18px] border-[1.5px] rounded-[5px] cursor-pointer inline-flex items-center justify-center align-middle ${
        checked ? "bg-admin-dark border-admin-dark" : "bg-admin-bg border-admin-cb-border"
      }`}
    >
      {checked && (
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="w-[11px] h-[11px]">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </span>
  );
}
