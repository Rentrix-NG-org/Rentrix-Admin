interface Country {
  name: string;
}

interface City {
  name: string;
  country: Country;
}

interface Location {
  id: string;
  address: string | null;
  nearestLandmark: string;
  streetName: string;
  propertyNumber: number;
  city: City;
}

interface Owner {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  photoUrl: string | null;
  dateOfBirth: string;
  type: string;
  account: {
    id: string;
    email: string;
  };
}

interface Media {
  url: string;
  title: string;
  format: string;
  type: string;
}

interface Fees {
  fee: string;
  legalFee: string;
  serviceFee: string;
  cautionFee: string;
  estateFee: string;
  otherFees: {
    fee: number;
    name: string;
  }[];
  rentalPeriod: string;
  priceCurrency: string;
}

export interface IListing {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  label: string;
  currentlyLivedIn: boolean;
  availabilityStatus: string;
  category: string;
  type: string;
  propertyType: PropertyType;
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  parkingSpace: number;
  interiorFeatures: string[];
  exteriorFeatures: string[];
  kitchenFittings: string[];
  interiorFlooring: string;
  exteriorFlooring: string;
  furnishedType: string;
  servicing: string;
  propertyAge: string;
  lotSize: number;
  floorArea: number;
  builtYear: number;
  builtMonth: string;
  floorLevel: number;
  isDraft: boolean;
  fee: Fees;
  location: Location;
  owner: Owner;
  media: Media[];
}

export enum PropertyType {
  Apartment = "Apartment",
  DetachedBungalow = "Detached Bungalow",
  DetachedDuplex = "Detached Duplex",
  Flat = "Flat",
  SelfContain = "Self Contain",
  SemiDetachDuplex = "Semi Detach Duplex",
  SemiDetachedBungalow = "Semi Detached Bungalow",
  StudioApartment = "Studio Apartment",
  TerracedBungalow = "Terraced Bungalow",
  TerracedDuplex = "Terraced Duplex",
}

export const InteriorFeaturesLabel: { [key: string]: string } = {
  "air-conditioning": "Air Conditioning",
  "break-rooms": "Break Rooms",
  "built-in-appliances": "Built-In Appliances",
  "conference-rooms": "Conference Rooms",
  "ensuite-bathroom": "Ensuite Bathroom",
  fireplace: "Fireplace",
  furnished: "Furnished",
  "hardwood-floors": "Hardwood Floors",
  "high-ceilings": "High Ceilings",
  "modern-finishes": "Modern Finishes",
  "modern-kitchen": "Modern Kitchen",
  "open-plan-areas": "Open Plan Areas",
  "prepaid-meter": "Prepaid Meter",
  "private-offices": "Private Offices",
  unfurnished: "Unfurnished",
  "walk-in-closet": "Walk-In Closet",
  wardrobe: "Wardrobe",
};

export const ExteriorFeaturesLabel: { [key: string]: string } = {
  balcony: "Balcony",
  cctv: "CCTV",
  garage: "Garage",
  garden: "Garden",
  generator: "Generator",
  parking: "Parking",
  patio: "Patio",
  pool: "Pool",
  "rooftop-terrace": "Rooftop Terrace",
  security: "Security",
  "security-house": "Security House",
  "solar-panel": "Solar Panel",
};

export const KitchenFittingsLabel: { [key: string]: string } = {
  "exhaust-hood": "Exhaust Hood",
  "extractor-fan": "Extractor Fan",
  "gas-hob": "Gas Hob",
  microwave: "Microwave",
  oven: "Oven",
};

export const FlooringTypesLabel: { [key: string]: string } = {
  bamboo: "Bamboo",
  carpet: "Carpet",
  cemented: "Cemented",
  "ceramic-tiles": "Ceramic Tiles",
  concrete: "Concrete",
  cork: "Cork",
  "engineered-wood": "Engineered Wood",
  epoxy: "Epoxy",
  hardwood: "Hardwood",
  interlocking: "Interlocking",
  laminate: "Laminate",
  linoleum: "Linoleum",
  marble: "Marble",
  "rubber-tiles": "Rubber Tiles",
  stamping: "Stamping",
  stone: "Stone",
  terrazzo: "Terrazzo",
  tile: "Tile",
  vinyl: "Vinyl",
};

export interface SessionRange {
  id: number | string;
  start: {
    hour: string;
    minute: string;
  };
  end: {
    hour: string;
    minute: string;
  };
  selected: boolean;
}
