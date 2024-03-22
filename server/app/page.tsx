import { CronJob } from 'cron';

export default function HomeScreen() {
  // should introduce a new field "offer timestamp" on the booking level // can run a cron here and check for this field
  // const job = new CronJob(
  //   '* * * * * *', // cronTime
  //   function () {
  //     console.log('You will see this message every second');
  //   }, // onTick
  //   null, // onComplete
  //   true, // start
  //   'America/Los_Angeles', // timeZone
  // );
  return (
    <>
      <div>
        <div>ADMIN DASHBOARD</div>
      </div>
    </>
  );
}
