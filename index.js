const express = require("express");
const app = express();
app.use(express.json());

// object to store about me information
let aboutMe = {
  summary: "Sifiso dedicated Software Engineer with proven experiencedelivering real-world systems, strong problem-solving skills,and recognised for collaboration, adaptability, and leadership,with a passion for football and entertainment",
  languages: ["JavaScript", "C#", "Java"],
  frameworks: ["React", "Spring Boot", "ASP.NET"],
  certifications: ["AWS Cloud Foundations"],
  education: "Diploma Computer Science",
  experience: "Internship at Investhood IT",
  projects: ["Student Portal", "Virtual ID", "Panel beater website"]
};

// Creating routes
app.get("/fetch/about", (req, res) => {
  res.json(aboutMe);
});

app.post("/create/about", (req, res) => {
  aboutMe = { ...aboutMe, ...req.body }; 
  res.json({ message: "Profile updated successfully", aboutMe });
});

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
