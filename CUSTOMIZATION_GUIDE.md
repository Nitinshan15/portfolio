# Website Customization Guide - Using Your CV Information

## 📄 About Your CV
I can see your CV document (`NitinshanFredrick_CV.pdf`) and have already updated your name throughout the website. Here's how to personalize the rest of the website with your actual information:

## 🏠 HOME PAGE (index.html)

### Hero Section
**Current:** "Welcome to my personal space where I share my professional journey, learning adventures, and creative pursuits."
**To Update:** Replace with your actual professional summary/bio from your CV.

**Location in file:** Line ~45-47
```html
<p class="hero-description">
    [Replace with your professional summary from CV]
</p>
```

### About Me Cards
**Current:** Generic descriptions
**To Update:** 
1. **Professional Card:** Add your specific role/expertise
2. **Learner Card:** Add your educational background  
3. **Creative Card:** Add your actual interests and projects

**Location:** Lines ~80-110

### Statistics Section
**Current:** Sample numbers (5 projects, 3 courses, 8 skills, 12 months)
**To Update:** Replace with your actual statistics from CV
**Location:** Lines ~130-150

### Contact Information
**To Update:**
- Email address (line ~175)
- Phone number (line ~180) 
- Location (line ~185)
- Social media links (lines ~190-195)

## 💼 WORK PAGE (work.html)

### Projects Section
**To Update:** Replace sample projects with your actual work experience
**Location:** JavaScript file (`js/main.js`) - function `getProjectData()`

**Steps:**
1. Open `js/main.js`
2. Find the `getProjectData()` function (around line 200)
3. Replace each project with your actual work:
   - Project title
   - Description
   - Technologies used
   - Features/accomplishments
   - Demo/code links

### Skills Section
**To Update:** Replace skill percentages with your actual proficiency levels
**Location:** Lines ~350-420 in work.html

**Example:**
```html
<div class="skill-item">
    <span>[Your Skill Name]</span>
    <div class="skill-bar">
        <div class="skill-progress" data-width="[Your Proficiency %]"></div>
    </div>
</div>
```

## 📚 STUDY PAGE (study.html)

### Current Learning Section
**To Update:** Replace with courses you're currently taking
**Location:** Lines ~80-120

### Completed Courses
**To Update:** Add your actual educational background and certifications
**Location:** Lines ~130-300

### Certifications
**To Update:** Add your real certifications from CV
**Location:** Lines ~310-350

## 📝 Quick Customization Steps

### Step 1: Extract Information from Your CV
Open your CV and note down:
- [ ] Professional summary/bio
- [ ] Work experience and projects
- [ ] Technical skills and proficiency levels
- [ ] Education and certifications
- [ ] Contact information

### Step 2: Update Contact Information
1. Open `index.html`
2. Find the contact section (around line 170)
3. Update:
   - Email address
   - Phone number
   - Location
   - Social media links

### Step 3: Update Professional Content
1. **Work Projects**: Edit `js/main.js` → `getProjectData()` function
2. **Skills**: Edit skill percentages in `work.html`
3. **Education**: Edit course information in `study.html`

### Step 4: Personalize Descriptions
Replace generic descriptions with your specific information:
- Hero section description
- About me cards content
- Professional summary

### Step 5: Update Statistics
Replace sample numbers with your actual metrics:
- Years of experience
- Number of projects
- Certifications earned
- Skills acquired

## 🎯 Priority Updates (Most Important)

1. **Contact Information** - Replace placeholder contact details
2. **Professional Summary** - Update hero section with your bio
3. **Work Projects** - Replace sample projects with your actual work
4. **Skills Section** - Update with your real technical skills
5. **Education** - Add your actual educational background

## 📁 Files to Modify

### HTML Files (Content Updates)
- `index.html` - Contact info, bio, statistics
- `work.html` - Skills section, project descriptions
- `study.html` - Education, courses, certifications
### JavaScript File (Data Updates)
- `js/main.js` - Project data, statistics

### CSS File (Style Customization)
- `css/style.css` - Colors, fonts, layout (optional)

## 🚀 Testing Your Changes

After making updates:
1. Save all files
2. Refresh your browser at `http://localhost:8000`
3. Test all pages and interactive features
4. Verify responsive design on mobile

## 💡 Tips

- Keep project descriptions concise but informative
- Use action words for accomplishments
- Include relevant technologies and tools
- Add links to live projects or repositories
- Ensure all contact information is current
- Use professional but personable language

Would you like me to help you update any specific section with information from your CV? You can share the relevant details, and I'll help implement them in the website.