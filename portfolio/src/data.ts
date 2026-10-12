/* ===== EDIT THIS FILE TO UPDATE YOUR PORTFOLIO =====
   Add a project: copy one object in PROJECTS, paste it, change the fields.
   Add a category: add one object to CATEGORIES and extend CategoryId in types.ts.
   Text in [square brackets] shows as a yellow to-do on the page. */
import type { Category, Job, Project, Seo, SocialLink } from "./types";

export const PROFILE = {
  name: "Sheher Bano",
  kicker: "Python · Machine Learning · Data Science · NLP & RAG",
  headline: "AI/ML Engineer | Turning Data into Practical AI Solutions",
  intro:
    "Computer Science graduate (CGPA 3.65/4.00) with hands-on experience in Python-based machine learning and retrieval-augmented AI. I helped build HakimAI, a medicinal-plant recommendation system that combines a Flask backend, FAISS retrieval, and a T5-based language model with a mobile front end. I keep building practical depth through NeuraForge, a public repository covering classical machine learning, neural networks, and the basics of transfer learning.",
  about: [
    "I'm a Computer Science graduate from Gilgit-Baltistan, now based in Rawalpindi, with a strong interest in machine learning, NLP, and data science. What I enjoy most is taking a messy dataset or a real problem and turning it into something that actually works.",
    "My final-year project, HakimAI, brought this together: a medicinal-plant recommendation app with a Flask backend, FAISS retrieval, and a T5-small language model behind a React Native mobile front end. I collected, cleaned, and structured the plant data, and worked on the retrieval pipeline and backend integration.",
    "Alongside that, I keep a public repository, NeuraForge, where I practise classical machine learning, neural networks, and the basics of transfer learning. I'm now looking for an entry-level AI/ML role where I can keep learning and keep turning data into working, user-facing solutions.",
  ],
  degree: "BS Computer Science",
  university: "University of Baltistan, Skardu",
  graduated: "December 2025",
  cgpa: "3.65",
  coursework:
    "Artificial Intelligence, Machine Learning, Data Structures and Algorithms, Algorithm Analysis and Design, Object-Oriented Programming, Software Construction, Web Development",
  location: "Rawalpindi, Pakistan",
  looking: "Entry-level AI/ML, Data Science, and Python roles, plus practical freelance projects",
  github: "https://github.com/sheherbano313",
  linkedin: "https://www.linkedin.com/in/sheherbano05",
  email: "sheherbano6231@gmail.com",
  phone: "+92-349-6539580",
  cv: "/cv.pdf", // put your CV in the public/ folder with this name — button hides while the file is missing
};

export const SOCIALS: SocialLink[] = [
  { label: "GitHub", url: PROFILE.github },
  { label: "LinkedIn", url: PROFILE.linkedin },
  { label: "Email", url: `mailto:${PROFILE.email}` },
];

// Canonical URL and social-share image. Replace og-image.png with a real
// 1200x630 image placed in public/ (e.g. public/og-image.png).
export const SEO: Seo = {
  url: "https://sheherbano.vercel.app",
  ogImage: "https://sheherbano.vercel.app/og-image.png",
};

export const CATEGORIES: Category[] = [
  { id: "ml", name: "Machine Learning", blurb: "Classification, regression, model training, and evaluation." },
  { id: "genai", name: "Generative AI & RAG", blurb: "Retrieval-augmented generation and language-model applications." },
  { id: "ds", name: "Data Science", blurb: "Data cleaning, exploration, and practical analysis in Python." },
  { id: "ai", name: "AI & NLP", blurb: "AI applications, pattern recognition, and intelligent systems." },
];

