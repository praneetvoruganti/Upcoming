/**
 * Happening Places Service
 * Handles data fetching and service booking
 */

// Base place model with all common properties to ensure consistency
const createPlaceModel = (id, name, lat, lng, rating, ratingCount, imageId, description, category, availableServices, additionalProps = {}) => ({
  id,
  name,
  lat,
  lng,
  rating,
  ratingCount,
  imageUrl: `https://picsum.photos/id/${imageId}/600/400`,
  description,
  category,
  availableServices,
  distance: (Math.random() * 5 + 0.5).toFixed(1) + ' km', // Placeholder distance
  ...additionalProps
});

// Mock data for places by category with consistent properties
const mockPlaces = {
  tour: [
    createPlaceModel(
      'tour-1',
      'Hyderabad Heritage Tour',
      17.3850,
      78.4867,
      4.9,
      312,
      0, // Distance will be calculated from user's location
      'Explore the rich history of Hyderabad with a guided tour of its most iconic landmarks, including Charminar and Golconda Fort.',
      'tour',
      ['hourly'],
      {
        popularity: 'high',
        estimatedTime: '4-5 hours',
        bestTime: 'Morning or Evening',
        includes: 'Guide, Entry Fees, Water Bottle'
      }
    ),
    createPlaceModel(
      'tour-2',
      'Ramoji Film City Day Trip',
      17.2547,
      78.6808,
      4.7,
      540,
      0,
      'A full-day tour of the world\'s largest film studio complex. Experience live shows, rides, and cinematic magic.',
      'tour',
      ['hourly'],
      {
        popularity: 'very high',
        estimatedTime: 'Full Day',
        bestTime: 'Weekdays to avoid crowds',
        includes: 'Entry Ticket, Lunch'
      }
    ),
  ],
  market: [
    createPlaceModel(
      'market-1',
      'Downtown Market',
      19.0728,
      72.8826,
      4.8,
      423,
      1039,
      'Bustling market with fresh produce, street food and local crafts. Popular among locals and tourists alike.',
      'market',
      ['c2c'],
      {
        popularity: 'high',
        estimatedTime: '2-3 hours',
        bestTime: 'Morning'
      }
    ),
    createPlaceModel(
      'market-2',
      'Fashion Street',
      19.0758,
      72.8242,
      4.3,
      287,
      1026,
      'Popular shopping destination for trendy clothes, accessories, and footwear at bargain prices.',
      'market',
      ['c2c'],
      {
        popularity: 'very high',
        bestTime: 'Afternoon'
      }
    ),
    createPlaceModel(
      'market-3',
      'Electronic Bazaar',
      19.1128,
      72.8652,
      4.0,
      156,
      60,
      'One-stop destination for all electronic goods, gadgets, and accessories at competitive prices.',
      'market',
      ['c2c'],
      {
        popularity: 'medium',
        openHours: '10 AM - 9 PM',
        busyTimes: 'Weekends'
      }
    ),
    createPlaceModel(
      'market-4',
      'Organic Farmers Market',
      19.1234,
      72.8345,
      4.9,
      198,
      1080,
      'A weekly market offering fresh, locally-sourced organic produce and artisanal goods.',
      'market',
      ['c2c'],
      {
        popularity: 'medium',
        bestTime: 'Weekends',
        openHours: 'Sat-Sun 8 AM - 2 PM'
      }
    ),
  ],
  restaurant: [
    createPlaceModel(
      'restaurant-1',
      'Sea Breeze Restaurant',
      19.0825,
      72.8900,
      4.6,
      521,
      102,
      'Seafood restaurant with amazing ocean views, specializing in local delicacies and fresh catches.',
      'restaurant',
      ['c2c'],
      {
        priceRange: '₹₹₹',
        cuisine: 'Seafood, Continental',
        openHours: '12 PM - 11 PM',
        busyTimes: '7 PM - 10 PM'
      }
    ),
    createPlaceModel(
      'restaurant-2',
      'Spice Garden',
      19.0756,
      72.8750,
      4.5,
      387,
      292,
      'Authentic Indian restaurant with a wide variety of regional dishes in a traditional setting.',
      'restaurant',
      ['c2c'],
      {
        priceRange: '₹₹',
        cuisine: 'Indian, Vegetarian-Friendly',
        openHours: '11 AM - 11 PM',
        popularity: 'high'
      }
    ),
    createPlaceModel(
      'restaurant-3',
      'Urban Fusion Café',
      19.1128,
      72.8652,
      4.3,
      245,
      225,
      'Modern café serving innovative fusion cuisine with specialty coffee and artisanal desserts.',
      'restaurant',
      ['c2c'],
      {
        priceRange: '₹₹',
        cuisine: 'Fusion, Café',
        openHours: '8 AM - 10 PM',
        busyTimes: 'Breakfast and evening hours'
      }
    ),
    createPlaceModel(
      'restaurant-4',
      'Pasta Paradise',
      19.0950,
      72.8555,
      4.7,
      630,
      944,
      'Cozy Italian trattoria famous for its handmade pasta and classic sauces.',
      'restaurant',
      ['c2c'],
      {
        priceRange: '₹₹₹',
        cuisine: 'Italian',
        openHours: '1 PM - 11 PM',
        popularity: 'high'
      }
    ),
  ],
  mall: [
    createPlaceModel(
      'mall-1',
      'City Center Mall',
      19.0728,
      72.8826,
      4.4,
      698,
      1071,
      'Luxurious shopping destination with premium brands, entertainment venues, and fine dining options.',
      'mall',
      ['c2c'],
      {
        stores: '200+ stores',
        facilities: 'Food court, Cinema, Gaming zone',
        openHours: '10 AM - 10 PM',
        popularity: 'high'
      }
    ),
    createPlaceModel(
      'mall-2',
      'Seaside Shopping Plaza',
      19.0825,
      72.8900,
      4.3,
      543,
      535,
      'Waterfront shopping complex with a mix of local and international brands, plus entertainment options.',
      'mall',
      ['c2c'],
      {
        stores: '150+ stores',
        facilities: 'Food court, Kids play area, Multiplex',
        openHours: '11 AM - 10 PM',
        popularity: 'medium'
      }
    ),
    createPlaceModel(
      'mall-3',
      'Suburban Galleria',
      19.0756, 
      72.8750,
      4.2,
      421,
      513,
      'Family-friendly mall with diverse shopping options, restaurants, and regular events.',
      'mall',
      ['c2c'],
      {
        stores: '100+ stores',
        facilities: 'Food court, Event space, Arcade',
        openHours: '10 AM - 9 PM',
        popularity: 'medium'
      }
    ),
  ],
  airport: [
    createPlaceModel(
      'airport-1',
      'International Airport',
      19.0896,
      72.8656,
      4.5,
      1245,
      538,
      'Major international airport with multiple terminals, serving destinations worldwide.',
      'airport',
      ['c2c'],
      {
        terminals: 'T1, T2, T3',
        facilities: 'Shopping, Dining, Lounges, Free WiFi',
        busyTimes: 'Early morning and evening'
      }
    ),
    createPlaceModel(
      'airport-2',
      'Domestic Airport',
      19.0984,
      72.8745,
      4.2,
      876,
      483,
      'Convenient domestic airport with regular flights to major cities in the country.',
      'airport',
      ['c2c'],
      {
        terminals: 'T1, T2',
        facilities: 'Food court, Shopping, WiFi',
        busyTimes: 'Weekend mornings'
      }
    ),
    createPlaceModel(
      'airport-3',
      'Regional Airfield',
      19.1500,
      72.9000,
      4.0,
      150,
      431,
      'A small airfield for regional and chartered flights, offering quick check-ins.',
      'airport',
      ['c2c'],
      {
        terminals: '1 Terminal',
        facilities: 'Waiting lounge, Cafe',
        busyTimes: 'Varies by flight schedule'
      }
    ),
  ],
  station: [
    createPlaceModel(
      'station-1',
      'Central Railway Station',
      19.0760,
      72.8777,
      4.0,
      1023,
      327,
      'Main railway hub with connections to all parts of the city and interstate routes.',
      'station',
      ['c2c'],
      {
        platforms: '12 platforms',
        facilities: 'Ticket counters, Waiting area, Food stalls',
        peakHours: 'Rush hours: 8-10 AM, 6-8 PM'
      }
    ),
    createPlaceModel(
      'station-2',
      'Metro Junction',
      19.0728,
      72.8826,
      4.2,
      876,
      244,
      'Modern metro station connecting multiple lines with easy access to business districts.',
      'station',
      ['c2c'],
      {
        platforms: '4 platforms',
        facilities: 'Automated ticket machines, Convenience store',
        peakHours: 'Rush hours: 9-10 AM, 6-7 PM'
      }
    ),
    createPlaceModel(
      'station-3',
      'Heritage Rail Terminus',
      18.9400,
      72.8350,
      4.6,
      950,
      1050,
      'A historic railway station known for its stunning architecture and long-distance trains.',
      'station',
      ['c2c'],
      {
        platforms: '18 platforms',
        facilities: 'Museum, Restaurants, Waiting halls',
        peakHours: 'Holiday seasons'
      }
    ),
  ],
  hotel: [
    createPlaceModel(
      'hotel-1',
      'Luxury Beachfront Hotel',
      19.0062,
      72.8140,
      4.8,
      748,
      237,
      'Five-star luxury hotel with private beach access, multiple restaurants, and spa facilities.',
      'hotel',
      ['c2c'],
      {
        stars: '5 Star',
        roomTypes: 'Deluxe, Suite, Presidential Suite',
        amenities: 'Pool, Spa, Gym, Restaurant, Bar'
      }
    ),
    createPlaceModel(
      'hotel-2',
      'Business Hotel',
      19.0682,
      72.8654,
      4.5,
      516,
      331,
      'Centrally located business hotel with conference facilities and executive services.',
      'hotel',
      ['c2c'],
      {
        stars: '4 Star',
        roomTypes: 'Standard, Executive, Suite',
        amenities: 'Business Center, Conference Rooms, Restaurant'
      }
    ),
    createPlaceModel(
      'hotel-3',
      'Budget Inn',
      19.1058,
      72.8435,
      3.8,
      312,
      219,
      'Affordable and clean accommodation for travelers on a budget. Good connectivity.',
      'hotel',
      ['c2c'],
      {
        stars: '3 Star',
        roomTypes: 'Standard, Twin',
        amenities: 'Free WiFi, Breakfast included'
      }
    ),
    createPlaceModel(
      'hotel-4',
      'The Cozy Corner B&B',
      19.0550,
      72.8290,
      4.9,
      95,
      1040,
      'A charming bed & breakfast with personalized service and a homely atmosphere.',
      'hotel',
      ['c2c'],
      {
        stars: 'Boutique'
      }
    ),
  ],
};

