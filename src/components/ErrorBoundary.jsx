import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
        <h1 className="text-3xl font-bold text-red-600">اوبس!</h1>
        <p className="text-lg">حدث خطأ ما ({error.status})</p>
        <p className="text-gray-600">{error.statusText}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold text-red-600">خطأ غير متوقع</h1>
      <p className="text-gray-600">{error?.message || "خطأ غير معروف"}</p>
    </div>
  );
}
