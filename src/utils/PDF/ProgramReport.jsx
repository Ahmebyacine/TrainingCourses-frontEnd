import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import FontLoader from './FontLoader';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Cairo',
    dirctint:'rtl',
    textAlign: 'right',
    writingMode: 'horizontal-tb',
  },
  header: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  headerContainer: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 5,
  },
  cell: {
    padding: 5,
    width: '14%',
  },
  cell2: {
    padding: 5,
    width: '18%',
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
const ProgramReport = ({ data = {} }) => {
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar');
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <FontLoader />
        {/* Program Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{data.program.name}</Text>
          <View style={styles.headerRow}>
            <Text>المؤسسة: {data.program.institution}</Text>
            <Text>المدرب: {data.program.trainer}</Text>
          </View>
          <View style={styles.headerRow}>
            <Text>تاريخ النهاية: {formatDate(data.program.end_date)}</Text>
            <Text>تاريخ البداية: {formatDate(data.program.start_date)}</Text>
          </View>
        </View>

        {/* Employees List */}
        {data.employees.map((employee, index) => (
          <View key={index} wrap={false}>
            {/* Employee Header */}
            <View style={styles.header}>
              <Text>{employee.employee.name} - {employee.employee.email}</Text>
            </View>

            {/* Trainees Table */}
            <View style={styles.table}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <Text style={styles.cell}>ملاحظات</Text>
                <Text style={styles.cell}>المبلغ الكلي</Text>
                <Text style={styles.cell}>المتبقي</Text>
                <Text style={styles.cell}>المدفوع</Text>
                <Text style={styles.cell2}>الهاتف</Text>
                <Text style={styles.cell2}>البريد</Text>
                <Text style={styles.cell2}>الاسم</Text>
              </View>

              {/* Table Rows */}
              {employee.trainees.map((trainee, idx) => (
                <View style={styles.tableRow} key={idx}>
                  <Text style={styles.cell}>{trainee.note}</Text>
                  <Text style={styles.cell}>{trainee.totalPrice}</Text>
                  <Text style={styles.cell}>{trainee.unpaidAmount}</Text>
                  <Text style={styles.cell}>{trainee.paidAmount}</Text>
                  <Text style={styles.cell2}>{trainee.phone}</Text>
                  <Text style={styles.cell2}>{trainee.email}</Text>
                  <Text style={styles.cell2}>{trainee.name}</Text>
                </View>
              ))}
            </View>

            {/* Employee Summary */}
            <View style={[styles.table, styles.summaryTable]}>
              <View style={styles.tableRow}>
                <Text style={styles.summaryCell}>المجموع</Text>
                <Text style={styles.summaryCell}>{employee.summary.totalPrice}</Text>
                <Text style={styles.summaryCell}>{employee.summary.totalUnpaid}</Text>
                <Text style={styles.summaryCell}>{employee.summary.totalPaid}</Text>
                <Text style={styles.summaryCell}>عدد المتدربين: {employee.summary.totalTrainees}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Overall Summary */}
        <View style={[styles.table, styles.summaryTable]}>
          <View style={styles.tableRow}>
            <Text style={styles.summaryCell}>المجموع العام</Text>
            <Text style={styles.summaryCell}>{data.summary.totalPrice}</Text>
            <Text style={styles.summaryCell}>{data.summary.totalUnpaid}</Text>
            <Text style={styles.summaryCell}>{data.summary.totalPaid}</Text>
            <Text style={styles.summaryCell}>عدد المتدربين الكلي: {data.summary.totalTrainees}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ProgramReport;