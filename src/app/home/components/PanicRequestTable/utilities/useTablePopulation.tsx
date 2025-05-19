"use client";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { getPanicRequests } from "src/app/api/panicRequest/getPanicRequests";
import { useColumns } from "./useColumns";

const useTablePopulation = () => {
  const {
    data: getPanicRequestsData,
    isLoading: isGetPanicRequestsLoading,
    isError: isGetPanicRequestsErrored,
    error: getPanicRequestsError,
  } = useQuery({
    queryKey: ["getPanicRequests"],
    queryFn: getPanicRequests,
  });

  const columns = useColumns();

  const table = useReactTable({
    data: getPanicRequestsData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return {
    table,
    columns,
    isTableLoading: isGetPanicRequestsLoading,
    isTableErrored: isGetPanicRequestsErrored,
    error: getPanicRequestsError,
  };
};

export default useTablePopulation;
