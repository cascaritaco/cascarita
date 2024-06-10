import React, { useEffect, useState } from "react";
import styles from "./FormResponses.module.css";
import {
  Answer,
  AnswerRecordMap,
  Field,
  FormResponsesProps,
  TypeformResponse,
} from "./types";

const FormResponses = ({ formId }: FormResponsesProps) => {
  const [formFields, setFormFields] = useState<Field[]>([]);
  const [formResponsesMap, setFormResponsesMap] = useState<AnswerRecordMap>(
    new Map(),
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchSurveyData = async (endpoint: string) => {
          const response = await fetch(`/api/survey/${formId}${endpoint}`);
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          return response.json();
        };

        const formData = await fetchSurveyData("");
        setFormFields(formData.fields);

        const responsesData = await fetchSurveyData("/responses");

        const responsesMap = responsesData.items.reduce(
          (res: AnswerRecordMap, response: TypeformResponse) => {
            const answersMap: Map<string, Answer> = new Map();
            response.answers?.forEach((answer: Answer) => {
              answersMap.set(answer.field.id, answer);
            });
            res.set(response.response_id, answersMap);
            return res;
          },
          new Map(),
        );

        setFormResponsesMap(responsesMap);
      } catch (err) {
        console.error("Error fetching form and responses:", err);
      }
    };

    fetchData();
  }, [formId]);

  const formatAnswer = (answer: Answer) => {
    const typeFormatters: Record<string, () => string | JSX.Element> = {
      text: () => answer.text ?? "",
      number: () => String(answer.number ?? ""),
      email: () => answer.email ?? "",
      phone_number: () => answer.phone_number ?? "",
      choice: () => answer.choice?.label ?? "",
      choices: () => answer.choices?.labels.join(", ") ?? "",
      date: () =>
        answer.date ? new Date(answer.date).toLocaleDateString() : "",
      file_url: () =>
        answer.file_url ? <a href={answer.file_url}>File</a> : "",
      boolean: () => (answer.boolean ? "Yes" : "No"),
      default: () => "",
    };

    return (typeFormatters[answer.type] ?? typeFormatters.default)();
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {formFields.map((field) => (
              <th key={field.id}>{field.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from(formResponsesMap.keys()).map((responseId) => (
            <tr key={responseId}>
              {formFields.map((field) => (
                <td key={field.id}>
                  {formResponsesMap.get(responseId)?.get(field.id)?.type &&
                    formatAnswer(
                      formResponsesMap.get(responseId)?.get(field.id) as Answer,
                    )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {formResponsesMap.size === 0 && (
        <div style={{ display: "flex", justifyContent: "center", padding: 10 }}>
          <h2>No Form Responses yet</h2>
        </div>
      )}
    </div>
  );
};

export default FormResponses;
