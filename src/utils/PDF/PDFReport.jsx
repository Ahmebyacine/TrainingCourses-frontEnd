import { PDFDownloadLink } from '@react-pdf/renderer';
import ProgramReport from './ProgramReport';

const PDFReport = (data) => (
  <PDFDownloadLink
  document={<ProgramReport data={data.data} />}
  fileName={`report-program-${data.data[0].program.course.name}.pdf`}
  className='w-full h-full'
>
  {({ blob, url, loading, error }) =>
    loading ? 'جارٍ تحميل ...' : 'تحميل التقرير'
  }
</PDFDownloadLink>
);

export default PDFReport;