export const MAX_PAGE_COUNT = 20;
export const BATCH_SIZE = 50;
export const IDLE_TIME = 1000 * 5; // in milliseconds
export const SEED = "sherpany"; // using the same seed with pagination guarantees correct results
export const BASE_API_URL = "https://randomuser.me/api/";
export const USER_DETAILS_MAPPING = {
  Street: "location.street.name",
  City: "location.city",
  State: "location.state",
  Postcode: "location.postcode",
  Phone: "phone",
  Cell: "cell"
};
export const NATIONALITIES = {
  CH: "ch",
  ES: "es",
  FR: "fr",
  GB: "gb"
};
