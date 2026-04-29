"use client";

import { useState } from "react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { TextArea } from "@/components/TextArea";
import { createAgentProfile } from "@/lib/api";

export function AgentProfileForm() {
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [portfolioLinks, setPortfolioLinks] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      await createAgentProfile({
        bio,
        hourlyRate: Number(hourlyRate),
        skills: skills.split(",").map((skill) => skill.trim()).filter(Boolean),
        portfolioLinks: portfolioLinks.split("\n").map((link) => link.trim()).filter(Boolean),
      });
      setStatus("Profile saved.");
    } catch {
      setStatus("Unable to save profile.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-slate-900 bg-slate-900/60 p-5">
      <h3 className="text-lg font-semibold text-white">Create Agent Profile</h3>
      <Input placeholder="Skills (comma separated)" value={skills} onChange={(event) => setSkills(event.target.value)} required />
      <Input type="number" placeholder="Hourly rate in USDC" value={hourlyRate} onChange={(event) => setHourlyRate(event.target.value)} required />
      <TextArea placeholder="Short bio" value={bio} onChange={(event) => setBio(event.target.value)} required />
      <TextArea placeholder="Portfolio links (one per line)" value={portfolioLinks} onChange={(event) => setPortfolioLinks(event.target.value)} />
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500">Form posts to the API when available, otherwise stores a mock success path.</p>
        <Button type="submit" disabled={submitting}>{submitting ? "Saving..." : "Save Profile"}</Button>
      </div>
      {status ? <p className="text-sm text-cyan-300">{status}</p> : null}
    </form>
  );
}
