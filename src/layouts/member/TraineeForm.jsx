import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { Plus } from "lucide-react";

export default function TraineeForm({
  currentTrainee,
  setCurrentTrainee,
  errors,
  editingIndex,
  handleSaveTrainee,
}) {
  const handleInputChange = (e) => {
    setCurrentTrainee({
      ...currentTrainee,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (date) => {
    setCurrentTrainee({
      ...currentTrainee,
      birthDate: date,
    });
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold mb-4 pb-2 border-b">
        {editingIndex !== null ? "تعديل متدرب" : "إضافة متدرب"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">الاسم الكامل</Label>
          <Input
            id="fullName"
            name="fullName"
            value={currentTrainee.fullName}
            onChange={handleInputChange}
            placeholder="أدخل الاسم الكامل"
          />
          {errors?.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>تاريخ الميلاد</Label>
          <Input
            type="date"
            value={
              currentTrainee.birthDate
                ? format(currentTrainee.birthDate, "yyyy-MM-dd")
                : ""
            }
            onChange={(e) => handleDateChange(new Date(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthPlace">مكان الميلاد</Label>
          <Input
            id="birthPlace"
            name="birthPlace"
            value={currentTrainee.birthPlace}
            onChange={handleInputChange}
            placeholder="أدخل مكان الميلاد"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="wilaya">الولاية</Label>
          <Input
            id="wilaya"
            name="wilaya"
            value={currentTrainee.wilaya}
            onChange={handleInputChange}
            placeholder="أدخل الولاية"
          />
        </div>
      </div>
      <div className="flex items-end mt-5 w-[30%]">
        <Button
          type="button"
          onClick={handleSaveTrainee}
          className="w-full"
          disabled={!currentTrainee.fullName}
        >
          {editingIndex !== null ? (
            "تحديث المتدرب"
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" /> إضافة متدرب
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
