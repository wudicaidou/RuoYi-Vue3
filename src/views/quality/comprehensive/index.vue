<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
         <el-form-item label="开始日期" prop="dateRange">
           <el-date-picker
               v-model="queryParams.dateRange"
               type="daterange"
               unlink-panels
               range-separator="至"
               start-placeholder="开始日期"
               end-placeholder="截止日期"
               value-format="YYYY-MM-DD"
               :shortcuts="shortcuts"
           />
         </el-form-item>
         <el-form-item label="交易平台" prop="platformId">
            <el-select v-model="queryParams.platformId" placeholder="交易平台" clearable>
               <el-option
                  v-for="dict in biz_platform_id"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
               />
            </el-select>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">重跑数据</el-button>
            <el-button icon="Refresh" @click="resetQuery">清空</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>

<script setup name="Comprehensive">
import { reRunData } from "@/api/quality/comprehensive";

const { proxy } = getCurrentInstance();
const { biz_platform_id } = proxy.useDict("biz_platform_id");

const noticeList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    dateRange: undefined,
    platformId: undefined
  },
  rules: {
    dateRange: [{ required: true, message: "时间范围不能为空", trigger: "blur" }],
    platformId: [{ required: true, message: "交易平台不能为空", trigger: "change" }]
  },
});

const { queryParams, form, rules } = toRefs(data);

const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '最近三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

/** 搜索按钮操作 */
function handleQuery() {
  console.log(queryParams.value);
  let _value = queryParams.value;
  if (!_value) {
    proxy.$modal.msgWarning("请填写条件参数!");
    return;
  }
  if (!_value.dateRange || !_value.dateRange.length) {
    proxy.$modal.msgWarning("请填写时间范围!");
    return;
  }
  if (!_value.platformId) {
    proxy.$modal.msgWarning("请选择交易平台!");
    return;
  }
  const params = { startDate: _value.dateRange[0], endDate: _value.dateRange[1], platformId: _value.platformId }
  handleReRunData(params);

}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  //handleQuery();
}
/** 删除按钮操作 */
function handleReRunData(params) {
  proxy.$modal.confirm('是否确认重跑数据？').then(function() {
    return reRunData(params);
  }).then(() => {
    proxy.$modal.msgSuccess("数据已经开始重跑!");
  }).catch(() => {});
}

</script>
