import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { GetPanicRequestData } from "src/app/api/panicRequest/getPanicRequests";
import { patchPanicRequestStatus } from "src/app/api/panicRequest/patchPanicRequestStatus";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/designSystem/components";
import dayjs from "dayjs";
import NextImage from "next/image";
import PhoneIcon from "src/designSystem/icons/phone.svg";

export const useColumns = (): ColumnDef<GetPanicRequestData>[] => {
  const queryClient = useQueryClient();

  const { mutate: mutatePanicRequestStatus } = useMutation({
    mutationFn: patchPanicRequestStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getPanicRequests"] }); // ensuring table data is refetched on success
    },
  });

  return [
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="min-w-[130px]">{row?.original?.status}</div>
      ),
    },
    {
      accessorKey: "severity",
      header: "Severity",
      cell: ({ row }) => {
        const severity = row.original.severity;
        const severityColor =
          severity === "HIGH"
            ? "bg-[#d50303]"
            : severity === "MEDIUM"
              ? "bg-[#ff61d7]"
              : severity === "LOW"
                ? "bg-[#954aea]"
                : "bg-[#000000]";
        return (
          <div className="flex items-center gap-0.5">
            <div
              className={`h-[10px] w-[10px] rounded-full ${severityColor}`}
            />
            {row?.original?.severity}
          </div>
        );
      },
    },
    {
      accessorKey: "aidRequired",
      header: "Aid required",
      cell: ({ row }) => (
        <div className="min-w-[100px]">{row?.original?.aidRequired}</div>
      ),
    },
    {
      accessorKey: "user.firstName",
      header: "First Name",
      cell: ({ row }) => (
        <div className="min-w-[100px]">{row?.original?.user?.firstName}</div>
      ),
    },
    {
      accessorKey: "user.lastName",
      header: "Last name",
      cell: ({ row }) => (
        <div className="min-w-[100px]">{row?.original?.user?.lastName}</div>
      ),
    },
    {
      accessorKey: "timeOfRequest",
      header: "Time of request",
      cell: ({ row }) => (
        <div className="min-w-[160px]">
          {dayjs(row?.original?.timeOfRequest).format("YYYY-MM-DD HH[h]mm[m]")}
        </div>
      ),
    },
    {
      accessorKey: "service",
      header: "Service",
      cell: ({ row }) => <div>{row?.original?.serviceDisplayName}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const aidRequired = row?.original?.aidRequired;
        return (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Phone user"
              onClick={() => alert("This functionality is not yet supported.")}
            >
              <NextImage
                src={PhoneIcon}
                width={16}
                height={16}
                alt="Phone icon"
              />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel hidden>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() =>
                    alert("This functionality is not yet supported.")
                  }
                >
                  Escalate event
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  disabled={row.original.status === "OPEN"}
                  onClick={() => {
                    mutatePanicRequestStatus({
                      id: row.original.id,
                      status: "OPEN",
                    });
                  }}
                >
                  Reopen
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={row.original.status === "ACKNOWLEDGED"}
                  onClick={() => {
                    console.log("row", row);
                    mutatePanicRequestStatus({
                      id: row.original.id,
                      status: "ACKNOWLEDGED",
                    });
                  }}
                >
                  Acknowledge
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={row.original.status === "RESOLVED"}
                  onClick={() => {
                    mutatePanicRequestStatus({
                      id: row.original.id,
                      status: "RESOLVED",
                    });
                  }}
                >
                  Resolve
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() =>
                    alert("This functionality is not yet supported.")
                  }
                  className={aidRequired === "AMBULANCE" ? "font-semibold" : ""}
                >
                  Dispatch ambulance
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    alert("This functionality is not yet supported.")
                  }
                  className={aidRequired === "SECURITY" ? "font-semibold" : ""}
                >
                  Dispatch security
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    alert("This functionality is not yet supported.")
                  }
                  className={aidRequired === "POLICE" ? "font-semibold" : ""}
                >
                  Dispatch police
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
