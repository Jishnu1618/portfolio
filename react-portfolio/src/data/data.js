export const profileData = {
  name: 'Jishnu Roy',
  title: 'Full-Stack Systems, DevOps & Data Science Engineer',
  location: 'Kolkata, WB',
  phone: '+91-8172086902',
  email: 'jishnuroy200316@gmail.com',
  linkedin: 'https://linkedin.com/in/jishnu-roy-16z',
  github: 'https://github.com/Jishnu1618',
  summary:
    'OCI-certified engineer bridging distributed backend services, multi-agent generative AI pipelines, and high-availability cloud infrastructure. Proven across the full software lifecycle — from sandboxed hardware-in-the-loop automation to resilient REST API deployment and production-grade ML/DL modeling.',
  badge: 'OCI Certified · Open to Opportunities',
};

export const skillsData = {
  languages: [
    { name: 'Python', level: 95 },
    { name: 'Java', level: 88 },
    { name: 'SQL (PostgreSQL, MySQL)', level: 90 },
    { name: 'JavaScript (Node.js, React.js)', level: 85 },
    { name: 'Shell Scripting', level: 82 },
    { name: 'MATLAB', level: 78 },
    { name: 'HTML/CSS', level: 88 },
  ],
  backend: [
    { name: 'FastAPI', level: 92 },
    { name: 'RESTful APIs', level: 90 },
    { name: 'Express.js', level: 84 },
    { name: 'Pandas', level: 90 },
    { name: 'Scikit-learn', level: 90 },
    { name: 'MongoDB Atlas', level: 85 },
    { name: 'Snowflake / SnowSQL', level: 75 },
    { name: 'Vector DBs (Chroma, Pinecone)', level: 80 },
  ],
  aiSystems: [
    { name: 'GenAI Orchestration', level: 90 },
    { name: 'LangChain', level: 88 },
    { name: 'Gemini 2.5 Flash', level: 88 },
    { name: 'Ollama / Qwen2.5-Coder', level: 85 },
    { name: 'PyTorch', level: 88 },
    { name: 'TensorFlow', level: 82 },
    { name: 'OpenCV', level: 85 },
    { name: 'YOLOv5', level: 85 },
  ],
  cloudDevOps: [
    { name: 'AWS (EC2, S3, RDS Aurora)', level: 88 },
    { name: 'Oracle Cloud (OCI)', level: 90 },
    { name: 'Docker', level: 85 },
    { name: 'GitLab CI / Jenkins', level: 86 },
    { name: 'GitHub Actions', level: 84 },
    { name: 'Nginx', level: 82 },
    { name: 'Git/GitHub', level: 92 },
  ],
  methodologies: [
    { name: 'CI/CD Automation', level: 88 },
    { name: 'RBAC & ERD Modeling', level: 90 },
    { name: 'Edge Computing (Raspberry Pi)', level: 85 },
    { name: 'Hardware-in-the-Loop (HIL)', level: 84 },
    { name: 'Embedded Systems', level: 82 },
    { name: 'Agile SDLC / Jira', level: 80 },
  ],
};

