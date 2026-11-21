export const profile = {
  name: "Alina Khan",
  email: "alinasohailkhan2004@gmail.com",
  resume: "/Alina-Khan-Resume.pdf",
  location: "Currently learning & building in Dubai.",
  study: "Big Data & AI · University of Wollongong",
  github: "https://github.com/alina-khan123",
  linkedin: "https://www.linkedin.com/in/alina-khan-831629282/",
};

export const aboutTags = [
  "Python",
  "ReAct & MCP",
  "n8n",
  "PyTorch",
  "HuggingFace",
  "FastAPI",
  "React",
  "PySpark",
  "Docker",
  "PostgreSQL",
];

export const chapters = [
  {
    label: "Chapter I",
    dates: "2023–2024",
    title: "A curious beginning.",
    body: "Studied Biomedical Informatics at the University of Sharjah before transferring to Computer Science. Along the way, supported departmental tasks and cross-team coordination as a CHILD Department apprentice intern at Delhi Private School, Sharjah.",
    tags: ["Research", "Collaboration"],
  },
  {
    label: "Chapter II",
    dates: "2024–2027",
    title: "Learning by building.",
    body: "Computer Science, Big Data & Artificial Intelligence, at UOWD. Exploring language models, robotics and distributed data pipelines through practical projects. Presented CNN-based brain tumour classification research at ISDIA-2026.",
    tags: ["ML", "Research", "Spark"],
  },
  {
    label: "Chapter III",
    dates: "Jul–Sep 2026",
    title: "Elchai Group.",
    body: "AI Platform & Automation Engineering Intern. Worked on health checks, monitoring, validation guards, retry logic, multimodal evaluation and n8n recovery workflows. Built platform tools, a knowledge base and runbooks for the next engineer.",
    tags: ["Python", "n8n", "Evaluation"],
  },
  {
    label: "Today",
    dates: "Learning & exploring",
    title: "Useful AI, thoughtfully made.",
    body: "Bringing together agent orchestration, applied machine learning and software engineering. Looking for opportunities to build systems with real users, clear evidence and measurable outcomes.",
    tags: ["Agents", "Automation"],
  },
];

type Project = {
  title: string;
  repoUrl: string;
  role: string;
  desc: string;
  tags: string[];
  outcome: string;
};

export const projects: Project[] = [
  {
    title: "Aurum AI",
    repoUrl: "https://github.com/alina-khan123/Aurum_AI",
    role: "Multi-agent systems · Full-stack development",
    desc: "A gold-trading research system combining market, macroeconomic and news data through MCP. A council of ReAct agents debates evidence; an arbitrator combines confidence-weighted votes for signals, risk and position sizing.",
    tags: ["ReAct", "MCP", "React", "SQLite", "Agent orchestration"],
    outcome:
      "1st place at the UOWD MCP & Agentic AI Hackathon. Includes persistent memory and a paper-trading dashboard.",
  },
  {
    title: "Arabic Sentiment",
    repoUrl: "https://github.com/alina-khan123/Arabic_Sentiment_Analysis",
    role: "LLM fine-tuning · Applied research",
    desc: "Fine-tuned a 7B Arabic language model for code-switched Gulf Arabic–English sentiment analysis, using LoRA/PEFT and 4-bit quantization on A100/H100 GPUs. Developed the SDAS dialect-alignment metric.",
    tags: ["PyTorch", "HuggingFace", "LoRA / PEFT", "4-bit", "Flask", "Docker"],
    outcome:
      "63.36% accuracy and 58.98% Macro-F1 on a project using 12.4K tweets. Served through a Dockerized Flask API.",
  },
  {
    title: "NYC Taxi Pipeline",
    repoUrl: "https://github.com/alina-khan123/NYC_Taxi_Project",
    role: "Distributed machine learning · Data engineering",
    desc: "A PySpark machine-learning pipeline processing more than 11 million NYC taxi trips, with temporal and spatial feature engineering, regression models and custom cross-validation.",
    tags: ["PySpark", "Parquet", "Docker", "Regression", "Cross-validation"],
    outcome: "R² 0.617, RMSE 2.375 and MAE 1.258 on 1.4 million test samples.",
  },
  {
    title: "Innovation Platform",
    repoUrl: "https://github.com/alina-khan123/ZU-Innovation-TeamForge",
    role: "Semantic search · Full-stack development",
    desc: "An AI-powered innovation and investment platform matching innovators with investors using OpenAI embeddings, transformer models and cosine similarity. Built real-time semantic search and idea discovery in a web dashboard.",
    tags: [
      "Embeddings",
      "Transformers",
      "Semantic search",
      "Cosine similarity",
      "Web dashboard",
    ],
    outcome:
      "Built and pitched under competition conditions as a selected Zayed University AI Hackathon participant.",
  },
  {
    title: "Robot Navigation",
    repoUrl: "https://github.com/alina-khan123/CSCI218_Project",
    role: "Reinforcement learning · Simulation",
    desc: "A Unity robot-learning environment with randomized obstacles and C# control. Combined PPO, fuzzy logic and behaviour trees for adaptive obstacle avoidance through training and domain randomization.",
    tags: ["Unity ML-Agents", "C#", "PPO", "Fuzzy logic", "Behaviour trees"],
    outcome:
      "Explored emergent obstacle avoidance through a hybrid learning and decision-making approach.",
  },
];

export const skillGroups: Record<string, string[]> = {
  Languages: ["Python", "TypeScript", "JavaScript", "C++", "SQL"],
  "Agents & automation": ["MCP", "ReAct", "LLM orchestration", "n8n", "Hermes"],
  "Models & fine-tuning": [
    "PyTorch",
    "HuggingFace",
    "PEFT / LoRA",
    "QLoRA",
    "Quantization",
  ],
  "Backend & APIs": ["FastAPI", "Flask", "Node.js", "REST APIs", "Docker"],
  "Data & databases": [
    "PySpark",
    "Parquet",
    "Pandas / NumPy",
    "PostgreSQL",
    "MongoDB / Redis",
  ],
  Frontend: ["React", "Next.js", "HTML / CSS", "Streamlit"],
  "Evaluation & knowledge": [
    "Multimodal evaluation",
    "Regression gates",
    "Obsidian / Graphify",
    "Runbooks",
  ],
  "Tools & platforms": [
    "Git / GitHub",
    "Google Colab",
    "Azure",
    "Vercel",
    "Claude Code",
  ],
  "Robotics & research": [
    "Unity ML-Agents",
    "OpenCV",
    "TensorFlow / Keras",
    "Behaviour trees",
  ],
};

export const credentials = [
  "MCP & Agentic AI Hackathon · 1st place · 2026",
  "ISDIA-2026 · Research presentation",
  "Special Olympics Robotics · 3rd place · 2019",
];

export const processSteps: [string, string][] = [
  [
    "Understand",
    "Start with the person, the problem and the evidence. Decide what a useful outcome actually looks like.",
  ],
  [
    "Design",
    "Map the workflow, data and tool boundaries before choosing the model or writing the interface.",
  ],
  [
    "Build",
    "Connect reliable tools and explicit logic. Use language models where they earn their place.",
  ],
  [
    "Evaluate",
    "Measure outputs, test failure paths and add validation. A compelling demo is not a substitute for evidence.",
  ],
  [
    "Refine",
    "Improve the experience and document the decisions, so the next iteration starts from something understandable.",
  ],
];

