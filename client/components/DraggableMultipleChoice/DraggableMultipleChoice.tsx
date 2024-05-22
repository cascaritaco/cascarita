import React from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { Draggable } from "react-beautiful-dnd";

interface MultipleChoiceOption {
  id: string;
  value: string;
}

interface DraggableMultipleChoiceProps {
  id: string;
  index: number;
  question: string;
  control: any; // Type as appropriate
}

const DraggableMultipleChoice: React.FC<DraggableMultipleChoiceProps> = ({
  id,
  index,
  question,
  control,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  const addOption = () => {
    append({ id: `option-${fields.length + 1}`, value: "" });
  };

  const removeOption = (optionIndex: number) => {
    remove(optionIndex);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            padding: 16,
            margin: "0 0 8px 0",
            background: "#f0f0f0",
            borderRadius: 4,
          }}
        >
          <label>{question}</label>
          {fields.map((field, idx) => (
            <div key={field.id}>
              <Controller
                name={`questions.${index}.options.${idx}.value`}
                control={control}
                render={({ field }) => (
                  <input {...field} placeholder={`Option ${idx + 1}`} />
                )}
              />
              <button type="button" onClick={() => removeOption(idx)}>
                Remove Option
              </button>
            </div>
          ))}
          <button type="button" onClick={addOption}>
            Add Option
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default DraggableMultipleChoice;
