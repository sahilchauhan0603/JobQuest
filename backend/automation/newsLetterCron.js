import cron from "node-cron";
import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

export const newsLetterCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running Cron Automation");
    const jobs = await Job.find({ newsLettersSent: false });
    for (const job of jobs) {
      try {
        const filteredUsers = await User.find({
          $or: [
            { "niches.firstNiche": job.jobNiche },
            { "niches.secondNiche": job.jobNiche },
            { "niches.thirdNiche": job.jobNiche },
          ],
        });
        for (const user of filteredUsers) {
          const subject = `Hot Job Alert: ${job.title} in ${job.jobNiche} Available Now`;
          const message = `Hi ${user.name},\n\nGreat news! A new job that fits your niche has just been 
          posted. The position is for a ${job.title} with ${job.companyName}, and they are looking to hire 
          immediately.\n\nJob Details:\n- **Position:** ${job.title}\n- **Company:** ${job.companyName}\n- 
          **Location:** ${job.location}\n- **Salary:** ${job.salary}\n\nDon’t wait too long! Job openings 
          like these are filled quickly. \n\nWe’re here to support you in your job search. Best of 
          luck!\n\nBest Regards,\nNicheNest Team`;
          sendEmail({
            email: user.email,
            subject,
            message,
          });
        }
        job.newsLettersSent = true;
        await job.save();
      } catch (error) {
        console.log("ERROR IN NODE CRON CATCH BLOCK");
        return next(console.error(error || "Some error in Cron."));
      }
    }
  });
};

/*
Explanation:
- This file uses node-cron library to schedule a task that runs every minute.
- It finds all jobs in the database where newsletters have not been sent (newsLettersSent: false).
- For each job, it finds users whose niche matches the job's niche (first, second, or third niche).
- For each matching user, it sends an email with job details using the sendEmail utility.
- After sending emails for a job, it marks newsLettersSent as true to avoid duplicate notifications.
- If any error occurs, it is logged in the catch block.
- This automation ensures users are notified in real time about new job postings that match their interests, without manual intervention.
*/
