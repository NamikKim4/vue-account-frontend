import { getYearData, getDeptList } from "@/api/account/budget";
import { defineStore } from "pinia";

export const budgetStore = defineStore("attenStore", {
  state: () => ({
    periodList: [],
    deptList: [],
  }),
  actions: {
    async SEARCH_YEAR_DATA() {
      try {
        const res = await getYearData();

        this.periodList = res.data.periodList;
      } catch (err: any) {
        throw new Error(err);
      }
    },
    async SEARCH_DEPT_LIST() {
      try {
        const response = await getDeptList()
        console.log("responseresponse",response)
        this.deptList = response.data.deptList
      }
      catch (err: any) {
        throw new Error(err)
      }
    },
  },
  
});
