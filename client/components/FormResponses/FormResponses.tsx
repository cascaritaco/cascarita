import React from "react";
import styles from "./FormResponses.module.css";
import dummyFormData from "./dummyFormResponses2MissingAnswers.json";
import dummyFormFieldId from "./dummyFormFieldIds.json";
import { Answer } from "./types";

const FormResponses = () => {
  const responsesMap = new Map();
  dummyFormData.items.forEach((response) => {
    const responseId = response.response_id;
    const answersMap = new Map();
    response.answers.forEach((answer) => {
      answersMap.set(answer.field.id, answer);
    });
    responsesMap.set(responseId, answersMap);
  });

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
            {dummyFormFieldId.fieldIds.map((fieldId) => (
              <th key={fieldId}>{fieldId}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dummyFormData.items.map((response) => (
            <tr key={response.response_id}>
              {dummyFormFieldId.fieldIds.map((fieldId) => (
                <td key={fieldId}>
                  {responsesMap.has(response.response_id) &&
                    responsesMap.get(response.response_id).has(fieldId) &&
                    formatAnswer(
                      responsesMap.get(response.response_id).get(fieldId),
                    )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormResponses;
