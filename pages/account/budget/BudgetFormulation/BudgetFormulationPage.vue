<template>
  <h2>예산 편성</h2>
  <v-row>
    <!-- 첫 번째 카드 -->
    <v-col md="6">
      <v-card class="mb-6" title="계정과목선택">
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
              <VDialog v-model="isDialogVisible" width="500">
                <template #activator="{ props }">
                  <IconBtn class="me-1" @click="Shepherd.activeTour?.cancel()">
                    <VIcon v-bind="props" size="26" icon="tabler-search" />
                  </IconBtn>
                </template>
                <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />
                <!-- Dialog Content -->
                <VCard title="회계년도">
                  <VContainer>
                    <VDataTable
                      :headers="headers3"
                      :items="yeardata"
                      :items-per-page="5"
                      :key="(row) => row.id"
                      selectable
                      select-mode="single"
                      @click:row="onSelected"
                    />
                    <VCardText class="d-flex justify-end">
                      <VBtn @click="isDialogVisible = false"> OK </VBtn>
                    </VCardText>
                  </VContainer>
                </VCard>
              </VDialog>
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
              <VDialog v-model="isDialogVisible2" width="500">
                <template #activator="{ props }">
                  <IconBtn class="me-1" @click="Shepherd.activeTour?.cancel()">
                    <VIcon v-bind="props" size="26" icon="tabler-search" />
                  </IconBtn>
                </template>

                <DialogCloseBtn @click="isDialogVisible2 = !isDialogVisible2" />
                <!-- Dialog Content -->
                <VCard title="사업장/부서 선택">
                  <VContainer>
                    <VDataTable
                      :headers="headers4"
                      :items="workplaceName"
                      :items-per-page="5"
                      @click:row="onSelected2"
                    />
                    <VDataTable
                      :headers="headers5"
                      :items="deptInfo"
                      :items-per-page="5"
                      @click:row="onSelected3"
                    />

                    <VCardText class="d-flex justify-end">
                      <VBtn @click="isDialogVisible2 = false"> OK </VBtn>
                    </VCardText>
                  </VContainer>
                </VCard>
              </VDialog>
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
      <v-card class="mb-6" title="계정상세선택">
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

  <v-row>
    <v-col md="6">
      <VCard class="mb-6" title="예산신청조회">
        <VForm @submit.prevent="() => {}">
          <VRow>
            <VCol cols="12" md="3">
              <AppTextField v-model="month1_" label="1월" disabled/>
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month2_" label="2월" disabled/>
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month3_" label="3월" disabled/>
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month4_" label="4월" disabled/>
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month5_" label="5월" disabled/>
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month6_" label="6월" disabled/>
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month7_" label="7월" disabled/>
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month8_" label="8월" disabled/>
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month9_" label="9월" disabled/>
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month10_" label="10월" disabled/>
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month11_" label="11월" disabled/>
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month12_" label="12월" disabled/>
            </VCol>

            <VCol cols="12" class="d-flex gap-4">
              <VBtn @click="searchBudget"> 조회 </VBtn>

              <VBtn type="reset" color="secondary" variant="tonal">
                Reset
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCard>
    </v-col>

    <v-col md="6">
      <VCard class="mb-6" title="예산편성등록">
        <VForm @submit.prevent="() => {}">
          <VRow>
            <VCol cols="12" md="3">
              <AppTextField v-model="month1" label="1월" />
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month2" label="2월" />
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month3" label="3월" />
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month4" label="4월" />
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month5" label="5월" />
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month6" label="6월" />
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month7" label="7월" />
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month8" label="8월" />
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month9" label="9월" />
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month10" label="10월" />
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month11" label="11월" />
            </VCol>

            <VCol cols="12" md="3">
              <AppTextField v-model="month12" label="12월" />
            </VCol>

            <VCol cols="12" class="d-flex gap-4">
              <VBtn @click="insertBudget"> 등록 </VBtn>

              <VBtn type="reset" color="secondary" variant="tonal">
                Reset
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCard>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { VDataTable } from "vuetify/labs/VDataTable";
import { ref } from "vue";
import axios from "axios";
const isDialogVisible = ref(false);
const isDialogVisible2 = ref(false);

const month1 = ref("");
const month2 = ref("");
const month3 = ref("");
const month4 = ref("");
const month5 = ref("");
const month6 = ref("");
const month7 = ref("");
const month8 = ref("");
const month9 = ref("");
const month10 = ref("");
const month11 = ref("");
const month12 = ref("");

const month1_ = ref("");
const month2_ = ref("");
const month3_ = ref("");
const month4_ = ref("");
const month5_ = ref("");
const month6_ = ref("");
const month7_ = ref("");
const month8_ = ref("");
const month9_ = ref("");
const month10_ = ref("");
const month11_ = ref("");
const month12_ = ref("");

const selectedRow = ref(null);

const accountPeriodNo = ref("");
const year = ref(null);
const workplaceName = ref(null);
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

const headers = [
  { title: "계정과목코드", sortable: false, key: "accountInnerCode" },
  { title: "계정과목", key: "accountName" },
];
const headers2 = [
  { title: "계정과목코드", sortable: false, key: "accountInnerCode" },
  { title: "계정과목명", key: "accountName" },
];
const headers3 = [
  { title: "회계 시작일자", sortable: false, key: "periodStartDate" },
  { title: "회계 종료일자", key: "periodEndDate" },
  { title: "기간번호", key: "accountPeriodNo" },
];
const headers4 = [
  { title: "사업장코드", sortable: false, key: "workplaceCode" },
  { title: "사업장명", key: "workplaceName" },
];
const headers5 = [
  { title: "부서코드", sortable: false, key: "deptCode" },
  { title: "부서명", key: "deptName" },
];

