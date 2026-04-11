# Online Assessment Platform

A premium, full-stack assessment platform built with **Next.js 15**, **React 19**, and a dedicated **Express/MongoDB** backend. This project features high-fidelity UI design, rich-text support, and robust candidate tracking.

---

## Live Demo & Video
- **Live Demo**: [online-ap.vercel.app](https://online-ap.vercel.app/)
- **Video Recording**: [Google Drive Link](https://drive.google.com/file/d/1vjrA8spWmlALn5O1GJ-H4jkVI4XM-t4U/view?usp=sharing)
- **Interactive Task List**: [Google Sheet](https://docs.google.com/spreadsheets/d/1LgImX2NAMlpvjj4qxuXj3l-HP4XnQaoOyb0ErzNEyVY/edit?gid=0#gid=0)
- **Backend Repository**: [GitHub](https://github.com/iftykhar/onlineAp_backend.git)

###  Demo Credentials
| Role | Email | Password |
| :--- | :--- | :--- |
| **Examiner** | `examiner@example.com` | `password123` |
| **Candidate** | `candidate@example.com` | `password123` |

---

##  Features

###  Employer (Admin) Panel
- **Multi-Step Test Creation**: Streamlined workflow to set up basic info and question sets.
- **Rich Text Questions**: Create complex questions with links, formatting, and images.
- **Dynamic Question Sets**: Support for Radio, Checkbox, Text, and Rich Text types.
- **Candidate Overview**: Monitor total slots and candidate participation via the dashboard.

###  Candidate (Student) Panel
- **Immersive Exam Screen**: Clean, focused UI for taking tests.
- **Interactive Timer**: Real-time countdown with automatic submission on timeout.
- **Anti-Cheat System**: Integrated Tab-switch detection and behavioral tracking.
- **Premium Rich Text Answers**: Candidates can provide long-form, formatted responses.

---

##  Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS 4.
- **State Management**: Zustand.
- **Data Fetching**: TanStack React Query v5 & Axios.
- **Rich Text**: Custom Quill.js Implementation (React 19 optimized).
- **Form Handling**: React Hook Form + Zod validation.
- **Backend API**: Integrated Express.js & MongoDB (deployed separately).

---

##  Additional Questions & Solutions (Assignment Requirements)

###  MCP Integration (Model Context Protocol)
I haven’t directly worked with a formal implementation of *Model Context Protocol (MCP)* yet, but I understand it as a framework for enabling structured communication between AI models and external tools. In this project, MCP could be highly valuable:
- **Figma MCP**: Extracting design tokens/components automatically to ensure development-to-design parity.
- **Chrome DevTools MCP**: Real-time AI debugging of layout and performance issues during testing.
- **Supabase MCP**: Scaffolding backend APIs and real-time data streaming logic faster.

###  AI Tools for Development
I leverage modern AI tools to accelerate the development lifecycle:
- **Claude (Claude Code)**: For structured reasoning and understanding complex codebases.
- **ChatGPT**: Used for logic building, debugging, and drafting reusable components.
- **GitHub Copilot**: For rapid scaffolding and iterative refinements.
- **Gemini**: For quick UI experimentation and alternative logic suggestions.

###  Offline Mode Handling
To ensure a resilient candidate experience during network failures:
- **Local Persistence**: Continuously save answers to `localStorage` or `IndexedDB`.
- **Offline Detection**: Real-time monitoring of network status with clear UI feedback ("You are offline. Progress is saved locally.").
- **Auto-Sync**: Background synchronization with the server immediately upon connection restoration.
- **Client-Side Timer**: Maintaining the exam countdown using local system time to prevent time loss.

---

## Getting Started

### Prerequisites
- Node.js 18.18+
- Backend API (Ensure `.env` points to the correct endpoint)

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Configure environment:
   ```env
   NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000/api/v1
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret
   ```
4. Run locally: `npm run dev`

---

<!-- ## 🤝 Contact
- **Email**: support@akij.work
- **Helpline**: +88 011020202505 -->
