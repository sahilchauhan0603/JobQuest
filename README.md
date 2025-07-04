# JobQuest - [🌐 Live Demo](https://jobquest-n8r2.onrender.com/)

## Find the Right Job, Right Now

JobQuest is a modern, full-stack job portal that connects talented professionals with their ideal career opportunities. It features real-time application tracking, automated notifications, and a user-friendly interface for both job seekers and employers.

---

## 🌟 Project Description

JobQuest streamlines the job search and hiring process by providing:
- **Intelligent job matching** using advanced filters.
- **Real-time application tracking** for both job seekers and employers.
- **Automated email notifications** for important events.
- **Secure authentication** and role-based access.
- **Modern, responsive UI** for web and mobile devices.

---

## ⚙️ Tech Stack

| Layer      | Technology         | Why Chosen / Features                                                                 |
|------------|--------------------|--------------------------------------------------------------------------------------|
| Frontend   | ReactJS            | Component-based, fast rendering, strong ecosystem, responsive UI                      |
| State      | Redux Toolkit      | Predictable state management, easy async logic                                        |
| Styling    | CSS (custom)       | Fully customized, responsive, modern look                                            |
| Backend    | Node.js, ExpressJS | Non-blocking, scalable, RESTful APIs, easy routing                                   |
| Database   | MongoDB            | Flexible schema, scalable, integrates well with Node.js                              |
| Email      | Nodemailer         | Reliable SMTP email notifications                                                    |
| Auth       | JWT, Cookies       | Secure authentication, supports role-based access                                    |
| File Upload| express-fileupload | Easy file uploads for resumes                                                        |
| Deployment | Render             | Simple, scalable cloud deployment                                                    |

---

## 🚀 Features

### 1. Real-Time Application Tracking

- **Backend:**  
  - Applications stored in MongoDB (`models/applicationSchema.js`)
  - RESTful endpoints for job seekers and employers to fetch latest statuses (`controllers/applicationController.js`)
- **Frontend:**  
  - React dashboard updates in real time as users apply or jobs are posted.
- **Benefit:**  
  - Both employers and job seekers always see the latest application status.

### 2. Automated Email Notifications

- **Utility:**  
  - `utils/sendEmail.js` uses Nodemailer and SMTP credentials from environment variables.
- **Integration:**  
  - Triggered after key events (application submission, status update).
- **Example:**
  ```js
  await sendEmail({
    email: jobSeekerInfo.email,
    subject: 'Application Submitted',
    message: `Your application for ${jobInfo.jobTitle} has been received.`
  });
  ```
- **Benefit:**  
  - Users are instantly informed about important actions.

### 3. Secure Authentication

- **JWT-based login** with secure, HTTP-only cookies.
- **Role-based access** for job seekers and employers.

### 4. Responsive & Modern UI

- **Mobile-friendly** layouts.
- **Attractive dashboards** for both user types.
- **Web images and icons** for a professional look.

### 5. Advanced Filtering & Search

- **Filter jobs** by city, niche, and keyword.
- **Debounced search** for a smooth experience.

---

## 📁 Folder Structure

```
Job_Quest/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── ...
│   └── ...
└── README.md
```

---

## 🔑 Environment Variables Setup

Create a `.env` file in both `backend/` and `frontend/` folders.

### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=https://jobquest-backend-oaci.onrender.com/api/v1
# For local development, uncomment below:
# VITE_API_BASE_URL=http://localhost:4000/api/v1
```

### Backend (`backend/.env`)
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
COOKIE_EXPIRE=7
SMTP_HOST=smtp.example.com
SMTP_SERVICE=Gmail
SMTP_PORT=587
SMTP_MAIL=your_email@example.com
SMTP_PASSWORD=your_email_password
FRONTEND_URL=https://jobquest-n8r2.onrender.com
```

---

## 💡 Sample Interview Questions & Answers

### Q1: How does JWT authentication work in this project?
**A:**  
JWT (JSON Web Token) is generated upon successful login and sent as an HTTP-only cookie to the client. For each protected route, the backend verifies the JWT from the cookie to authenticate the user, ensuring secure, stateless sessions.

### Q2: How is real-time application tracking achieved?
**A:**  
All application data is stored in MongoDB. The frontend fetches the latest data via RESTful endpoints whenever the user navigates to their dashboard, ensuring up-to-date status without manual refresh.

### Q3: How are automated emails sent?
**A:**  
The backend uses Nodemailer. After key events (like application submission), the controller calls a utility function (`sendEmail`) that sends an email using SMTP credentials from environment variables.

### Q4: How is the frontend made responsive?
**A:**  
Custom CSS and media queries ensure that all components adapt to different screen sizes. The layout switches between sidebar and dropdown filters, and grid/list views, for desktop and mobile.

### Q5: How are roles (job seeker/employer) managed?
**A:**  
Each user has a `role` field in the database. The frontend and backend both check this field to determine access to certain routes and UI features.

### Q6: What is a Socket?
**A:**
A socket is a persistent connection between the server and client, enabling real-time, two-way communication. [Socket.IO](https://socket.io/) is a library that simplifies this in Node.js.

---

## 📈 Future Enhancements

- Personalized job recommendations using AI.
- WebSocket-based instant updates.
- Admin dashboard for analytics and management.
- Two-factor authentication for enhanced security.
- Mobile app for iOS/Android.

---

## 📧 Contact & Support

For queries, support, or business inquiries, please use the [Contact Us](https://jobquest-n8r2.onrender.com/about) page in the app.

---

## 📄 License

This project is for demonstration and educational purposes. All rights reserved © JobQuest.
