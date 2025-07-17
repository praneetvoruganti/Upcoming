// Business logic for the Earnings Tab.
// Contains functions for filtering data and calculating metrics.

import moment from 'moment';

/**
 * Filters bookings based on a specified period (Today, Week, Month).
 * @param {Array} bookings - The array of booking objects.
 * @param {String} period - 'Today', 'Week', or 'Month'.
 * @returns {Array} - The filtered array of bookings.
 */
export const filterBookingsByTime = (bookings, period) => {
  if (!bookings) return [];
  const now = moment();
  return bookings.filter(booking => {
    const bookingDate = moment(booking.tripdate);
    if (period === 'Today') {
      return bookingDate.isSame(now, 'day');
    }
    if (period === 'Week') {
      return bookingDate.isSame(now, 'isoWeek');
    }
    if (period === 'Month') {
      return bookingDate.isSame(now, 'month');
    }
    return false;
  });
};

/**
 * Calculates key performance indicators from a list of bookings.
 * @param {Array} filteredBookings - The bookings for the selected period.
 * @returns {Object} - An object containing totalEarnings, tripCount, avgPerTrip, totalTimeOnline, and earningsPerHour.
 */
export const calculateMetrics = (filteredBookings) => {
  if (!filteredBookings || filteredBookings.length === 0) {
    return { totalEarnings: 0, tripCount: 0, avgPerTrip: 0, totalTimeOnline: 0, earningsPerHour: 0, totalCommissionSaved: 0 };
  }

  const totalEarnings = filteredBookings.reduce((sum, booking) => sum + parseFloat(booking.driver_share || 0), 0);
  const tripCount = filteredBookings.length;
  const avgPerTrip = tripCount > 0 ? totalEarnings / tripCount : 0;
  const totalTimeOnline = filteredBookings.reduce((sum, booking) => sum + (booking.time_online_minutes || 0), 0);
  const totalHoursOnline = totalTimeOnline / 60;
  const earningsPerHour = totalHoursOnline > 0 ? totalEarnings / totalHoursOnline : 0;
  const totalCommissionSaved = filteredBookings.reduce((sum, booking) => sum + parseFloat(booking.commission_saved || 0), 0);

  return { totalEarnings, tripCount, avgPerTrip, totalTimeOnline, earningsPerHour, totalCommissionSaved };
};

/**
 * Formats booking data for use in a bar chart, aggregating earnings by day.
 * @param {Array} filteredBookings - The bookings for the selected period.
 * @param {String} period - 'Today', 'Week', or 'Month'.
 * @returns {Object} - An object with labels and datasets for the chart.
 */
/**
 * Calculates summary metrics for the current and previous weeks.
 * @param {Array} allBookings - All of the user's bookings.
 * @returns {Object} - An object with `currentWeek` and `lastWeek` summary data.
 */
export const calculateWeeklySummaries = (allBookings) => {
  if (!allBookings || allBookings.length === 0) {
    const emptySummary = {
      totalEarnings: 0,
      totalTrips: 0,
      totalTimeOnline: 0,
      earningsPerHour: 0,
      avgPerTrip: 0,
      totalCommissionSaved: 0,
      totalGstCollected: 0,
    };
    return { currentWeek: emptySummary, lastWeek: emptySummary };
  }
  const now = moment();
  const startOfThisWeek = now.clone().startOf('isoWeek');
  const startOfLastWeek = now.clone().subtract(1, 'weeks').startOf('isoWeek');
  const endOfLastWeek = now.clone().subtract(1, 'weeks').endOf('isoWeek');

  const thisWeekBookings = allBookings.filter(b => moment(b.tripdate).isSameOrAfter(startOfThisWeek));
  const lastWeekBookings = allBookings.filter(b => {
    const tripDate = moment(b.tripdate);
    return tripDate.isBetween(startOfLastWeek, endOfLastWeek, null, '[]');
  });

  const getSummary = (bookings) => {
    if (!bookings || bookings.length === 0) {
      return {
        totalEarnings: 0,
        totalTrips: 0,
        totalTimeOnline: 0,
        earningsPerHour: 0,
        avgPerTrip: 0,
        totalCommissionSaved: 0,
        totalGstCollected: 0,
      };
    }

    const totalEarnings = bookings.reduce((sum, b) => sum + parseFloat(b.driver_share || 0), 0);
    const totalTrips = bookings.length;
    const totalTimeOnline = bookings.reduce((sum, b) => sum + (b.time_online_minutes || 0), 0);
    const earningsPerHour = totalTimeOnline > 0 ? (totalEarnings / (totalTimeOnline / 60)) : 0;
    const avgPerTrip = totalTrips > 0 ? totalEarnings / totalTrips : 0;
    const totalCommissionSaved = bookings.reduce((sum, b) => sum + parseFloat(b.commission_saved || 0), 0);
    const totalGstCollected = bookings.reduce((sum, b) => sum + parseFloat(b.gst || 0), 0);

    return {
      totalEarnings,
      totalTrips,
      totalTimeOnline,
      earningsPerHour,
      avgPerTrip,
      totalCommissionSaved,
      totalGstCollected,
    };
  };

  return {
    currentWeek: getSummary(thisWeekBookings),
    lastWeek: getSummary(lastWeekBookings),
  };
};

export const formatDataForChart = (filteredBookings, period) => {
  const labels = [];
  const data = [];

  if (period === 'Week') {
    const weeklyEarnings = [0, 0, 0, 0, 0, 0, 0]; // Sun-Sat
    filteredBookings.forEach(booking => {
      const dayIndex = moment(booking.tripdate).day();
      weeklyEarnings[dayIndex] += parseFloat(booking.driver_share || 0);
    });
    return {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{ data: weeklyEarnings }],
    };
  }

  if (period === 'Month') {
    const monthlyWeeklyEarnings = [0, 0, 0, 0, 0]; // Max 5 weeks in a month
    const firstDayOfMonth = moment().startOf('month');

    filteredBookings.forEach(booking => {
      const bookingDate = moment(booking.tripdate);
      const weekOfMonth = bookingDate.diff(firstDayOfMonth, 'weeks');
      if (weekOfMonth >= 0 && weekOfMonth < 5) {
        monthlyWeeklyEarnings[weekOfMonth] += parseFloat(booking.driver_share || 0);
      }
    });

    // Filter out weeks with no earnings to keep the chart clean
    const labels = [];
    const data = [];
    monthlyWeeklyEarnings.forEach((earnings, index) => {
      if(earnings > 0 || (labels.length === 0 && index === 0)) { // at least show week 1 even if 0
        labels.push(`Week ${index + 1}`);
        data.push(earnings);
      }
    });

    return {
      labels: labels.length > 0 ? labels : ['Week 1'],
      datasets: [{ data: data.length > 0 ? data : [0] }],
    };
  }

  // Default for 'Today' (or any other case)
  return {
    labels: ['Today'],
    datasets: [{ data: [calculateMetrics(filteredBookings).totalEarnings] }],
  };
};