<div align="center">

### 🚀 IntelAi - Backend

</div>



<div align="center">
  <p align="center">
    <b>Powerful, scalable backend for the AI Chat application with robust API endpoints and AI integration</b>
  </p><p align="center">
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#implementation">Implementation</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#contributing">Contributing</a> •
    <a href="#contact">Contact</a>
  </p><div align="center">
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express.js" />
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  </div>
</div><br />

## 🌟 Introduction

The AI Chat App Backend is a robust, scalable server-side application that powers the AI Chat platform. Built with Node.js and Express, it provides secure API endpoints, handles authentication, manages database operations, and integrates with AI services to deliver intelligent responses. The backend is designed with performance, security, and scalability in mind, ensuring a smooth experience for users of the AI Chat application.

<div align="center">
  <a href="https://v0-replicate-ai-chat-app.vercel.app/">
    <img src="https://res.cloudinary.com/di4jbsdwo/image/upload/v1747508912/Screenshot_2025-05-18_003353_dbu9oc.png" alt="AI Chat App Demo" width="80" height="80" />
  </a>
</div>

## ✨ Features

<div id="features"></div>
<div class="features-grid">
  <div class="feature-card">
    <h3>🔒 Secure Authentication</h3>
    <p>JWT-based authentication with refresh tokens and secure password handling</p>
  </div><div class="feature-card">
    <h3>🤖 AI Integration</h3>
    <p>Seamless integration with multiple AI models via the AI SDK</p>
  </div><div class="feature-card">
    <h3>📊 Data Management</h3>
    <p>Efficient MongoDB database operations with optimized queries</p>
  </div><div class="feature-card">
    <h3>🔄 Real-time Capabilities</h3>
    <p>WebSocket support for real-time chat functionality</p>
  </div><div class="feature-card">
    <h3>📧 Email Services</h3>
    <p>Transactional email system for verification and notifications</p>
  </div><div class="feature-card">
    <h3>🛡️ Rate Limiting</h3>
    <p>Advanced rate limiting to prevent abuse and ensure fair usage</p>
  </div><div class="feature-card">
    <h3>📝 Logging & Monitoring</h3>
    <p>Comprehensive logging and performance monitoring</p>
  </div><div class="feature-card">
    <h3>🔍 API Documentation</h3>
    <p>Auto-generated API documentation with Swagger</p>
  </div>
</div>

<div id="tech-stack"></div>

## 🛠️ Tech Stack

<div class="tech-grid">
  <div class="tech-card" data-tech="nodejs">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" alt="Node.js" width="60" height="60" />
    <h3>Node.js</h3>
    <p>JavaScript runtime</p>
  </div> <div class="tech-card" data-tech="express">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original.svg" alt="Express" width="60" height="60" />
    <h3>Express</h3>
    <p>Web framework</p>
  </div><div class="tech-card" data-tech="typescript">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" width="60" height="60" />
    <h3>TypeScript</h3>
    <p>Type-safe JavaScript</p>
  </div> <div class="tech-card" data-tech="mongodb">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg" alt="MongoDB" width="60" height="60" />
    <h3>MongoDB</h3>
    <p>NoSQL database</p>
  </div><div class="tech-card" data-tech="redis">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg" alt="Redis" width="60" height="60" />
    <h3>Redis</h3>
    <p>In-memory data store</p>
  </div><div class="tech-card" data-tech="socket">
    <img src="https://cdn.worldvectorlogo.com/logos/socket-io.svg" alt="Socket.IO" width="60" height="60" />
    <h3>Socket.IO</h3>
    <p>Real-time communication</p>
  </div><div class="tech-card" data-tech="jest">
    <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="Jest" width="60" height="60" />
    <h3>Jest</h3>
    <p>Testing framework</p>
  </div> <div class="tech-card" data-tech="docker">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg" alt="Docker" width="60" height="60" />
    <h3>Docker</h3>
    <p>Containerization</p>
  </div>
