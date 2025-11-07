import { FieldApi } from "@tanstack/react-form";
import { Plus, Trash2 } from "lucide-react";

interface EducationSectionProps {
  form: any;
}

export function EducationSection({ form }: EducationSectionProps) {
  const educationArray = useFieldArray(form, {
    name: "education",
  });

  return (
    <section className="space-y-4 border border-gray-200 rounded-xl p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">학력</h3>
        <button
          type="button"
          onClick={() =>
            educationArray.push({
              organ: "",
              department: "",
              degree_level: "",
              start_date: "",
              end_date: "",
              score: "",
            })
          }
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
        >
          <Plus size={16} /> 추가
        </button>
      </div>

      {educationArray.fields.length === 0 && (
        <p className="text-sm text-gray-400">학력을 추가해주세요.</p>
      )}

      {educationArray.fields.map((field, index) => (
        <div
          key={field.key}
          className="border rounded-lg p-4 space-y-3 bg-gray-50 relative"
        >
          <button
            type="button"
            onClick={() => educationArray.remove(index)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            title="삭제"
          >
            <Trash2 size={16} />
          </button>

          <div className="grid grid-cols-2 gap-3">
            <form.Field
              name={`education[${index}].organ`}
              children={(f: FieldApi<string>) => (
                <InputField label="학교명" field={f} />
              )}
            />
            <form.Field
              name={`education[${index}].department`}
              children={(f: FieldApi<string>) => (
                <InputField label="학과" field={f} />
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <form.Field
              name={`education[${index}].degree_level`}
              children={(f: FieldApi<string>) => (
                <InputField label="학위" field={f} />
              )}
            />
            <form.Field
              name={`education[${index}].start_date`}
              children={(f: FieldApi<string>) => (
                <InputField label="입학일" field={f} type="date" />
              )}
            />
            <form.Field
              name={`education[${index}].end_date`}
              children={(f: FieldApi<string>) => (
                <InputField label="졸업일" field={f} type="date" />
              )}
            />
          </div>

          <form.Field
            name={`education[${index}].score`}
            children={(f: FieldApi<string>) => (
              <InputField label="평점 (선택)" field={f} />
            )}
          />
        </div>
      ))}
    </section>
  );
}

function InputField({
  label,
  field,
  type = "text",
}: {
  label: string;
  field: FieldApi<string>;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={field.state.value ?? ""}
        onChange={(e) => field.handleChange(e.target.value)}
        className="border w-full rounded-md px-2 py-1 text-sm"
      />
      {field.state.meta.touchedErrors ? (
        <p className="text-xs text-red-500 mt-1">
          {field.state.meta.touchedErrors}
        </p>
      ) : null}
    </div>
  );
}
