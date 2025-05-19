import { NextResponse } from "next/server";
import { emergencyResponseAPI } from "src/app/api/api";
import { GetPanicRequestData } from "./getPanicRequests";

export async function GET() {
  try {
    const response =
      await emergencyResponseAPI.get<GetPanicRequestData>("/panic");
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching panic data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
