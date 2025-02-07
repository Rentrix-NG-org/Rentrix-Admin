export interface INewListing {
  title: string;
  description: string;
  builtMonth: string;
  builtYear: number | null;
  currentlyLivedIn: boolean;
  hasManualAddress: boolean;
  address: string;
  location: {
    country: string;
    city: string;
    nearestLandmark: string;
    streetName: string;
    propertyNumber: number;
  };
  media: {
    name?: string;
    type?: string;
    url: string;
  }[];
  category: string;
  type: string;
  bedrooms: string | number;
  bathrooms: string | number;
  toilets: string | number;
  parkingSpace: string | number;
  rentalPeriod: string;
  fee: {
    rentalPeriod: string;
    platformFee: string;
    legalFee: string;
    serviceFee: string;
    cautionFee: string;
    estateFee: string;
    currency: string;
    otherFees: {
      name: string;
      fee: number;
    }[];
  };
  furnishedType: string;
  propertyAge: string;
  lotSize: number | null;
  floorArea: number | null;
  floorLevel: number | null;
  servicing: string;
  interiorFeatures: string[];
  exteriorFeatures: string[];
  buildingAmenities: string[];
  kitchenFittings: string[];
  interiorFlooring: string;
  exteriorFlooring: string;

  representativeId: string;
  caretakerId: string;
  status: string;
}
