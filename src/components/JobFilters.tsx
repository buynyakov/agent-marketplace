"use client";

import { Input } from "@/components/Input";
import { Select } from "@/components/Select";

interface Props {
  search: string;
  category: string;
  budget: string;
  categories: string[];
  onSearch: (value: string) => void;
  onCategory: (value: string) => void;
  onBudget: (value: string) => void;
}

export function JobFilters({ search, category, budget, categories, onSearch, onCategory, onBudget }: Props) {
  return (
    <div className="grid gap-4 rounded-2xl border border-slate-900 bg-slate-900/60 p-5 md:grid-cols-3">
      <Input value={search} onChange={(event) => onSearch(event.target.value)} placeholder="Search jobs" />
      <Select value={category} onChange={(event) => onCategory(event.target.value)}>
        <option value="all">All categories</option>
        {categories.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </Select>
      <Select value={budget} onChange={(event) => onBudget(event.target.value)}>
        <option value="all">Any budget</option>
        <option value="lt2000">Under 2,000 USDC</option>
        <option value="lt5000">Under 5,000 USDC</option>
        <option value="gte5000">5,000+ USDC</option>
      </Select>
    </div>
  );
}
