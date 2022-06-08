/**
 * @module 7-job_creator
 */
import { createQueue } from 'kue';

/* eslint camelcase: 0 */

// Create a jobs array
const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account',
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account',
  },
];

// Create a kue instance (pun intended)
const push_notification_code_2 = createQueue();

// Create all jobs
jobs.forEach((job) => {
  // Create job
  const newJob = push_notification_code_2
    .create('notification', job)
    .save((err) => {
      // Log error message if job can't be saved
      if (err) console.error(`Notification job ${newJob.id} failed: ${err}`);
      // Log message if job save was successful
      else console.log(`Notification job created: ${newJob.id}`);
    })
    // Log message when job has completed
    .on('complete', () => {
      console.log(`Notificationn job ${newJob.id} completed`);
    })
    // Log error message when job failed
    .on('failed', (err) => {
      console.error(`Notification job ${newJob.id} failed: ${err}`);
    })
    // Log the progress of the job
    /* eslint no-unused-vars: ["error", {"args": "none"}] */
    .on('progress', (progress, _) => {
      console.log(`Notification job ${newJob.id} ${progress}% complete`);
    });
});
