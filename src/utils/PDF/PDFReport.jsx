import { Button } from '@/components/ui/button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import ProgramReport from './ProgramReport';

const PDFReport = ({ data }) => (
  <PDFDownloadLink
    document={<ProgramReport data={data} />}
    fileName={`report-program-${data[0].program?.course.name || 'report'}.pdf`}
    className="w-full h-full"
  >
    {({ loading, error }) => {
      // Add error logging
      if (error) {
        console.error('PDF generation error:', error);
        console.error('Error details:', {
          dataStructure: data,
          documentValidity: !!document,
          dataIndex0: data[0],
          programExists: data[0]?.program,
          courseExists: data[0]?.program?.course
        });
      }
      
      return (
        <Button
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

export default PDFReport;