import { Text, View } from "@react-pdf/renderer";
import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1 solid #000",
    borderLeft: "1 solid #000",
    width: "100%",
  },
  labelCell: {
    width: "61%",
    textAlign: "left",
    fontSize: 8,
    padding: 3,
    fontFamily: "Helvetica",
  },
  statusCell: {
    width: "13%",
    textAlign: "center",
    fontSize: 8,
    padding: 3,
    borderLeft: "1 solid #000",
    fontFamily: "Helvetica",
  },
  emptyCell: {
    width: "13%",
    textAlign: "left",
    fontSize: 8,
    borderLeft: "1 solid #000",
    padding: 3,
    fontFamily: "Helvetica",
  },
});

const CheckCertRow = ({ children,check= true }) => {
  return (
    <View style={styles.tableRow}>
      <View style={styles.labelCell}>
        <Text>
          {children}
        </Text>
      </View>
      <View style={check ? styles.statusCell : styles.emptyCell}>
      {check && (<Text>X</Text>)}
      </View>
      <View style={styles.emptyCell}></View>
      <View style={styles.emptyCell}></View>
    </View>
  );
};

export default CheckCertRow;