const fetchData = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8282/acc/budget/periodNoList"
    );
    console.log("response👉👉👉", response.data.periodList);
    return response.data.periodList; // companyInfo 배열을 반환
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const fetchData2 = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8282/acc/operate/deptList"
    );
    console.log("deptList", response.data.deptList);
    const deptData = response.data.deptList;
    dept_list.value = deptData.map((e: any) => ({
      value: e.workplaceCode,
      text: e.workplaceName,
    }));
    console.log("dept_list.value", dept_list.value);
    return response.data.deptList; // companyInfo 배열을 반환
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const fetchData3 = async (workplaceCode2) => {
  console.log("workplaceCode2", workplaceCode2);
  try {
    const response = await axios.get(
      "http://localhost:8282/acc/operate/detailDeptList",
      { params: { workplaceCode: workplaceCode2 } }
    );
    console.log("response", response);
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

const onSelected = (selected, a) => {
  console.log("a", a);
  console.log("a", a.internalItem.columns.periodStartDate);
  console.log("a", a.internalItem.columns.periodEndDate);
  const startDate = new Date(a.internalItem.columns.periodStartDate);
  const endDate = new Date(a.internalItem.columns.periodEndDate);
  year.value = startDate.getFullYear();
  accountPeriodNo.value = a.internalItem.columns.accountPeriodNo;
};

const onSelected2 = (selected, b) => {
  console.log("b", b);
  const workplaceCode = b.internalItem.columns.workplaceCode;
  const workplaceName = b.internalItem.columns.workplaceName;
  console.log("👉👉👉", workplaceCode, workplaceName);
  workplaceCode2.value = workplaceCode;
  workplaceName2.value = workplaceName;
};

const onSelected3 = (selected, c) => {
  deptName.value = c.internalItem.columns.deptName;
  deptCode.value = c.internalItem.columns.deptCode;
  console.log("c", c);
  fetchData4();
};

const onSelected4 = (selected, d) => {
  accountInnerCode.value = d.internalItem.columns.accountInnerCode;
  accountName.value = d.internalItem.columns.accountName;

  console.log("d", d);
  fetchData5(accountInnerCode.value);
};

const onSelected5 = (selected, e) => {
  selectedRow.value = selected;
  accountInnerInnerCode.value = e.internalItem.columns.accountInnerCode;
  accountNameTest.value = e.internalItem.columns.accountName;

  console.log("e", e);
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

const insertBudget = async () => {
  const data = {
    deptCode: deptCode.value,
    workplaceCode: workplaceCode2.value,
    accountPeriodNo: accountPeriodNo.value,
    accountInnerCode: accountInnerInnerCode.value,
    budgetingCode: "1",
    m1Budget: month1.value,
    m2Budget: month2.value,
    m3Budget: month3.value,
    m4Budget: month4.value,
    m5Budget: month5.value,
    m6Budget: month6.value,
    m7Budget: month7.value,
    m8Budget: month8.value,
    m9Budget: month9.value,
    m10Budget: month10.value,
    m11Budget: month11.value,
    m12Budget: month12.value,
  };

  if (Object.values(data).some((dataValue) => dataValue == "")) {
    alert("월별 신청값을 입력해 주십시오");
  } else {
    console.log(Object.values(data));
    try {
      const response = await axios.post(
        "http://localhost:8282/acc/budget/registerBudget",
        data
      );
      console.log(response);
    } catch (error) {
      // axios.post에서 발생한 오류는 이곳에서 잡히게 됩니다.
      console.error("Error in insertBudget:", error);
      throw error; // 오류를 다시 던져서 상위 호출자에게 전달합니다.
    }
    alert("저장되었습니다");
  }
};

const searchBudget = async () => {
  const data = {
    deptCode: deptCode.value,
    workplaceCode: workplaceCode2.value,
    accountPeriodNo: accountPeriodNo.value,
    accountInnerCode: accountInnerInnerCode.value,
    budgetingCode: "1",
  };
  console.log("data", data);
  try {
    const response = await axios.get(
      "http://localhost:8282/acc/budget/findBudget",
      {
        params: {
          deptCode: deptCode.value,
          workplaceCode: workplaceCode2.value,
          accountPeriodNo: accountPeriodNo.value,
          accountInnerCode: accountInnerInnerCode.value,
          budgetingCode: "1",
        },
      }
    );
    console.log("response😶😶", response);
    month1_.value = response.data.findBudgetList[0].m1Budget;
    month2_.value = response.data.findBudgetList[0].m2Budget;
    month3_.value = response.data.findBudgetList[0].m3Budget;
    month4_.value = response.data.findBudgetList[0].m4Budget;
    month5_.value = response.data.findBudgetList[0].m5Budget;
    month6_.value = response.data.findBudgetList[0].m6Budget;
    month7_.value = response.data.findBudgetList[0].m7Budget;
    month8_.value = response.data.findBudgetList[0].m8Budget;
    month9_.value = response.data.findBudgetList[0].m9Budget;
    month10_.value = response.data.findBudgetList[0].m10Budget;
    month11_.value = response.data.findBudgetList[0].m11Budget;
    month12_.value = response.data.findBudgetList[0].m12Budget;
  } catch (error) {
    // axios.post에서 발생한 오류는 이곳에서 잡히게 됩니다.
    console.error("Error in insertBudget:", error);
    throw error; // 오류를 다시 던져서 상위 호출자에게 전달합니다.
  }
};

onMounted(async () => {
  yeardata.value = await fetchData();
  workplaceName.value = await fetchData2();
});
</script>

<style scoped>
.selected-row {
  background-color: #f0f0f0; /* Set the desired background color */
}
</style>
