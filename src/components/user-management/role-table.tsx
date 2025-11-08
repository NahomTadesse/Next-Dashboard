import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";

interface RoleTableProps {
  roles: UserRole[];
  isLoading: boolean;
  isError: boolean;
  currentPage: number;
  pageSize: number;
  totalroles: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export type UserRole = string;

export function RoleTable({
  roles,
  isLoading,
  isError,
  currentPage,
  pageSize,
  totalroles,
  onPageChange,
  onPageSizeChange,
}: RoleTableProps) {
  // Table columns for roles
  const groupColumns: ColumnDef<UserRole>[] = [
    {
      accessorKey: "roleName",
      header: "Role Name",
      cell: ({ row }) => <div className="font-medium">{row.original}</div>,
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
      {/* Data table with built-in pagination */}
      <DataTable
        columns={groupColumns}
        data={roles}
        loading={isLoading}
        currentPage={currentPageOneBased}
        pageSize={pageSize}
        totalCount={totalroles}
        onPageChange={handlePageChange}
        onPageSizeChange={onPageSizeChange}
      />

      {/* Error message */}
      {isError && (
        <div className="py-6 text-center text-orange-500">
          Error loading roles. Please try again.
        </div>
      )}
    </div>
  );
}
