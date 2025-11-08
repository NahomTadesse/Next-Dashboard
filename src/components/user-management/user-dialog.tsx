import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { apiEndpoints } from "@/services/api";
import type { UserRole, UserRegistrationRequest } from "@/types";

interface UserDialogProps {
  groups: UserRole[];
  isLoading?: boolean;
}

export function UserDialog({ groups, isLoading }: UserDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newUser, setNewUser] = useState<UserRegistrationRequest>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    emailVerified: true,
    attributes: {},
    groups: [],
    realmRoles: [],
    totp: true,
  });

  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: (userData: UserRegistrationRequest) =>
      apiEndpoints.userRoleManagement.createUser(userData),
    onSuccess: () => {
      toast.success("User created successfully");
      setIsOpen(false);
      resetUserForm();
      queryClient.invalidateQueries({ queryKey: ["usersAllowedToStart"] });
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);

      // Extract error message from response
      let errorMessage = "Failed to create user";

      if (error?.response?.data?.statusDesc) {
        errorMessage = error.response.data.statusDesc;
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    },
  });

  const resetUserForm = () => {
    setNewUser({
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      emailVerified: true,
      attributes: {},
      groups: [],
      realmRoles: [],
      totp: true,
    });
  };

  const handleUserInputChange = (
    field: keyof UserRegistrationRequest,
    value: string | string[] | boolean,
  ) => {
    setNewUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGroupChange = (groupName: string) => {
    setNewUser((prev) => ({
      ...prev,
      groups: groupName && groupName !== "none" ? [groupName] : [],
      realmRoles: groupName && groupName !== "none" ? [groupName] : [],
    }));
  };

  const handleSubmit = () => {
    createUserMutation.mutate(newUser);
  };

  const isFormValid = newUser.username.trim() && newUser.email.trim();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          <span>Add User</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={newUser.username}
              onChange={(e) =>
                handleUserInputChange("username", e.target.value)
              }
              disabled={createUserMutation.isPending}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={newUser.email}
              onChange={(e) => handleUserInputChange("email", e.target.value)}
              disabled={createUserMutation.isPending}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={newUser.firstName}
              onChange={(e) =>
                handleUserInputChange("firstName", e.target.value)
              }
              disabled={createUserMutation.isPending}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={newUser.lastName}
              onChange={(e) =>
                handleUserInputChange("lastName", e.target.value)
              }
              disabled={createUserMutation.isPending}
            />
          </div>
          <div className="grid gap-2">
            <Label>Group</Label>
            <Select
              value={newUser.groups[0] || "none"}
              onValueChange={handleGroupChange}
              disabled={createUserMutation.isPending || isLoading}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    isLoading ? "Loading groups..." : "Select a group"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No group</SelectItem>
                {groups?.map((group) => (
                  <SelectItem key={group.id} value={group.name}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(!groups || groups.length === 0) && !isLoading && (
              <div className="text-sm text-muted-foreground">
                No groups available
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid || createUserMutation.isPending}
          >
            {createUserMutation.isPending ? "Creating..." : "Add User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
