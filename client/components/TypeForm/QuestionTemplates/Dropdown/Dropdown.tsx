import { useSharedStates } from "../../contexts/SharedContext";
import { useQuestions } from "../../contexts/QuestionContext";
import { QuestionContent } from "../../QuestionComponents/QuestionContent/QuestionContent";
import { QuestionNavigation } from "../../QuestionComponents/QuestionNavigation/QuestionNavigation";
import { Error } from "../../QuestionComponents/Error/Error";
import { QuestionTemplateProps } from "../types";
import { SET_DROPDOWN_RESPONSE } from "../../reducers/actions/questionsActions";
import { QuestionDropdownOption } from "../../QuestionComponents/QuestionDropdownOption/QuestionDropdownOption";
import { QuestionDropdown } from "../../QuestionComponents/QuestionDropdown/QuestionDropdown";
import styles from "./Dropdown.module.css";
import classNames from "classnames";

export function Dropdown({ type, data, index }: QuestionTemplateProps) {
  console.log("HERE IS THE DATA: ", data);
  const {
    totalQuestions,
    errorMsg: error,
    setErrorMsg,
    handleOkClick,
    handleBackClick,
  } = useSharedStates();
  const { state, dispatch } = useQuestions();

  const errorMsg = error.shortTextResponses ?? "";
  const dropdownResponse = state.dropdownResponses[type] || "";

  function handleDropdownOptionClick(_dropdownResponse: string) {
    setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.role;
        return prevValue;
      });

    if (_dropdownResponse === dropdownResponse) {
      dispatch({
        type: SET_DROPDOWN_RESPONSE,
        payload: { type: type, value: "" },
      });
    } else {
      dispatch({
        type: SET_DROPDOWN_RESPONSE,
        payload: { type: type, value: _dropdownResponse },
      });
      setTimeout(() => handleOkClick(), 600);
    }
  }

  const hasError = () => {
    return (
      typeof errorMsg === "object" &&
      errorMsg !== null &&
      Object.keys(errorMsg).includes(type)
    );
  };

  return (
    <>
      <QuestionContent>
        {data.title}
        {data.validations?.required && (
          <span className={styles.asterisk}>*</span>
        )}
      </QuestionContent>

      <QuestionDropdown className={styles["role-dropdown"]}>
        <div>
          {data.properties &&
            data.properties.choices &&
            (data.properties?.choices).map((item, index) => {
              //   const _role = ROLES[roleKey];
              console.log("CHOICES: ", item, index);
              return (
                <QuestionDropdownOption
                  key={item.ref}
                  className={styles["role-option"]}
                  onClick={() => handleDropdownOptionClick(item.label)}
                  isSelected={item.label === dropdownResponse}>
                  <span
                    className={classNames({
                      [styles["selected"]]: item.label === dropdownResponse,
                    })}>
                    {item.label}
                  </span>
                </QuestionDropdownOption>
              );
            })}
        </div>
      </QuestionDropdown>

      {hasError() && (
        <Error message={(errorMsg as { [key: string]: string })[type]} />
      )}
      {errorMsg === "" && (
        <QuestionNavigation
          isFinal={index + 1 === totalQuestions}
          onBackClick={handleBackClick}
          showPressEnter={true}
          onClick={handleOkClick}>
          Next
        </QuestionNavigation>
      )}
    </>
  );
}
