import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

const ErrorPage = ({ error }) => {
  const router = useNavigate()

  const errorMessages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    408: "Request Timeout",
    409: "Conflict",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported",
  }

  const status = error?.status || 500
  const message = errorMessages[status] || "Unknown Error"

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-lg border-muted">
        <CardHeader className="pb-0">
          <div className="flex flex-col items-center">
            <h1 className="text-8xl font-bold text-primary">{status}</h1>
            <h2 className="text-xl font-semibold uppercase tracking-wider text-muted-foreground mt-2">{message}</h2>
          </div>
        </CardHeader>
        <CardContent className="text-center pt-4">
          <p className="text-muted-foreground">{error.message || "Something went wrong. Please try again later."}</p>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button variant="default" onClick={() => router.back()} className="px-6">
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ErrorPage