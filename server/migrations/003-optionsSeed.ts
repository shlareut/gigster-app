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
  {
    id: 4,
    name: 'Server',
    price: 12.75,
    currency: 'EUR',
    description:
      'Are you passionate about providing exceptional hospitality and creating memorable experiences for guests? Join our team as a Server at our vibrant brewpub! As a Server, you will play a key role in delivering outstanding service and showcasing our unique selection of craft brews and culinary delights to our diverse clientele.',
    listing_id: 4,
  },
  {
    id: 5,
    name: 'Kitchen Assistant',
    price: 9.5,
    currency: 'EUR',
    description:
      'Are you passionate about food and eager to contribute to a dynamic kitchen environment? Join our team as a Kitchen Assistant at our bustling brewpub, where you will play a vital role in ensuring the smooth operation of our kitchen and the delivery of delicious, high-quality burgers and other culinary delights to our guests.',
    listing_id: 4,
  },
  {
    id: 6,
    name: 'Chef',
    price: 16.5,
    currency: 'EUR',
    description:
      'Are you enthusiastic about culinary arts and keen to make a significant impact in a vibrant kitchen atmosphere? Embrace the opportunity to become a valuable Kitchen Assistant within our lively brewpub setting. Here, you will be instrumental in maintaining kitchen efficiency and crafting delectable, gourmet burgers and assorted culinary creations for our esteemed patrons. Join us in delivering an exceptional dining experience!',
    listing_id: 4,
  },
  {
    id: 7,
    name: 'Server',
    price: 11.5,
    currency: 'EUR',
    description:
      'Are you passionate about providing exceptional hospitality and creating memorable experiences for guests? Join our team as a Server at our vibrant brewpub! As a Server, you will play a key role in delivering outstanding service and showcasing our unique selection of craft brews and culinary delights to our diverse clientele.',
    listing_id: 5,
  },
  {
    id: 8,
    name: 'Beer Sommelier',
    price: 21.5,
    currency: 'EUR',
    description:
      'Are you passionate about beer and eager to contribute to a dynamic craft beer bar environment? Join our team as a Beer Sommelier, where you will play a vital role in curating an exceptional beer selection and providing expert guidance to our guests. Embrace the opportunity to showcase your knowledge and passion for beer, elevating the overall dining experience for our patrons. Join us in delivering outstanding service and fostering a culture of beer appreciation!',
    listing_id: 6,
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
