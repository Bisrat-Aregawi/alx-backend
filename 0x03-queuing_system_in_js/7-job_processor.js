/**
 * @module 7-job_processor
 */
import kue from 'kue';

/* eslint camelcase: 0 */

// Create a kue instance (pun intended)
const push_notification_code_2 = kue.createQueue();

// Create a blacklist phone array
const blacklist = [
  '4153518780',
  '4153518781',
];

/**
 * @function sendNotification
 * @summary send notification to whitelisted numbers
 * @param {string} phoneNumber
 * @param {string} message
 * @param {kue.Job} job
 * @param {CallableFunction} done
 */
function sendNotification(phoneNumber, message, job, done) {
  job.progress(0, 100);
  if (blacklist.includes(phoneNumber)) {
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
  } else {
    job.progress(50, 100);
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    done();
  }
}

// Process two jobs
push_notification_code_2.process('notification', 2, (job, done) => {
  sendNotification(
    job.data.phoneNumber,
    job.data.message,
    job,
    done,
  );
});
