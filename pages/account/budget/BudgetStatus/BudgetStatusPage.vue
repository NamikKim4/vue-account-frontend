<<<<<<< HEAD
<script setup lang="ts">
import moment from 'moment'
import { ref } from 'vue'
import { useStore } from 'vuex' // Vue 3에서는 useStore를 사용합니다.
=======
<<<<<<< HEAD
<template>
  <VRow>
    <!-- 직원정보조회 -->
    <VCol md="4">
      <VCard class="mb-6" height="1065" title="직원정보 조회">
        <VCardText>
          <VRow>
            <VCol cols="12" offset-md="" md="">
              <AppTextField v-model="search" density="compact" placeholder="검색" append-inner-icon="tabler-search"
                single-line hide-details dense outlined />
            </VCol>
          </VRow>
          <VDataTable :headers="headers" :items="filteredEmpList" @click:row="onRowClick" :items-per-page="10" />
        </VCardText>
      </VCard>
    </VCol>

    <!-- 직원기초정보 -->
    <VCol md="8">
      <VCard class="mb-6">
        <VCard-title class="mt-3">
          직원기초정보
          <v-btn class="ml-3" @click="editFunc"><VIcon
        start
        icon="tabler-edit"
      />수정</v-btn>
          <v-btn class="ml-3" @click="deleteFunc"><VIcon
        start
        icon="tabler-trash"
      />삭제</v-btn>
        </VCard-title>
        <div class="background">
          <div class="post">
            사진자리
          </div>
        </div>
        <v-text-field class="mb-3" label="사원명" v-model="emp_detail.empName" variant="outlined"></v-text-field>
        <v-text-field class="mb-3" label="사번" v-model="emp_detail.empCode" variant="outlined"></v-text-field>
        <AppDateTimePicker class="mb-3"  label="생년월일" v-model="emp_detail.birthDate" placeholder="생년월일" variant="outlined"
          :config="{ dateFormat: 'Y-m-d', disable: [{ from: `${currentYear}-${currentMonth}-20`, to: `${currentYear}-${currentMonth}-25` }] }" />
        <v-select class="mb-3" label="성별" :items="gender" :item-props="itemProps" v-model="emp_detail.gender"
          variant="outlined"></v-select>
        <v-select class="mb-3" label="부서" :items="deptList" :item-props="itemProps" v-model="emp_detail.deptCode"
          variant="outlined"></v-select>
        <v-text-field class="mb-3" label="부서번호" v-model="emp_detail.deptCode" readOnly variant="outlined"></v-text-field>
        <AppDateTimePicker class="mb-3"  label="입사일" v-model="emp_detail.hireDate" placeholder="입사일"
          :config="{ dateFormat: 'Y-m-d', disable: [{ from: `${currentYear}-${currentMonth}-20`, to: `${currentYear}-${currentMonth}-25` }] }" />
      </VCard>

      <!-- 직원기초정보 -->
      <VCard title="직원세부정보">
        <v-select class="mb-3" label="직급" :items="positions" :item-props="itemProps" v-model="emp_detail.positionCode"
          variant="outlined"></v-select>
        <v-text-field class="mb-3" label="전화번호" v-model="emp_detail.phoneNumber" variant="outlined"></v-text-field>
        <v-text-field class="mb-3" label="이메일" v-model="emp_detail.email" variant="outlined"></v-text-field>
        <v-select class="mb-3" label="근무지" :items="workplaceList" :item-props="itemProps" v-model="emp_detail.workplaceCode" variant="outlined"></v-select>
        <v-select class="mb-3" label="최종학력" :items="educations" :item-props="itemProps"
          v-model="emp_detail.levelOfEducation" variant="outlined"></v-select>
        <v-text-field class="mb-3" label="우편번호(클릭)" @click="searchPost" v-model="emp_detail.zipCode"
          variant="outlined"></v-text-field>
        <v-text-field class="mb-3" label="주소" v-model="emp_detail.basicAddress" variant="outlined"></v-text-field>
        <v-text-field class="mb-3" label="상세주소" v-model="emp_detail.detailAddress" variant="outlined"></v-text-field>
      </VCard>
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable';
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';

// 사원 컬럼
const headers = [
  { title: '사번', key: 'empCode' },
  { title: '직원명', key: 'empName' },
  { title: '부서이름', key: 'deptName' },
];

// 최종학력 select 컬럼
const educations = [
  { value: '중졸이하', text: '중졸이하' },
  { value: '중졸', text: '중졸' },
  { value: '고졸', text: '고졸' },
  { value: '대졸', text: '학사' },
  { value: '석사', text: '석사' },
  { value: '박사', text: '박사' },
];

