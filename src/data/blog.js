import { IMG } from './site.js';

/*
 * Blog posts, newest first. `body` is a list of blocks:
 * ['p', text] · ['h2', text] · ['ul', [items]] · ['quote', text]
 */
export const POSTS = [
  {
    slug: 'choosing-a-warehouse-in-waluj',
    category: 'Guide',
    date: '2026-09-24',
    title: 'Choosing a warehouse in Waluj: a checklist for manufacturers',
    excerpt:
      'Rent per square foot is only part of the picture. Clear height, floor load, docks and truck access decide what a shed actually costs you to run.',
    image: IMG('1553413077-190dd305871c', 1800),
    alt: 'Wide warehouse interior with tall pallet racking',
    body: [
      ['p', 'Most warehouse searches start with one number: rent per square foot. It is a useful number, but it hides the things that decide whether a building works for your business. Two sheds at the same rent can differ by half in how much they actually hold and how fast trucks get through them.'],
      ['p', 'If you supply the plants in Waluj MIDC or move goods along the Nagar Highway, these are the questions worth asking before you sign.'],
      ['h2', '1. Clear height, not just floor area'],
      ['p', 'You pay for floor, but you store in volume. A shed with 12 m of clear height under the eaves takes six pallet levels; a typical 7 m shed takes three. For racked storage that roughly doubles the stock you can hold on the same footprint, which often makes the taller building the cheaper one per pallet.'],
      ['h2', '2. Floor load and finish'],
      ['p', 'Racking concentrates weight onto small base plates, and forklifts add moving loads on top. Ask for the rated floor load in tonnes per square metre and whether the floor is laser-levelled. An uneven or under-rated slab limits racking height and wears out material-handling equipment early.'],
      ['h2', '3. Docks and the yard'],
      ['p', 'Count the loading bays and ask how many are free at your peak hour. Hydraulic levellers let you load trucks of different heights without ramps or manual handling. Then walk the yard: can a full-length trailer turn without reversing onto the highway, and is there room to queue off the road?'],
      ['h2', '4. Access for heavy vehicles'],
      ['p', 'A short drive on a narrow approach road can cost more time than a longer one on a highway. Check the route from the gate to the national and state highways, the turning radius at the entrance, and whether there are restrictions on heavy vehicles at certain hours.'],
      ['h2', '5. Security, power and paperwork'],
      ['ul', [
        'CCTV coverage of the gate, yard and docks, and a manned gate around the clock',
        'Fire-fighting systems and the approvals that your insurer will ask for',
        'Power capacity and backup if you plan charging points, lighting or light assembly',
        'Clear title and an owner who can sign without layers of intermediaries',
      ]],
      ['h2', '6. Who you will be dealing with'],
      ['p', 'The building is half of the relationship. Ask who answers the phone when a truck is stuck at the gate on a Sunday, how maintenance requests are handled, and how lease renewals have gone for existing tenants. An owner-run campus usually answers these questions faster than a portfolio landlord.'],
      ['quote', 'Compare warehouses by what they cost per pallet stored and per truck handled, not per square foot rented.'],
      ['p', 'If you want to see how a campus measures up against this list, a site visit takes about an hour and answers most of it on the spot.'],
    ],
  },
  {
    slug: 'sambhajinagar-warehousing-market',
    category: 'Market',
    date: '2026-08-12',
    title: 'Why Chhatrapati Sambhajinagar is becoming a warehousing hub',
    excerpt:
      'An established auto cluster, new industrial land at AURIC and the Samruddhi expressway are pulling logistics demand towards the city. Here is what is driving it.',
    image: IMG('1590496793929-36417d3117de', 1800),
    alt: 'Highway running past an industrial area',
    body: [
      ['p', 'For years, warehousing in Maharashtra meant Bhiwandi, Chakan or Nagpur. Chhatrapati Sambhajinagar was where things were made, not where they were stored. That is changing, and the reasons are worth understanding if you are planning capacity for the next five years.'],
      ['h2', 'A manufacturing base that keeps growing'],
      ['p', 'Waluj, Shendra and Chikalthana MIDC are home to two-wheeler, automotive and component makers, along with pharmaceuticals, food processing and engineering firms. Every one of those plants depends on a ring of suppliers, and suppliers need space close to the line to hold buffer stock and deliver on short notice.'],
      ['h2', 'AURIC and new industrial land'],
      ['p', 'AURIC, the planned industrial city at Shendra–Bidkin developed under the Delhi–Mumbai Industrial Corridor, adds large, serviced plots to the region. New plants bring new supply chains with them, and the companies setting up there are looking for ready warehousing while their own facilities are being built.'],
      ['h2', 'Faster roads to the ports and the east'],
      ['p', 'The Samruddhi Mahamarg links the city to Mumbai and Nagpur on an access-controlled expressway, cutting travel times in both directions. Combined with the Aurangabad–Ahmednagar highway towards Pune, it puts the city within a day of the region’s main ports, consumption centres and rail hubs.'],
      ['h2', 'What this means for occupiers'],
      ['ul', [
        'Good, highway-facing space near the MIDCs is being taken earlier in the planning cycle',
        'Modern specifications — clear height, floor load, docks — matter more as tenants move to racked storage',
        'Lease lengths are getting longer as occupiers lock in locations close to their customers',
      ]],
      ['quote', 'The best time to secure warehousing near a growing cluster is before you need it urgently.'],
      ['p', 'If your business is expanding into the region, it is worth mapping your customers’ plants against the available sheds now. Proximity to the MIDC gate is often worth more than a lower rent further out.'],
    ],
  },
  {
    slug: 'lease-or-build-warehouse',
    category: 'Business',
    date: '2026-07-03',
    title: 'Lease or build? How growing businesses should think about warehouse space',
    excerpt:
      'Building your own warehouse feels like an asset. Leasing feels like a cost. The real comparison is about capital, time and how sure you are of next year’s volumes.',
    image: IMG('1586528116311-ad8dd3c8310d', 1800),
    alt: 'Warehouse interior stocked with goods on racking',
    body: [
      ['p', 'Sooner or later, every growing manufacturer or distributor asks the same question: should we keep leasing space, or buy land and build our own? Owning feels permanent and leasing feels like rent paid away. But the decision is rarely that simple.'],
      ['h2', 'Capital: where else could the money work?'],
      ['p', 'Land, approvals, construction, racking and fire systems tie up a large amount of capital before a single pallet is stored. For most businesses, that money earns more when it goes into machinery, inventory or new customers. Leasing turns a large upfront spend into a predictable monthly cost.'],
      ['h2', 'Time: how soon do you need the space?'],
      ['p', 'A new build involves land acquisition, conversion, approvals and construction, and it is common for the whole process to take well over a year. A ready warehouse can usually be occupied in weeks. If a new contract or a seasonal peak is driving the need, time alone often decides the question.'],
      ['h2', 'Flexibility: how sure are you of your volumes?'],
      ['p', 'Volumes change as customers come and go, and a building sized for today can be too small or too large in three years. Leasing lets you add space next door, move to a bigger unit or step down without selling property. Owning makes sense when your volumes are stable and you expect to stay in one location for a long time.'],
      ['h2', 'The costs people forget'],
      ['ul', [
        'Maintenance of roofs, floors, docks and drainage',
        'Security staff, CCTV and insurance',
        'Compliance and periodic fire-safety approvals',
        'Management time spent on the building instead of the business',
      ]],
      ['p', 'In a well-run leased campus, the owner handles these and they are built into the rent. When you own, they land on your team. GST paid on commercial rent can usually be claimed as input credit by registered businesses, which also narrows the gap — check the details for your case with your accountant.'],
      ['quote', 'Own the things that make you different. Lease the things that don’t.'],
      ['h2', 'A practical middle path'],
      ['p', 'Many businesses take a long lease on a built-to-spec or ready warehouse, with options to expand on the same campus. They get the location and specification they need, keep their capital for the core business, and avoid becoming property managers.'],
    ],
  },
];

export const findPost = (slug) => POSTS.find((p) => p.slug === slug);

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

const words = (post) =>
  post.body.reduce((n, [, v]) => n + [].concat(v).join(' ').split(/\s+/).length, 0);

export const readTime = (post) => `${Math.ceil(words(post) / 200)} min read`;
