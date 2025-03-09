import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
  } from '@react-pdf/renderer';
  
  // Register font if needed
  Font.register({
    family: 'Helvetica',
  });
  
  // Create styles
  const styles = StyleSheet.create({
    page: {
      padding: 30,
      fontFamily: 'Helvetica',
    },
    header: {
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 12,
      color: '#666',
    },
    section: {
      marginBottom: 10,
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#000',
      paddingVertical: 5,
    },
    headerRow: {
      backgroundColor: '#f0f0f0',
      fontWeight: 'bold',
    },
    col1: {
      width: '60%',
    },
    col2: {
      width: '20%',
      textAlign: 'right',
    },
    col3: {
      width: '20%',
      textAlign: 'right',
    },
    totalRow: {
      fontWeight: 'bold',
      marginTop: 10,
    },
  });
  
  // Create Document Component
  const Receipt = ({ data }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Payment Receipt</Text>
          <Text style={styles.subtitle}>{data.program.institution.name}</Text>
          <Text style={styles.subtitle}>{data.program.institution.address}</Text>
          <Text style={styles.subtitle}>Contact: {data.program.institution.phone}</Text>
        </View>
  
        <View style={styles.section}>
          <Text>Customer Information:</Text>
          <Text>Name: {data.name}</Text>
          <Text>Email: {data.email}</Text>
          <Text>Phone: {data.phone}</Text>
        </View>
  
        <View style={styles.section}>
          <Text style={{ marginBottom: 5 }}>Program Details:</Text>
          <Text style={{ marginBottom: 5 }}>Course Name:{data.program.course.name}</Text>
          <Text style={{ marginBottom: 5 }}>Program Price:{data.program.course.price}</Text>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={styles.col1}>Description</Text>
            <Text style={styles.col3}>Paid</Text>
          </View>
  
          <View style={styles.row}>
            <Text style={styles.col1}>Initial Tranche</Text>
            <Text style={styles.col3}>{data.inialTranche}</Text>
          </View>
  
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.col1}>Total</Text>
            <Text style={styles.col2}>{data.totalPrice}</Text>
          </View>
  
          <View style={styles.row}>
            <Text style={styles.col1}>Remaining Balance</Text>
            <Text style={[styles.col2, { color: '#ff0000' }]}>{data.rest}</Text>
          </View>
        </View>
  
        <View style={styles.section}>
          <Text>Payment Details:</Text>
          <Text>Date: {new Date().toLocaleDateString()}</Text>
          <Text>Transaction ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</Text>
        </View>
  
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 10, color: '#666' }}>
            Thank you for your payment! This is an official receipt.
          </Text>
        </View>
      </Page>
    </Document>
  );
  
  export default Receipt;