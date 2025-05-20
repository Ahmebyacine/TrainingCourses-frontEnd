import { useState, useEffect } from "react";
import { User } from "lucide-react";
import TrainerCard from "@/layouts/admin/TrainerCard";
import AddTrainerModal from "@/layouts/admin/AddTrainerModal";
import api from "@/services/api";
import { toast } from "sonner";
import ErrorPage from "../common/ErrorPage";

export default function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  useEffect(() => {
    const fetchTrainers = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/api/trainer");
        setTrainers(response.data);
      } catch (err) {
        setError(err.response?.data?.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrainers();
  }, []);

  const handleAddTrainer = async (data) => {
    try {
      const response = await api.post("/api/trainer", data);
      setAddDialogOpen(false);
      setTrainers([...trainers, response.data]);
      toast.success("تمت إضافة المدرب", {
        description: `تمت إضافة المدرب ${response.data.name}`,
      });
    } catch {
      toast.error("لم تتم إضافة المدرب");
      setAddDialogOpen(false);
    }
  };

  const handleUpdateTrainer = async (data) => {
    try {
      const response = await api.put(`/api/trainer/${editingId}`, data);
      const updatedTrainer = response.data;
      setTrainers(
        trainers.map((t) => (t._id === editingId ? updatedTrainer : t))
      );
      setEditingId(null);
      toast.success("تم تحديث المدرب", {
        description: `تم تحديث بيانات المدرب ${response.data.name}`,
      });
    } catch {
      setTrainers(
        trainers.map((t) => (t._id === editingId ? { ...t, ...data } : t))
      );
      setEditingId(null);
      toast.error("لم يتم تحديث المدرب");
    }
  };

  const handleDeleteTrainer = async (id) => {
    try {
      await api.delete(`/api/trainer/${id}`);
      setTrainers(trainers.filter((t) => t._id !== id));
      toast.success("تم حذف المدرب", {
        description: "تمت إزالة المدرب بنجاح",
      });
    } catch {
      toast.error("لم يتم حذف المدرب");
    }
  };

  if (error) return <ErrorPage error={error} />;

  return (
    <div className="w-full mx-auto py-8 px-5 md:px-10" dir="rtl">
      <div className="flex justify-between items-center mb-6 flex-row-reverse">
        <AddTrainerModal
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          onAddTrainer={handleAddTrainer}
        />
        <h1 className="md:text-3xl text-xl font-bold text-right">المدربون</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">جاري تحميل المدربين...</p>
        </div>
      ) : trainers.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <User className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">لا يوجد مدربون مسجلون</h3>
          <p className="text-muted-foreground">ابدأ بإضافة مدرب جديد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer) => (
            <TrainerCard
              key={trainer._id}
              trainer={trainer}
              editingId={editingId}
              onStartEditing={setEditingId}
              onUpdateTrainer={handleUpdateTrainer}
              onDeleteTrainer={handleDeleteTrainer}
            />
          ))}
        </div>
      )}
    </div>
  );
}