// Optional fields per project (leave out until you have real content — they stay hidden):
//   problem:  "What real problem this solves"
//   approach: "How you approached it (methods, tools, pipeline)"
//   result:   "Measurable outcome (leave blank rather than guessing)"
export const PROJECTS: Project[] = [
  {
    cat: "ml",
    title: "NeuraForge — ML & Deep Learning Repository",
    desc: "An ongoing public repository where I practise classical machine learning and neural networks. It includes regression and classification models with preprocessing, train-test splits, training, and evaluation; classifiers scored with confusion matrices, precision, recall, F1, and accuracy; artificial neural networks with training, validation, and prediction; and early work on transfer learning such as freezing pretrained layers and fine-tuning.",
    tech: ["Python", "Scikit-learn", "Neural Networks", "Transfer Learning", "Jupyter Notebook"],
    github: "https://github.com/sheherbano313/NeuraForge",
  },
  {
    cat: "genai",
    title: "HakimAI — Medicinal Plant Recommendation (Final-Year Project)",
    desc: "An AI-powered app that gives information and recommendations on the medicinal plants of Gilgit-Baltistan based on a user's query. I collected, cleaned, and structured the plant data, contributed to the RAG pipeline (FAISS retrieval feeding a T5-small language model), and worked within a team to connect the Flask backend to a React Native mobile front end.",
    tech: ["Python", "Flask", "FAISS", "T5-small", "RAG", "NLP", "React Native", "Expo"],
    github: "https://github.com/sheherbano313/v1-hakimai",
  },
  {
    cat: "ml",
    title: "Dog Breed Prediction",
    desc: "A supervised machine-learning project that predicts a dog's breed using Python and Scikit-learn, part of my Data Science project repository.",
    tech: ["Python", "Pandas", "Scikit-learn", "Jupyter Notebook"],
    github: "https://github.com/sheherbano313/Data_Science_Project/blob/main/DogBreedPRediction",
  },
  {
    cat: "ds",
    title: "PAN Card Tampering Detection",
    desc: "A small project that checks whether a PAN card image has been tampered with, using Python image comparison. Part of my Data Science project repository.",
    tech: ["Python", "Jupyter Notebook"],
    github: "https://github.com/sheherbano313/Data_Science_Project/tree/main/PanCardTempered",
  },
  {
    cat: "ai",
    title: "SoftGrowTech AI Projects",
    desc: "Python AI exercises from my SoftGrowTech internship, covering classification, pattern recognition, decision-making, and recommendation techniques, organised on GitHub.",
    tech: ["Python"],
    github: "https://github.com/sheherbano313/SoftGrowTech-AI",
  },
];

export const SKILLS: Record<string, string[]> = {
  Languages: ["Python", "JavaScript", "C++", "Java", "SQL"],
  "Machine Learning": [
    "Regression",
    "Classification",
    "Model training",
    "Model evaluation",
    "Train-test split",
    "Performance metrics",
    "Confusion matrix",
    "Precision / Recall / F1",
  ],
  "Deep Learning": ["Artificial neural networks", "Model validation", "Transfer learning (fundamentals)"],
  "AI / NLP": ["Retrieval-Augmented Generation (RAG)", "FAISS", "T5-small", "NLP fundamentals"],
  "Data Science": [
    "NumPy",
    "Pandas",
    "Matplotlib",
    "Seaborn",
    "Data cleaning",
    "Preprocessing",
    "Exploratory data analysis",
  ],
  "Tools & Frameworks": ["Scikit-learn", "Flask", "Jupyter Notebook", "Git", "GitHub"],
  Web: ["HTML", "CSS", "JavaScript", "React (basic)", "React Native / Expo"],
};

export const LEARNING = [
  "Machine learning",
  "NLP",
  "LLM-based applications",
  "AI chatbots",
  "AI-driven automation",
];

export const CERTIFICATIONS: string[] = [
  "Programming for Everybody (Getting Started with Python) — Coursera",
  "Create Your First Python Program — Coursera",
];

export const EXPERIENCE: Job[] = [
  {
    role: "Frontend Developer Intern, In Touch Solutions, Skardu",
    when: "Oct 2024- Jan 2025 · 3 months",
    points: [
      "Built and refined responsive user interfaces with HTML, CSS, and JavaScript, following design specifications.",
      "Worked with teammates to integrate frontend components with backend APIs.",
      "Debugged UI issues and made usability improvements, using Git for version control.",
    ],
  },
  {
    role: "AI Intern, SoftGrowTech",
    when: "5 july - 5 Aug  · 1 month",
    points: [
      "Built small Python AI projects on classification, pattern recognition, decision-making, and recommendation techniques.",
      "Organised and published the work week by week on GitHub.",
    ],
    link: "https://github.com/sheherbano313/SoftGrowTech-AI",
  },
  {
    role: "Intern, Syntecxhub",
    when: "10 july - 15 Aug · 1 month",
    points: [
      "Completed weekly assignments and hands-on Python implementations.",
      "Kept the work organised week by week on GitHub.",
    ],
    link: "https://github.com/sheherbano313/Syntecxhub_-Projects",
  },
];
