import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

import CairoRegular from "@/assets/fonts/Cairo-Regular.ttf";
import CairoBold from "@/assets/fonts/Cairo-Bold.ttf";
import TableDeVisite from "./TableDeVisite";
import { formatFrenchDate } from "@/utils/formatSafeDate";

Font.register({
  family: "Cairo",
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
    fontFamily: "Helvetica",
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 10,
    color: "#000",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    border: "1 solid #000",
  },
  certHeaderLeft: {
    width: "15%",
    textAlign: "left",
    fontSize: 8,
    padding: 7,
  },
  certHeaderCenter: {
    width: "70%",
    textAlign: "center",
    fontSize: 11,
    padding: 7,
    borderLeft: "1 solid #000",
    borderRight: "1 solid #000",
  },
  certHeaderRight: {
    width: "15%",
    textAlign: "left",
    fontSize: 8,
    padding: 7,
  },
  title: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    textTransform: "uppercase",
    textDecoration: "underline",
  },
  centerText: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 3,
  },
  block: {
    marginVertical: 5,
    textAlign: "center",
  },
  block2: {
    fontSize: 8,
    paddingHorizontal: 30,
    textAlign: "center",
  },
  infoTable: {
    marginHorizontal: 40,
    padding: 6,
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  infoLabel: {
    width: "40%",
    fontWeight: "bold",
  },
  infoValue: {
    width: "60%",
  },
  bullet: {
    width: 32,
    fontSize: 16,
    fontFamily: "Helvetica",
    color: "#000",
  },
  footerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontWeight: "bold",
    marginTop: 20,
    marginHorizontal: 30,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    fontSize: 9,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTop: "2px solid red",
    paddingTop: 5,
    margin: 7,
  },
});

const CertificatConformite = ({ values }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.tableHeader}>
          <View style={styles.certHeaderLeft}>
            <Text>ECT-CHEDES</Text>
          </View>
          <View style={styles.certHeaderCenter}>
            <Text style={{ paddingBottom: 4 }}>Enregistrement</Text>
            <Text>Certificat/rapport de visite d'un Equipement</Text>
          </View>
          <View style={styles.certHeaderRight}>
            <Text style={{ paddingBottom: 4 }}>D: {values?.dateOfInspection}</Text>
            <Text>Ref: {values?.reportRef}</Text>
          </View>
        </View>

        <Text style={styles.title}>CERTIFICAT DE CONFORMITE</Text>
        <Text style={styles.centerText}>
          Pour: conformité ({values?.description})
        </Text>
        <View style={styles.block}>
          <Text>Earthworck Appliance Certificate</Text>
          <Text>
            Décret exécutif n° 91-05 du 19-Janv.-1991, relatif aux prescriptions
            générales de protection applicables en matière d’hygiène et de
            sécurité en milieu de travail
          </Text>
        </View>
        <View style={styles.block2}>
          <Text>
            Executive Decree Nbr.91-05 January 19th 1991, on general
            requirements of protection applicable hygiene and workplace safety
          </Text>
        </View>

        <View style={styles.block}>
          <Text>
            Nous soussignés, <Text style={styles.infoLabel}>ECT.CHEDES </Text>
            certifions que l’équipement suivant a été examiné conformément aux
            normes Internationales, Appropriées et qu’aucune défectuosité de
            nature à nuire à la sécurité de son utilisation n’a été constatée au
            moment de l’inspection.
          </Text>
        </View>
        <View style={styles.block2}>
          <Text>
            We the undersigned,{" "}
            <Text style={styles.infoLabel}>ECT.CHEDES </Text>, certify that the
            following equipment has been inspected in accordance with
            inspected,and cheked in according with the appropriate international
            standards, and fond to be free any defect likely to affect safety at
            check moment. inspection.
          </Text>
        </View>

        <View style={styles.infoTable}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              <Text style={styles.bullet}>•</Text> Description (Produit):
            </Text>
            <Text style={styles.infoValue}>{values?.description}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              <Text style={styles.bullet}>•</Text> Client:
            </Text>
            <Text style={styles.infoValue}>
             {values?.customer}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              <Text style={styles.bullet}>•</Text> Fabricant:
            </Text>
            <Text style={[styles.infoValue, { fontFamily: "Cairo" }]}>
              {values?.manufacturer}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              <Text style={styles.bullet}>•</Text> Model (Type):
            </Text>
            <Text style={styles.infoValue}>{values?.model}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              <Text style={styles.bullet}>•</Text> Utilization (Charge max.):
            </Text>
            <Text style={styles.infoValue}>{values?.workingLoadLimit}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              <Text style={styles.bullet}>•</Text> Année de fabrication:
            </Text>
            <Text style={styles.infoValue}>{values?.yearOfManufacture}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              <Text style={styles.bullet}>•</Text> Date d’inspection:
            </Text>
            <Text style={styles.infoValue}>{formatFrenchDate(values?.dateOfInspection)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              <Text style={styles.bullet}>•</Text> Numéro de série:
            </Text>
            <Text style={styles.infoValue}>{values?.serialNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              <Text style={styles.bullet}>•</Text> Capacité:
            </Text>
            <Text style={styles.infoValue}>............</Text>
          </View>
        </View>

        <View style={styles.block}>
          <Text>
            Ce certificat est délivré pour une période de{" "}
            <Text style={{ fontWeight: "bold" }}>Douze(12)</Text> mois
          </Text>
        </View>
        <View style={styles.block2}>
          <Text>
            The certificate should be for a period of
            <Text style={{ fontWeight: "bold" }}>twelve (12) </Text>months.
          </Text>
        </View>

        <View style={styles.footerSection}>
          <Text>EL oued, On: {formatFrenchDate(values?.dateOfInspection)}</Text>
          <Text>Inspector :</Text>
          <Text>Approved by :</Text>
        </View>

        <View break>
          <Text style={styles.title}>CERTIFICAT DE CONFORMITE</Text>
          <Text style={styles.block2}>Borthwork Appliance Certificat</Text>
          <Text style={styles.block}>
            Décret exécutif '91-05 du19-jane--1991, relatif aux presertations
            générales de protection applicables en matière
          </Text>
          <TableDeVisite values={values} />
        </View>
        <View style={styles.contactInfo} fixed>
          <Text>ETC-CHEDES</Text>
          <Text>TEL: 032122994</Text>
          <Text>Email: chedesgroup@gmail.com</Text>
        </View>
      </Page>
    </Document>
  );
};

export default CertificatConformite;
