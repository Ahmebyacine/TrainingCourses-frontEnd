import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import CheckCertRow from "./CheckCertRow";
import { formatFrenchDate } from "@/utils/formatSafeDate";
const styles = StyleSheet.create({
  fontFr: {
    fontWeight: "semibold",
  },
  fontEn: {
    fontWeight: "medium",
  },
  certRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    border: "1 solid #000",
    borderTopWidth: 0,
  },
  certLeft: {
    width: "40%",
    textAlign: "left",
    fontSize: 8,
    padding: 3,
  },
  certRight: {
    width: "60%",
    textAlign: "left",
    borderLeft: "1 solid #000",
    fontSize: 8,
    padding: 3,
  },
  certContainer: {
    display: "flex",
    flexDirection: "row",
    borderLeft: "1 solid #000",
    width: "60%",
  },
  certContainerFooter: {
    display: "flex",
    flexDirection: "row",
    borderLeft: "1 solid #000",
    width: "100%",
  },
  certContainer1: {
    width: "61%",
    textAlign: "left",
    fontSize: 8,
    padding: 3,
  },
  certContainer2: {
    width: "13%",
    textAlign: "center",
    fontSize: 8,
    padding: 3,
    borderLeft: "1 solid #000",
  },
  certContainer3: {
    width: "13%",
    textAlign: "left",
    fontSize: 8,
    borderLeft: "1 solid #000",
    padding: 3,
  },
  certContainer4: {
    width: "13%",
    textAlign: "left",
    fontSize: 8,
    borderLeft: "1 solid #000",
    padding: 3,
  },
  certTablePicture: {
    width: "60%",
  },
  certTableHead: {
    display: "flex",
    flexDirection: "row",
    borderBottom: "1 solid #000",
    borderLeft: "1 solid #000",
    width: "100%",
    padding: 3,
  },
});

