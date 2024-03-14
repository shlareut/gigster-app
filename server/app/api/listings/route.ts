import { NextRequest, NextResponse } from 'next/server';
import { getAllListings, getListings } from '../../../database/listings';

// const seedListings = [
//   {
//     id: 1,
//     name: 'Café Menta',
//     type: 'Café',
//     address_line_one: 'Radetzkyplatz 4',
//     address_line_two: '',
//     postal_code: '1030',
//     city: 'Vienna',
//     city_district: 'Landstraße',
//     country: 'Austria',
//     description:
//       'Erstes cooles Lokal im Weißgerber-Grätzel mit viel Frühstück; interessante Karte mit mediterranen Gerichten (Mo–Fr 4 MM zwischen € 10,– und € 13,–; auch vegetarisch € 8,90); Cocktails. Schanigarten für 75 Pers.',
//   },
//   {
//     id: 2,
//     name: 'Beaver Brewing Company',
//     type: 'Brewpub',
//     address_line_one: 'Liechtensteinstraße 69',
//     address_line_two: '',
//     postal_code: '1090',
//     city: 'Vienna',
//     city_district: 'Alsergrund',
//     country: 'Austria',
//     description:
//       'Eigene Brauerei in der 3 reguläre und 6 Spezialbiere je nach Saison gebraut werden, darunter Lager, Pils, Weizen, IPA, Pale Ale, Stout, Porter, Sauerbiere und fassgereifte Starkbiere. Amerikanische Küche, herzhaftes BBQ aus dem eigenen Smoker (Spareribs, Pulled Pork, Pastrami, Wings), Burger, Salate, vegane Speisen, Monatsburger; Bier auch in Flaschen zum Mitnehmen, verschiedene Cider, regionale Weine und Limonaden, Säfte, Schnäpse. Kindersessel. Partykeller für bis zu 40 Pers. mit eigener Bar. Schanigarten für 40 Pers.',
//   },
//   {
//     id: 3,
//     name: 'ølhavn by Schalken',
//     type: 'Brewpub',
//     address_line_one: 'Leopoldsgasse 26',
//     address_line_two: '',
//     postal_code: '1020',
//     city: 'Vienna',
//     city_district: 'Leopoldstadt',
//     country: 'Austria',
//     description:
//       'Beisl mit Fass- und Flaschenbieren der eigenen Wiener Craftbrauerei.',
//   },
// ];

// export async function GET() {
//   const data = await getAllListings().catch(console.error);
//   return NextResponse.json(data);
// }

export async function GET() {
  const data = await getListings().catch(console.error);
  return NextResponse.json(data);
}
