/**
 - 사원 행 클릭하면 일근태 수정, 삭제 모달 띄우기
 - 사원조회가 안되있으면 일근태 추가버튼 못누르도록 막기
*/

<template>
  <div>
    <VCard class="mb-6" title="일근태 등록">
      <VContainer>
        <VForm @submit.prevent="() => { }">
          <VRow>
            <!--  👉 날짜 선택 -->
            <VCol cols="24" md="3" offset-md="5">
              <AppDateTimePicker v-model="date" placeholder="날짜선택" prepend-icon="tabler-calendar-event" />
            </VCol>

            <!-- 👉 사원 조회 -->
            <VCol cols="24" md="2" offset-md="">
              <VDialog v-model="isEmployeeDialogVisible" width="500">
                <!-- 사원 조회 버튼 -->
                <template #activator="{ props }">
                  <VBtn v-bind="props" prepend-icon="tabler-user-search" width="350">
                    사원조회
                  </VBtn>
                </template>

                <!-- 다이얼로그 닫기 버튼 -->
                <DialogCloseBtn @click="isEmployeeDialogVisible = !isEmployeeDialogVisible" />

                <!-- 사원조회 다이얼로그 테이블 -->
                <VCard title="사원조회">
                  <v-select class="mb-3" label="부서명" :items="dept_list" :item-props="itemProps" v-model="selectedDept" variant="outlined"></v-select>
                  <v-text-field class="mb-3" label="부서코드" v-model="selectedDept" readonly variant="outlined"></v-text-field>
                  <v-select class="mb-3" label="사원명" :items="emp_list" :item-props="itemProps"  v-model="selectedEmp" variant="outlined"></v-select>
                  <v-text-field class="mb-3" label="사원코드" readonly  v-model="selectedEmp" variant="outlined"></v-text-field>

                  <VCardText class="d-flex justify-end">
                    <VBtn @click="isEmployeeDialogVisible = false">
                      선택
                    </VBtn>
                  </VCardText>
                </VCard>
              </VDialog>
            </VCol>

            <!-- 👉 일 근태 추가 -->
            <VCol cols="24" md="2" offset-md="">
              <VDialog v-model="isAttendanceDialogVisible" width="500">
                <template #activator="{ props }">
                  <VBtn v-bind="props" prepend-icon="tabler-calendar-plus">
                    일근태 추가
                  </VBtn>
                </template>

                <DialogCloseBtn @click="isAttendanceDialogVisible = !isAttendanceDialogVisible" />

                <VCard title="일근태추가">
                  <VContainer>
                    <v-text-field class="mb-3" label="사원명" readonly v-model="emp_list.title" variant="outlined"></v-text-field>
                    <v-text-field class="mb-3" label="사원코드" readonly v-model="selectedEmp" variant="outlined"></v-text-field>
                    <v-select class="mb-3" label="근무타입" :items="[]" :item-props="itemProps" variant="outlined"></v-select>
                    <v-text-field class="mb-3" label="시간" readonly variant="outlined"></v-text-field>
                    <VCardText class="d-flex justify-end">
                      <VBtn @click="isAttendanceDialogVisible = false">
                        선택
                      </VBtn>
                    </VCardText>
                  </VContainer>
                </VCard>
              </VDialog>
            </VCol>
          </VRow>
        </VForm>

        <!-- 👉 일근태 등록 테이블 -->
        <VDataTable class="mt-6" :headers="headers" :items="data" :items-per-page="5" height="350" />

      </VContainer>

      <VBtn v-if="false">
        Accept
        <VIcon end icon="tabler-checkbox" />
      </VBtn>
    </VCard>
  </div>
</template>

<script lang="ts" setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import axios from 'axios';

// Dialog
const isEmployeeDialogVisible = ref(false)
const isAttendanceDialogVisible = ref(false)

// DateTimePicker
const date = ref('')

const selectedDept = ref('');
const dept_list = ref([]);
const selectedEmp = ref('');
const emp_list = ref([]);

// Table Columns
const headers = [
  { title: '이름', key: 'empName' },
  { title: '일렬번호', key: 'dayAttdcode' },
  { title: '승인날짜', key: 'applyDay' },
  { title: '근태관리코드', key: 'attdTypeCode' },
  { title: '근태내용', key: 'attdTypeName' },
  { title: '시간', key: 'time' },
]

// select component에 사용되는 함수
const itemProps = (item: any) => {
  return {
    title: item.text,
    value: item.value,
  }
};

// 페이지가 로드되자마자 실행
onMounted(() => {
  fetchDeptList();
});

// selectedDept가 변경될때마다 fetchEmpList 호출
watch(selectedDept, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    fetchEmpList();
  }
});

// 부서리스트 조회
const fetchDeptList = async () => {
  try {
  const res = await axios.get(`http://localhost:8282/hr/base/deptList`)
  const deptData = res.data.deptlist;
  dept_list.value = deptData.map((e: any) => ({ value: e.deptCode, text: e.deptName }))
  console.log('[deptList]', dept_list.value)
  
  fetchEmpList();
} catch (error) {
    console.error(error) 
  }
};

// 직원리스트 조회
const fetchEmpList = async () => {
  try {
    console.log('[selectedDept]', selectedDept.value)
    const deptCode = selectedDept.value
    const res = await axios.get(`http://localhost:8282/hr/attendance/findEmpListByDept`, {params: {deptCode: deptCode}});
    const empData = res.data.empList
    console.log('[empData]', empData)
    emp_list.value = empData.map((e: any) => ({ value: e.empCode, text: e.empName }))
    console.log('[empList]', emp_list.value) 
  } catch (error) {
    console.error(error)
  }
};

// empCode(EMP-01), applyDay(2020-09-23), attdTypeCode(ADC001), attdTypeName(출근), time(1731)

// 사원조회가 안되있으면 사원조회 해주세요하고 되있으면 일근태추가에 뉴데이트 등록해줌
// const addDailyAttnd = () => {
//       if(!this.empData.empCode){
//         alert('사원을 먼저 선택해주세요.')
//       }else{
//         const now = new Date()
//         this.applyTime = now.getHours() + ('0' + now.getMinutes()).slice(-2);
//         this.$root.$emit("bv::show::modal", "addDayilyAttdModal");
//       }
//     }
</script>