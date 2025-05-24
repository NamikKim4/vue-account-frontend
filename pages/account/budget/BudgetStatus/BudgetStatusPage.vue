<template>
  <VRow>
    <!-- 직원정보조회 -->
    <VCol md="4">
      <VCard class="mb-6" height="1065" title="직원정보 조회">
        <VCardText>
          <VRow>
            <VCol cols="12">
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
          <v-btn class="ml-3" @click="editFunc"><VIcon start icon="tabler-edit" />수정</v-btn>
          <v-btn class="ml-3" @click="deleteFunc"><VIcon start icon="tabler-trash" />삭제</v-btn>
        </VCard-title>
        <div class="background">
          <div class="post">사진자리</div>
        </div>
        <v-text-field class="mb-3" label="사원명" v-model="emp_detail.empName" variant="outlined"></v-text-field>
        <v-text-field class="mb-3" label="사번" v-model="emp_detail.empCode" variant="outlined" readonly></v-text-field>
        <AppDateTimePicker class="mb-3" label="생년월일" v-model="emp_detail.birthDate" placeholder="생년월일" variant="outlined"
          :config="{ dateFormat: 'Y-m-d' }" />
        <v-select class="mb-3" label="성별" :items="gender" :item-props="itemProps" v-model="emp_detail.gender" variant="outlined"></v-select>
        <v-select class="mb-3" label="부서" :items="deptList" :item-props="itemProps" v-model="emp_detail.deptCode" variant="outlined"></v-select>
        <AppDateTimePicker class="mb-3" label="입사일" v-model="emp_detail.hireDate" placeholder="입사일"
          :config="{ dateFormat: 'Y-m-d' }" />
      </VCard>

      <!-- 직원세부정보 -->
      <VCard title="직원세부정보">
        <v-select class="mb-3" label="직급" :items="positions" :item-props="itemProps" v-model="emp_detail.positionCode" variant="outlined"></v-select>
        <v-text-field class="mb-3" label="전화번호" v-model="emp_detail.phoneNumber" variant="outlined"></v-text-field>
        <v-text-field class="mb-3" label="이메일" v-model="emp_detail.email" variant="outlined"></v-text-field>
        <v-select class="mb-3" label="근무지" :items="workplaceList" :item-props="itemProps" v-model="emp_detail.workplaceCode" variant="outlined"></v-select>
        <v-select class="mb-3" label="최종학력" :items="educations" :item-props="itemProps" v-model="emp_detail.levelOfEducation" variant="outlined"></v-select>
        <v-text-field class="mb-3" label="우편번호(클릭)" @click="searchPost" v-model="emp_detail.zipCode" variant="outlined"></v-text-field>
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

const headers = [
  { title: '사번', key: 'empCode' },
  { title: '직원명', key: 'empName' },
  { title: '부서이름', key: 'deptName' },
];

const educations = [
  { value: '중졸이하', text: '중졸이하' },
  { value: '중졸', text: '중졸' },
  { value: '고졸', text: '고졸' },
  { value: '대졸', text: '학사' },
  { value: '석사', text: '석사' },
  { value: '박사', text: '박사' },
];

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

const gender = [
  { value: 'male', text: '남성' },
  { value: 'female', text: '여성' },
];

const itemProps = (item: any) => ({ title: item.text, value: item.value });

const empList = ref([]);
const search = ref('');
const workplaceList = ref([]);
const deptList = ref([]);
const emp_detail = ref({
  empCode: '',
  workplaceCode: '',
  deptCode: '',
  positionCode: '',
  phoneNumber: '',
  email: '',
  zipCode: '',
  basicAddress: '',
  detailAddress: '',
  levelOfEducation: '',
  image: '',
  empName: '',
  deptName: '',
  gender: '',
  hireDate: '',
  birthDate: '',
});

onMounted(() => {
  fetchData();
  fetchWorkPlaceList();
  fetchDeptList();
});

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:8282/hr/affair/emp');
    empList.value = response.data.empList;
  } catch (error) {
    console.error(error);
  }
};

const filteredEmpList = computed(() => {
  return empList.value.filter((emp: any) => {
    return Object.values(emp).some((field) => {
      return typeof field === 'string' && field.toLowerCase().includes(search.value.toLowerCase());
    });
  });
});

const onRowClick = async (event: any, item: any) => {
  try {
    const clickEmp = item.item.empCode;
    const res = await axios.get(`http://localhost:8282/hr/affair/emp/${clickEmp}`);
    emp_detail.value = res.data.empDetailInfo[0];
  } catch (e) {
    console.error(e);
  }
};

const editFunc = async () => {
  try {
    const res = await axios.put(`http://localhost:8282/hr/affair/emp`, emp_detail.value);
    alert('직원정보가 수정 되었습니다.');
  } catch (e) {
    console.error(e);
  }
};

const deleteFunc = async () => {
  try {
    const empCode = emp_detail.value.empCode;
    await axios.delete(`http://localhost:8282/hr/affair/emp/${empCode}`);
    alert('직원정보가 삭제 되었습니다.');
  } catch (e) {
    console.error(e);
  }
};

const fetchDeptList = async () => {
  try {
    const res = await axios.get(`http://localhost:8282/hr/base/deptList`);
    deptList.value = res.data.deptlist.map((e: any) => ({ value: e.deptCode, text: e.deptName }));
  } catch (error) {
    console.error(error);
  }
};

const fetchWorkPlaceList = async () => {
  try {
    const res = await axios.get(`http://localhost:8282/hr/base/workplaceList`);
    workplaceList.value = res.data.workplaceList.map((e: any) => ({ value: e.workplaceCode, text: e.workplaceName }));
  } catch (error) {
    console.error(error);
  }
};

const searchPost = () => {
  alert('우편번호 검색 api모달 출력!!!');
};
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
