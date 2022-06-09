/**
 * @module 6-job_creator
 */
import kue from 'kue';

/* eslint camelcase: 0 */

// Create a kue instance (pun intended)
const push_notification_code = kue.createQueue({ name: 'push_notification_node' });

// Prepare a job data object
const jobData = {
  phoneNumber: '111111111',
  message: 'Hello, World!',
};

// Create a job from jobData
const newJob = push_notification_code
  .create('notification', jobData)
  .save((err) => {
    if (err) console.err(err);
    else console.log(`Notification job created: ${newJob.id}`);
  });

// Log completion message when job completes
newJob.on('complete', () => {
  console.log('Notification job completed');
});

// Log error message when job fails
newJob.on('failed', () => {
  console.error('Notification job failed');
});
