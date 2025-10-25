import { useNavigate } from "react-router-dom";
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
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import ErrorPage from "../common/ErrorPage";
import WhitelistModal from "@/layouts/employee/WhitelistModal";
import ConfirmTraineeModal from "@/layouts/employee/ConfirmTraineeModal";
import { formatDate } from "@/utils/formatSafeDate";
import { toast } from "sonner";

export default function Whitelist() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrograms = async () => {
    try {
      const programsResponse = await api.get("/api/program/employee");
      setPrograms(programsResponse.data);
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await api.get("/api/whitelist/employee");
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchPrograms();
  }, []);

  const AddWhiteList = async (data) => {
    try {
      const response = await api.post("/api/whitelist", data);
      setBookings((prev) => [...prev, response.data]);
      toast.success("تم إضافة القيد بنجاح");
    } catch (error) {
      toast.error("حدث خطأ أثناء إضافة القيد");
      console.log(error.response?.data?.message);
    }
  };

  const UpdateWhiteList = async (data) => {
    try {
      const response = await api.put(`/api/whitelist/${data._id}`, data);
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === data._id ? response.data : booking
        )
      );
      toast.success("تم تحديث القيد بنجاح");
    } catch (error) {
      console.error("Error updating whitelist:", error);
      toast.error("حدث خطأ أثناء تحديث القيد");
      console.log(error.response?.data?.message);
    }
  };

  const confirmTrainee = async (data) => {
    try {
      const response = await api.post("/api/trainee", data);
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === data._id ? response.data : booking
        )
      );
      toast.success("تم تأكيد القيد وتحويله إلى متدرب بنجاح");
      navigate("/add-trainee", {
        state: { trainee: response.data, success: true },
      });
    } catch (error) {
      console.error("Error confirming whitelist:", error);
      console.log(error.response?.data?.message);
      toast.error("حدث خطأ أثناء تأكيد القيد");
    }
  };

  const deleteBooking = async (id) => {
    try {
      await api.delete(`/api/whitelist/${id}`);
      setBookings((prev) => prev.filter((booking) => booking._id !== id));
      toast.success("تم حذف القيد بنجاح");
    } catch (error) {
      console.error("Error deleting booking:", error);
      console.log(error.response?.data?.message);
      toast.error("حدث خطأ أثناء حذف القيد");
    }
  };
  // Group bookings by program
  const groupedBookings = bookings.reduce((acc, booking) => {
    const programId = booking?.program?._id;
    if (!acc[programId]) {
      acc[programId] = {
        programName: booking?.program?.course?.name || "بدون برنامج",
        programDate: booking?.program?.start_date || "بدون تاريخ",
        programEndDate: booking?.program?.end_date || "بدون تاريخ",
        programInstitution: booking?.program?.institution?.name || "بدون مؤسسة",
        bookings: [],
      };
    }
    acc[programId].bookings.push(booking);
    return acc;
  }, {});

  const handleCancel = async (bookingId) => {
    try {
      await api.put(`/api/whitelist/${bookingId}`, {
        status: "canceled",
      });
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "canceled" } : b
        )
      );
    } catch (error) {
      toast.error("حدث خطأ أثناء إلغاء القيد");
      console.log(error.response?.data?.message);
    }
    // TODO: Add API call here to update the backend
  };
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">قيد التسجيل</h1>
          <p className="text-muted-foreground">إدارة قائمة قيد التسجيل</p>
        </div>
        <WhitelistModal programs={programs} onAddForm={AddWhiteList} />
      </div>
      {!loading && bookings.length === 0 && (
        <div className="text-center text-muted-foreground">
          لا يوجد قيد تسجيلات حالياً.
        </div>
      )}
      {!loading &&
        bookings.length > 0 &&
        Object.entries(groupedBookings).map(([programId, group]) => (
          <div key={programId} className="space-y-4">
            <div className="border-b border-border pb-2">
              <h2 className="text-2xl font-semibold text-foreground">
                {group.programName}
              </h2>
              <h3 className="text-l font-medium text-foreground">
                {formatDate(group.programDate)} -{" "}
                {formatDate(group.programEndDate)} | {group.programInstitution}
              </h3>
              <p className="text-sm text-muted-foreground">
                {group.bookings.length} قيد التسجيل
              </p>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">الاسم</TableHead>
                    <TableHead className="text-right">رقم الهاتف</TableHead>
                    <TableHead className="text-right">الموظف</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">ملاحظات</TableHead>
                    <TableHead className="text-right">إجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.bookings.map((booking) => (
                    <TableRow key={booking?._id}>
                      <TableCell className="font-medium">
                        {booking.name}
                      </TableCell>
                      <TableCell>
                        <span className="font-mono" dir="ltr">
                          {booking.phone}
                        </span>
                      </TableCell>
                      <TableCell>{booking.employee.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            booking.status === "new" ? "default" : "destructive"
                          }
                        >
                          {booking.status === "new" ? "جديد" : "ملغي"}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <span className="line-clamp-2 text-sm text-muted-foreground">
                          {booking.note || "-"}
                        </span>
                      </TableCell>
                      <TableCell className="space-x-2">
                        {booking.status === "new" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancel(booking?._id)}
                            className="h-8 gap-2"
                          >
                            <X className="h-4 w-4" />
                            إلغاء
                          </Button>
                        )}
                        <WhitelistModal
                          initialData={booking}
                          programs={programs}
                          onEditForm={UpdateWhiteList}
                        />
                        <ConfirmTraineeModal
                          initialData={booking}
                          programs={programs}
                          onSubmitForm={confirmTrainee}
                          onDeleteForm={deleteBooking}
                        />
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
