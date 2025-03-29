import { View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
      marginBottom: 20,
      borderBottomWidth: 2,
      borderBottomColor: '#333',
      paddingBottom: 10,
    },
    headerRow: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });

const ProgramHeader = ({ program, date }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerRow}>
      <Text style={styles.headerTitle}>تقرير البرنامج التدريبي</Text>
      <Text>التاريخ: {date}</Text>
    </View>
    <View style={styles.headerRow}>
      <View>
        <Text>اسم الدورة: {program.courseName}</Text>
        <Text>المؤسسة: {program.institutionName}</Text>
      </View>
      <View>
      <Text>
        الفترة: من {program.startDate} إلى {program.endDate}
      </Text>
        <Text>المدرب: {program.trainerName}</Text>
      </View>
    </View>
  </View>
);

export default ProgramHeader;