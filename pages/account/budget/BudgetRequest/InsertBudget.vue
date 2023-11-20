<template>
  <h2>예산 신청</h2>

  <v-row>
    <!-- 첫 번째 카드 -->
    <v-col md="6">
      <v-card class="mb-6" title="계정과목선택" style="height: 100%">
        <v-form>
          <!-- 첫 번째 컴포넌트 -->
          <v-row>
            <v-col>
              <v-text-field
                ref="inputYear"
                placeholder="회계연도"
                class="form-control"
                label="회계연도"
                v-model="year"
              ></v-text-field>
            </v-col>

            <v-col>
              <NewYearNewDay
                :yeardata="yeardata"
                v-model="isDialogVisible"
                @selected="onSelected"
                @dialogToggle="dialogToggle"
                @dialogClose="dialogClose"
              />
            </v-col>
          </v-row>

          <!-- 두 번째 컴포넌트 -->
          <v-row>
            <v-col>
              <v-text-field
                placeholder="사업장명"
                v-model="workplaceName2"
                label="사업장명"
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                placeholder="부서명"
                v-model="deptName"
                label="부서명"
              ></v-text-field>
            </v-col>

            <v-col>
              <v-text-field
                placeholder="계정과목명"
                v-model="accountName"
                label="계정과목명"
                disabled
              ></v-text-field>
            </v-col>

            <v-col>
              <NewWorkNewDept
                :deptInfo="deptInfo"
                :workplaceName="workplaceName"
                v-model="isDialogVisible2"
                @selected2="onSelected2"
                @selected3="onSelected3"
                @dialogToggle2="dialogToggle2"
                @dialogClose2="dialogClose2"
              />
            </v-col>

            <VDataTable
              :headers="headers2"
              :items="accountCodeListTest"
              :items-per-page="4"
              @click:row="onSelected4"
              :class="{ 'selected-row': selectedRow === item }"
            ></VDataTable>
          </v-row>
        </v-form>
        <div></div>
      </v-card>
    </v-col>

    <!-- 두 번째 카드 -->
    <v-col md="6">
      <v-card class="mb-6" title="계정상세선택" style="height: 100%">
        <v-col>
          <v-text-field
            placeholder="계정과목"
            v-model="accountNameTest"
            label="계정과목"
            disabled
          ></v-text-field>
        </v-col>
        <VDataTable
          :headers="headers"
          :items="detailAccountList"
          :items-per-page="5"
          @click:row="onSelected5"
        ></VDataTable>
      </v-card>
    </v-col>
  </v-row>
  <NewCalender
    :deptCode="deptCode"
    :workplaceCode2="workplaceCode2"
    :accountPeriodNo="accountPeriodNo"
    :accountInnerInnerCode="accountInnerInnerCode"
  />
</template>

<script setup lang="ts">
import { VDataTable } from "vuetify/labs/VDataTable";
import { ref } from "vue";
import axios from "axios";
import NewYearNewDay from "./NewYearNewDay.vue";
import NewWorkNewDept from "./NewWorkNewDept.vue";
import NewCalender from "./NewCalender.vue";
import { budgetStore } from "@/store/account/budget";

const isDialogVisible = ref(false);
const isDialogVisible2 = ref(false);
const selectedRow = ref(null);

const accountPeriodNo = ref("");
const year = ref(null);
const workplaceName = ref([]);
const workplaceName2 = ref(null);
const workplaceCode2 = ref(null);
const dept_list = ref([]);
const yeardata = ref([]);
const selectedYear = ref("");
const deptName = ref("");
const deptCode = ref("");
const deptInfo = ref([]);
const accountCodeListTest = ref([]);
const accountInnerCode = ref("");
const detailAccountList = ref([]);
const accountInnerInnerCode = ref("");
const accountName = ref("");
const accountNameTest = ref("");

const dialogToggle = () => {
  isDialogVisible.value = !isDialogVisible.value;
};

const dialogClose = () => {
  isDialogVisible.value = false;
};

const dialogToggle2 = () => {
  isDialogVisible2.value = !isDialogVisible2.value;
};

const dialogClose2 = () => {
  isDialogVisible2.value = false;
};

