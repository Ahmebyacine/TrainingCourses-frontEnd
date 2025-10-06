import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/services/api";
import { X, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import ErrorPage from "../common/ErrorPage";
import { toast } from "sonner";
import { formatDate } from "@/utils/formatSafeDate";
import WhitelistModal from "@/layouts/employee/WhitelistModal";

export default function Lead() {
  const [leads, setLeads] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all programs
  const fetchPrograms = async () => {
    try {
      const programsResponse = await api.get("/api/program/employee");
      setPrograms(programsResponse.data);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };
  // Fetch all leads
  const fetchLeads = async () => {
    try {
      const response = await api.get("/api/lead/employee");
      setLeads(response.data);
    } catch (error) {
      console.error("Error fetching leads:", error);
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchPrograms();
  }, []);

  // Call lead
  const calledLead = async (lead) => {
    try {
      const response = await api.put(`/api/lead/${lead._id}`, {
        status: "called",
      });

      setLeads((prev) =>
        prev.map((l) => (l._id === lead._id ? response.data : l))
      );

      toast.success("تم تحديث حالة العميل إلى 'تم الاتصال'");
    } catch (error) {
      console.error("Error confirming lead:", error);
      toast.error("حدث خطأ أثناء تحديث حالة العميل");
    }
  };

  // Confirm lead → move to whitelist
  const confirmLead = async (lead) => {
    try {
      await api.post("/api/whitelist", {
        name: lead.name,
        phone: lead.phone,
        program: lead.program,
        notes: lead.notes,
      });

      // Remove lead from list
      setLeads((prev) => prev.filter((l) => l._id !== lead._id));

      toast.success("تم تحويل القيد إلى قائمة التسجيل بنجاح");
    } catch (error) {
      console.error("Error confirming lead:", error);
      toast.error("حدث خطأ أثناء تأكيد القيد");
    }
  };

  // Canceled lead
  const canceledLead = async (lead) => {
    try {
      const response = await api.put(`/api/lead/${lead._id}`, {
        status: "canceled",
      });
      setLeads((prev) =>
        prev.map((l) => (l._id === lead._id ? response.data : l))
      );
      toast.success("تم حذف القيد بنجاح");
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast.error("حدث خطأ أثناء حذف القيد");
    }
  };

  // Delete lead
  const deleteLead = async (id) => {
    try {
      await api.delete(`/api/lead/${id}`);
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
      toast.success("تم حذف القيد بنجاح");
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast.error("حدث خطأ أثناء حذف القيد");
    }
  };

  // Group by course
  const groupedLeads = leads.reduce((acc, lead) => {
    const courseId = lead.course._id;
    if (!acc[courseId]) {
      acc[courseId] = {
        courseName: lead.course.name || "بدون دورة",
        coursePrice: lead.course.price || 0,
        leads: [],
      };
    }
    acc[courseId].leads.push(lead);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="container mx-auto py-10" dir="rtl">
        <div className="text-center">جاري تحميل ..</div>
      </div>
    );
  }

  if (error) return <ErrorPage error={error} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            قائمة العملاء المحتملين (Leads)
          </h1>
          <p className="text-muted-foreground">إدارة العملاء قبل التسجيل</p>
        </div>
      </div>

      {/* No data */}
      {!loading && leads.length === 0 && (
        <div className="text-center text-muted-foreground">
          لا يوجد عملاء محتملين حالياً.
        </div>
      )}

      {/* Leads grouped by course */}
      {!loading &&
        leads.length > 0 &&
        Object.entries(groupedLeads).map(([courseId, group]) => (
          <div key={courseId} className="space-y-4">
            <div className="border-b border-border pb-2">
              <h2 className="text-2xl font-semibold text-foreground">
                {group.courseName}
              </h2>
              <h3 className="text-l font-medium text-foreground">
                السعر: {group.coursePrice} دج
              </h3>
              <p className="text-sm text-muted-foreground">
                {group.leads.length} قيد محتمل
              </p>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">رقم الهاتف</TableHead>
                    <TableHead className="text-right">الولاية</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">تاريخ الإضافة</TableHead>
                    <TableHead className="text-right">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.leads.map((lead) => (
                    <TableRow key={lead._id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>
                        <a
                          href={`tel:${lead.phone}`}
                          className="font-mono hover:underline"
                          dir="ltr"
                        >
                          {lead.phone}
                        </a>
                      </TableCell>
                      <TableCell>{lead.wilaya}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            lead.status === "new"
                              ? "default"
                              : lead.status === "called"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {lead.status === "new"
                            ? "جديد"
                            : lead.status === "called"
                            ? "تم الاتصال"
                            : "ملغي"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(lead.createdAt) || "-"}</TableCell>
                      <TableCell className="space-x-2 flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => calledLead(lead)}
                          className="h-8 gap-2"
                        >
                          <Phone className="h-4 w-4" />
                          اتصال
                        </Button>
                        <WhitelistModal
                          programs={programs.filter(
                            (program) => program.course._id === lead.course._id
                          )}
                          isLead
                          onAddForm={confirmLead}
                          onDeleteLead={deleteLead}
                          initialData={lead}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => canceledLead(lead)}
                          className="h-8 gap-2 text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                          الغاء
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
    </div>
  );
}
