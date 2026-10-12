export type CategoryId = "ds" | "ml" | "ai" | "genai";

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
}

export interface Project {
  cat: CategoryId;
  title: string;
  desc: string;
  problem?: string; // hidden in the UI until filled in
  approach?: string; // hidden in the UI until filled in
  result?: string; // measurable outcome; hidden in the UI until filled in
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

export interface SocialLink {
  label: string;
  url: string;
}

export interface Seo {
  url: string; // canonical + og:url
  ogImage: string; // absolute URL
}
