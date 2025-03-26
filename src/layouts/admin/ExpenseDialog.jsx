import { useState } from "react"
import { DollarSign, Receipt } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import api from "@/services/api"
import { toast } from "sonner"

export default function ExpenseDialog({ programId, programName }) {
  const [expenses, setExpenses] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const fetchExpenses = async () => {
    try {
      setIsLoading(true)
      const response = await api.get(`/api/expense/program/${programId}`)
      setExpenses(response.data)
    } catch (error) {
      toast.error("خطأ في جلب المصروفات")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen)
    if (newOpen) {
      fetchExpenses()
    }
  }

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("ar", {
      style: "currency",
      currency: "DZD",
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <DollarSign className="h-4 w-4 mr-1" />
          المصروفات
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>مصروفات البرنامج</DialogTitle>
          <DialogDescription>عرض جميع المصروفات المتعلقة ببرنامج {programName}</DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Card className="bg-muted/40 mb-6">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">إجمالي المصروفات</h3>
                  <p className="text-muted-foreground">مجموع كافة المصروفات لهذا البرنامج</p>
                </div>
                <div className="text-2xl font-bold">{formatCurrency(totalExpenses)}</div>
              </div>
            </CardContent>
          </Card>

          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <p>جاري تحميل المصروفات...</p>
            </div>
          ) : expenses.length === 0 ? (
            <div className="text-center p-6 border border-dashed rounded-lg">
              <Receipt className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">لا توجد مصروفات مسجلة لهذا البرنامج</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>العنوان</TableHead>
                    <TableHead>الموظف</TableHead>
                    <TableHead>المبلغ</TableHead>
                    <TableHead>التاريخ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow
                      key={expense._id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => {
                        toast.info(
                          <div>
                            <h3 className="font-bold mb-1">{expense.title}</h3>
                            {expense.note && (
                              <>
                                <Separator className="my-2" />
                                <p className="text-sm">{expense.note}</p>
                              </>
                            )}
                          </div>,
                        )
                      }}
                    >
                      <TableCell className="font-medium">{expense.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarFallback>{expense.employee?.name?.charAt(0) || "U"}</AvatarFallback>
                          </Avatar>
                          {expense.employee?.name || "غير معروف"}
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(expense.amount)}</TableCell>
                      <TableCell>{formatDate(expense.createdAt)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
