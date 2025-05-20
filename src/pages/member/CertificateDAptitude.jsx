import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import TrainingInfoForm from "@/layouts/member/TrainingInfoForm";
import TraineeForm from "@/layouts/member/TraineeForm";
import TraineesTable from "@/layouts/member/TraineesTable";
import { pdf } from "@react-pdf/renderer";
import { toast } from "sonner";
import CertificateDAptitudePDF from "@/utils/PDF/member/CertificateDAptitude";

export default function CertificateDAptitude() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      trainingDate: undefined,
      initialCertificateNumber: 1,
      certificateNumber: "",
      specialty: "",
      trainees: [],
    },
  });

  const [currentTrainee, setCurrentTrainee] = useState({
    fullName: "",
    birthDate: undefined,
    birthPlace: "",
    wilaya: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "trainees",
  });

  const handleSaveTrainee = () => {
    if (!currentTrainee.fullName) return;

    if (editingIndex !== null) {
      update(editingIndex, currentTrainee);
      setEditingIndex(null);
    } else {
      append({ ...currentTrainee, id: Date.now().toString() });
    }

    // Reset the currentTrainee
    setCurrentTrainee({
      fullName: "",
      birthDate: undefined,
      birthPlace: "",
      wilaya: "",
    });
  };

  const handleEditTrainee = (index) => {
    const trainee = fields[index];
    setCurrentTrainee(trainee);
    setEditingIndex(index);
  };

  async function handleGeneratePDF(values) {
    try {
      const blob = await pdf(
        <CertificateDAptitudePDF values={values} />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "certificate-d'aptitude.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("تم حفظ بيانات المعدة وتنزيل ملف PDF!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("فشل إنشاء ملف PDF. يرجى المحاولة مرة أخرى.");
    }
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">
        استخراج شهادة الكفاءة
      </h1>
      <h1 className="text-xl font-semibold mb-6">
        Certificate d'aptitude (avec durée)
      </h1>

      <form onSubmit={handleSubmit(handleGeneratePDF)}>
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <TrainingInfoForm
            control={control}
            register={register}
            errors={errors}
          />
          <TraineeForm
            currentTrainee={currentTrainee}
            setCurrentTrainee={setCurrentTrainee}
            errors={errors}
            editingIndex={editingIndex}
            handleSaveTrainee={handleSaveTrainee}
          />
          <TraineesTable
            fields={fields}
            handleEditTrainee={handleEditTrainee}
            handleDeleteTrainee={remove}
          />
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            size="lg"
            className="px-8"
            disabled={
              !watch("trainingDate") ||
              !watch("certificateNumber") ||
              fields.length === 0
            }
          >
            استخراج الشهادات PDF
          </Button>
        </div>
      </form>
    </div>
  );
}
