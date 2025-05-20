import { Button } from "@/components/ui/button";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Download, XCircle } from "lucide-react";
import CertificatConformite from "./CertificatConformite";
import AttestationDeFormationDuree from "./AttestationDeFormationDuree";

const PDFCertificate = () => {
  return (
    <>
      <PDFViewer className="w-full h-150">
        <AttestationDeFormationDuree />
      </PDFViewer>
      <PDFDownloadLink
        document={<AttestationDeFormationDuree />}
        fileName={`Certificate.pdf`}
        className="w-full h-full"
      >
        {({ loading, error }) => {
          if (error) {
            console.error("PDF generation error:", error);
            return (
              <Button variant="destructive" className="w-full">
                <XCircle className="h-4 w-4 mr-2" />
                خطأ في إنشاء التقرير
              </Button>
            );
          }

          return (
            <Button
              className="w-full flex items-center justify-center gap-2"
              disabled={loading}
            >
              <Download className="h-4 w-4" />
              {loading ? "جارٍ تحميل ..." : "تحميل التقرير"}
            </Button>
          );
        }}
      </PDFDownloadLink> 
    </>
  );
};

export default PDFCertificate;