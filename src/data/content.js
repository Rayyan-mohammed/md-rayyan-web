// Central content store — sourced from MD_Rayyan_Resume.md

export const profile = {
  name: 'MD Rayyan',
  initials: 'MR',
  role: 'AI/ML Engineer & Full-Stack Developer',
  phone: '+91-7386006448',
  email: 'rayyan16522@gmail.com',
  github: 'https://github.com/Rayyan-mohammed',
  linkedin: 'https://www.linkedin.com/in/md-rayyan/',
  credly: 'https://www.credly.com/users/rayyan-md/',
  tagline:
    'Building end-to-end ML systems — from computer vision diagnostics to production-grade LLM agents.',
}

export const heroRoles = [
  'AI/ML Engineer',
  'LLM Systems Builder',
  'Computer Vision Engineer',
  'Full-Stack Developer',
]

export const navLinks = [
  { id: 'story', label: 'Approach' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'awards', label: 'Awards' },
]

export const statement =
  'I build machine learning systems that are measured, explained and deployed. I treat a clean interface as part of the model, and every project ships with its benchmarks, its failure modes and a live URL.'

export const statementStats = [
  { label: 'Years building', value: 3, suffix: '+' },
  { label: 'Projects shipped', value: 5, suffix: '' },
  { label: 'GitHub repos', value: 22, suffix: '+' },
  { label: 'Students reached', value: 1000, suffix: '+' },
]

export const storyChapters = [
  {
    title: 'Start with the problem, not the model.',
    body: 'Every system I build begins with who it is for and what breaks if it is wrong. The architecture comes after that answer.',
    shape: 'brackets',
  },
  {
    title: 'Measure everything that matters.',
    body: 'Benchmarks, calibration, uncertainty, bias checks. If I cannot measure it, I do not trust it, and neither should you.',
    shape: 'cube',
  },
  {
    title: 'Ship it. Do not just demo it.',
    body: 'FastAPI services, Docker images, live URLs. A notebook is a draft; a deployed product is the work.',
    shape: 'graph',
  },
  {
    title: 'Learn in public, lead by teaching.',
    body: 'Running a club, hosting workshops and hackathons taught me the fastest way to understand something is to explain it to 500 people.',
    shape: 'rings',
  },
  {
    title: 'Build it with care.',
    body: 'Honest numbers, small details, zero invented claims. The people on the other side of the screen deserve that.',
    shape: 'heart',
  },
]

export const heroMetrics = [
  { label: 'Lesion Classification Accuracy', value: '85.75%' },
  { label: 'Agent Execution Accuracy', value: '90%' },
  { label: 'Hallucination Rate', value: '0%' },
  { label: 'Faster Complaint Resolution', value: '40%' },
]

export const heroTerminalLines = [
  { text: '$ python train_dermaegis.py --model efficientnetb3', delay: 0 },
  { text: 'Epoch  1/30   loss: 1.842   acc: 0.412', delay: 550 },
  { text: 'Epoch 15/30   loss: 0.512   acc: 0.798', delay: 1000 },
  { text: 'Epoch 30/30   loss: 0.211   acc: 0.8575', delay: 1450 },
  { text: '✓ model saved → dermaegis_effnetb3.pt', delay: 1950, done: true },
]

export const heroConfusion = { tp: 61, fp: 14, fn: 9, tn: 88 }

export const aboutTags = [
  'Computer Vision',
  'LLM Agents / RAG',
  'MLOps',
  'Cloud (AWS / GCP)',
  'Full-Stack',
]

export const experience = [
  {
    title: 'Head',
    org: 'Code IT Club',
    date: '2025 — Present',
    bullets: [
      'Lead technical strategy for the club, setting direction across coding events and member growth initiatives.',
      'Organized 10+ coding events including webathons and hackathons, reaching 500+ students.',
      'Mentor student contributors on project execution, from ideation through delivery.',
    ],
    tags: ['Event Strategy', 'Technical Mentorship', 'Community Building'],
  },
  {
    title: 'Student Ambassador',
    org: 'Google Cloud Foundations',
    date: '2024 — 2025',
    bullets: [
      'Represented the Google Cloud Foundations program across 7 campuses.',
      'Engaged 500+ students on cloud fundamentals and certification pathways.',
      'Drove hands-on adoption of GCP skill badges among peer student communities.',
    ],
    tags: ['GCP', 'Developer Relations', 'Cloud Certifications'],
  },
  {
    title: 'Student Engagement Lead',
    org: 'ELGE Club',
    date: '2025',
    bullets: [
      'Organized 3+ industry-focused workshops for the student community.',
      'Drove 400+ Google Cloud certification sign-ups among students.',
      'Coordinated with industry speakers and internal teams to run each session end-to-end.',
    ],
    tags: ['Workshop Design', 'Public Speaking', 'Cloud Advocacy'],
  },
]

