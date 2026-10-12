export type CategoryId = "ds" | "ml" | "ai" | "genai";

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
}

export interface Project {
  cat: CategoryId;
  title: string;
  desc: string; // text in [square brackets] shows as a yellow to-do
  tech: string[];
  github?: string;
  demo?: string; // leave empty to hide the button
  shots?: string[]; // e.g. ["images/hakimai-1.png"] (files go in public/images)
}

export interface Job {
  role: string;
  when: string;
  points: string[];
  link?: string;
}
