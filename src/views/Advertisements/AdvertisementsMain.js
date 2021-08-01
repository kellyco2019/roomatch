import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { filterPost } from "../../store/FilterReducer";
import { Advertisements } from "./Advertisements";
import queryString from "query-string";

function AdvertisementsMain() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  const { loading, error, ads } = useSelector((state) => {
    return {
      loading: state.getAdsReducer.loading,
      error: state.getAdsReducer.error,
      ads: state.filterPostReducer.ads,
      filterLoading: state.filterPostReducer.filterLoading,
      filterError: state.filterPostReducer.filterError,
      city: state.filterPostReducer.city,
      selectedDays: state.filterPostReducer.selectedDays,
    };
  });

  function useQueryCity() {
    return new URLSearchParams(location.search).get("city");
  }

  const city = useQueryCity();

  const handleQueryString = () => {
    let selectedDaysString = queryString.parse(location.search);
    return selectedDaysString.selectedDays.split(",");
  };

  const selectedDays = handleQueryString();

  useEffect(() => {
    dispatch(filterPost(city, selectedDays, history));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oops Something went wrong</p>;

  const handleSelect = (id) => {
    history.push(`/advertisement/${id}`);
  };

  console.log("ads", ads);
  return (
    <main>
      <Advertisements ads={ads} handleSelect={handleSelect} />
    </main>
  );
}

export default AdvertisementsMain;
