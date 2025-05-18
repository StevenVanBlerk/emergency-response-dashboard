import { GetPanicRequestData } from "src/api/api";

export const fakeData: GetPanicRequestData[] = [
  {
    id: "panic-1",
    status: "OPEN",
    serviceDisplayName: "Guuber",
    timeOfRequest: "1901-02-03T14:48:00.000Z", // ISO timestamp
    severity: "HIGH",
    location: { lat: "", lng: "", displayValue: "Fancy Frank's sunset beach" },
    user: {
      firstName: "Daisy",
      lastName: " Werthan",
      id: "user-1",
      externalId: "guuber-id-1",
      email: "daisy@driving.com",
      contactNumber: "+27-768854000",
      nextOfKinContactNumber: "+27-768854001",
    },
  },
];
