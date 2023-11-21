<script setup lang="ts">
import moment from 'moment'
import { ref } from 'vue'
import { useStore } from 'vuex' // Vue 3에서는 useStore를 사용합니다.

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
