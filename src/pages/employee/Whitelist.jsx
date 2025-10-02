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

export function Whitelist() {
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
      const response = await api.get("/whitelist/employee");
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
    } catch (error) {
      console.error("Error adding to whitelist:", error);
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
    } catch (error) {
      console.error("Error updating whitelist:", error);
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
    } catch (error) {
      console.error("Error confirming whitelist:", error);
      console.log(error.response?.data?.message);
    }
  };
  const deleteBooking = async (id) => {
    try {
      await api.delete(`/api/whitelist/${id}`);
      setBookings((prev) => prev.filter((booking) => booking._id !== id));
    } catch (error) {
      console.error("Error deleting booking:", error);
      console.log(error.response?.data?.message);
    }
  };
  // Group bookings by program
  const groupedBookings = bookings.reduce((acc, booking) => {
    const programId = booking.program._id;
    if (!acc[programId]) {
      acc[programId] = {
        programName: booking?.program?.name || "بدون برنامج",
        bookings: [],
      };
    }
    acc[programId].bookings.push(booking);
    return acc;
  }, {});

  const [bookingStatuses, setBookingStatuses] = useState(
    bookings.reduce((acc, booking) => {
      acc[booking._id] = booking.status;
      return acc;
    }, {})
  );

  const handleCancel = (bookingId) => {
    setBookingStatuses((prev) => ({
      ...prev,
      [bookingId]: "canceled",
    }));
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
        <WhitelistModal
          programs={programs}
          onAddForm={AddWhiteList}
          onEditForm={UpdateWhiteList}
        />
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
                    <TableRow key={booking._id}>
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
                            bookingStatuses[booking._id] === "new"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {bookingStatuses[booking._id] === "new"
                            ? "جديد"
                            : "ملغي"}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <span className="line-clamp-2 text-sm text-muted-foreground">
                          {booking.note || "-"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {bookingStatuses[booking._id] === "new" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancel(booking._id)}
                            className="h-8 gap-2"
                          >
                            <X className="h-4 w-4" />
                            إلغاء
                          </Button>
                        )}
                        <WhitelistModal
                          initialData={booking}
                          programs={programs}
                          onConfirm={confirmTrainee}
                          onDelete={deleteBooking}
                        />
                        <ConfirmTraineeModal
                          initialData={booking}
                          programs={programs}
                          onConfirm={confirmTrainee}
                          onDelete={deleteBooking}
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
