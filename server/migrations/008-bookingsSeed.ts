import { Sql } from 'postgres';

const seedBookings = [
  {
    id: 1,
    status: 'IN_REVIEW',
    experience: 3,
    remarks: 'I am the best for this role because I am awesome.',
    user_id: 1,
    option_id: 2,
  },
  {
    id: 2,
    status: 'REJECTED',
    experience: 0,
    remarks: 'Please I need this job.',
    user_id: 1,
    option_id: 3,
  },
  {
    id: 3,
    status: 'OFFER',
    experience: 5,
    remarks: 'I have a lot of experience!',
    user_id: 1,
    option_id: 1,
  },
  {
    id: 4,
    status: 'HIRED',
    experience: 10,
    remarks: 'I can do the job blindfolded.',
    user_id: 1,
    option_id: 8,
  },
  {
    id: 5,
    status: 'CANCELLED',
    experience: 0,
    remarks: 'I need work!',
    user_id: 1,
    option_id: 6,
  },
  {
    id: 6,
    status: 'DECLINED',
    experience: 1,
    remarks: 'I need a job...',
    user_id: 1,
    option_id: 7,
  },
];

export async function up(sql: Sql) {
  for (const item of seedBookings) {
    await sql`
      INSERT INTO
        bookings (
          status,
          experience,
          remarks,
          user_id,
          option_id
        )
      VALUES
        (
          ${item.status},
          ${item.experience},
          ${item.remarks},
          ${item.user_id},
          ${item.option_id}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const item of seedBookings) {
    await sql`
      DELETE FROM bookings
      WHERE
        id = ${item.id}
    `;
  }
}