// 직급 select 컬럼
const positions = [
  { value: 'POS-01', text: '사장' },
  { value: 'POS-02', text: '이사' },
  { value: 'POS-03', text: '부장' },
  { value: 'POS-04', text: '차장' },
  { value: 'POS-05', text: '과장' },
  { value: 'POS-06', text: '대리' },
  { value: 'POS-07', text: '사원' },
  { value: 'POS-08', text: '인턴' },
  { value: 'POS-09', text: '계약직' },
];

// 성별 select 컬럼
const gender = [
  { value: 'male', text: '남성' },
  { value: 'female', text: '여성' },
];

// select component에 사용되는 함수
const itemProps = (item: any) => {
  return {
    title: item.text,
    value: item.value,
  }
};

// DateTimePicker 관련 변수
const now = new Date()
const currentMonth = now.toLocaleString('default', { month: '2-digit' })
const currentYear = now.getFullYear()

const empList = ref([]);
const search = ref('');
const workplaceList = ref([]);
const deptList = ref([]);
const emp_detail = ref({
  empCode: "", 
  workplaceCode: "", 
  deptCode: "", 
  positionCode: "", 
  phoneNumber: "", 
  email: "", 
  zipCode: "", 
  basicAddress: "", 
  detailAddress: "", 
  levelOfEducation: "", 
  image: "", 
  empName: "", 
  deptName: "",
  gender: "", 
  hireDate: "", 
  birthDate: "", 
})

// 페이지가 로드되자마자 실행
onMounted(() => {
  fetchData();
  fetchWorkPlaceList();
  fetchDeptList();
});

// 직원리스트 조회
const fetchData = async () => {
  try {
      const response = await axios.get('http://localhost:8282/hr/affair/emp');
      console.log('[empList]', response.data.empList);
      empList.value = response.data.empList;
  } catch (error) {
      console.error(error);
  }
};

// 직원 검색
const filteredEmpList = computed(() => {
  return empList.value.filter((emp: any) => {
      return Object.values(emp).some((field) => {
          if (typeof field === 'string') {
              return field.toLowerCase().includes(search.value.toLowerCase());
          }
          return false;
      });
  });
});

// 직원 행 클릭
const onRowClick = async (event: any, item: any)=>{
      console.log('[clickEmp]', item.item.empCode);
      try {
        let clickEmp = item.item.empCode;
        const res = await axios.get(`http://localhost:8282/hr/affair/emp/${clickEmp}`)
        console.log('[empDetailInfo]', res.data.empDetailInfo[0])
        emp_detail.value = res.data.empDetailInfo[0]
        console.log(emp_detail.value)
        console.log('positionCode', emp_detail.value.positionCode)
        console.log('[clickEmp]', clickEmp)
      } catch (e) {
        console.error(e)
      }
    }

// 수정버튼, 사진 수정은 구현중임, EmpController.empInfoUpdate()
const editFunc = async ()=>{
  console.log('수정버튼 클릭!!!')
  try {
    const empUpdate = emp_detail.value
    console.log('[empUpdate]', empUpdate)
    const res = await axios.put(`http://localhost:8282/hr/affair/emp`, empUpdate)
    console.log('[res.empUpdate]', res.data) // sucess

  } catch (e) {
    console.error(e) // error.mesagge
  }
  alert('직원정보가 수정 되었습니다. ')
}

// 삭제버튼, EmpController.deleteEmp()
const deleteFunc = async (params: any) => {
  console.log('삭제버튼 클릭!!!')
  try {
    params = emp_detail.value.empCode
    console.log('[delEmpCode]', params)
    const res = await axios.delete(`http://localhost:8282/hr/affair/emp/${params}`, )
    console.log('[res.empUpdate]', res.data) // sucess
  } catch (e) {
    console.error(e) // error.mesagge
  }
  alert('직원정보가 삭제 되었습니다. ')
}

// 부서리스트 조회
const fetchDeptList = async () => {
  try {
  const res = await axios.get(`http://localhost:8282/hr/base/deptList`)
  const deptData = res.data.deptlist;
  deptList.value = deptData.map((e: any) => ({ value: e.deptCode, text: e.deptName }))
  console.log('[deptList]', deptList.value) 
  } catch (error) {
    console.error(error) 
  }
};

// 근무지리스트 조회
const fetchWorkPlaceList = async () => {
  try {
    const res = await axios.get(`http://localhost:8282/hr/base/workplaceList`);
    const workplaceData = res.data.workplaceList;
    workplaceList.value = workplaceData.map((e: any) => ({ value: e.workplaceCode, text: e.workplaceName }))
    console.log('[workplaceList]', workplaceList.value)
  } catch (error) {
    console.error(error);
  }
};

