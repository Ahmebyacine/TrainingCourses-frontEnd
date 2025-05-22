import { getTokenData } from "@/services/auth";
import LogoutButton from "./LogoutBotton";

const UserMenu = () => {
  const { name, email } = getTokenData();
  return (
    <div className="border-t p-4">
      <div className="flex items-center gap-3">
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-medium leading-none">
            {name || "مستخدم غير معروف"}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {email || "مستخدم غير معروف"}
          </p>
        </div>
      </div>
      <LogoutButton/>
    </div>
  );
};

export default UserMenu;
