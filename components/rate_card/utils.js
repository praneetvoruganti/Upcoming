export const onDemandRates = {
  baseDistance: 2,
  firstSlabDistance: 8,
  vehicleClasses: {
    BIKE: {
      pickupCharge: 10,
      baseFare: 20,
      ratePerKmFirstSlab: 8,
      ratePerKmAfterFirstSlab: 9,
    },
    AUTO: {
      pickupCharge: 15,
      baseFare: 35,
      ratePerKmFirstSlab: 12,
      ratePerKmAfterFirstSlab: 12,
    },
    MINI: {
      pickupCharge: 20,
      baseFare: 70,
      ratePerKmFirstSlab: 14,
      ratePerKmAfterFirstSlab: 16,
    },
    SEDAN: {
      pickupCharge: 25,
      baseFare: 90,
      ratePerKmFirstSlab: 16,
      ratePerKmAfterFirstSlab: 18,
    },
    SUV: {
      pickupCharge: 50,
      baseFare: 100,
      ratePerKmFirstSlab: 18,
      ratePerKmAfterFirstSlab: 21,
    },
  },
};

export const platformFee = 5;

export const calculateFare = (distance, vehicleClass) => {
  const rates = onDemandRates.vehicleClasses[vehicleClass];
  if (!rates) {
    return 0;
  }

  const totalBaseFare = rates.pickupCharge + rates.baseFare;

  if (distance <= onDemandRates.baseDistance) {
    return totalBaseFare;
  }

  let fare = totalBaseFare;
  if (distance > onDemandRates.baseDistance && distance <= onDemandRates.firstSlabDistance) {
    fare += (distance - onDemandRates.baseDistance) * rates.ratePerKmFirstSlab;
  } else if (distance > onDemandRates.firstSlabDistance) {
    fare += (onDemandRates.firstSlabDistance - onDemandRates.baseDistance) * rates.ratePerKmFirstSlab;
    fare += (distance - onDemandRates.firstSlabDistance) * rates.ratePerKmAfterFirstSlab;
  }

  return fare;
};