const TableDeVisite = ({ values }) => {
  return (
    <View style={styles.fontFr}>
      <View style={[styles.certRow, { borderTopWidth: 1, marginTop: 5 }]}>
        <View style={styles.certLeft}>
          <Text>
            PROPRIETAIRE/<Text style={styles.fontEn}>Owner</Text> {values.customer}
          </Text>
        </View>
        <View style={styles.certRight}>
          <Text>
            REF RAPPORT/<Text style={styles.fontEn}>Report</Text> REF: {values?.reportRef}
          </Text>
        </View>
      </View>
      <View style={styles.certRow}>
        <View style={styles.certLeft}>
          <Text>
            PRODUIT <Text style={styles.fontEn}>/Deseription:</Text>{" "}
            {values?.description}
            {`\n`}DATE D'INTERVENTION
            <Text style={styles.fontEn}>/Date of inspection </Text>({formatFrenchDate(values.dateOfInspection)})
          </Text>
        </View>
        <View style={[styles.certRight, {fontFamily: "Cairo"}]}>
          <Text>
            CONTRUCTEUR <Text style={styles.fontEn}>/Manufacturer</Text> {values.manufacturer}
          </Text>
        </View>
      </View>
      <View style={styles.certRow}>
        <View style={styles.certLeft}>
          <Text>
            CARACTERISTIQUES TECHNIQUES
            <Text style={styles.fontEn}> /Characteristics</Text>
          </Text>
        </View>
        <View style={styles.certRight}>
          <Text>
            DERNIER CONTR<Text style={styles.fontEn}> /last inspection</Text>
          </Text>
        </View>
      </View>
      <View style={styles.certRow}>
        <View style={styles.certLeft}>
          <Text>
            N'DE SERIEText
            <Text style={styles.fontEn}> /Serial number</Text> {values?.serialNumber}
          </Text>
        </View>
        <View style={styles.certRight}>
          <Text>
            TYPE D'ININTERVENTION:
            <Text style={styles.fontEn}>
              /Periodique/DATE Kid of inspection
              (initial/(X)Periodic/intermediate)
            </Text>
          </Text>
        </View>
      </View>
      <View style={styles.certRow}>
        <View style={styles.certLeft}>
          <Text>
            MODEL: <Text style={styles.fontEn}>{values?.model} {`\n`}Type </Text>
          </Text>
        </View>
        <View style={styles.certRight}>
          <Text>
            EFFECTUE PAR: <Text style={styles.fontEn}>{`\n`}Fecformed by</Text>
          </Text>
        </View>
      </View>
      <View style={styles.certRow}>
        <View style={styles.certLeft}>
          <Text>
            ANNEE DE FABRICATION:
            <Text style={styles.fontEn}> {values.yearOfManufacture}{`\n`}Year of Manufactured </Text>
          </Text>
        </View>
        <View style={styles.certContainer}>
          <View style={styles.certContainer1}>
            <Text style={{ textAlign: "center" }}>
              CONTROLES EFFECTUES
              <Text style={styles.fontEn}>{`\n`}Inspections performed</Text>
            </Text>
          </View>
          <View style={styles.certContainer2}>
            <Text>ST</Text>
          </View>
          <View style={styles.certContainer3}>
            <Text>NA</Text>
          </View>
          <View style={styles.certContainer4}>
            <Text>VO</Text>
          </View>
        </View>
      </View>
      <View style={styles.certRow}>
        <View style={styles.certLeft}>
          <Text>
            CAPACITE DE GODET:
            <Text style={styles.fontEn}>{`\n`}Capacity</Text>
          </Text>
        </View>
        <View style={styles.certContainer}>
          <View style={styles.certContainer1}>
            <Text>
              Examen du chassis, traverses, et fixation
              <Text style={styles.fontEn}>
                {`\n`}Examination of the frame, cross, and fixed
              </Text>
            </Text>
          </View>
          <View style={styles.certContainer2}>
            <Text>X</Text>
          </View>
          <View style={styles.certContainer3}></View>
          <View style={styles.certContainer4}></View>
        </View>
      </View>
      <View style={styles.certRow}>
        <View style={styles.certLeft}>
          <Text>
            DIAMETRE DU CABLE (EN MM):
            <Text style={styles.fontEn}>{`\n`}Diameter of cable (mm)</Text>
          </Text>
        </View>
        <View style={styles.certContainer}>
          <View style={styles.certContainer1}>
            <Text>
              Examen des stabilisteurs, pneumatique et autres (chenilles)
              <Text style={styles.fontEn}>
                {`\n`}Examination of the stabilired tires and others tracked
              </Text>
            </Text>
          </View>
          <View style={styles.certContainer2}>
            <Text>X</Text>
          </View>
          <View style={styles.certContainer3}></View>
          <View style={styles.certContainer4}></View>
        </View>
      </View>
      <View style={styles.certRow}>
        <View style={styles.certLeft}>
          <Text>ORGANE DE PREHENSION: </Text>
          <Text style={styles.fontEn}>{`\n`}Gripping body</Text>
        </View>
        <View style={styles.certContainer}>
          <View style={styles.certContainer1}>
            <Text>
              Contrôle système, niveau des liquides hydrauliques
              <Text style={styles.fontEn}>
                {`\n`} control system, the level of hydraulic fluids.
              </Text>
            </Text>
          </View>
          <View style={styles.certContainer2}>
            <Text>X</Text>
          </View>
          <View style={styles.certContainer3}></View>
          <View style={styles.certContainer4}></View>
        </View>
      </View>
      <View style={styles.certRow}>
        <View style={[styles.certLeft, { paddingTop: 85 }]}>
          <Image src={values?.equipmentImage} />
        </View>
        <View style={styles.certTablePicture}>
          <CheckCertRow>
            Vérifiés les bouchons et fermetures des systèmes hydrauliques
            <Text style={styles.fontEn}>
              {`\n`}Verified caps and closures hydraulic systems
            </Text>
          </CheckCertRow>
          <CheckCertRow>
            Contrôle des fonctions, et des liminaux (feux, Gyrophare,...)
            <Text style={styles.fontEn}>
              {`\n`} Control functions, and liminal (ights, Emergency Light)
            </Text>
          </CheckCertRow>
          <CheckCertRow>
            Constitution de la cabine, visibilité, accés, protection toit
            <Text style={styles.fontEn}>
              {`\n`}Constitution of the cabin, visibility, access, protection
              root
            </Text>
          </CheckCertRow>
          <CheckCertRow>
            Proprete, stockage carburant, protection incendie
            <Text style={styles.fontEn}>
              {`\n`}Cleanliness, off storage, and fire protection1
            </Text>
          </CheckCertRow>
          <CheckCertRow>
            Protection des organes mobile (fixation), chute d'objet
            <Text style={styles.fontEn}>
              {`\n`}Moves bodies protection (Maine), falis of object
            </Text>
          </CheckCertRow>
          <CheckCertRow>
            Contrôle toutes les parties habituellement graissées
            <Text style={styles.fontEn}>
              {`\n`}Contorl all parties usually greased
            </Text>
          </CheckCertRow>
          <CheckCertRow>
            Examen de l'état des freins des mouvements, et rotations
            <Text style={styles.fontEn}>
              {`\n`} Examination of the state of the brakes of the movements.
            </Text>
          </CheckCertRow>
          <CheckCertRow>
            Limiteur de vitesse, capacité, et fonctionnement
            <Text style={styles.fontEn}>
              {`\n`}Speed limited, capacity, and operation
            </Text>
          </CheckCertRow>
          <CheckCertRow>
            Appareils de prehhension, et protection contre la chute
          </CheckCertRow>
          <CheckCertRow>
            Affichage des consignes et avertisseur sonore
          </CheckCertRow>
          <CheckCertRow>
            Acces pour visite registre, et verification periodique
          </CheckCertRow>
          <View style={styles.certTableHead}>
            <Text style={{ width: "100%", textAlign: "center" }}>
              CONCLUSION
            </Text>
          </View>
          <CheckCertRow check={false}>
            Controle initail<Text style={styles.fontEn}>/ Initial check</Text>
          </CheckCertRow>
          <CheckCertRow>
            Controle periodique
            <Text style={styles.fontEn}>/Periodic check</Text>
          </CheckCertRow>
          <CheckCertRow check={false}>
            Contrôle intermédiaire
            <Text style={styles.fontEn}>/intermediate check</Text>
          </CheckCertRow>
          <CheckCertRow check={false}>
            Contrôle exceptionnel
            <Text style={styles.fontEn}>/Exceptional check</Text>
          </CheckCertRow>
          <View style={styles.certContainerFooter}>
            <View style={[styles.certContainer1, { width: "33%" }]}>
              <Text>
                *St: SATISFAISANT
                <Text style={styles.fontEn}>{`\n`}Satisfactory</Text>
              </Text>
            </View>
            <View style={[styles.certContainer2, { width: "33%" }]}>
              <Text>NA: NON APPLICABLE
              <Text style={styles.fontEn}>{`\n`} Not applicable</Text></Text>
            </View>
            <View style={[styles.certContainer3, { width: "33%" }]}>
              <Text>VO: VOIR OBSERVATION
              <Text style={styles.fontEn}>{`\n`}  See remark</Text></Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.certRow, { padding: 3, borderTopWidth: 0 }]}>
        <Text>
          COMMENTAIRES/Comment: CET APPAREL EST BON ETAT, DOIT EIRE MAINTENIR EN
          SERVICES
        </Text>
      </View>
      <View style={[styles.certRow, { padding: 3, borderTopWidth: 0 }]}>
        <Text>OBSERVATIONS/Remarks: R.A.S</Text>
      </View>
      <View style={[styles.certRow, { borderTopWidth: 0 }]}>
        <View style={[styles.certContainerFooter, { borderLeftWidth: 0 }]}>
          <View style={[styles.certContainer1, { width: "33%" }]}>
            <Text>PROCHAIN CONTROLE/Next inspection</Text>
            <Text>PERIODIQUE: {formatFrenchDate(values?.dateOfInspection)} Periodic</Text>
            <Text>NTERMEDIAIRE: -10 jours/{formatFrenchDate(values?.dateOfInspection)}/+10 jours Intermediate</Text>
          </View>
          <View
            style={[styles.certContainer2, { width: "33%", textAlign: "left" }]}
          >
            <Text>ETABLI A/Issued at: EL OUED</Text>
            <Text>CONTROLE EFFECTUE'PAR/performed by: </Text>
            <View
              style={{
                width: "100%",
                borderTop: "1px solid #000",
                marginVertical: 1,
              }}
            ></View>
            <Text>VISA ET CACHET-Signature and stamp</Text>
            <Text>
              According to the algerian regulations (Please see above)
            </Text>
          </View>
          <View style={[styles.certContainer3, { width: "33%" }]}>
            <Text>Le, On: {formatFrenchDate(values?.dateOfInspection)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TableDeVisite;
