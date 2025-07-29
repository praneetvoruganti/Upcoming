// Mock data for Local Insider Tips feature
// Sample approved tips from the driver community

export const mockTips = [
  {
    id: 'tip-001',
    title: 'Sharma Cutting Chai',
    category: 'Chai Spot',
    description: 'Amazing cutting chai and biscuits. Perfect spot for a quick break. Uncle makes the best ginger chai in the area.',
    location: 'Near Metro Station, Connaught Place',
    city: 'DEL',
    status: 'approved',
    submittedBy: null,
    submittedAt: '2024-01-15T10:30:00Z',
    approvedAt: '2024-01-16T09:15:00Z'
  },
  {
    id: 'tip-002',
    title: 'South Indian Tiffin Corner',
    category: 'Tiffin Center',
    description: 'Fresh idli, dosa, and sambar. Very clean and tasty. Good for breakfast and lunch. Reasonable prices.',
    location: 'MG Road, Near Bus Stand',
    city: 'HYD',
    status: 'approved',
    submittedBy: null,
    submittedAt: '2024-01-14T14:20:00Z',
    approvedAt: '2024-01-15T11:45:00Z'
  },
  {
    id: 'tip-003',
    title: 'Tea Time Junction',
    category: 'Chai Spot',
    description: 'Open 24/7! Perfect for night shift drivers. Good tea, snacks, and friendly atmosphere.',
    location: 'Highway Junction, Outer Ring Road',
    city: 'BLR',
    status: 'approved',
    submittedBy: null,
    submittedAt: '2024-01-13T19:45:00Z',
    approvedAt: '2024-01-14T08:30:00Z'
  },
  {
    id: 'tip-004',
    title: 'Maharashtrian Thali House',
    category: 'Tiffin Center',
    description: 'Unlimited thali with fresh rotis. Great value for money. Popular with local cab drivers.',
    location: 'FC Road, Shivajinagar',
    city: 'PUN',
    status: 'approved',
    submittedBy: null,
    submittedAt: '2024-01-12T13:15:00Z',
    approvedAt: '2024-01-13T10:20:00Z'
  },
  {
    id: 'tip-005',
    title: 'Kulhad Chai Corner',
    category: 'Chai Spot',
    description: 'Traditional kulhad chai with amazing taste. Eco-friendly and very refreshing.',
    location: 'City Palace Road, Old City',
    city: 'JAI',
    status: 'approved',
    submittedBy: null,
    submittedAt: '2024-01-11T16:30:00Z',
    approvedAt: '2024-01-12T09:45:00Z'
  },
  {
    id: 'tip-006',
    title: 'Quick Bite Tiffin',
    category: 'Tiffin Center',
    description: 'Fast service, good quality parathas and dal. Perfect for quick meals between rides.',
    location: 'Linking Road, Bandra',
    city: 'MUM',
    status: 'approved',
    submittedBy: null,
    submittedAt: '2024-01-10T12:00:00Z',
    approvedAt: '2024-01-11T14:30:00Z'
  },
  {
    id: 'tip-007',
    title: 'Adda Chai & Snacks',
    category: 'Chai Spot',
    description: 'Great hangout spot with other drivers. Good chai, samosas, and friendly crowd.',
    location: 'Tank Bund Road, Near Secretariat',
    city: 'HYD',
    status: 'approved',
    submittedBy: null,
    submittedAt: '2024-01-09T17:20:00Z',
    approvedAt: '2024-01-10T11:15:00Z'
  },
  {
    id: 'tip-008',
    title: 'Morning Fresh Tiffin',
    category: 'Tiffin Center',
    description: 'Best breakfast spot! Fresh poha, upma, and coffee. Opens early at 6 AM for morning drivers.',
    location: 'Koramangala, 5th Block',
    city: 'BLR',
    status: 'approved',
    submittedBy: null,
    submittedAt: '2024-01-08T07:45:00Z',
    approvedAt: '2024-01-09T09:30:00Z'
  }
];

// City mapping for display
export const cityNames = {
  'DEL': 'Delhi',
  'HYD': 'Hyderabad',
  'BLR': 'Bangalore',
  'PUN': 'Pune',
  'JAI': 'Jaipur',
  'MUM': 'Mumbai'
};

// Categories
export const categories = ['Chai Spot', 'Tiffin Center'];