export const projects = [
  {
    number: '01',
    title: 'DermAegis AI',
    subtitle: 'Skin Lesion Intelligence Platform',
    description:
      'Engineered a 7-class dermoscopic lesion classifier on HAM10000 (10k+ images) using EfficientNetB3 transfer learning, achieving **85.75% accuracy** and 0.72 macro F1 on a lesion-grouped split — with two-phase fine-tuning, mixup, label smoothing, and TTA ×4.',
    highlights: [
      'Near-doubled melanoma detection (F1 0.33 → 0.61) via upsample-median oversampling and calibrated confidence scoring, benchmarked against MobileNetV2 and ResNet50.',
      'Built a FastAPI microservice with Monte Carlo Dropout uncertainty, Grad-CAM heatmaps, and an automated Fitzpatrick skin-tone bias detector; deployed via React UI, Streamlit, and Docker Compose.',
    ],
    tags: ['Python', 'TensorFlow', 'FastAPI', 'React', 'Docker', 'Grad-CAM'],
    github: 'https://github.com/Rayyan-mohammed/Skin_Cancer_Detection',
    demo: 'https://derma-aegis-smart-horizon.vercel.app/',
    year: '2026',
  },
  {
    number: '02',
    title: 'BharatHealth Analyst',
    subtitle: 'LLM Agent for Indian Public Health Data',
    description:
      "Built a 6-tool LangChain ReAct agent enabling natural-language querying over India's NFHS-5 health survey (706 districts, 107 indicators, 36 states/UTs), with semantic search, correlation analysis, and Plotly visualizations.",
    highlights: [
      'Designed BharatHealth-Bench, a 200-question benchmark across 5 metrics — achieving **90% execution accuracy and 0% hallucination rate**.',
      'Engineered a production-grade architecture with RestrictedPython sandboxing, ChromaDB vector search, and a provider-agnostic multi-LLM fallback layer, exposed via a 10-endpoint FastAPI backend.',
    ],
    tags: ['Python', 'LangChain', 'FastAPI', 'ChromaDB', 'Multi-LLM'],
    github: 'https://github.com/Rayyan-mohammed/aarogya-lens',
    demo: null,
    year: '2026',
  },
  {
    number: '03',
    title: 'Argus',
    subtitle: 'Spot-Resilient ML Training Orchestrator',
    description:
      "Built the ML prediction layer of a system forecasting AWS EC2 Spot instance interruptions **ahead of AWS's 2-minute reclamation notice**, enabling proactive checkpointing for long-running training jobs.",
    highlights: [
      'Engineered a feature pipeline from raw EC2 Spot price history and trained a Transformer encoder with Focal Loss to handle severe interruption-class imbalance, tracked via MLflow.',
      "Built a Dockerized, load-tested FastAPI /predict service pushed to AWS ECR, integrating with a teammate's Kubernetes Operator via a strict API/data contract.",
    ],
    tags: ['Python', 'PyTorch', 'FastAPI', 'Docker', 'MLflow', 'AWS'],
    github: 'https://github.com/Rayyan-mohammed/Argus-Spot_Resilient_ML_Training_Orchestrator',
    demo: null,
    year: '2026',
  },
  {
    number: '04',
    title: 'PharmaFlow Pro',
    subtitle: 'Pharmacy ERP Platform',
    description:
      'Architected a **12-model** pharmacy ERP covering the full operational lifecycle — inventory, billing, purchases, prescriptions, supplier management, returns, and financial settlements.',
    highlights: [
      'Implemented 3-tier RBAC with a granular permissions matrix, CSRF protection, and a full audit activity log for compliance tracking.',
      'Built a predictive reorder engine, low-stock/expiry alert center, and financial dashboards with Chart.js analytics; deployed on AWS Elastic Beanstalk.',
    ],
    tags: ['PHP', 'MySQL', 'JavaScript', 'AWS'],
    github: 'https://github.com/Rayyan-mohammed/Pharma-Flow-Pro',
    demo: 'http://pharmaflowpro-env.eba-qmekzfkj.us-east-1.elasticbeanstalk.com/',
    year: '2025 — 2026',
  },
  {
    number: '05',
    title: 'NMIMS Anonymous Complaint Portal',
    subtitle: 'Campus Grievance System',
    description:
      'Cut complaint resolution time by **40%** by replacing fragmented email flows with an automated ticket lifecycle across four university schools.',
    highlights: [
      'Embedded anonymous reporting at the system core with role-based routing.',
      'Built an admin dashboard with dynamic SQL filtering for cross-campus pattern identification.',
    ],
    tags: ['PHP', 'MySQL', 'JavaScript'],
    github: 'https://github.com/Rayyan-mohammed/NMIMS-Anonymous-Complaint-Portal',
    demo: null,
    year: '2025',
  },
]

