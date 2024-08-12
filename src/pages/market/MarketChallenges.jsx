import React, { useEffect } from "react";
import { getChallengesInformation } from "../../sdk/survey";
import { toast } from "react-toastify";

const MarketChallenges = () => {
  const fetchChallenges = async () => {
    try {
      const response = await getChallengesInformation();
      console.log(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);
  return <div>MarketChallenges</div>;
};

export default MarketChallenges;
