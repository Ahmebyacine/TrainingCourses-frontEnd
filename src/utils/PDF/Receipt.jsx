import { useState, useEffect } from "react"
import {  Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import QRCode from 'qrcode';

// Register font
Font.register({
  family: 'Helvetica',
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    textAlign:'center'
  },
  institution: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  labelValuePair: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
  },
  value: {
    fontSize: 12,
    marginLeft:'5px',
    fontWeight: 'normal',
  },
  totalSection: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
  qrContainer: {
    fontSize:'10px',
    alignItems: 'center',
  },
  
  qrCode: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
});

const Receipt = ({ data }) =>{
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
        <Text style={styles.institution}>Contact: {data.program.institution.phone}</Text>
        <Text style={styles.title}>Payment Receipt</Text>
      </View>

      {/* Employee Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Employee Information</Text>
        <View style={styles.labelValuePair}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{data.employee.name}</Text>
        </View>
      </View>

      {/* Customer Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Customer Information</Text>
        <View style={styles.labelValuePair}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{data.name}</Text>
        </View>
        <View style={styles.labelValuePair}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{data.email}</Text>
        </View>
        <View style={styles.labelValuePair}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{data.phone}</Text>
        </View>
      </View>

      {/* Program Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Program Details</Text>
        <View style={styles.labelValuePair}>
          <Text style={styles.label}>Course Name:</Text>
          <Text style={styles.value}>{data.program.course.name}</Text>
        </View>
        <View style={styles.labelValuePair}>
          <Text style={styles.label}>Program Price:</Text>
          <Text style={styles.value}>{data.program.course.price}</Text>
        </View>
      </View>

      {/* Payment Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Information</Text>
        <View style={styles.labelValuePair}>
          <Text style={styles.label}>Initial Tranche:</Text>
          <Text style={styles.value}>{data.inialTranche}</Text>
        </View>
        <View style={styles.labelValuePair}>
          <Text style={styles.label}>Total Price:</Text>
          <Text style={[styles.value, { fontWeight: 'bold' }]}>{data.totalPrice}</Text>
        </View>
        <View style={styles.labelValuePair}>
          <Text style={[styles.label, { color: '#e74c3c' }]}>Remaining Balance:</Text>
          <Text style={[styles.value, { color: '#e74c3c', fontWeight: 'bold' }]}>{data.rest}</Text>
        </View>
      </View>

      {/* Transaction Details */}
      <View style={[styles.section, styles.totalSection]}>
        <View style={styles.labelValuePair}>
          <Text style={styles.label}>Payment Date:</Text>
          <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
        </View>
        <View style={styles.labelValuePair}>
          <Text style={styles.label}>Transaction ID:</Text>
          <Text style={styles.value}>
            {data._id}
          </Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.qrContainer}>
            <Image 
              src={qrDataURL} 
              style={styles.qrCode} 
            />
            <Text>Trainee ID: {data._id}</Text>
        </View>
        <Text>Thank you for your payment! This is an official receipt.</Text>
      </View>
    </Page>
  </Document>
)

};

export default Receipt;