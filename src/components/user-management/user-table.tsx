import { type ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import type { UserResource, UserRole } from "@/types";
import { UserDialog } from "./user-dialog";

interface UserTableProps {
  users: UserResource[];
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  pageSize: number;
  totalUsers: number;
  groups: UserRole[];
  isLoadingGroups: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function UserTable({
  users,
  isLoading,
  isError,
  currentPage,
  pageSize,
  totalUsers,
  groups,
  isLoadingGroups,
  onPageChange,
  onPageSizeChange,
}: UserTableProps) {
  const navigate = useNavigate();

  // Table columns for users
  const userColumns: ColumnDef<UserResource>[] = [
    {
      accessorKey: "username",
      header: "Username",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("username")}</div>
      ),
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "enabled",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.getValue("enabled") ? "default" : "secondary"}>
          {row.getValue("enabled") ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      accessorKey: "groups",
      header: "Group",
      cell: ({ row }) => {
        const groups = row.getValue("groups") as string[];
        return (
          <div className="flex flex-wrap gap-1">
            {groups?.slice(0, 2).map((group) => (
              <Badge key={group} variant="outline" className="text-xs">
                {group}
              </Badge>
            ))}
            {groups?.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{groups.length - 2}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              navigate({
                to: "/user-details",
                search: { userId: user.id },
              })
            }
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
        );
      },
    },
  ];

  // Convert 0-based to 1-based pagination for DataTable
  const currentPageOneBased = currentPage + 1;

  const handlePageChange = (page: number) => {
    // Convert 1-based back to 0-based for parent component
    onPageChange(page - 1);
  };

  return (
    <div className="space-y-4">
      {/* Header with add user button */}
      <div className="flex justify-end">
        <UserDialog groups={groups} isLoading={isLoadingGroups} />
      </div>

      {/* Data table with built-in pagination */}
      <DataTable
        columns={userColumns}
        data={users}
        loading={isLoading}
        currentPage={currentPageOneBased}
        pageSize={pageSize}
        totalCount={totalUsers}
        onPageChange={handlePageChange}
        onPageSizeChange={onPageSizeChange}
      />

      {/* Error message */}
      {isError && (
        <div className="py-6 text-center text-orange-500">
          Error loading users. Please try again.
        </div>
      )}
    </div>
  );
}
