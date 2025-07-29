// Service layer for Local Insider Tips
// Handles data operations with mock data and prepared for backend integration

import { mockTips } from '../mockTips';

class TipService {
  constructor() {
    // Use mock data for now, will integrate with Firestore later
    this.useMockData = true;
    this.mockDelay = 800; // Simulate network delay
  }

  // Simulate async operation
  async delay(ms = this.mockDelay) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Fetch approved tips with optional filters
  async fetchTips(filters = {}) {
    await this.delay();
    
    if (this.useMockData) {
      let tips = [...mockTips];
      
      // Apply filters
      if (filters.city && filters.city !== 'All') {
        tips = tips.filter(tip => tip.city === filters.city);
      }
      
      if (filters.category && filters.category !== 'All') {
        tips = tips.filter(tip => tip.category === filters.category);
      }
      
      if (filters.status) {
        tips = tips.filter(tip => tip.status === filters.status);
      } else {
        // Default to approved only
        tips = tips.filter(tip => tip.status === 'approved');
      }
      
      // Sort by approval date (newest first)
      tips.sort((a, b) => new Date(b.approvedAt) - new Date(a.approvedAt));
      
      return {
        success: true,
        data: tips,
        total: tips.length
      };
    }
    
    // Future Firestore implementation will go here
    // const tipsRef = db.collection('localInsiderTips');
    // let query = tipsRef.where('status', '==', 'approved');
    // ...
    
    return {
      success: false,
      error: 'Backend not implemented yet'
    };
  }

  // Submit a new tip
  async submitTip(tipData) {
    await this.delay(1200);
    
    if (this.useMockData) {
      // Simulate successful submission
      const newTip = {
        id: `tip-${Date.now()}`,
        ...tipData,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        submittedBy: null, // Anonymous
        approvedAt: null
      };
      
      // In real implementation, this would save to backend
      console.log('New tip submitted:', newTip);
      
      return {
        success: true,
        data: newTip,
        message: 'Tip submitted successfully! It will be reviewed and added to the feed soon.'
      };
    }
    
    // Future Firestore implementation
    // const tipsRef = db.collection('localInsiderTips');
    // const docRef = await tipsRef.add(tipData);
    // ...
    
    return {
      success: false,
      error: 'Backend not implemented yet'
    };
  }

  // Get tips by city
  async getTipsByCity(cityCode) {
    return this.fetchTips({ city: cityCode });
  }

  // Get tips by category
  async getTipsByCategory(category) {
    return this.fetchTips({ category });
  }

  // Search tips by text
  async searchTips(searchText, filters = {}) {
    await this.delay();
    
    if (this.useMockData) {
      const allTipsResult = await this.fetchTips(filters);
      
      if (!allTipsResult.success) {
        return allTipsResult;
      }
      
      const searchLower = searchText.toLowerCase();
      const filteredTips = allTipsResult.data.filter(tip => 
        tip.title.toLowerCase().includes(searchLower) ||
        tip.description.toLowerCase().includes(searchLower) ||
        tip.location.toLowerCase().includes(searchLower)
      );
      
      return {
        success: true,
        data: filteredTips,
        total: filteredTips.length
      };
    }
    
    return {
      success: false,
      error: 'Backend not implemented yet'
    };
  }

  // Get popular tips (most liked/rated)
  async getPopularTips(limit = 10) {
    await this.delay();
    
    if (this.useMockData) {
      // For mock data, just return recent tips
      const result = await this.fetchTips();
      if (result.success) {
        return {
          ...result,
          data: result.data.slice(0, limit)
        };
      }
      return result;
    }
    
    return {
      success: false,
      error: 'Backend not implemented yet'
    };
  }

  // Get unique cities that have tips
  async getAvailableCities() {
    await this.delay(300);
    
    if (this.useMockData) {
      const cities = [...new Set(mockTips.map(tip => tip.city))];
      return {
        success: true,
        data: cities.sort()
      };
    }
    
    return {
      success: false,
      error: 'Backend not implemented yet'
    };
  }

  // Admin functions (for future use)
  async approveTip(tipId) {
    // Future implementation for admin approval
    await this.delay();
    return {
      success: false,
      error: 'Admin functions not implemented yet'
    };
  }

  async rejectTip(tipId, reason) {
    // Future implementation for admin rejection
    await this.delay();
    return {
      success: false,
      error: 'Admin functions not implemented yet'
    };
  }

  // Utility method to switch between mock and live data
  setUseMockData(useMock) {
    this.useMockData = useMock;
  }

  // Error handling helper
  handleError(error) {
    console.error('TipService Error:', error);
    return {
      success: false,
      error: error.message || 'An unexpected error occurred'
    };
  }
}

// Export singleton instance
export default new TipService();
