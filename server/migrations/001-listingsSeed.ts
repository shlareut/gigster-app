import { Sql } from 'postgres';

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
    lat: 48.21130656,
    long: 16.39042731,
    nearest_station: 'Radetzkyplatz',
    nearest_station_meter_distance: 30,
    description:
      'Erstes cooles Lokal im Weißgerber-Grätzel mit viel Frühstück; interessante Karte mit mediterranen Gerichten (Mo–Fr 4 MM zwischen € 10,– und € 13,–; auch vegetarisch € 8,90); Cocktails. Schanigarten für 75 Pers.',
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
    lat: 48.22491474476036,
    long: 16.356946042379995,
    nearest_station: 'Nußdorfer Straße/Alserbachstraße',
    nearest_station_meter_distance: 151,
    description:
      'Eigene Brauerei in der 3 reguläre und 6 Spezialbiere je nach Saison gebraut werden, darunter Lager, Pils, Weizen, IPA, Pale Ale, Stout, Porter, Sauerbiere und fassgereifte Starkbiere. Amerikanische Küche, herzhaftes BBQ aus dem eigenen Smoker (Spareribs, Pulled Pork, Pastrami, Wings), Burger, Salate, vegane Speisen, Monatsburger; Bier auch in Flaschen zum Mitnehmen, verschiedene Cider, regionale Weine und Limonaden, Säfte, Schnäpse. Kindersessel. Partykeller für bis zu 40 Pers. mit eigener Bar. Schanigarten für 40 Pers.',
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
    lat: 48.21860683321751,
    long: 16.377058744203392,
    nearest_station: 'Taborstraße U',
    nearest_station_meter_distance: 282,
    description:
      'Beisl mit Fass- und Flaschenbieren der eigenen Wiener Craftbrauerei.',
  },
  {
    id: 4,
    name: '7Stern Bräu',
    type: 'Brewery',
    address_line_one: 'Siebensterngasse 19',
    address_line_two: '',
    postal_code: '1070',
    city: 'Vienna',
    city_district: 'Neubau',
    country: 'Austria',
    lat: 48.20235889297601,
    long: 16.35357237303697,
    nearest_station: 'Stiftgasse',
    nearest_station_meter_distance: 48,
    description:
      'Rustikales Brauhaus mit herzhaften regionalen Snacks und Mahlzeiten, eigenem Bier und österreichischen Weinen.',
  },
  {
    id: 5,
    name: 'Bierteufl',
    type: 'Restaurant',
    address_line_one: 'Ungargasse 5',
    address_line_two: '',
    postal_code: '1030',
    city: 'Vienna',
    city_district: 'Landstraße',
    country: 'Austria',
    lat: 48.2038405365167,
    long: 16.386109744223795,
    nearest_station: 'Sechskrügelgasse',
    nearest_station_meter_distance: 173,
    description:
      'Rustikales Lokal mit österreichischer Küche, wechselnde Spezialitätenkarte (Mo–Fr 11–14 2 MM € 9,40 und € 9,90; Fr Fischmenü € 10,90/11–14 Tagesschnitzel € 10,90), Spezialität des Hauses: Pfandlgerichte; 80 Biersorten, 2 Hausbiere, 12 Fassbiere. 2 Kindersessel. Leinwand für Sportübertragungen. Schanigarten für 60 Pers.',
  },
  {
    id: 6,
    name: 'Ammutsøn Craft Beer Dive',
    type: 'Bar',
    address_line_one: 'Barnabitengasse 10',
    address_line_two: '',
    postal_code: '1060',
    city: 'Vienna',
    city_district: 'Mariahilf',
    country: 'Austria',
    lat: 48.19871229916328,
    long: 16.35403380188345,
    nearest_station: 'Neubaugasse U',
    nearest_station_meter_distance: 289,
    description:
      'Bierbar; wechselndes Angebot an internationalen Craft-Bieren von unabhängigen Brauereien; 12 offene Biere, an einem Monitor sieht man, welche Sorten angezapft sind; mehr als 80 Lambic-Flaschenbiere. Chili con Carne, Quiche und weitere kleine Speisen. Mi Pub-Quiz. Gastgarten in der verkehrsberuhigten Barnabitengasse.',
  },
];

export async function up(sql: Sql) {
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
          lat,
          long,
          nearest_station,
          nearest_station_meter_distance,
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
          ${item.lat},
          ${item.long},
          ${item.nearest_station},
          ${item.nearest_station_meter_distance},
          ${item.description}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const item of seedListings) {
    await sql`
      DELETE FROM listings
      WHERE
        id = ${item.id}
    `;
  }
}
