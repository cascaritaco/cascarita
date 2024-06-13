import React, { useEffect, useState } from "react";
import styles from "./FormResponses.module.css";
import {
  Answer,
  AnswerRecordMap,
  Field,
  FormResponsesProps,
  TypeformResponse,
} from "./types";
import { fetchFormData } from "../../api/forms/service";
import { truncateText } from "../../util/truncateText";
import { useTranslation } from "react-i18next";

const FormResponses = ({ formId }: FormResponsesProps) => {
  const [formFields, setFormFields] = useState<Field[]>([]);
  const [formResponsesMap, setFormResponsesMap] = useState<AnswerRecordMap>(
    new Map(),
  );
  const { t } = useTranslation("FormResponses");

  useEffect(() => {
    (async () => {
      const formData = await fetchFormData(formId, "");
      setFormFields(formData.fields);
      const responsesData = await fetchFormData(formId, "/responses");
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
    })();
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
        answer.file_url ? <a href={answer.file_url}>{t("fileText")}</a> : "",
      boolean: () =>
        answer.boolean ? t("booleanOption.true") : t("booleanOption.false"),
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
              <th key={field.id} title={field.title}>
                <p>{truncateText(field.title, 35)}</p>
              </th>
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
        <div className={styles.emptyFormResponses}>
          <h2>{t("noResponsesText")}</h2>
        </div>
      )}
    </div>
  );
};

export default FormResponses;
