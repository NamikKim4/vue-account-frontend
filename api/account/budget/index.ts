import axios from "axios";

const BASE_URL = "http://localhost:8282/acc";

function getYearData() {
  console.log("API를 호출했습니다.");
  return axios.get(`${BASE_URL}/budget/periodNoList`);
}

function getDeptList() {
  console.log('API를 호출했습니당당.')

  return axios.get(`${BASE_URL}/operate/deptList`);
}



export { getYearData,getDeptList };