export const portfolioData = [
  {
    type: 'Experience',
    title: 'Backend DevOps Cloud Engineering Intern',
    company: 'Radiant Research and Academics Pvt. Ltd.',
    location: 'Kolkata, WB',
    date: 'Jan 2026 – Present',
    description: [
      'Architected robust, secure backend microservices on AWS EC2, managing normalized ERD data modeling and high-volume relational querying using Aurora RDS (PostgreSQL) to power clinical data workflows.',
      'Engineered automated CI/CD deployment pipelines utilizing Git, GitLab CI, and Jenkins to perform automated database migrations and zero-downtime Nginx reverse proxy configurations.',
      'Built secure, stateful multi-factor authentication systems by implementing strict Role-Based Access Control (RBAC) schemas and direct Twilio API integrations.',
      'Streamlined operational monitoring by writing system diagnostics and logging automated scripts using Python and Shell scripting, ensuring high infrastructure up-time.',
    ],
    tags: ['AWS', 'PostgreSQL', 'CI/CD', 'Docker', 'Nginx', 'Python', 'RBAC'],
  },
  {
    type: 'Experience',
    title: 'AI Systems Automation Engineering Intern',
    company: 'GenAI Centre of Excellence, IEM',
    location: 'Kolkata, WB',
    date: 'Dec 2025 – Mar 2026',
    description: [
      'Co-engineered an enterprise-grade Natural Language to SQL (NL2SQL) system, connecting NLP semantic outputs to live relational databases for non-technical stakeholders.',
      'Orchestrated multi-model agent architectures integrating Gemini 2.5 Flash Cloud APIs and local deep learning SLMs (Qwen2.5-Coder) served via Ollama to maximize inference speeds.',
      'Built declarative automation pipelines utilizing LangChain for intelligent data routing, low-latency API handling, and structured JSON parsing.',
      'Designed and integrated a Human-in-the-Loop feedback mechanism to capture runtime prompt refinements and iteratively validate backend data integrity.',
    ],
    tags: ['LangChain', 'Python', 'PostgreSQL', 'FastAPI', 'GenAI Orchestration'],
  },
  {
    type: 'Experience',
    title: 'Undergraduate Research Trainee',
    company: 'IEDC, IEM',
    location: 'Kolkata, WB',
    date: 'June 2025 – Nov 2025',
    description: [
      'Developed an automated edge-based Virtual Barricading System featuring real-time Facial Recognition and Object Detection using optimized YOLOv5 and OpenCV vision structures.',
      'Deployed resource-constrained PyTorch machine learning models onto embedded hardware target layers (Raspberry Pi 4B) to minimize system processing latency.',
      'Executed comprehensive hardware-in-the-loop (HIL) performance metrics analysis to stabilize real-time edge streaming pipelines and eradicate hardware data delay loops.',
    ],
    tags: ['PyTorch', 'YOLOv5', 'OpenCV', 'Python', 'Edge Computing'],
  },
  {
    type: 'Project',
    title: 'EduAi: High-Availability Multi-Agent Assessment Platform',
    company: 'Cloud & AI Orchestration',
    date: '2025 – Present',
    description: [
      'Designed a full-stack, cooperative multi-agent platform using Next.js 15, Node.js, and Express to auto-generate and validate academic assessments against custom rubrics.',
      'Engineered an asynchronous multi-agent critique loop using a Generator Agent, Critic Agent (Bloom\'s Taxonomy compliance), and Revision Agent to refine outputs.',
      'Coded a custom High-Availability Redis Bypass Pipeline for BullMQ that intercepts Redis drops to gracefully downgrade tasks inline, preserving 100% generation availability.',
      'Deployed sandboxed runtime code execution tools to fact-check mathematical and code string outputs inside generated grading answer keys.',
      'Implemented real-time system visualization UI modules leveraging secure WebSocket connections to push granular multi-agent execution logging streams to frontend clients.',
    ],
    tags: ['JavaScript', 'Express.js', 'Docker', 'GenAI Orchestration', 'LangChain'],
  },
  {
    type: 'Project',
    title: 'AgriGuru: Real-Time Agriculture Data Ingestion Pipeline',
    company: 'Python, FastAPI, MongoDB Atlas, Docker',
    date: '2025 – Present',
    description: [
      'Engineered a resilient backend engine using FastAPI to serve RESTful endpoints managing constant real-time data ingestion streams for dynamic market Mandi price tracking.',
      'Maintained unstructured big data layouts using MongoDB Atlas to securely structure, modify, and stream high-throughput agricultural edge sensor analytical arrays.',
      'Integrated predictive data components (CNN and Random Forest models) achieving up to 98% accuracy thresholds for ongoing analytical model evaluation tasks.',
    ],
    tags: ['FastAPI', 'Python', 'MongoDB', 'Docker', 'TensorFlow', 'AWS'],
  },
  {
    type: 'Project',
    title: 'Custom UAV Control System Simulation',
    company: 'MATLAB Simulink, Embedded Control Logic',
    date: '2024',
    description: [
      'Developed a full-scale digital Unmanned Aerial Vehicle (UAV) environment using MATLAB Simulink to construct embedded system control feedback loops tracking altitude regulation metrics.',
      'Programmed automated sensor fault-recovery logic to evaluate physical hardware responses against simulated hardware-in-the-loop sequences.',
    ],
    tags: ['MATLAB', 'Embedded Systems', 'Hardware-in-the-Loop (HIL)'],
  },
  {
    type: 'Project',
    title: 'Customer Churn Statistical Analysis Pipeline',
    company: 'Python, Pandas, Scikit-learn',
    date: 'April 2025',
    description: [
      'Built automated Python pipelines utilizing Pandas to filter, clean, and run Exploratory Data Analysis (EDA) profiles over massive customer datasets to locate leading churn indicators.',
      'Trained a predictive Logistic Regression classification model that attained a 95% testing accuracy score.',
    ],
    tags: ['Python', 'Pandas', 'Scikit-learn'],
  },
];

