import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { pdf } from "@react-pdf/renderer";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import CertificatConformite from "@/utils/PDF/member/CertificatConformite";

const formSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  customer: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  manufacturer: z.string().optional(),
  model: z.string().min(2, {
    message: "Model must be at least 2 characters.",
  }),
  workingLoadLimit: z.string().min(1, {
    message: "Working load limit is required.",
  }),
  yearOfManufacture: z.string().min(4, {
    message: "Year of manufacture must be valid.",
  }),
  dateOfInspection: z.string().min(1, {
    message: "Date of inspection is required.",
  }),
  serialNumber: z.string().min(1, {
    message: "Serial number is required.",
  }),
  reportRef: z.string().min(1, {
    message: "report reference is required.",
  }),
});

export default function EquipmentInspectionForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "PELLE HYDRAULIQUE",
      customer: "SARL SOCIETE GABOUS TRAVAUX PUBLICS",
      manufacturer: "[à] [s] [ult]",
      model: "R210LC-7",
      workingLoadLimit: "12TONNE",
      yearOfManufacture: "2010",
      dateOfInspection: "02-04-2025",
      serialNumber: "N6061A114(IMM: 42-04530-39)",
      reportRef: "RFC232/32",
    },
  });

  async function onSubmit(values) {
    try {
      const blob = await pdf(<CertificatConformite values={values} />).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "certificat-conformite.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Equipment data saved and PDF downloaded!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto" dir="ltr">
      <CardHeader>
        <CardTitle>Equipment Inspection Form</CardTitle>
        <CardDescription>
          Enter the details of the equipment inspection below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Produit)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer (Client)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter customer name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="manufacturer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacturer (Fabricant)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter manufacturer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model (Type)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter model" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workingLoadLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Working Load Limit (Charge maxi. Utilization)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter working load limit"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="yearOfManufacture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Year of Manufacture (Année de fabrication)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter year of manufacture"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfInspection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Date of Inspection (Date d'inspection)
                    </FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="serialNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Serial Number (Numéro de série)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter serial number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reportRef"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Report Refrence (Numéro de repost)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter report Ref" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Equipment Data
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
