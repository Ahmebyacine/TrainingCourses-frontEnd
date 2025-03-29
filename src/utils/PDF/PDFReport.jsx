import { Button } from '@/components/ui/button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download, XCircle } from 'lucide-react';
import ProgramReport from './ProgramReport';

const PDFReport = ({ data }) => {

  const fileName = data?.program?.name 
    ? `report-program-${data.program.name}.pdf`
    : 'N/A.pdf';

  return (
    <PDFDownloadLink
      document={<ProgramReport data={data} />}
      fileName={fileName}
      className="w-full h-full"
    >
      {({ loading, error }) => {
        if (error) {
          console.error('PDF generation error:', error);
          return (
            <Button variant="destructive" className="w-full">
              <XCircle className="h-4 w-4 mr-2" />
              خطأ في إنشاء التقرير
            </Button>
          );
        }
        
        return (
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            disabled={loading}
          >
            <Download className="h-4 w-4" />
            {loading ? 'جارٍ تحميل ...' : 'تحميل التقرير'}
          </Button>
        );
      }}
    </PDFDownloadLink>
  );
};

export default PDFReport;