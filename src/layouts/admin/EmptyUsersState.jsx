import { User } from "lucide-react";

const EmptyUsersState = () => {
  return (
    <div className="text-center p-8 border border-dashed rounded-lg">
      <User className="mx-auto h-12 w-12 text-muted-foreground" />
      <h3 className="mt-4 text-lg font-semibold">لا توجد مستخدمين متاحين</h3>
      <p className="text-muted-foreground">ابدأ بإضافة مستخدم جديد</p>
    </div>
  );
};

export default EmptyUsersState;
