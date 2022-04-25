<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="交易中心" prop="platformId">
        <el-select v-model="queryParams.platformId" placeholder="请选择交易中心" clearable>
          <el-option
            v-for="dict in biz_platform_id"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="业务类型" prop="businessType">
        <el-select v-model="queryParams.businessType" placeholder="请选择业务类型" clearable>
          <el-option
            v-for="dict in biz_business_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="招标项目编码" prop="tenderProjectCode">
        <el-input
          v-model="queryParams.tenderProjectCode"
          placeholder="请输入招标项目编码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="招标项目名称" prop="tenderProjectName">
        <el-input
          v-model="queryParams.tenderProjectName"
          placeholder="请输入招标项目名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标段编码" prop="sectionCode">
        <el-input
          v-model="queryParams.sectionCode"
          placeholder="请输入标段编码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标段名称" prop="sectionName">
        <el-input
          v-model="queryParams.sectionName"
          placeholder="请输入标段名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目进展" prop="finishTable">
        <el-input
          v-model="queryParams.finishTable"
          placeholder="请输入项目进展"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="项目进展" prop="finishTableEn">
        <el-input
          v-model="queryParams.finishTableEn"
          placeholder="请输入项目进展"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="流程表名" prop="allTable">
        <el-input
          v-model="queryParams.allTable"
          placeholder="请输入流程表名"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="流程表英文名" prop="allTableEn">
        <el-input
          v-model="queryParams.allTableEn"
          placeholder="请输入流程表英文名"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>-->
      <el-form-item label="是否应上链" prop="needFlag">
        <el-select v-model="queryParams.needFlag" placeholder="请选择是否应上链" clearable>
          <el-option
            v-for="dict in biz_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="是否上链" prop="chainFlag">
        <el-select v-model="queryParams.chainFlag" placeholder="请选择是否上链" clearable>
          <el-option
            v-for="dict in biz_yes_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="修复结果" prop="repairFlag">
        <el-select v-model="queryParams.repairFlag" placeholder="请选择修复结果" clearable>
          <el-option
            v-for="dict in biz_check_result"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="成交/终止公告上链时间" prop="uploadTime">
        <el-date-picker clearable
          v-model="queryParams.uploadTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择成交/终止公告上链时间">
        </el-date-picker>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['quality:process:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['quality:process:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['quality:process:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['quality:process:export']"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="CircleCloseFilled"
            :disabled="multiple"
            @click="handleCloseProblem"
            v-hasPermi="['quality:process:close']"
        >关闭</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="processList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="主键" align="center" prop="id" />-->
      <el-table-column label="交易中心" align="center" prop="platformId" width="200">
        <template #default="scope">
          <dict-tag :options="biz_platform_id" :value="scope.row.platformId"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="交易中心名称" align="center" prop="platformName" />
      <el-table-column label="业务交易中心编码" align="center" prop="platformCode" />-->
      <el-table-column label="业务类型" align="center" prop="businessType">
        <template #default="scope">
          <dict-tag :options="biz_business_type" :value="scope.row.businessType"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="业务类型" align="center" prop="businessName" />-->
      <el-table-column label="招标项目编码" align="center" prop="tenderProjectCode"  width="220"/>
      <el-table-column label="招标项目名称" align="center" prop="tenderProjectName"  width="180" showTooltipWhenOverflow="true"/>
      <el-table-column label="标段编码" align="center" prop="sectionCode"  width="280"/>
      <el-table-column label="标段名称" align="center" prop="sectionName"  width="180" showTooltipWhenOverflow="true"/>
      <el-table-column label="项目进展" align="center" prop="finishTable"  width="180"/>
<!--      <el-table-column label="项目进展" align="center" prop="finishTableEn" />-->
      <el-table-column label="流程表名" align="center" prop="allTable"  width="180"/>
<!--      <el-table-column label="流程表英文名" align="center" prop="allTableEn" />-->
      <el-table-column label="是否应上链" align="center" prop="needFlag" width="100">
        <template #default="scope">
          <dict-tag :options="biz_yes_no" :value="scope.row.needFlag"/>
        </template>
      </el-table-column>
      <el-table-column label="是否上链" align="center" prop="chainFlag">
        <template #default="scope">
          <dict-tag :options="biz_yes_no" :value="scope.row.chainFlag"/>
        </template>
      </el-table-column>
      <el-table-column label="修复结果" align="center" prop="repairFlag">
        <template #default="scope">
          <dict-tag :options="biz_check_result" :value="scope.row.repairFlag"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="成交/终止公告块信息" align="center" prop="blockInfo" />-->
      <el-table-column label="成交/终止公告上链时间" align="center" prop="uploadTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.uploadTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180">
        <template #default="scope">
          <el-button
            type="text"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['quality:process:edit']"
          >修改</el-button>
          <el-button
            type="text"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['quality:process:remove']"
          >删除</el-button>
          <el-button
              type="text"
              icon="CircleCloseFilled"
              @click="handleCloseProblem(scope.row)"
              v-hasPermi="['quality:process:close']"
          >关闭</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改业务流程完整性问题修复对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="processRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="交易中心编码" prop="platformId">
          <el-select v-model="form.platformId" placeholder="请选择交易中心编码">
            <el-option
              v-for="dict in biz_platform_id"
              :key="dict.value"
              :label="dict.label"
:value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易中心名称" prop="platformName">
          <el-input v-model="form.platformName" placeholder="请输入交易中心名称" />
        </el-form-item>
        <el-form-item label="业务交易中心编码" prop="platformCode">
          <el-input v-model="form.platformCode" placeholder="请输入业务交易中心编码" />
        </el-form-item>
        <el-form-item label="业务类型" prop="businessType">
          <el-select v-model="form.businessType" placeholder="请选择业务类型">
            <el-option
              v-for="dict in biz_business_type"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="业务类型" prop="businessName">
          <el-input v-model="form.businessName" placeholder="请输入业务类型" />
        </el-form-item>
        <el-form-item label="招标项目编码" prop="tenderProjectCode">
          <el-input v-model="form.tenderProjectCode" placeholder="请输入招标项目编码" />
        </el-form-item>
        <el-form-item label="招标项目名称" prop="tenderProjectName">
          <el-input v-model="form.tenderProjectName" placeholder="请输入招标项目名称" />
        </el-form-item>
        <el-form-item label="标段编码" prop="sectionCode">
          <el-input v-model="form.sectionCode" placeholder="请输入标段编码" />
        </el-form-item>
        <el-form-item label="标段名称" prop="sectionName">
          <el-input v-model="form.sectionName" placeholder="请输入标段名称" />
        </el-form-item>
        <el-form-item label="项目进展" prop="finishTable">
          <el-input v-model="form.finishTable" placeholder="请输入项目进展" />
        </el-form-item>
        <el-form-item label="项目进展" prop="finishTableEn">
          <el-input v-model="form.finishTableEn" placeholder="请输入项目进展" />
        </el-form-item>
        <el-form-item label="流程表名" prop="allTable">
          <el-input v-model="form.allTable" placeholder="请输入流程表名" />
        </el-form-item>
        <el-form-item label="流程表英文名" prop="allTableEn">
          <el-input v-model="form.allTableEn" placeholder="请输入流程表英文名" />
        </el-form-item>
        <el-form-item label="是否应上链" prop="needFlag">
          <el-select v-model="form.needFlag" placeholder="请选择是否应上链">
            <el-option
              v-for="dict in biz_yes_no"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否上链" prop="chainFlag">
          <el-select v-model="form.chainFlag" placeholder="请选择是否上链">
            <el-option
              v-for="dict in biz_yes_no"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="修复结果" prop="repairFlag">
          <el-select v-model="form.repairFlag" placeholder="请选择修复结果">
            <el-option
              v-for="dict in biz_check_result"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日失效数据标识:1有效0失效" prop="dayState">
          <el-select v-model="form.dayState" placeholder="请选择日失效数据标识:1有效0失效">
            <el-option
              v-for="dict in biz_valid_flag"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="月失效数据标识:1有效0失效" prop="monthState">
          <el-select v-model="form.monthState" placeholder="请选择月失效数据标识:1有效0失效">
            <el-option
              v-for="dict in biz_valid_flag"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年失效数据标识:1有效0失效" prop="yearState">
          <el-select v-model="form.yearState" placeholder="请选择年失效数据标识:1有效0失效">
            <el-option
              v-for="dict in biz_valid_flag"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="汇总失效数据标识:1有效0失效" prop="totalState">
          <el-select v-model="form.totalState" placeholder="请选择汇总失效数据标识:1有效0失效">
            <el-option
              v-for="dict in biz_valid_flag"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成交/终止公告块信息" prop="blockInfo">
          <el-input v-model="form.blockInfo" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="成交/终止公告上链时间" prop="uploadTime">
          <el-date-picker clearable
            v-model="form.uploadTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择成交/终止公告上链时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="${comment}" prop="extention">
          <el-input v-model="form.extention" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="${comment}" prop="mask">
          <el-input v-model="form.mask" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="ctime">
          <el-date-picker clearable
            v-model="form.ctime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择${comment}">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="${comment}" prop="mtime">
          <el-date-picker clearable
            v-model="form.mtime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择${comment}">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Process">
import { listProcess, getProcess, delProcess, addProcess, updateProcess, closeProcess } from "@/api/quality/process";

const { proxy } = getCurrentInstance();
const { biz_check_result, biz_platform_id, biz_valid_flag, biz_business_type, biz_yes_no } = proxy.useDict('biz_check_result', 'biz_platform_id', 'biz_valid_flag', 'biz_business_type', 'biz_yes_no');

const processList = ref([]);
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
    pageNum: 1,
    pageSize: 10,
    platformId: null,
    platformName: null,
    platformCode: null,
    businessType: null,
    businessName: null,
    tenderProjectCode: null,
    tenderProjectName: null,
    sectionCode: null,
    sectionName: null,
    finishTable: null,
    finishTableEn: null,
    allTable: null,
    allTableEn: null,
    needFlag: null,
    chainFlag: null,
    repairFlag: null,
    dayState: null,
    monthState: null,
    yearState: null,
    totalState: null,
    blockInfo: null,
    uploadTime: null,
    extention: null,
    mask: null,
    ctime: null,
    mtime: null
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询业务流程完整性问题修复列表 */
function getList() {
  loading.value = true;
  listProcess(queryParams.value).then(response => {
    processList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    platformId: null,
    platformName: null,
    platformCode: null,
    businessType: null,
    businessName: null,
    tenderProjectCode: null,
    tenderProjectName: null,
    sectionCode: null,
    sectionName: null,
    finishTable: null,
    finishTableEn: null,
    allTable: null,
    allTableEn: null,
    needFlag: null,
    chainFlag: null,
    repairFlag: null,
    dayState: null,
    monthState: null,
    yearState: null,
    totalState: null,
    blockInfo: null,
    uploadTime: null,
    extention: null,
    mask: null,
    ctime: null,
    mtime: null
  };
  proxy.resetForm("processRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加业务流程完整性问题修复";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const id = row.id || ids.value
  getProcess(id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改业务流程完整性问题修复";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["processRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateProcess(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addProcess(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除业务流程完整性问题修复编号为"' + _ids + '"的数据项？').then(function() {
    return delProcess(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 关闭按钮操作 */
function handleCloseProblem(row) {
  const _ids = row && row.id ? [row.id] : ids.value;
  proxy.$modal.confirm('是否确认关闭当前业务流程完整性问题？').then(function() {
    return closeProcess(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("关闭成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('quality/process/export', {
    ...queryParams.value
  }, `业务流程完整性问题_${new Date().getTime()}.xlsx`)
}

getList();
</script>