// 우편번호 모달 오픈, 구현중
const searchPost = ()=>{
  alert('우편번호 검색 api모달 출력!!! ')
  console.log('우편번호 검색!!!')
}

</script>

<style>
.post {
  width: 95%;
  padding-left: 5%;
  padding-top: 8%;
}
.post-body {
  height: 280px;
  width: 80%;
  background-position: center;
  background-size: cover;
  border: 5px solid;
  border-color: #161d31;
}
</style>
=======
<!-- <script>
import  BudgetStatus from "components/account/budget/BudgetStatus/BudgetStatus.vue";
export default {
  components: {
    BudgetStatus,
  },
>>>>>>> a8abbe98fe4c6da1d57f3a87e93d84a332bad84b

const store = useStore() // useStore를 사용하여 Vuex store에 액세스합니다.

// ref를 사용하여 데이터를 정의합니다.
const isDialogVisible = ref(false)
const isDialogVisible2 = ref(false)

const periodList = ref([])
const workplaceList = ref([])
const deptList = ref([])
const searchBudgetStatus = ref([])
const searchComparisonBudget = ref([])
const filteredDeptList = ref([])

const year = ref('')
const accountPeriodNo = ref('')
const workplaceCode = ref('')
const workplaceName = ref('')
const deptName = ref('')
const deptCode = ref('')

const tableData = ref([])
const selectedIndex = ref(-1) // 선택된 행의 인덱스
const hoveredIndex = ref(-1) // 마우스가 위에 있을 때 행의 인덱스
const sum_budgetStatus = ref([])
const sum_abr = ref('')
const sum_annualBudget = ref('')
const sum_remainingBudget = ref('')
const budgetExecRate = ref('')
const sum_ambr = ref('')
const sum_budget = ref('')
const sum_remainingMonthBudget = ref('')
const monthBudgetExecRate = ref('')

const columns = [
  { label: '구분', key: 'budgetDate' },
  { label: '신청예산', key: 'appBudget' },
  { label: '편성예산', key: 'orgBudget' },
  { label: '집행실적', key: 'execPerform' },
  { label: '예실대비', key: 'budgetAccountComparison' },
]

const headers3 = [
  { title: '회계 시작일자', sortable: false, key: 'periodStartDate' },
  { title: '회계 종료일자', key: 'periodEndDate' },
  { title: '기간번호', key: 'accountPeriodNo' },
]

const headers4 = [
  { title: '사업장코드', sortable: false, key: 'workplaceCode' },
  { title: '사업장명', key: 'workplaceName' },
]

const headers5 = [
  { title: '부서코드', sortable: false, key: 'deptCode' },
  { title: '부서명', key: 'deptName' },
]

/* 예산기수조회 */
const onSelected = (selected: any, a: any) => {
  console.log('a', a)
  console.log('a', a.internalItem.columns.periodStartDate)
  console.log('a', a.internalItem.columns.periodEndDate)

  const startDate = new Date(a.internalItem.columns.periodStartDate)
  const endDate = new Date(a.internalItem.columns.periodEndDate)

  year.value = startDate.getFullYear()

  accountPeriodNo.value = a.internalItem.columns.accountPeriodNo
}

// const onSelected = (selected: any) => {
//   let year = moment(selected.periodStartDate).format('YYYY');
//   year.value = year + '년';

//   let periodNo = selected.accountPeriodNo;
//   periodNo.value = periodNo;
// };

/* 사업장 선택시 부서조회 */
// const updateDeptList = (list: any) => {
//   const data = { workplaceCode: list };
//   store.dispatch('account/budget/SEARCH_DEPT_LIST', data);
// }
</script>

<!-- UI 출력 템플릿 설정 -->
<template>
  <!-- 페이지 메인 타이틀 -->
  <h2>예산 실적 현황</h2>
  <!-- 첫번째 컴포넌트 -->
  <div>
    <VCard class="mt-2">
      <v-row>
        <v-col 
          class="mt-4"
          cols="12"
          md="2"
        >
          <v-text-field
            ref="inputYear"
            v-model="year"
            placeholder="회계연도"
            class="form-control"
            label="회계연도"
          />
        </v-col>

        <v-col
          class="mt-4"
          cols="12"
          md="1"
        >
          <VDialog
            v-model="isDialogVisible"
            width="500"
          >
            <template #activator="{ props }">
              <IconBtn
                class="me-1"
                @click="Shepherd.activeTour?.cancel()"
              >
                <VIcon
                  v-bind="props"
                  size="26"
                  icon="tabler-search"
                />
              </IconBtn>
            </template>
            <DialogCloseBtn @click="isDialogVisible = !isDialogVisible" />

            <!-- Dialog Content -->
            <VCard title="회계연도">
              <VContainer>
                <VDataTable
                  :key="(row) => row.id"
                  :headers="headers3"
                  :items="yeardata"
                  :items-per-page="5"
                  selectable
                  select-mode="single"
                  @click:row="onSelected"
                />
                <VCardText class="d-flex justify-end">
                  <VBtn @click="isDialogVisible = false">
                    OK
                  </VBtn>
                </VCardText>
              </VContainer>
            </VCard>
          </VDialog>

          <p class="h4 mb-4">
            <VIcon
              v-b-modal.searchYear
              style="height: 70px;"
              icon="search"
            />
          </p>
        </v-col>

        <v-col
          class="mt-4"
          cols="12"
          md="3">
          <v-text-field
            placeholder="사업장명"
            v-model="workplaceName2"
            label="사업장명"
          />
        </v-col>

        <v-col
          class="mt-4"
          cols="12"
          md="3"
        >
          <v-text-field
            placeholder="부서명"
            v-model="deptName"
            label="부서명"
          />
        </v-col>
        <v-col class="mt-4" cols="12" md="1">
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

        <v-col
          class="mb-1"
          cols="12"
          md="2"
        >
          <p style="margin-top:17px;">
            <VBtn @click="searchBudget">
              예산실적조회
            </VBtn>
          </p>
        </v-col>
      </v-row>
    </VCard>
    <div>
      <table :show-footer="true">
        <thead>
          <tr>
            <th colspan="2">
              계정
            </th>
            <th colspan="4">
              누계예산대비실적
            </th>
            <th colspan="4">
              당월예산대비실적
            </th>
          </tr>
          <tr>
            <th>계정과목코드</th>
            <th>계정과목명</th>
            <th>실적</th>
            <th>예산</th>
            <th>잔여예산</th>
            <th>집행율(%)</th>
            <th>실적</th>
            <th>예산</th>
            <th>잔여예산</th>
            <th>집행율(%)</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in searchBudgetStatus"
            :key="index"
            :value="item.accountInnerCode"
            @click="rowSelect(item)"
            :class="{ 'selected': selectedIndex === index, 'hovered': hoveredIndex === index }"
            @mouseover="hoveredIndex = index"
            @mouseleave="hoveredIndex = -1"
          >
            <td class="center">
              {{ item.accountInnerCode }}
            </td>
            <td class="center">
              {{ item.accountName }}
            </td>
            <td class="center">
              {{ item.abr }}
            </td>
            <td class="center">
              {{ item.annualBudget }}
            </td>
            <td class="center">
              {{ item.remainingBudget }}
            </td>
            <td class="center">
              {{ item.budgetExecRate }}
            </td>
            <td class="center">
              {{ item.ambr }}
            </td>
            <td class="center">
              {{ item.budget }}
            </td>
            <td class="center">
              {{ item.remainingMonthBudget }}
            </td>
            <td class="center">
              {{ item.monthBudgetExecRate }}
            </td>
          </tr>
          <tr>
            <td
              colspan="2"
              class="center"
              style="background-color: darkgray;"
            >
              합계
            </td>
            <td class="center">
              {{ sum_abr }}
            </td>
            <td class="center">
              {{ sum_annualBudget }}
            </td>
            <td class="center">
              {{ sum_remainingBudget }}
            </td>
            <td class="center">
              {{ budgetExecRate }}
            </td>
            <td class="center">
              {{ sum_ambr }}
            </td>
            <td class="center">
              {{ sum_budget }}
            </td>
            <td class="center">
              {{ sum_remainingMonthBudget }}
            </td>
            <td class="center">
              {{ monthBudgetExecRate }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <br>

      <h3>예산 실적 대비</h3>
      <v-table
        hover
        sticky-header="true"
        :items="searchComparisonBudget"
        :fields="columns"
      />
    </div>
  </div>
</template>

    <style scoped>
      table{
       width:100%; color: black;
      }
      th{
        border: 1px solid; text-align: center; background-color: lightgray;
      }
      td{
        border: 1px solid; text-align: center; background-color: white;
      }
      .selected {
        background-color: yellow;
      }
      .hovered {
        background-color: gray;
      }
    </style>
>>>>>>> 2a794cd584e0fcfc630e64b851066e993caec684
