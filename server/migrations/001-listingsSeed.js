const seedListings = [
  {
    id: 1,
    name: 'Café Menta',
    type: 'Café',
    address_line_one: 'Radetzkyplatz 4',
    address_line_two: '',
    postal_code: '1030',
    city: 'Vienna',
    city_district: 'Landstraße',
    country: 'Austria',
    description: 'TestDescription',
  },
  {
    id: 2,
    name: 'Beaver Brewing Company',
    type: 'Brewpub',
    address_line_one: 'Liechtensteinstraße 69',
    address_line_two: '',
    postal_code: '1090',
    city: 'Vienna',
    city_district: 'Alsergrund',
    country: 'Austria',
    description: 'TestDescription',
  },
  {
    id: 3,
    name: 'ølhavn by Schalken',
    type: 'Brewpub',
    address_line_one: 'Leopoldsgasse 26',
    address_line_two: '',
    postal_code: '1020',
    city: 'Vienna',
    city_district: 'Leopoldstadt',
    country: 'Austria',
    description: 'TestDescription',
  },
];

export async function up(sql) {
  for (const item of seedListings) {
    await sql`
      INSERT INTO
        listings (
          name,
          type,
          address_line_one,
          address_line_two,
          postal_code,
          city,
          city_district,
          country,
          description
        )
      VALUES
        (
          ${item.name},
          ${item.type},
          ${item.address_line_one},
          ${item.address_line_two},
          ${item.postal_code},
          ${item.city},
          ${item.city_district},
          ${item.country},
          ${item.description}
        )
    `;
  }
}

export async function down(sql) {
  for (const item of seedListings) {
    await sql`
      DELETE FROM listings
      WHERE
        id = ${item.id}
    `;
  }
}
