import { useState, useEffect } from "react"
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';

import CairoRegular from '@/assets/fonts/Cairo-Regular.ttf';
import CairoBold from '@/assets/fonts/Cairo-Bold.ttf';

Font.register({
  family: 'Cairo',
  fonts: [
    {
      src: CairoRegular,
      fontWeight: 400,
    },
    {
      src: CairoBold,
      fontWeight: 700,
    },
  ],
});


const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Cairo',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: '#000',
    paddingBottom: 10,
  },
  institution: {
    fontSize: 14,
    marginBottom: 2,
    textAlign: 'right',
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    marginTop: 10,
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    paddingBottom: 4,
    textAlign:'right'
  },
  labelValuePair: {
    flexDirection: 'row-reverse',
    gap: 5,
    marginBottom: 6,
    direction: 'rtl',
    textAlign: 'right',
  },
  label: {
    fontSize: 12,
    fontWeight: 700,
    direction: 'rtl',
    textAlign: 'right',
  },
  value: {
    fontSize: 12,
    fontWeight: 400,
  },
  paymentGrid: {
    flexDirection: 'row-reverse',
    gap: 20,
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    left: 40,
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  qrContainer: {
    fontSize: 10,
    alignItems: 'center',
  },
  qrCode: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  reportNumber: {
    fontSize: 12,
    color: '#444',
  }
});

const Receipt = ({ data }) => {
  const [qrDataURL, setQrDataURL] = useState('');

  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = await QRCode.toDataURL(data._id, {
          errorCorrectionLevel: 'L',
          type: 'image/png',
          width: 200,
          margin: 2
        });
        setQrDataURL(url);
      } catch (err) {
        console.error('QR generation failed:', err);
      }
    };
    
    generateQR();
  }, [data._id]);

  if (!qrDataURL) return null;

  return(
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.institution}>{data.program.institution.name}</Text>
          <Text style={styles.institution}>{data.program.institution.address}</Text>
          <Text style={styles.institution}>الاتصال: {data.program.institution.phone}</Text>
          <Text style={styles.title}>وصل استلام</Text>
        </View>

        {/* Employee Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>معلومات الموظف</Text>
          <View style={styles.labelValuePair}>
            <Text style={styles.label}>الاسم:</Text>
            <Text style={styles.value}>{data.employee.name}</Text>
          </View>
        </View>

        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>معلومات العميل</Text>
          <View style={styles.labelValuePair}>
            <Text style={styles.label}>الاسم:</Text>
            <Text style={styles.value}>{data.name}</Text>
          </View>
          <View style={styles.labelValuePair}>
            <Text style={styles.label}>البريد الإلكتروني:</Text>
            <Text style={styles.value}>{data.email}</Text>
          </View>
          <View style={styles.labelValuePair}>
            <Text style={styles.label}>الهاتف:</Text>
            <Text style={styles.value}>{data.phone}</Text>
          </View>
        </View>

        {/* Program Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>تفاصيل البرنامج</Text>
          <View style={styles.labelValuePair}>
            <Text style={styles.label}>اسم الدورة:</Text>
            <Text style={styles.value}>{data.program.course.name}</Text>
          </View>
          <View style={styles.labelValuePair}>
            <Text style={styles.label}>سعر البرنامج:</Text>
            <Text style={styles.value}>{data.program.course.price}</Text>
          </View>
        </View>

        {/* Payment Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>معلومات الدفع</Text>
          <View style={styles.labelValuePair}>
            <Text style={styles.label}>المبلغ المدفوع:</Text>
            <Text style={styles.value}>{data.inialTranche}</Text>
          </View>
          <View style={styles.labelValuePair}>
            <Text style={styles.label}>المبلغ الإجمالي:</Text>
            <Text style={[styles.value, { fontWeight: 700 }]}>{data.totalPrice}</Text>
          </View>
          <View style={styles.labelValuePair}>
            <Text style={[styles.label, { color: '#e74c3c' }]}>المبلغ المتبقي:</Text>
            <Text style={[styles.value, { color: '#e74c3c', fontWeight: 700 }]}>{data.rest}</Text>
          </View>
        </View>

        {/* Transaction Details */}
        <View style={[styles.section, styles.totalSection]}>
          <View style={styles.labelValuePair}>
            <Text style={styles.label}>تاريخ الدفع:</Text>
            <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.qrContainer}>
            <Image 
              src={qrDataURL} 
              style={styles.qrCode} 
            />
             <Text style={styles.reportNumber}>{data._id}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
};

export default Receipt;