import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    header: {
      fontSize: 14,
      marginBottom: 10,
      fontWeight: 'bold',
      direction:'rtl',
    },
    table: {
      marginBottom: 20,
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
    cell: {
      padding: 5,
      width: '14%',
    },
    cell2: {
      padding: 5,
      width: '18%',
    },
  });

const EmployeeSection = ({ employee, trainees }) => (
  <View style={styles.table}>
    <Text style={styles.header}>
      الموظف: {employee.name} ({employee.email})
    </Text>  

    {/* Table Header */}
    <View style={[styles.tableRow, styles.tableHeader]}>
      <View style={styles.cell}><Text>الاسم</Text></View>
      <View style={styles.cell2}><Text>البريد الإلكتروني</Text></View>
      <View style={styles.cell2}><Text>الهاتف</Text></View>
      <View style={styles.cell}><Text>المدفوع</Text></View>
      <View style={styles.cell}><Text>المتبقي</Text></View>
      <View style={styles.cell}><Text>الإجمالي</Text></View>
      <View style={styles.cell}><Text>ملاحظات</Text></View>
    </View>

    {/* Trainee Rows */}
    {trainees.map((trainee, idx) => (
      <TraineeRow key={`trainee-${idx}`} trainee={trainee} />
    ))}
  </View>
);

const TraineeRow = ({ trainee }) => (
  <View style={styles.tableRow}>
    <View style={styles.cell}><Text>{trainee.name}</Text></View>
    <View style={styles.cell2}><Text>{trainee.email}</Text></View>
    <View style={styles.cell2}><Text>{trainee.phone}</Text></View>
    <View style={styles.cell}><Text>{trainee.paid}</Text></View>
    <View style={styles.cell}><Text>{trainee.rest}</Text></View>
    <View style={styles.cell}><Text>{trainee.total}</Text></View>
    <View style={styles.cell}><Text>{trainee.note}</Text></View>
  </View>
);

export default EmployeeSection;