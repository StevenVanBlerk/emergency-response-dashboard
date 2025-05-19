export type GetPanicRequestData = {
  id: string;
  status: "OPEN" | "ACKNOWLEDGED" | "DISPATCHED" | "RESOLVED";
  aidRequired: "AMBULANCE" | "POLICE" | "SECURITY";
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
export const getPanicRequests = async (): Promise<{
  data: GetPanicRequestData[];
}> => {
  const res = await fetch("/api/panicRequest/getPanicRequests", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Bearer ${token}`, // TO-DO: Add auth once the API support auth
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch panic requests");
  }

  return res.json();
};
