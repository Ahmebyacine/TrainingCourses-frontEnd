import React from "react";
import { Shield, AlertTriangle, ArrowLeft, Home, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function Unauthorized({
  title = "وصول غير مصرح به",
  description = "ليس لديك الصلاحية للوصول إلى هذه الصفحة. يرجى الاتصال بمسؤولك إذا كنت تعتقد أن هذا خطأ.",
  showHomeButton = true,
  showBackButton = true
}) {
  return (
    <div className="flex items-center justify-center min-h-[80vh]" dir="rtl">
      <Card className="max-w-md w-full">
        <CardHeader className="space-y-1 flex flex-col items-center text-center pb-2">
          <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
            <Shield className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-right">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="rounded-md border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm flex items-center gap-3 text-destructive w-full text-right">
            <AlertTriangle className="h-4 w-4" />
            <div>خطأ 401: غير مصرح</div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {showBackButton && (
            <Button 
              variant="outline" 
              className="w-full sm:w-auto" 
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="ml-2 h-4 w-4" />
              العودة
            </Button>
          )}
          {showHomeButton && (
            <Button className="w-full sm:w-auto">
              <Link to='/login' className="flex">
                <LogIn className="ml-2 h-4 w-4" />
                تسجيل الدخول
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}