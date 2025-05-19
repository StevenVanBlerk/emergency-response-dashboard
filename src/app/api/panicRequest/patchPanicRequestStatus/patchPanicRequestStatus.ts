type patchPanicRequestStatusParams = {
  id: string;
  status: "OPEN" | "ACKNOWLEDGED" | "DISPATCHED" | "RESOLVED";
};

export type PatchPanicRequestStatusResponseData = {
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

export const patchPanicRequestStatus = async (
  body: patchPanicRequestStatusParams,
): Promise<PatchPanicRequestStatusResponseData> => {
  const res = await fetch("/api/panicRequest/patchPanicRequestStatus", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error("Failed to update panic request status");
  }

  return res.json();
};
