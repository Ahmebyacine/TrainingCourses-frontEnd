import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// ✅ Validation schema
const confirmTraineeSchema = z.object({
  name: z.string().min(2, { message: "يجب أن يتكون الاسم من حرفين على الأقل" }),
  email: z
    .string()
    .email({ message: "يرجى إدخال عنوان بريد إلكتروني صالح" })
    .optional(),
  phone: z.string().min(10, { message: "يرجى إدخال رقم هاتف صحيح" }),
  program: z.string({ required_error: "الرجاء اختيار البرنامج" }),
  inialTranche: z.coerce.number().min(0).optional(),
  secondTranche: z.coerce.number().min(0).optional(),
  methodePaiement1: z.string().optional(),
  discount: z.coerce.number().min(0).optional(),
  rest: z.coerce.number().min(0).optional(),
  totalPrice: z.coerce.number().min(0).optional(),
  note: z.string().optional(),
});

export default function ConfirmTraineeModal({
  programs,
  onSubmitForm,
  onDeleteForm,
  initialData,
}) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(confirmTraineeSchema),
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      program: initialData?.program?._id || "",
      inialTranche: 0,
      secondTranche: 0,
      methodePaiement1: "cash",
      discount: 0,
      totalPrice: 0,
      note: initialData?.note || "",
    },
  });

  useEffect(() => {
    const selectedProgramId = form.watch("program");
    const selectedDiscount = form.watch("discount");
    const selectedProgram = programs.find(
      (program) => program._id === selectedProgramId
    );

    if (selectedProgram) {
      form.setValue(
        "totalPrice",
        selectedProgram.course.price - (selectedDiscount || 0)
      );
      form.setValue("initialTranche", 0);
      form.setValue("secondTranche", 0);
      form.setValue("rest", 0);
    }
  }, [form.watch("program"), programs, form.setValue, form.watch("discount")]);

  const handleSubmit = async (data) => {
    await onSubmitForm(data);
    await onDeleteForm(initialData?._id);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">تأكيد المتدرب</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>تأكيد تسجيل المتدرب</DialogTitle>
          <DialogDescription>
            يرجى ملء النموذج أدناه لتأكيد تسجيل المتدرب.
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>البريد الإلكتروني *</FormLabel>
                  <FormControl>
                    <Input placeholder="أدخل البريد الإلكتروني" dir="ltr" {...field} />
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

            {/* Payment Information */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-4">معلومات الدفع</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Initial Tranche Field */}
                <FormField
                  control={form.control}
                  name="inialTranche"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>القسط الأولي</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Total Price Field */}
                <FormField
                  control={form.control}
                  name="totalPrice"
                  render={({ field }) => (
                    <FormItem className="col-span-full">
                      <FormLabel>المبلغ الإجمالي</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          readOnly
                          disabled={true}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* methode of payment Field */}
                <FormField
                  control={form.control}
                  name="methodePaiement1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>طريقة الدفع</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر طريقة الدفع" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cash">نقدي</SelectItem>
                            <SelectItem value="baridimob">
                              بريدي موب - Baridimob
                            </SelectItem>
                            <SelectItem value="cpp">
                              تحويل بريدي - cpp
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Discount Field */}
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الخصم</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="flex col-span-2 gap-4 overflow-auto scroll-hidden"
                        >
                          {[0, 2000, 4000, 5000].map((val) => (
                            <FormItem key={val}>
                              <FormControl>
                                <RadioGroupItem
                                  value={val}
                                  id={val}
                                  className="peer hidden"
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor={val}
                                className={cn(
                                  "cursor-pointer rounded-2xl border px-6 py-3 text-center transition",
                                  "hover:border-primary/70",
                                  field.value === val
                                    ? "bg-primary/20 border-primary"
                                    : ""
                                )}
                              >
                                {val} دج
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {/* Note Field */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ملاحظات</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="أضف أي ملاحظات إضافية هنا"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="submit" className="flex-1">
                حفظ
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
