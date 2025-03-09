import { PDFDownloadLink } from '@react-pdf/renderer';
import Receipt from './Receipt';

// Your data
const receiptData = {
  email: "ahmedbel123dz@gmail.com",
  inialTranche: 12340,
  name: "AHMED YACINE BELAID",
  note: "",
  phone: "0681723390",
  program: "67cb2a380d7f89e2a585a4b5",
  rest: 0,
  secondTranche: 0,
  totalPrice: 25000
};

// In your component render method


const PDFDownload = ({ trainee }) => {
  console.log(trainee)
    return (
       <PDFDownloadLink
         document={<Receipt data={trainee} />}
         fileName="receipt.pdf"
         className='w-full'
       >
         {({ blob, url, loading, error }) =>
           loading ? 'Loading document...' : 'Download Receipt'
         }
       </PDFDownloadLink>
    );
}

export default PDFDownload;
