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