import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2, QrCode } from "lucide-react"
import { Scanner } from '@yudiel/react-qr-scanner';


const QRScannerComponent = ({ onScan }) => {
  const [scanning, setScanning] = useState(false)
  const [cameraError, setCameraError] = useState(null)

  // Handle successful scan
  const handleScan = (result) => {
    if (result) {
      onScan(result)
      setScanning(false)
    }
  }

  // Handle camera errors
  const handleError = (error) => {
    console.error("QR scanner error:", error)
    setCameraError(error.message)
    setScanning(false)
  }

  // Cleanup camera access on unmount
  useEffect(() => {
    return () => {
      setScanning(false)
    }
  }, [])
   
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      {scanning ? (
        <div className="w-full max-w-xs aspect-square relative">
          <Scanner
            onScan={handleScan}
            onError={handleError}
            constraints={{
              facingMode: "environment",
            }}
            scanDelay={300}
            containerStyle={{
              borderRadius: "0.5rem",
              overflow: "hidden",
            }}
          />
          <div className="absolute inset-0 border-2 border-primary/50 rounded-lg pointer-events-none" />
        </div>
      ) : (
        <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg w-full max-w-xs aspect-square flex items-center justify-center">
          <QrCode className="h-16 w-16 text-muted-foreground" />
        </div>
      )}

      {cameraError && (
        <p className="text-sm text-destructive text-center">{cameraError}</p>
      )}

      <Button 
        onClick={() => setScanning(!scanning)} 
        disabled={scanning}
        className="w-full max-w-xs"
      >
        {scanning ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Scanning...
          </>
        ) : (
          <>
            <QrCode className="h-4 w-4 mr-2" />
            {cameraError ? "Retry Scanning" : "Scan QR Code"}
          </>
        )}
      </Button>
      
      {!cameraError && (
        <p className="text-sm text-muted-foreground text-center">
          Position the QR code within the frame to scan
        </p>
      )}
    </div>
  )
}

export default QRScannerComponent