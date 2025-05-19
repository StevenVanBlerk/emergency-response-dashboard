import { NextRequest, NextResponse } from "next/server";
import { emergencyResponseAPI } from "src/app/api/api";
import { PatchPanicRequestStatusResponseData } from "./patchPanicRequestStatus";

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    const response =
      await emergencyResponseAPI.patch<PatchPanicRequestStatusResponseData>(
        `/panic/${id}`,
        { status },
      );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error patching panic data:", error);
    return NextResponse.json(
      { error: "Failed to patch data" },
      { status: 500 },
    );
  }
}