</div>



<div id="implementation"></div>

## 🔍 Implementation

The AI Chat App Backend includes the following key implementations:

### 🔐 Authentication System

- JWT-based authentication with access and refresh tokens
- Secure password hashing with bcrypt
- Email verification flow
- Password reset functionality
- OAuth integration for social logins


### 🤖 AI Integration

- Integration with AI SDK for natural language processing
- Multiple AI model support (GPT-4, Gemini, etc.)
- Context management for multi-turn conversations
- Streaming responses for real-time interaction
- Rate limiting and usage tracking


### 📊 Database Architecture

- MongoDB schemas with Mongoose ODM
- Efficient indexing for optimized queries
- Data validation and sanitization
- Caching layer with Redis for improved performance
- Transaction support for data integrity


### 🔄 Real-time Communication

- WebSocket implementation with Socket.IO
- Event-based architecture for real-time updates
- Presence indicators (typing, online status)
- Message delivery confirmation
- Connection state management


### 📧 Email Service

- Transactional email system
- Templated emails for verification, password reset, etc.
- Email queue with retry mechanism
- Email delivery tracking


### 🛡️ Security Features

- CORS configuration
- Helmet.js for HTTP headers security
- Rate limiting middleware
- Input validation and sanitization
- XSS and CSRF protection

<div id="getting-started"></div>

## 🚀 Getting Started

Follow these steps to set up the backend project locally:

### Prerequisites

- Node.js 18.x or later
- MongoDB
- Redis (optional, for caching)
- npm or yarn
- Git


### Installation

1. Clone the repository:

```shellscript
git clone https://github.com/yourusername/ai-chat-app-backend.git
cd backend
```


2. Install dependencies:

```shellscript
npm install
# or
yarn install
```


3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:

```plaintext
# Server
PORT=8000

# Database
MONGODB_URL=your mongodb url

# Authentication
JWT_SECRET=your_jwt_secret


```





4. Run the development server:

```shellscript
npm start
# or
yarn dev
```


6. The server will be running at [http://localhost:8000](http://localhost:8000)

<div id="contributing"></div>

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute to the project:

### Creating Issues

1. Go to the [Issues](https://github.com/yourusername/ai-chat-app-backend/issues) tab on GitHub
2. Click on "New Issue"
3. Choose the appropriate issue template
4. Fill in the required information
5. Submit the issue


### Solving Issues

1. Find an issue you'd like to work on
2. Comment on the issue to express your interest
3. Fork the repository
4. Create a new branch:

```shellscript
git checkout -b feature/your-feature-name
```


5. Make your changes
6. Run tests:

```shellscript
npm test
```


7. Commit your changes:

```shellscript
git commit -m "feat: add your feature description"
```


8. Push to your branch:

```shellscript
git push origin feature/your-feature-name
```


9. Create a Pull Request


### Pull Request Guidelines

- Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification
- Ensure your code passes all tests
- Add tests for new features
- Update documentation if necessary
- Make sure your code follows the project's coding standards


<div id="contact"></div>

## 📞 Contact

`<div class="contact-card">
  <img src="https://github.com/Siser-Pratap.png" alt="Developer Avatar" width="100" height="100" class="avatar" />
  <div class="contact-info">
    <h3>Siser Pratap</h3>
    <p>Full Stack Developer</p>
    <div class="social-links">
      <a href="https://github.com/Siser-Pratap" target="_blank">
        <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
      </a>
      <a href="https://linkedin.com/in/siser" target="_blank">
        <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
      </a>
      <a href="https://x.com/PratapSiser" target="_blank">
        <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" />
      </a>
    </div>
    <a href="mailto:siserinsevoc@gmail.com" class="email-button">
      📧 Email Me
    </a>
  </div>
</div>

---

<div align="center">
  <p>Made with ❤️ by Siser Pratap</p>
  <p>© 2025 IntelAi Backend. All rights reserved.</p>
</div>
