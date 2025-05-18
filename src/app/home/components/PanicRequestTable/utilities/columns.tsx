import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { GetPanicRequestData } from "src/api/api";
import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/designSystem/components";

export const columns: ColumnDef<GetPanicRequestData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div>{row.original.status}</div>,
  },
  {
    accessorKey: "user.firstName",
    header: "First Name",
    cell: ({ row }) => <div>{row.original.user.firstName}</div>,
  },
  {
    accessorKey: "user.lastName",
    header: "Last name",
    cell: ({ row }) => <div>{row.original.user.lastName}</div>,
  },
  {
    accessorKey: "timeOfRequest",
    header: "Time of request",
    cell: ({ row }) => <div>{row.original.timeOfRequest}</div>,
  },
  {
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => <div>{row.original.serviceDisplayName}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
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
              onClick={() => alert("This functionality is not yet supported.")}
            >
              Escalate event
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Reopen</DropdownMenuItem>
            <DropdownMenuItem>Acknowledge</DropdownMenuItem>
            <DropdownMenuItem>Resolve</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Dispatch medical assistance</DropdownMenuItem>
            <DropdownMenuItem>Dispatch security force</DropdownMenuItem>
            <DropdownMenuItem>Dispatch law enforcement</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
