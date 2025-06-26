# Real-Time Application Tracking & Automated Email Notifications

This document explains the implementation of real-time application tracking and automated email notifications in the JobQuest project.

---

## Tech Stack & Rationale

- **ReactJS (Frontend):**
  - Chosen for its component-based architecture, fast rendering with the virtual DOM, and strong ecosystem for building interactive user interfaces.
- **Node.js & ExpressJS (Backend):**
  - Selected for their non-blocking, event-driven architecture, which is ideal for handling multiple simultaneous requests efficiently. ExpressJS simplifies API development and routing.
- **MongoDB (Database):**
  - Used for its flexible schema design, scalability, and seamless integration with JavaScript/Node.js, making it suitable for rapidly evolving application requirements.
- **Nodemailer (Email Utility):**
  - Enables easy integration of automated email notifications using SMTP, supporting user engagement and communication.

This tech stack was chosen to ensure rapid development, scalability, and maintainability, while providing a seamless experience for both job seekers and employers.

---

## Project Flow

1. **User Registration & Login:**
   - Users (job seekers and employers) register and log in to the platform.
2. **Job Posting:**
   - Employers post jobs using the web interface. Job data is stored in MongoDB.
3. **Job Search & Application:**
   - Job seekers browse and search for jobs, then submit applications. Applications are saved in the database.
4. **Application Tracking:**
   - Both job seekers and employers can view the status of applications in real time via their dashboards.
5. **Automated Notifications:**
   - When an application is submitted or updated, the backend can trigger email notifications to users.

---

## Project Architecture

- **Frontend:**
  - Built with ReactJS (located in `frontend/`). Handles user interface, API calls, and state management.
- **Backend:**
  - Node.js with ExpressJS (located in `backend/`). Provides RESTful APIs for authentication, job management, application tracking, and notifications.
- **Database:**
  - MongoDB for storing users, jobs, and applications.
- **Utilities:**
  - Email sending handled by Nodemailer (`backend/utils/sendEmail.js`).
- **Folder Structure Highlights:**
  - `backend/controllers/`: Business logic for jobs, applications, and users.
  - `backend/models/`: Mongoose schemas for MongoDB collections.
  - `backend/routes/`: API route definitions.
  - `frontend/src/pages/`: Main React pages for user interaction.

---

## 1. Real-Time Application Tracking

### Overview
JobQuest allows job seekers and employers to track job applications in real time. This is achieved by storing application data in MongoDB and providing API endpoints for both job seekers and employers to fetch the latest application statuses.

### Backend Implementation
- **Model:**
  - `models/applicationSchema.js` defines the structure for job applications, including job seeker info, employer info, job details, and deletion flags.
- **Controllers:**
  - `controllers/applicationController.js` contains:
    - `postApplication`: Handles new job applications and saves them to the database.
    - `employerGetAllApplication`: Allows employers to fetch all applications for their jobs.
    - `jobSeekerGetAllApplication`: Allows job seekers to fetch all their applications.
    - `deleteApplication`: Handles deletion of applications by either party.
- **Routes:**
  - `routes/applicationRouter.js` exposes endpoints for the above controller functions.

### Frontend Implementation
- The React frontend calls the above endpoints to fetch and display the latest application data for users, updating the UI whenever the user navigates to their dashboard or refreshes the page.

---

## 2. Automated Email Notifications

### Overview
Automated email notifications inform users about important events, such as successful application submissions or status updates.

### Email Utility
- **File:** `utils/sendEmail.js`
- **Function:** `sendEmail({ email, subject, message })` - The function takes an object with email, subject, and message and sends an email to the specified address.
  - The sendEmail function in sendEmail.js uses Nodemailer to send emails. It is set up to use SMTP credentials from environment variables.

### Integration Points
- To send notifications, call `sendEmail` in controller functions after key events, such as:
  - After a successful application submission (`postApplication`)
  - After an application status update (if implemented)

#### Example Usage in Controller
```js
import { sendEmail } from '../utils/sendEmail.js';

// After creating an application
await sendEmail({
  email: jobSeekerInfo.email,
  subject: 'Application Submitted',
  message: `Your application for ${jobInfo.jobTitle} has been received.`
});
```

### Environment Variables Required
- `SMTP_HOST`
- `SMTP_SERVICE`
- `SMTP_PORT`
- `SMTP_MAIL`
- `SMTP_PASSWORD`

---

## Future Enhancements

- **Personalized Job Recommendations:**
  - Implement algorithms to suggest jobs based on user profiles, skills, and application history.
- **WebSocket Integration:**
  - Use WebSockets for instant, push-based updates to the frontend for application status changes.
- **Admin Dashboard:**
  - Add an admin panel for platform management and analytics.
- **Advanced Analytics:**
  - Provide insights to employers and job seekers (e.g., application trends, job market stats).
- **Mobile App:**
  - Develop a mobile version for broader accessibility.
- **Enhanced Security:**
  - Add two-factor authentication and advanced user verification.

---

## 3. Summary
- **Real-time tracking** is achieved by storing application data in MongoDB and exposing endpoints for fetching the latest data.
- **Automated email notifications** are enabled via a utility function and can be triggered from controller logic after key events.

For further customization, add more notification triggers or enhance the frontend to use WebSockets for instant updates.
