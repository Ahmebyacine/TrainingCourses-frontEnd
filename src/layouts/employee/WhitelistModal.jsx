import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Edit2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/utils/formatSafeDate";

// ✅ Validation schema
const whitelistSchema = z.object({
  name: z.string().min(2, { message: "يجب أن يتكون الاسم من حرفين على الأقل" }),
  phone: z.string().min(8, { message: "رقم الهاتف غير صالح" }),
  program: z.string().min(1, { message: "الرجاء اختيار برنامج" }),
  note: z.string().optional(),
});

export default function WhitelistModal({
  programs,
  onAddForm,
  onEditForm,
  initialData,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // React Hook Form
  const form = useForm({
    resolver: zodResolver(whitelistSchema),
    defaultValues: {
      name: "",
      phone: "",
      program: "",
      note: "",
    },
  });

  const isEdit = !!initialData;

  // Fill form when editing
  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData?.name || "",
        phone: initialData?.phone || "",
        program: initialData?.program?._id || "",
        note: initialData?.note || "",
      });
    } else {
      form.reset({
        name: "",
        phone: "",
        program: "",
        note: "",
      });
    }
  }, [initialData, form]);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      if (isEdit) {
        await onEditForm({ ...initialData, ...data });
      } else {
        await onAddForm(data);
      }
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger only for Add, not for edit mode */}
      {isEdit ? (
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Edit2 className="h-4 w-4" />
          </Button>
        </DialogTrigger>

      ) : (
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            إضافة حجز جديد
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "تعديل الحجز" : "إضافة حجز جديد"}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? "قم بتعديل بيانات الحجز ثم احفظ التغييرات"
              : "أدخل تفاصيل الحجز الجديد"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* الاسم */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الاسم *</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل الاسم" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* الهاتف */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الهاتف *</FormLabel>
                  <FormControl>
                    <Input placeholder="05xxxxxxxx" dir="ltr" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* البرنامج */}
            <FormField
              control={form.control}
              name="program"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>البرنامج *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            programs.length === 0
                              ? "جاري تحميل البرامج..."
                              : "اختر برنامجًا"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {programs.map((program) => (
                        <SelectItem
                          key={program._id}
                          value={program._id}
                          className="py-3"
                        >
                          <div className="flex flex-col gap-1">
                            <div className="font-medium">
                              {program.course.name}
                            </div>
                            <div className="text-xs text-muted-foreground flex flex-col sm:flex-row sm:items-center">
                              <span>{program.institution?.name}</span>
                              <span className="hidden sm:inline-block sm:mx-1">
                                •
                              </span>
                              <span>
                                {formatDate(program.start_date)} -{" "}
                                {formatDate(program.end_date)}
                              </span>
                              <span className="hidden sm:inline-block sm:mx-1">
                                •
                              </span>
                              <span>{program.trainer?.name}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* الملاحظات */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="أدخل أي ملاحظات إضافية"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? "جاري الحفظ..." : isEdit ? "حفظ التغييرات" : "حفظ"}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline" className="flex-1">
                  إلغاء
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
