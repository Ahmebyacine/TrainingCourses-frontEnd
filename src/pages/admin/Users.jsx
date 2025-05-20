import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserCard from "@/layouts/admin/UserCard";
import AddUserModal from "@/layouts/admin/AddUserModel";
import api from "@/services/api";
import ErrorPage from "../common/ErrorPage";
import EmptyUsersState from "@/layouts/admin/EmptyUsersState";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [usersResponse, institutionsResponse] = await Promise.all([
          api.get("/api/user"),
          api.get("/api/institution"),
        ]);
        setUsers(usersResponse.data);
        setInstitutions(institutionsResponse.data);
      } catch (error) {
        setError(error.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddUser = async (data) => {
    try {
      const response = await api.post("/api/user", data);
      setUsers([...users, response.data]);
      setAddDialogOpen(false);
      toast.success("تمت إضافة المستخدم", {
        description: `قام المستخدم ${response.data.name} بإضافة`,
      });
    } catch {
      toast.error("لم تتم إضافة المستخدم");
      setAddDialogOpen(false);
    }
  };

  const handleUpdateUser = async (id, data) => {
    const updateData = { ...data };
    if (!updateData.password) delete updateData.password;
    try {
      const response = await api.put(`/api/user/${id}`, updateData);
      setUsers(users.map((user) => (user._id === id ? response.data : user)));
      setEditingId(null);
      toast.success("تم تحديث المستخدم", {
        description: `قام المستخدم ${response.data.name} بالتحديث`,
      });
    } catch {
      setEditingId(null);
      toast.error("لم يتم تحديث المستخدم");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/api/user/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success("تم حذف المستخدم");
    } catch {
      toast.error("تم حذف المستخدم");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  if (error) return <ErrorPage error={error} />;
  return (
    <div className="container mx-auto py-8 px-5 md:px-10">
      <div className="flex justify-between items-center mb-6 flex-row-reverse">
        <AddUserModal
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          institutions={institutions}
          onAddUser={handleAddUser}
        />
        <h1 className="md:text-3xl text-xl font-bold text-right">المستخدمين</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">جاري تحميل المستخدمين...</p>
        </div>
      ) : users.length === 0 ? (
        <EmptyUsersState />
      ) : (
        <Tabs defaultValue="employee" dir='rtl'>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="employee">الموظفين</TabsTrigger>
            <TabsTrigger value="member">الأعضاء</TabsTrigger>
            <TabsTrigger value="manager">المديرين</TabsTrigger>
          </TabsList>

          <TabsContent value="employee">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {users
                .filter((user) => user.role === "employee")
                .map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    institutions={institutions}
                    editingId={editingId}
                    formatDate={formatDate}
                    onStartEditing={setEditingId}
                    onUpdateUser={handleUpdateUser}
                    onDeleteUser={handleDeleteUser}
                  />
                ))}
              </div>
              {users
                .filter((user) => user.role === "employee").length === 0 && (
                  <EmptyUsersState />
                )}
          </TabsContent>

          <TabsContent value="manager">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {users
                .filter((user) => user.role === "manager")
                .map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    institutions={institutions}
                    editingId={editingId}
                    formatDate={formatDate}
                    onStartEditing={setEditingId}
                    onUpdateUser={handleUpdateUser}
                    onDeleteUser={handleDeleteUser}
                  />
                ))}
            </div>
            {users
              .filter((user) => user.role === "manager").length === 0 && (
                <EmptyUsersState />
              )}
          </TabsContent>

          <TabsContent value="member">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {users
                .filter((user) => user.role === "member")
                .map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    institutions={institutions}
                    editingId={editingId}
                    formatDate={formatDate}
                    onStartEditing={setEditingId}
                    onUpdateUser={handleUpdateUser}
                    onDeleteUser={handleDeleteUser}
                  />
                ))}
            </div>
              {users
              .filter((user) => user.role === "member").length === 0 && (
                <EmptyUsersState />
              )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}