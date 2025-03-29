import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    header: {
      fontSize: 14,
      marginBottom: 10,
      fontWeight: 'bold',
      direction:'rtl',
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    tableHeader: {
      backgroundColor: '#f0f0f0',
      flexDirection: 'row-reverse',
    },
    tableRow: {
      flexDirection: 'row-reverse',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingVertical: 5,
    },
    summaryTable: {
      marginTop: 20,
      backgroundColor: '#f8f8f8',
    },
    summaryCell: {
      padding: 5,
      width: '20%',
    },
  });
const ProgramSummary = ({ totals }) => (
  <View style={styles.summaryTable}>
    <Text style={styles.header}>ملخص البرنامج</Text>
    
    <View style={[styles.tableRow, styles.tableHeader]}>
      <View style={styles.summaryCell}><Text>إجمالي المتدربين</Text></View>
      <View style={styles.summaryCell}><Text>إجمالي المدفوع</Text></View>
      <View style={styles.summaryCell}><Text>إجمالي المتبقي</Text></View>
      <View style={styles.summaryCell}><Text>إجمالي السعر</Text></View>
    </View>

    <View style={styles.tableRow}>
      <View style={styles.summaryCell}><Text>{totals.totalTrainees}</Text></View>
      <View style={styles.summaryCell}><Text>{totals.totalPaid}</Text></View>
      <View style={styles.summaryCell}><Text>{totals.totalRest}</Text></View>
      <View style={styles.summaryCell}><Text>{totals.totalPrice}</Text></View>
    </View>
  </View>
);

export default ProgramSummary;