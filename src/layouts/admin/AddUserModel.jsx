import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(10),
  nationalId: z.string().min(1),
  role: z.enum(["employee", "manager", "member"]),
  institutions: z.array(z.string()).optional(),
});

export default function AddUserModal({
  open,
  onOpenChange,
  institutions,
  onAddUser,
}) {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      nationalId: "",
      role: "employee",
      institutions: [],
    },
  });

  const handleSubmit = (data) => {
    onAddUser(data);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          إضافة مستخدم
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>إضافة مستخدم جديد</DialogTitle>
          <DialogDescription>
            قم بملء التفاصيل لإضافة مستخدم جديد.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم *</FormLabel>
                  <FormControl>
                    <Input placeholder="الاسم الكامل" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>البريد الإلكتروني *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="عنوان البريد الإلكتروني"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>كلمة المرور *</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="كلمة المرور"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الهاتف *</FormLabel>
                  <FormControl>
                    <Input placeholder="رقم الهاتف" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nationalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الرقم الوطني *</FormLabel>
                  <FormControl>
                    <Input placeholder="الرقم الوطني" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الدور *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر دور المستخدم" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="employee">موظف</SelectItem>
                      <SelectItem value="manager">مدير</SelectItem>
                      <SelectItem value="member">عضو</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institutions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المؤسسات</FormLabel>
                  <FormControl>
                    <div className="border rounded-md p-2">
                      <ScrollArea className="h-15">
                        <div className="space-y-2">
                          {institutions.map((institution) => (
                            <div
                              key={institution._id}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                id={`add-inst-${institution._id}`}
                                checked={field.value.includes(institution._id)}
                                onChange={() => {
                                  const newValue = field.value.includes(
                                    institution._id
                                  )
                                    ? field.value.filter(
                                        (id) => id !== institution._id
                                      )
                                    : [...field.value, institution._id];
                                  field.onChange(newValue);
                                }}
                                className="h-4 w-4 rounded border-gray-300"
                              />
                              <label
                                htmlFor={`add-inst-${institution._id}`}
                                className="text-sm"
                              >
                                {institution.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">إضافة مستخدم</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
