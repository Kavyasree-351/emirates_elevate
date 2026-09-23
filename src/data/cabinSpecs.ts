import type { CabinSpecItem } from '../types';

export const CABIN_SPECS: CabinSpecItem[] = [
  {
    classTier: 'First',
    code: 'F',
    productName: 'Private Suites & Refresh',
    seatPitch: '86 inches',
    seatWidth: '23 - 29 inches',
    recline: 'Fully Flat (180° Bed)',
    screenSize: '32" 4K HD Touchscreen',
    materials: ['Textured cream leather', 'Ghaf tree motif wood veneer', 'Champagne brass trims'],
    features: [
      'Floor-to-ceiling privacy doors (on select B777s)',
      'A380 Onboard Shower Spa access',
      'Virtual windows with real-time optical camera views',
      'Zero-gravity NASA seating position',
      'Personal mini-bar & ambient temperature control'
    ],
    accentColor: '#D4AF37', // Luxury Gold
    keyInnovation: 'Signature Ghaf tree art design with mood lighting and bespoke luxury finishes.',
    dataSource: 'Public Emirates information'
  },
  {
    classTier: 'Business',
    code: 'J',
    productName: 'Next-Gen 1-2-1 Lie-Flat Business Class',
    seatPitch: '44 - 78 inches (pitch / bed length)',
    seatWidth: '20.5 inches',
    recline: 'Fully Flat Bed',
    screenSize: '23" HD Screen with ice Touch Controller',
    materials: ['Diamond-stitched champagne leather', 'Natural burr wood veneer', 'Brushed aluminum accents'],
    features: [
      'Direct aisle access for every passenger (1-2-1 config on refitted B777s & A380s)',
      'Mini bar in armrest console',
      'Multiple fast USB-C and 60W power outlets',
      'A380 Onboard Lounge bar access',
      'Ottoman footrest with integrated carry-on stowage'
    ],
    accentColor: '#43517D', // Aviation Navy / Steel
    keyInnovation: 'Elimination of the 2-3-2 middle seat on retrofitted Boeing 777 fleet for direct aisle freedom.',
    dataSource: 'Public Emirates information'
  },
  {
    classTier: 'Premium Economy',
    code: 'W',
    productName: 'Signature Premium Economy Cradle',
    seatPitch: '40 inches',
    seatWidth: '19.5 inches',
    recline: '8 inches cradle recline with calf & footrests',
    screenSize: '13.3" HD Screen',
    materials: ['Anti-stain cream leather', '6-way adjustable headrest', 'Wood-grain side consoles'],
    features: [
      'Dedicated cabin section at front of main deck',
      '2-4-2 layout on A380 / 2-4-2 on refurbished B777',
      'Upgraded dining served on royal Doulton china with linen napkins',
      'Chandon sparkling wine welcome beverage',
      'Generous woodgrain cocktail table + fold-out dining tray'
    ],
    accentColor: '#C8102E', // Emirates Crimson Red
    keyInnovation: 'Bridging the luxury gap: Business-class style cradle seat at accessible fares.',
    dataSource: 'Public Emirates information'
  },
  {
    classTier: 'Economy',
    code: 'Y',
    productName: 'Refreshed Ergonomic Economy',
    seatPitch: '32 - 34 inches',
    seatWidth: '17.5 - 18 inches',
    recline: '6 inches ergonomic recline',
    screenSize: '13.3" Ultra-responsive HD Screen',
    materials: ['Breathable dual-tone fabric upholstery', 'Leather adjustable headrests'],
    features: [
      'Over 6,500 channels of on-demand ice entertainment',
      'Dual high-speed USB charging ports at every seat',
      'Ghaf tree architectural cabin wall panels',
      'Sculpted lightweight seatbacks maximizing knee space',
      'Multi-course regional meals and complimentary beverages'
    ],
    accentColor: '#2E3858', // Slate Navy
    keyInnovation: 'Lighter weight eco-structures paired with the industry-leading ice inflight entertainment system.',
    dataSource: 'Public Emirates information'
  }
];