const headers = [
  { title: "계정과목코드", sortable: false, key: "accountInnerCode" },
  { title: "계정과목", key: "accountName" },
];
const headers2 = [
  { title: "계정과목코드", sortable: false, key: "accountInnerCode" },
  { title: "계정과목명", key: "accountName" },
];

// const fetchData = async () => {
//   //yeardata.value
//   try {
//     const response = await axios.get(
//       "http://localhost:8282/acc/budget/periodNoList"
//     );
//     return response.data.periodList; // companyInfo 배열을 반환
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return [];
//   }
// };

// const fetchData2 = async () => {
//   try {
//     const response = await axios.get(
//       "http://localhost:8282/acc/operate/deptList"
//     );
//     console.log("deptList", response.data.deptList);
//     const deptData = response.data.deptList;
//     dept_list.value = deptData.map((e: any) => ({
//       value: e.workplaceCode,
//       text: e.workplaceName,
//     }));
//     return response.data.deptList; // companyInfo 배열을 반환
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return [];
//   }
// };

const searchYearData = async () => {
  await budgetStore().SEARCH_YEAR_DATA();
  yeardata.value = budgetStore().periodList;
  console.log("🌻🌻🌻", yeardata.value);
};

const searchDeptList = async () => {
  await budgetStore().SEARCH_DEPT_LIST();
  workplaceName.value = budgetStore().deptList;
  // const deptData = budgetStore().deptList;
  // console.log("deptDatadeptData",deptData)
  // workplaceName.value = deptData.map(item => item.workplaceName.value);
  // dept_list.value = deptData.map((e: any) => ({
  //   value: e.workplaceCode,
  //   text: e.workplaceName,
  // }));
  console.log("🌻🌻", workplaceName.value);
};

const fetchData3 = async (workplaceCode2) => {
  try {
    const response = await axios.get(
      "http://localhost:8282/acc/operate/detailDeptList",
      { params: { workplaceCode: workplaceCode2 } }
    );
    deptInfo.value = response.data.detailDeptList;
    deptName.value = response.data.detailDeptList.deptName;
    deptCode.value = response.data.detailDeptList.deptCode;
    return response.data.detailDeptList;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

watch(
  () => workplaceCode2.value,
  (newVal, oldVal) => {
    fetchData3(newVal);
  }
);

watch(
  () => accountInnerCode.value,
  (newVal, oldVal) => {
    fetchData5(newVal);
  }
);

const onSelected = ({ selected, a }) => {
  const startDate = new Date(a.internalItem.columns.periodStartDate);
  const endDate = new Date(a.internalItem.columns.periodEndDate);
  year.value = startDate.getFullYear();
  accountPeriodNo.value = a.internalItem.columns.accountPeriodNo;
};

const onSelected2 = ({ selected, b }) => {
  const workplaceCode = b.internalItem.columns.workplaceCode;
  const workplaceName = b.internalItem.columns.workplaceName;
  workplaceCode2.value = workplaceCode;
  workplaceName2.value = workplaceName;
};

const onSelected3 = ({ selected, c }) => {
  deptName.value = c.internalItem.columns.deptName;
  deptCode.value = c.internalItem.columns.deptCode;
  fetchData4();
};

const onSelected4 = (selected, d) => {
  accountInnerCode.value = d.internalItem.columns.accountInnerCode;
  accountName.value = d.internalItem.columns.accountName;
  fetchData5(accountInnerCode.value);
};

const onSelected5 = (selected, e) => {
  selectedRow.value = selected;
  accountInnerInnerCode.value = e.internalItem.columns.accountInnerCode;
  accountNameTest.value = e.internalItem.columns.accountName;
};

const fetchData4 = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8282/acc/base/parentAccountList"
    );
    console.log("responseeeee", response);
    accountCodeListTest.value = response.data.accountCodeList;
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const fetchData5 = async (accountInnerCode) => {
  console.log("accountInnerCode", accountInnerCode);
  try {
    const response = await axios.get(
      "http://localhost:8282/acc/base/account/findDetailAccountList",
      { params: { code: accountInnerCode } }
    );
    console.log("response", response);
    detailAccountList.value = response.data.detailAccountList;
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

onMounted(async () => {
  // yeardata.value = await fetchData();
  // workplaceName.value = await fetchData2();

  searchYearData();
  searchDeptList();
});
</script>

<style scoped></style>
