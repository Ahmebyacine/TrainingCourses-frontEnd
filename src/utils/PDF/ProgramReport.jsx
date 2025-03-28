import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import CairoRegular from '@/assets/fonts/Cairo-Regular.ttf';
import CairoBold from '@/assets/fonts/Cairo-Bold.ttf';
import { format } from 'date-fns';

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
    fontSize: 10,
    fontFamily: 'Cairo',
    textAlign: 'right'
  },
  header: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    direction:'rtl',
  },
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
  summaryTable: {
    marginTop: 20,
    backgroundColor: '#f8f8f8',
  },
  summaryCell: {
    padding: 5,
    width: '20%',
  },
});
const ProgramReport = ({ data = [] }) => {
  console.log(data)
  const programDetails = data[0]?.program || {};
  const institutionName = programDetails?.institution?.name || 'N/A';
  const courseName = programDetails?.course?.name || 'N/A';
  const trainerName = programDetails?.trainer?.name || 'N/A';

  // Safely get start and end dates with fallbacks
  const startDate = data[0]?.program?.start_date ? new Date(data[0].program.start_date) : null;
  const endDate = data[0]?.program?.end_date ? new Date(data[0].program.end_date) : null;

  const groupedEmployees = data?.reduce((acc, trainee) => {
    const empId = trainee?.employee?._id;
    if (empId) {
      if (!acc[empId]) {
        acc[empId] = {
          employee: trainee.employee || {},
          trainees: [],
        };
      }
      acc[empId].trainees.push(trainee);
    }
    return acc;
  }, {});

  // Calculate totals with safe defaults
  const totals = data.reduce((acc, trainee) => ({
    totalTrainees: acc.totalTrainees + 1,
    totalInitial: acc.totalInitial + (trainee.inialTranche || 0),
    totalSecond: acc.totalSecond + (trainee.secondTranche || 0),
    totalRest: acc.totalRest + (trainee.rest || 0),
    totalPrice: acc.totalPrice + (trainee.totalPrice || 0),
  }), {
    totalTrainees: 0,
    totalInitial: 0,
    totalSecond: 0,
    totalRest: 0,
    totalPrice: 0,
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
            <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>تقرير البرنامج التدريبي</Text>
              <Text style={{direction:'rtl'}} >التاريخ: {format(new Date(), "MM/dd/yyyy hh:mm")}</Text>
            </View>
            <View style={styles.headerRow}>
              <View>
                <Text style={{direction:'rtl'}}>اسم الدورة: {courseName}</Text>
                <Text style={{direction:'rtl'}} >المؤسسة: {institutionName}</Text>
              </View>
              <View>
                <Text style={{direction:'rtl'}} >الفترة: من {startDate ? format(startDate, "MM/dd/yyyy") : 'N/A'} إلى{' '}
                {endDate ? format(endDate, "MM/dd/yyyy") : 'N/A'} </Text>
                <Text style={{direction:'rtl'}} >المدرب:{trainerName}</Text>
              </View>
            </View>
          </View>
        {Object.values(groupedEmployees).map((group, index) => (
          <View key={`group-${index}-${group.employee._id}`} style={styles.table}>
            <Text style={styles.header}>
              الموظف: {group.employee?.name || 'N/A'} ({group.employee?.email || 'N/A'})
            </Text>

            {/* عناوين جدول الموظفين */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.cell}><Text>الاسم</Text></View>
              <View style={styles.cell2}><Text>البريد الإلكتروني</Text></View>
              <View style={styles.cell2}><Text>الهاتف</Text></View>
              <View style={styles.cell}><Text>المدفوع</Text></View>
              <View style={styles.cell}><Text>المتبقي</Text></View>
              <View style={styles.cell}><Text>الإجمالي</Text></View>
              <View style={styles.cell}><Text>ملاحظات</Text></View>
            </View>

            {/* بيانات المتدربين */}
            {group.trainees.map((trainee, idx) => (
              <View key={`trainee-${idx}-${trainee._id}`} style={styles.tableRow}>
                <View style={styles.cell}><Text>{trainee.name || ''}</Text></View>
                <View style={styles.cell2}><Text>{trainee.email || ''}</Text></View>
                <View style={styles.cell2}><Text>{trainee.phone || ''}</Text></View>
                <View style={styles.cell}><Text>{trainee.inialTranche + trainee.secondTranche}</Text></View>
                <View style={styles.cell}><Text>{trainee.rest}</Text></View>
                <View style={styles.cell}><Text>{trainee.totalPrice}</Text></View>
                <View style={styles.cell}><Text>{trainee.note || '-'}</Text></View>
              </View>
            ))}
          </View>
        ))}

        {/* ملخص البرنامج */}
        <View style={styles.summaryTable}>
          <Text style={styles.header}>ملخص البرنامج</Text>
          
          {/* عناوين جدول الملخص */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <View style={styles.summaryCell}><Text>إجمالي المتدربين</Text></View>
            <View style={styles.summaryCell}><Text>إجمالي المدفوع</Text></View>
            <View style={styles.summaryCell}><Text>إجمالي المتبقي</Text></View>
            <View style={styles.summaryCell}><Text>إجمالي السعر</Text></View>
          </View>

          {/* بيانات الملخص */}
          <View style={styles.tableRow}>
            <View style={styles.summaryCell}><Text>{totals.totalTrainees || ''}</Text></View>
            <View style={styles.summaryCell}><Text>{totals.totalInitial + totals.totalSecond}</Text></View>
            <View style={styles.summaryCell}><Text>{totals.totalRest}</Text></View>
            <View style={styles.summaryCell}><Text>{totals.totalPrice}</Text></View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ProgramReport;