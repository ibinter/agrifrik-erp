import { NextResponse } from "next/server";
import type { DashboardStats } from "@/lib/types";

export async function GET(): Promise<NextResponse<DashboardStats>> {
  const stats: DashboardStats = {
    chiffreAffaires: { value: 148500000, change: 12.4, unit: "XOF" },
    superficie: { value: 1240, change: 3, unit: "ha" },
    production: { value: 48.2, change: -2.1, unit: "tonnes" },
    employes: { value: 287, change: 12, unit: "personnes" },
    stocks: { value: 94.3, change: 0, unit: "tonnes" },
    commandes: { value: 23, change: 8, unit: "commandes" },
  };

  return NextResponse.json(stats);
}
