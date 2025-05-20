import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import bgImage from "@/assets/images/borderV1.png";
import { formatFrenchDate } from "@/utils/formatSafeDate";

const styles = StyleSheet.create({
  page: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    zIndex: -1,
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 40,
    fontSize: 12,
    fontFamily: "Times-Roman",
    color: "#000",
    marginHorizontal: 30,
    marginTop: 30,
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
  subHeader2: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "left",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    lineHeight: 2,
    letterSpacing: 1.5,
  },
  body: {
    fontSize: 14,
    textAlign: "left",
    fontWeight: 550,
    marginTop: 20,
    lineHeight: 1.8,
  },
  footer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
  },
  signature: {
    fontSize: 12,
    textAlign: "left",
  },
});

const AttestationDeFormationPDF = ({ values }) => (
  <Document>
    {values.trainees.map((trainee, index) => (
      <Page size="A4" orientation="landscape" style={styles.page} key={index}>
        <View style={styles.content}>
          <Text style={styles.header}>ETABLISSEMENT PRIVE DE FORMATION PROFESSIONNELLE</Text>
          <Text style={styles.subHeader}>Agrée par</Text>
          <Text style={styles.subHeader}>MINISTÈRE DE LA FORMATION ET DE L'ENSEIGNEMENT PROFESSIONNELS</Text>
          <View style={styles.subHeader2}>
            <Text>Agréé par l’état N : 1904/18</Text>
            <Text>Attestation N : {values?.certificateNumber}/{ index + Number(values?.initialCertificateNumber) }</Text>
          </View>
          <Text style={styles.title}>Attestation de Formation</Text>

          <Text style={styles.body}>
            La Direction de l’Etablissement Privé de la Formation Professionnelle WADFOR :{"\n"}
            Vu le décret n°01-419 du 5 chaoual 1422 correspondant au 20 décembre 2001...{"\n"}
            Vu la décision d’agrément n° 1904 du 18 AOUT 2018.{"\n"}
            Vu le procès-verbal des délibérations en date du : {formatFrenchDate(values?.trainingDate)}{"\n"}
            Il est attribué à Mr : <Text style={{ color: "#0070c0" }}>{trainee?.fullName}</Text>{"\n"}
            Né le : <Text style={{ color: "#0070c0" }}>{formatFrenchDate(trainee?.birthDate)}</Text> à :
            <Text style={{ color: "#0070c0" }}>{trainee?.birthPlace}</Text> wilaya :{" "}
            <Text style={{ color: "#0070c0" }}>{trainee?.wilaya}</Text>{"\n"}
            L’attestation de formation qualifiante intensif dans la spécialité :{" "}
            <Text style={{ color: "#0070c0" }}>{values?.specialty}</Text>
          </Text>

          <View style={styles.footer}>
            <Text style={styles.signature}>Le Directeur :</Text>
            <Text style={{ alignSelf: "flex-end" }}>Le : {formatFrenchDate(values?.trainingDate)}</Text>
          </View>
        </View>

        <Image style={styles.background} src={bgImage} />
      </Page>
    ))}
  </Document>
)

export default AttestationDeFormationPDF;