export const educationData = [
  {
    institution: 'Institute of Engineering and Management',
    location: 'Kolkata, WB',
    degree: 'B.Tech in Electronics and Communication Engineering',
    period: '2023 – 2027',
    highlight: 'SGPA / CGPA: 8.68',
    primary: true,
  },
  {
    institution: 'Burdwan Municipal High School',
    location: 'Burdwan, WB',
    degree: 'Higher Secondary (Class XII) — WBCHSE',
    period: '2019 – 2021',
    highlight: 'Score: 93%',
    primary: false,
  },
  {
    institution: "St. Xavier's School",
    location: 'Burdwan, WB',
    degree: 'ICSE (Class X) — CISCE',
    period: '2019',
    highlight: 'Score: 94%',
    primary: false,
  },
];

export const certificationsData = [
  {
    title: '1st Prize Winner — FrostHacks 2026',
    subtitle: 'Sustainability and Green Earth Track',
    date: 'Mar 2026',
    icon: 'trophy',
    highlight: true,
  },
  {
    title: 'Global Rank 6 — Infosys Global Hackathon',
    subtitle: 'Selected into Top 30 Finals teams internationally',
    date: 'July 2025',
    icon: 'trophy',
    highlight: true,
  },
  {
    title: 'OCI 2025 Data Science Professional',
    subtitle: 'Oracle Certified Professional (1Z0-1110-25)',
    date: 'Nov 2025',
    icon: 'cpu',
    link: null,
  },
  {
    title: 'OCI 2025 Generative AI Professional',
    subtitle: 'Oracle Certified Professional (1Z0-1127-25)',
    date: 'Nov 2025',
    icon: 'chart',
    link: null,
  },
  {
    title: 'AWS Cloud Practitioner Essentials',
    subtitle: 'Coursera Validation',
    date: 'Aug 2025',
    icon: 'cloud',
    link: 'https://coursera.org/share/a7bb33ffaceae13f3ce9512d18816664',
  },
];

