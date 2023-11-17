// 23-11-14(화) Hoyeon
// 회계 메인페이지 UI 생성
// 큰틀 작업 끝나면 name에 들어가는 루트 바꿔줘야함
export default [
  {
    title: "ACCOUNT HOME",
    to: { name: "index" },
    icon: { icon: "tabler-smart-home" },
  },
  {
    title: "전표",
    icon: { icon: "tabler-file" },
    children: [
      {
        title: "전표조회",
        to: { name: "hr-affair-empDetail" },
      },
      {
        title: "전표추가",
        to: { name: "hr-affair-empList" },
      },
      {
        title: "전표승인",
        to: { name: "hr-affair-registerEmpList" },
      },
      {
        title: "분개장",
        to: { name: "hr-empeval-list" },
      },
    ],
  },
  {
    title: "장부관리",
    icon: { icon: "tabler-file" },
    children: [
      {
        title: "계정별원장",
        to: { name: "hr-empeval-manage" },
      },
      {
        title: "총계정원장",
        to: { name: "hr-appo-request" },
      },
      {
        title: "일(월)계표",
        to: { name: "hr-appo-manage" },
      },
      {
        title: "현금출납장",
        to: { name: "hr-appo-log" },
      },
    ],
  },
  {
    title: "결산/재무제표관리",
    icon: { icon: "tabler-file" },
    children: [
      {
        title: "합계잔액시산표",
        to: { name: "hr-salcheck-month" },
      },
      {
        title: "손익계산서",
        to: { name: "hr-salcheck-awrds" },
      },
      {
        title: "재무상태표",
        to: { name: "hr-salcheck-severancePay" },
      },
      {
        title: "월별손익계산서",
        to: { name: "hr-salreg-month" },
      },
      {
        title: "현금흐름표",
        to: { name: "hr-salreg-award" },
      },
      {
        title: "원가명세서",
        to: { name: "hr-salreg-severancePay" },
      },
    ],
  },
  {
    title: "고정자산관리",
    icon: { icon: "tabler-file" },
    children: [
      {
        title: "고정자산조회",
        to: { name: "hr-salbase-manage" },
      },
    ],
  },
  {
    title: "예산관리",
    icon: { icon: "tabler-file" },
    children: [
      {
        title: "예산 신청",
        to: { name: "account-budget-BudgetRequest-InsertBudget" },
      },
      {
        title: "예산 편성",
        to: { name: "account-budget-BudgetFormulation-BudgetFormulationPage" },
      },
      {
        title: "예산 실적 현황",
<<<<<<< HEAD
        to: { name: "account-budget-BudgetStatusPage" },
=======
        to: { name: "account-budget-BudgetStatus-BudgetStatusPage" },
>>>>>>> 108df3c1710063c976be16aed9bcbe4ce603b7ae
      },
    ],
  },
  {
    title: "기초정보관리",
    icon: { icon: "tabler-file" },
    children: [
      {
        title: "계정과목관리",
        to: { name: "hr-attendreg-rest" },
      },
      {
        title: "거래처관리",
        to: { name: "hr-attendreg-leave" },
      },
    ],
  },
];
