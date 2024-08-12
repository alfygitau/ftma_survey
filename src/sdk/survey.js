import axios from "axios";

export const getFSCByCounty = async () => {
  try {
    const response = await axios.get(
      "https://ftma.egroup.co.ke/training/api/v1/survey/distribution/data"
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getRolesSkillsAndExperience = async () => {
  try {
    const response = await axios.get(
      "https://ftma.egroup.co.ke/training/api/v1/survey/roles-skills-expirience/data"
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getMarketInformation = async () => {
  try {
    const response = await axios.get(
      "https://ftma.egroup.co.ke/training/api/v1/survey/market-info-analysis/data"
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getInputsInformation = async () => {
  try {
    const response = await axios.get(
      "https://ftma.egroup.co.ke/training/api/v1/survey/input-analysis/data"
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getChallengesInformation = async () => {
  try {
    const response = await axios.get(
      "https://ftma.egroup.co.ke/training/api/v1/survey/access-challenges-analysis/data"
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