export const resumeText = `Jishnu Roy
+91-8172086902 | jishnuroy200316@gmail.com | linkedin.com/in/jishnu-roy-16z | github.com/Jishnu1618

Professional Summary
OCI-certified Full-Stack Systems, DevOps, and Data Science Engineer with an academic background in Electronics and Communication Engineering. Expert in architecting distributed backend services, optimizing multi-agent generative AI pipelines, and implementing high-availability cloud infrastructure. Proven track record across software engineering lifecycles, ranging from sandboxed hardware-in-the-loop (HIL) automation to resilient REST API deployment and production-grade ML/DL modeling.

Technical Skills
Programming Languages: Python, Java, SQL (PostgreSQL, MySQL), JavaScript (Node.js/Express.js, React.js), MATLAB, Shell Scripting, HTML/CSS
Backend & Data Engineering: FastAPI, RESTful APIs, Pandas, Scikit-learn, Vector DBs (Chroma, Pinecone), Big Data (MongoDB Atlas NoSQL, SnowSQL/Snowflake)
Artificial Intelligence & Systems: GenAI Orchestration, LangChain, Large Language Models (Gemini 2.5 Flash, Qwen2.5-Coder), Ollama SLM serving, PyTorch, TensorFlow, OpenCV, YOLOv5 Computer Vision
Cloud & DevOps Infrastructure: AWS (EC2, S3, RDS Aurora, IAM), Oracle Cloud Infrastructure (OCI), CI/CD Automation (GitLab CI, Jenkins, GitHub Actions), Docker Containerization, Nginx Reverse Proxies
Domain & Engineering Methodologies: Embedded Systems Integration, Edge Computing (Raspberry Pi 4B), Hardware-in-the-Loop (HIL) Automation, Object-Oriented Programming (OOP), Normalized ERD Modeling, Role-Based Access Control (RBAC), Agile SDLC, Jira

Experience
Backend DevOps Cloud Engineering Intern | Jan 2026 - Present
Radiant Research and Academics Pvt. Ltd. | Kolkata, WB
- Architected robust, secure backend microservices on AWS EC2, managing normalized ERD data modeling and high-volume relational querying using Aurora RDS (PostgreSQL).
- Engineered automated CI/CD deployment pipelines utilizing Git, GitLab CI, and Jenkins for automated database migrations and zero-downtime Nginx reverse proxy configurations.
- Built secure, stateful multi-factor authentication systems with strict RBAC schemas and Twilio API integrations.
- Streamlined operational monitoring with Python and Shell scripting diagnostics, ensuring high infrastructure up-time.

AI Systems Automation Engineering Intern | Dec 2025 - Mar 2026
GenAI Centre of Excellence, IEM | Kolkata, WB
- Co-engineered an enterprise-grade Natural Language to SQL (NL2SQL) system connecting NLP outputs to live relational databases.
- Orchestrated multi-model agent architectures integrating Gemini 2.5 Flash and Qwen2.5-Coder via Ollama.
- Built declarative automation pipelines utilizing LangChain for intelligent data routing and structured JSON parsing.
- Designed Human-in-the-Loop feedback mechanism for runtime prompt refinements and data integrity validation.

Undergraduate Research Trainee | June 2025 - Nov 2025
IEDC, IEM | Kolkata, WB
- Developed edge-based Virtual Barricading System with Facial Recognition and Object Detection using YOLOv5 and OpenCV.
- Deployed PyTorch models onto Raspberry Pi 4B for low-latency edge inference.
- Executed hardware-in-the-loop (HIL) performance analysis to stabilize real-time edge streaming pipelines.

Projects
EduAi: High-Availability Multi-Agent Assessment Platform | Next.js 15, Node.js, Express
- Multi-agent platform auto-generating academic assessments with Generator, Critic, and Revision agents.
- Custom Redis Bypass Pipeline for BullMQ preserving 100% generation availability.
- Sandboxed runtime code execution and WebSocket-based multi-agent logging UI.

AgriGuru: Real-Time Agriculture Data Ingestion Pipeline | FastAPI, MongoDB Atlas, Docker
- FastAPI RESTful endpoints for real-time Mandi price tracking and agricultural sensor data.
- CNN and Random Forest models achieving up to 98% accuracy.

Custom UAV Control System Simulation | MATLAB Simulink
- Digital UAV environment with embedded control feedback loops and sensor fault-recovery logic.

Customer Churn Statistical Analysis Pipeline | Python, Pandas, Scikit-learn
- EDA pipelines and Logistic Regression model with 95% testing accuracy.

Education
Institute of Engineering and Management | B.Tech ECE (SGPA: 8.68) | 2023 - 2027
Burdwan Municipal High School | Class XII WBCHSE (93%) | 2019 - 2021
St. Xavier's School | ICSE Class X CISCE (94%) | 2019

Certifications & Awards
- 1st Prize Winner: FrostHacks 2026 (Sustainability and Green Earth Track) | Mar 2026
- Global Rank 6: Infosys Global Hackathon (Top 30 Finals) | July 2025
- Oracle Certified Professional: OCI 2025 Data Science Professional (1Z0-1110-25) | Nov 2025
- Oracle Certified Professional: OCI 2025 Generative AI Professional (1Z0-1127-25) | Nov 2025
- AWS Cloud Practitioner Essentials (Coursera) | Aug 2025`;
