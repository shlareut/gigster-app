import { Sql } from 'postgres';

const seedOptions = [
  {
    id: 1,
    name: 'Bartender',
    price: 10.5,
    currency: 'EUR',
    description:
      'Are you passionate about craft beer and creating memorable experiences for customers? Join our team as a Bartender at our bustling brewpub! As a Bartender, you will play a vital role in delivering exceptional service and showcasing our unique selection of craft brews to our diverse clientele.',
    listing_id: 1,
  },
  {
    id: 2,
    name: 'Server',
    price: 14.5,
    currency: 'EUR',
    description:
      'Are you passionate about providing exceptional hospitality and creating memorable experiences for guests? Join our team as a Server at our vibrant brewpub! As a Server, you will play a key role in delivering outstanding service and showcasing our unique selection of craft brews and culinary delights to our diverse clientele.',
    listing_id: 2,
  },
  {
    id: 3,
    name: 'Kitchen Assistant',
    price: 8.5,
    currency: 'EUR',
    description:
      'Are you passionate about food and eager to contribute to a dynamic kitchen environment? Join our team as a Kitchen Assistant at our bustling brewpub, where you will play a vital role in ensuring the smooth operation of our kitchen and the delivery of delicious, high-quality burgers and other culinary delights to our guests.',
    listing_id: 2,
  },
];

export async function up(sql: Sql) {
  for (const item of seedOptions) {
    await sql`
      INSERT INTO
        options (
          name,
          price,
          currency,
          description,
          listing_id
        )
      VALUES
        (
          ${item.name},
          ${item.price},
          ${item.currency},
          ${item.description},
          ${item.listing_id}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const item of seedOptions) {
    await sql`
      DELETE FROM options
      WHERE
        id = ${item.id}
    `;
  }
}
