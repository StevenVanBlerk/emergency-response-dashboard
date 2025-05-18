export type GetPanicRequestData = {
  id: string;
  status: "OPEN" | "ACKNOWLEDGED" | "DISPATCHED" | "RESOLVED";
  serviceDisplayName: string; // "Guuber"
  timeOfRequest: string; // ISO timestamp
  severity: "LOW" | "MEDIUM" | "HIGH";
  location: {
    lat: string;
    lng: string;
    displayValue: string;
  };
  user: {
    firstName: string;
    lastName: string;
    id: string;
    externalId: string;
    email: string;
    contactNumber: string; // "+27-768854000"
    nextOfKinContactNumber: string; // "+27-768854001"
  };
};