export const skillGroups = [
  {
    category: 'Languages',
    items: [
      { name: 'Python', level: 95 },
      { name: 'JavaScript', level: 78 },
      { name: 'SQL', level: 75 },
      { name: 'C++', level: 55 },
    ],
  },
  {
    category: 'ML & Deep Learning',
    items: [
      { name: 'PyTorch', level: 90 },
      { name: 'TensorFlow', level: 88 },
      { name: 'CNNs', level: 88 },
      { name: 'Transfer Learning', level: 85 },
      { name: 'OpenCV', level: 80 },
      { name: 'Scikit-learn', level: 78 },
      { name: 'Grad-CAM', level: 75 },
    ],
  },
  {
    category: 'GenAI & LLMs',
    items: [
      { name: 'Prompt Engineering', level: 90 },
      { name: 'LangChain', level: 88 },
      { name: 'RAG', level: 85 },
      { name: 'Multi-LLM Orchestration', level: 80 },
      { name: 'ChromaDB', level: 78 },
    ],
  },
  {
    category: 'Data & Analysis',
    items: [
      { name: 'Pandas', level: 90 },
      { name: 'NumPy', level: 88 },
      { name: 'Power BI', level: 65 },
    ],
  },
  {
    category: 'Frameworks',
    items: [
      { name: 'React', level: 85 },
      { name: 'FastAPI', level: 88 },
      { name: 'Streamlit', level: 78 },
      { name: 'Flask', level: 70 },
      { name: 'Next.js', level: 55 },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'MySQL', level: 80 },
      { name: 'MongoDB', level: 70 },
      { name: 'Firebase', level: 60 },
      { name: 'Supabase', level: 55 },
    ],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      { name: 'Git', level: 90 },
      { name: 'GitHub', level: 90 },
      { name: 'GCP', level: 78 },
      { name: 'Docker', level: 78 },
      { name: 'AWS', level: 75 },
      { name: 'MLflow', level: 72 },
    ],
  },
]

export const awards = [
  {
    year: '2025',
    title: 'Winner — NMIMS Hackathon',
    detail: 'Led development of a scalable digital growth platform for small businesses among 30 competing teams.',
  },
  {
    year: '2026',
    title: 'Plantora — Top 20%',
    detail: 'AI-based smart agriculture system, ranked among the top 20% at the NMIMS Research Symposium.',
  },
  {
    year: '2024',
    title: 'Finalist — Joy of Programming',
    detail: 'Placed among the top 6 finalists out of 40+ participants in competitive programming.',
  },
]

export const certifications = [
  'AWS Academy Graduate — ML Foundations & Cloud Foundations',
  'Google Cloud Computing Foundations + Skill Badges (Network Security, ML Data Prep, Load Balancing)',
  'Cisco Networking & OS Basics',
  'NPTEL (Python, DBMS)',
]

export const education = [
  {
    school: 'STME, NMIMS University, Hyderabad',
    date: '2023 — Expected 2027',
    detail: 'B.Tech in Computer Science and Engineering (Data Science) — CGPA: 3.52/4.0',
    primary: true,
  },
  {
    school: 'Prathibha Junior College, Mahbubnagar',
    date: '2021 — 2023',
    detail: 'HSC — 91.8%',
    primary: false,
  },
  {
    school: 'Prism The School, Nagar Kurnool',
    date: '2021',
    detail: 'SSC — 10/10 CGPA',
    primary: false,
  },
]
