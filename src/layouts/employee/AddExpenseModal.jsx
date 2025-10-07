import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/utils/formatSafeDate";

const expenseSchema = z.object({
  title: z
    .string()
    .min(2, { message: "يجب أن يتكون العنوان من حرفين على الأقل" }),
  program: z.string(),
  amount: z.number().min(1, { message: "يجب أن يكون المبلغ أكبر من الصفر" }),
  note: z.string().optional(),
});

export default function AddExpenseModal({
  open,
  onOpenChange,
  onAddExpense,
  programs,
}) {
  const form = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      title: "",
      amount: 0,
      program: programs.length === 1 ? programs[0]?._id : "",
      note: "",
    },
  });

  const handleSubmit = (data) => {
    onAddExpense(data);
    form.reset();
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          إضافة مصروف
        </Button>
      </DialogTrigger>
      <DialogContent className="md:!max-w-[600px]">
        <DialogHeader>
          <DialogTitle>إضافة مصاريف جديدة</DialogTitle>
          <DialogDescription>
            قم بملء التفاصيل لإضافة مصاريف جديدة.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
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
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العنوان *</FormLabel>
                  <FormControl>
                    <Input placeholder="عنوان المصاريف" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المبلغ *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="المبلغ"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات</FormLabel>
                  <FormControl>
                    <Input placeholder="ملاحظات إضافية" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">إضافة مصاريف</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
