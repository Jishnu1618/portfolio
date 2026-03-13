export const skillsData = {
  languages: [
      { name: 'Java', level: 90 },
      { name: 'Python', level: 95 },
      { name: 'SQL (MySQL/PostgreSQL)', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'MATLAB', level: 75 }
  ],
  frameworks: [
      { name: 'FastAPI', level: 90 },
      { name: 'PyTorch', level: 85 },
      { name: 'TensorFlow', level: 80 },
      { name: 'Scikit-learn', level: 90 },
      { name: 'YOLO', level: 80 },
      { name: 'OpenCV', level: 80 },
      { name: 'React.js', level: 75 }
  ],
  tools: [
      { name: 'Git/GitHub', level: 90 },
      { name: 'AWS', level: 80 },
      { name: 'OCI', level: 75 },
      { name: 'VS Code', level: 90 },
      { name: 'Postman', level: 85 },
      { name: 'Roboflow', level: 80 }
  ],
};

export const portfolioData = [
  {
      type: 'Experience',
      title: 'Junior Software Developer',
      company: 'Radiant Research and Academics Pvt. Ltd.',
      date: 'Jan 2026 - Present',
      description: [
          'Architecting a scalable Hospital ERP system utilizing a modular microservices architecture to manage end-to-end clinical, billing, and inventory workflows.',
          'Designed normalized ERD and UML models with Role-Based Access Control (RBAC) to ensure secure data handling for high-volume hospital operations.',
          'Optimized PostgreSQL/MySQL database queries, reducing report generation latency by 40%.'
      ],
      tags: ['Java', 'Microservices', 'PostgreSQL', 'MySQL', 'ERP']
  },
  {
      type: 'Experience',
      title: 'Undergraduate Research Trainee',
      company: 'IEDC, IEM',
      date: 'June 2025 - Nov 2025',
      description: [
          'Developed a Virtual Barricading System integrating Facial Recognition and Object Detection using YOLOv5 and OpenCV.',
          'Curated and annotated a custom dataset via Roboflow to enhance model precision in varying lighting.',
          'Deployed optimized PyTorch models on Raspberry Pi 4B, achieving real-time inference suitable for edge security.'
      ],
      tags: ['PyTorch', 'YOLO', 'OpenCV', 'Roboflow', 'Python']
  },
  {
      type: 'Project',
      title: 'AgriGuru',
      company: 'Personal Project',
      date: 'July 2025 - Present',
      description: [
          'Engineered a full-stack AI application serving RESTful APIs via FastAPI for crop prediction, disease detection, and real-time Mandi price updates.',
          'Integrated ML models: a CNN (92% accuracy) for plant disease detection and a Scikit-learn Random Forest model (98% accuracy) for crop recommendations.',
          'Utilized MongoDB Atlas for scalable NoSQL cloud storage and deployed backend services on AWS.'
      ],
      tags: ['FastAPI', 'Python', 'MongoDB', 'TensorFlow', 'Scikit-learn', 'AWS']
  },
  {
      type: 'Project',
      title: 'Customer Churn Prediction',
      company: 'Personal Project',
      date: 'April 2025',
      description: [
          'Conducted Exploratory Data Analysis (EDA) to identify key churn indicators and trained a Logistic Regression model, achieving 95% accuracy on the test set.'
      ],
      tags: ['Python', 'Pandas', 'Scikit-learn', 'Data Analysis']
  }
];

export const resumeText = `Jishnu Roy
+91-8172086902 | jishnuroy200316@gmail.com | linkedin.com/in/jishnu-roy-16z | github.com/Jishnu1618

Professional Summary
Innovative Electronics & Communication undergraduate bridging hardware and software domains with expertise in Full-Stack AI (FastAPI/React) and Edge Computing. Proven track record of architecting scalable ERP solutions and deploying real-time ML models, passionate about solving complex challenges.

Education
Institute of Engineering and Management | Kolkata, WB
B.Tech in Electronics and Communication Engineering (SGPA: 8.68) | 2023 - 2027

Experience
Junior Software Developer | Jan 2026 - Present
Radiant Research and Academics Pvt. Ltd. | Kolkata, WB
- Architecting a scalable Hospital ERP system utilizing a modular microservices architecture to manage end-to-end clinical, billing, and inventory workflows.
- Designed normalized ERD and UML models with Role-Based Access Control (RBAC) to ensure secure data handling for high-volume hospital operations.
- Optimized PostgreSQL/MySQL database queries, reducing report generation latency by 40%.

Undergraduate Research Trainee | June 2025 - Nov 2025
IEDC, IEM | Kolkata, WB
- Developed a Virtual Barricading System integrating Facial Recognition and Object Detection using YOLOv5 and OpenCV.
- Curated and annotated a custom dataset via Roboflow to enhance model precision in varying lighting.
- Deployed optimized PyTorch models on Raspberry Pi 4B, achieving real-time inference suitable for edge security.

Projects
AgriGuru | FastAPI, Python, MongoDB, TensorFlow | July 2025 - Present
- Engineered a full-stack AI application serving RESTful APIs via FastAPI for crop prediction, disease detection, and real-time Mandi price updates.
- Integrated ML models: a CNN (92% accuracy) for plant disease detection and a Scikit-learn Random Forest model (98% accuracy) for crop recommendations.
- Utilized MongoDB Atlas for scalable NoSQL cloud storage and deployed backend services on AWS.

Customer Churn Prediction | Python, Pandas, Scikit-learn | April 2025
- Conducted Exploratory Data Analysis (EDA) to identify key churn indicators and trained a Logistic Regression model, achieving 95% accuracy on the test set.

Technical Skills
Languages: Java, Python, SQL (MySQL, PostgreSQL), JavaScript, HTML/CSS, MATLAB
Frameworks: FastAPI, PyTorch, TensorFlow, Scikit-learn, YOLO, OpenCV, React.js
Tools: Git/GitHub, VS Code, Roboflow, Arduino IDE, Postman, AWS, OCI

Certifications & Awards
- Oracle Cloud Infrastructure 2025 Data Science Professional (1Z0-1110-25) | Nov 2025
- Oracle Cloud Infrastructure 2025 Generative AI Professional (1Z0-1127-25) | Nov 2025
- Oracle Cloud Infrastructure 2025 AI Foundations Associate (1Z0-1122-25) | Nov 2025
- AWS Cloud Practitioner Essentials (Coursera) | Aug 2025
- Ranked 6th in Infosys Global Hackathon (Selected among top 30 teams globally) | July 2025`;
