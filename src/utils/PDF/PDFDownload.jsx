import { PDFDownloadLink } from '@react-pdf/renderer';
import Receipt from './Receipt';

const PDFDownload = ({ trainee }) => {
    return (
       <PDFDownloadLink
         document={<Receipt data={trainee} />}
         fileName={`receipt-${trainee.name}.pdf`}
         className='w-full h-full'
       >
         {({ loading }) =>
           loading ? 'جارٍ تحميل ...' : 'تحميل الوصل'
         }
       </PDFDownloadLink>
    );
}

export default PDFDownload;
