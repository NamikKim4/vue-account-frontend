<script>
export default {

  components: {
  },
  computed: {
  },
  props: ['periodList'],
  data(){
    return {
      columns: [
        {
          label: '회계 시작일자',
          key: 'periodStartDate',
          sortable: true,
        },
        {
          label: '회계 종료일자',
          key: 'periodEndDate',
          sortable: true,
        },
      ],
    }
  },
  methods:{
    onRowSelected(items) {
      console.log('items@@@@@@@@@', items)
      this.$emit('selected', items)
    },
  },
  mounted(){
  },
}
</script>

<template>
  <div>
    <VTable>
      :fields="columns"
      :items="periodList"
      responsive="lg"

      selectable
      select-mode="single"
      @row-clicked="onRowSelected"
    </VTable>
  </div>
</template>

<style scoped>
</style>