/**
 * Fetches places based on provided filters
 * 
 * @param {Object} filters - Filter criteria for places
 * @param {number} filters.lat - Latitude coordinate
 * @param {number} filters.lng - Longitude coordinate
 * @param {string} filters.category - Category of places to fetch ('market', 'restaurant', 'mall', 'airport', 'station', 'hotel')
 * @returns {Promise<Array>} Array of place objects
 */
export const fetchPlaces = async ({ lat, lng, category = 'all' }) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return data based on category
  if (category === 'all') {
    // Return a sample of places from each category to avoid overwhelming the UI
    return [
      ...mockPlaces.market.slice(0, 2),
      ...mockPlaces.restaurant.slice(0, 2),
      ...mockPlaces.mall.slice(0, 2),
      ...mockPlaces.airport.slice(0, 1),
      ...mockPlaces.station.slice(0, 1),
      ...mockPlaces.hotel.slice(0, 2),
    ];
  }
  
  return mockPlaces[category] || [];
};

/**
 * Books a service for a given place
 * 
 * @param {string} serviceType - Type of service ('hourly', 'c2c')
 * @param {string} placeId - ID of the place
 * @returns {Promise<Object>} Booking confirmation
 */
export const bookService = async (serviceType, placeId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log(`Booking service '${serviceType}' for place '${placeId}'`);

  // Simulate a successful booking
  return {
    success: true,
    message: `Successfully booked ${serviceType} for place ${placeId}.`,
    bookingId: `bk_${Date.now()}`
  };
};

const happeningService = {
  fetchPlaces,
  bookService,
};

export default happeningService;
