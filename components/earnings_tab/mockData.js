// Mock data for driver bookings.
// Used for development and testing purposes.

export const completedBookings = [
  {
    id: '1',
    tripdate: '2025-07-15T12:30:00Z',
    base_fare: '350.00',
    platform_fee: '70.00',
    // Net: 350 - 70 = 280. GST: 280 * 0.05 = 14.00. Share: 280 - 14 = 266.00
    gst: '14.00',
    driver_share: '266.00',
    commission_saved: '70.00',
    time_online_minutes: 60,
    passenger: { name: 'Alice' },
    status: 'completed',
    pickup: { add: '123 Main St, Anytown, USA' },
    drop: { add: '456 Oak Ave, Anytown, USA' },
  },
  {
    id: '2',
    tripdate: '2025-07-14T10:00:00Z',
    base_fare: '250.00',
    platform_fee: '50.00',
    // Net: 250 - 50 = 200. GST: 200 * 0.05 = 10.00. Share: 200 - 10 = 190.00
    gst: '10.00',
    driver_share: '190.00',
    commission_saved: '50.00',
    time_online_minutes: 35,
    passenger: { name: 'Bob' },
    status: 'completed',
    pickup: { add: '789 Pine Ln, Anytown, USA' },
    drop: { add: '101 Maple Dr, Anytown, USA' },
  },
  {
    id: '3',
    tripdate: '2025-07-13T18:00:00Z',
    base_fare: '150.00',
    platform_fee: '30.00',
    // Net: 150 - 30 = 120. GST: 120 * 0.05 = 6.00. Share: 120 - 6 = 114.00
    gst: '6.00',
    driver_share: '114.00',
    commission_saved: '30.00',
    time_online_minutes: 25,
    passenger: { name: 'Charlie' },
    status: 'completed',
    pickup: { add: '222 Elm St, Anytown, USA' },
    drop: { add: '333 Oak Blvd, Anytown, USA' },
  },
  {
    id: '4',
    tripdate: '2025-06-20T14:00:00Z',
    base_fare: '500.00',
    platform_fee: '100.00',
    // Net: 500 - 100 = 400. GST: 400 * 0.05 = 20.00. Share: 400 - 20 = 380.00
    gst: '20.00',
    driver_share: '380.00',
    commission_saved: '100.00',
    time_online_minutes: 45,
    passenger: { name: 'David' },
    status: 'completed',
    pickup: { add: '444 Cedar Blvd, Anytown, USA' },
    drop: { add: '555 Spruce Way, Anytown, USA' },
  },
  {
    id: '5',
    tripdate: '2025-07-15T11:00:00Z',
    base_fare: '50.00', // Low fare trip
    platform_fee: '60.00', // High platform fee, results in negative balance
    // Net: 50 - 60 = -10. GST: -10 * 0.05 = -0.50. Share: -10 - (-0.50) = -9.50
    gst: '-0.50',
    driver_share: '-9.50',
    commission_saved: '0.00',
    time_online_minutes: 20,
    passenger: { name: 'Eve' },
    status: 'completed',
    pickup: { add: '666 Pine St, Anytown, USA' },
    drop: { add: '777 Birch Rd, Anytown, USA' },
  },
];

export const currency = {
  name: 'INR',
  symbol: '₹',
  decimal: 2,
};
