export const fetchSurveyData = async (formId: string, endpoint: string) => {
  const response = await fetch(`/api/survey/${formId}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return response.json();
};
