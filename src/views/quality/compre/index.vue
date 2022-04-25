<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="交易中心编码" prop="platformId">
        <el-select v-model="queryParams.platformId" placeholder="请选择交易中心编码" clearable>
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
      <el-form-item label="公告名称" prop="noticeName">
        <el-input
          v-model="queryParams.noticeName"
          placeholder="请输入公告名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="发布时间" prop="noticeTime">
        <el-date-picker clearable
          v-model="queryParams.noticeTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择发布时间">
        </el-date-picker>
      </el-form-item>-->
      <el-form-item label="建设项目编码" prop="projectCode">
        <el-input
          v-model="queryParams.projectCode"
          placeholder="请输入建设项目编码"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="建设项目名称" prop="projectName">
        <el-input
          v-model="queryParams.projectName"
          placeholder="请输入建设项目名称"
          clearable
          @keyup.enter="handleQuery"
        />
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
      <el-form-item label="全面性检测结果" prop="compreResult">
        <el-select v-model="queryParams.compreResult" placeholder="请选择全面性检测结果" clearable>
          <el-option
            v-for="dict in biz_check_result"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="全面性修复结果" prop="repairResult">
        <el-select v-model="queryParams.repairResult" placeholder="请选择全面性修复结果" clearable>
          <el-option
            v-for="dict in biz_check_result"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="招标项目上链时间" prop="tenderProjectUploadTime">
        <el-date-picker clearable
          v-model="queryParams.tenderProjectUploadTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择招标项目上链时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="标段上链时间" prop="sectionUploadTime">
        <el-date-picker clearable
          v-model="queryParams.sectionUploadTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择标段上链时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="建设项目上链时间" prop="projectUploadTime">
        <el-date-picker clearable
          v-model="queryParams.projectUploadTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择建设项目上链时间">
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
          v-hasPermi="['quality:compre:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['quality:compre:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['quality:compre:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['quality:compre:export']"
        >导出</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
            type="danger"
            plain
            icon="CircleCloseFilled"
            :disabled="multiple"
            @click="handleCloseProblem"
            v-hasPermi="['quality:compre:close']"
        >关闭</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="compreList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="主键" align="center" prop="id" />-->
      <el-table-column label="交易中心名称" align="center" prop="platformId" width="200">
        <template #default="scope">
          <dict-tag :options="biz_platform_id" :value="scope.row.platformId"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="交易中心名称" align="center" prop="platformName" />-->
<!--      <el-table-column label="业务交易中心编码" align="center" prop="platformCode" />-->
      <el-table-column label="业务类型" align="center" prop="businessType">
        <template #default="scope">
          <dict-tag :options="biz_business_type" :value="scope.row.businessType"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="业务类型名称：1工程2采购" align="center" prop="businessName" />-->
<!--      <el-table-column label="公告类型" align="center" prop="noticeType" />-->
      <el-table-column label="公告名称" align="center" prop="noticeName" width="120" />
      <el-table-column label="发布时间" align="center" prop="noticeTime" width="100">
        <template #default="scope">
          <span>{{ parseTime(scope.row.noticeTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="网站地址" align="center" prop="noticeUrl" />-->
      <el-table-column label="公告标题" align="center" prop="noticeTitle" width="180" showTooltipWhenOverflow="true"/>
      <el-table-column label="建设项目编码" align="center" prop="projectCode"  width="220"/>
      <el-table-column label="建设项目名称" align="center" prop="projectName"  width="180" showTooltipWhenOverflow="true"/>
      <el-table-column label="招标项目编码" align="center" prop="tenderProjectCode"  width="240"/>
      <el-table-column label="项目名称" align="center" prop="tenderProjectName"  width="180" showTooltipWhenOverflow="true"/>
      <el-table-column label="标段编码" align="center" prop="sectionCode"  width="280"/>
      <el-table-column label="标段名称" align="center" prop="sectionName"  width="180" showTooltipWhenOverflow="true"/>
      <el-table-column label="检测结果" align="center" prop="compreResult">
        <template #default="scope">
          <dict-tag :options="biz_check_result" :value="scope.row.compreResult"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="日失效数据标识:1有效0失效" align="center" prop="dayState" />
      <el-table-column label="月失效数据标识:1有效0失效" align="center" prop="monthState" />
      <el-table-column label="年失效数据标识:1有效0失效" align="center" prop="yearState" />
      <el-table-column label="汇总失效数据标识:1有效0失效" align="center" prop="totalState" />-->
      <el-table-column label="修复结果" align="center" prop="repairResult">
        <template #default="scope">
          <dict-tag :options="biz_check_result" :value="scope.row.repairResult"/>
        </template>
      </el-table-column>
      <el-table-column label="招标项目上链时间" align="center" prop="tenderProjectUploadTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.tenderProjectUploadTime) }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="招标项目块信息" align="center" prop="tenderProjectBlockInfo" />-->
      <el-table-column label="标段上链时间" align="center" prop="sectionUploadTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.sectionUploadTime) }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="标段块信息" align="center" prop="sectionBlockInfo" />-->
      <el-table-column label="建设项目上链时间" align="center" prop="projectUploadTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.projectUploadTime) }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="建设项目块信息" align="center" prop="projectBlockInfo" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="180">
        <template #default="scope">
          <el-button
            type="text"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['quality:compre:edit']"
          >修改</el-button>
          <el-button
            type="text"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['quality:compre:remove']"
          >删除</el-button>
          <el-button
              type="text"
              icon="CircleCloseFilled"
              @click="handleCloseProblem(scope.row)"
              v-hasPermi="['quality:compre:close']"
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

    <!-- 添加或修改全面性问题关闭对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="compreRef" :model="form" :rules="rules" label-width="80px">
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
        <el-form-item label="业务类型名称：1工程2采购" prop="businessName">
          <el-input v-model="form.businessName" placeholder="请输入业务类型名称：1工程2采购" />
        </el-form-item>
        <el-form-item label="公告类型" prop="noticeType">
          <el-input v-model="form.noticeType" placeholder="请输入公告类型" />
        </el-form-item>
        <el-form-item label="公告名称" prop="noticeName">
          <el-input v-model="form.noticeName" placeholder="请输入公告名称" />
        </el-form-item>
        <el-form-item label="发布时间" prop="noticeTime">
          <el-date-picker clearable
            v-model="form.noticeTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择发布时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="网站地址" prop="noticeUrl">
          <el-input v-model="form.noticeUrl" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="公告标题" prop="noticeTitle">
          <el-input v-model="form.noticeTitle" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="建设项目编码" prop="projectCode">
          <el-input v-model="form.projectCode" placeholder="请输入建设项目编码" />
        </el-form-item>
        <el-form-item label="建设项目名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入建设项目名称" />
        </el-form-item>
        <el-form-item label="招标项目编码" prop="tenderProjectCode">
          <el-input v-model="form.tenderProjectCode" placeholder="请输入招标项目编码" />
        </el-form-item>
        <el-form-item label="项目名称" prop="tenderProjectName">
          <el-input v-model="form.tenderProjectName" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="标段编码" prop="sectionCode">
          <el-input v-model="form.sectionCode" placeholder="请输入标段编码" />
        </el-form-item>
        <el-form-item label="标段名称" prop="sectionName">
          <el-input v-model="form.sectionName" placeholder="请输入标段名称" />
        </el-form-item>
        <el-form-item label="全面性检测结果" prop="compreResult">
          <el-select v-model="form.compreResult" placeholder="请选择全面性检测结果">
            <el-option
              v-for="dict in biz_check_result"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日失效数据标识:1有效0失效" prop="dayState">
          <el-input v-model="form.dayState" placeholder="请输入日失效数据标识:1有效0失效" />
        </el-form-item>
        <el-form-item label="月失效数据标识:1有效0失效" prop="monthState">
          <el-input v-model="form.monthState" placeholder="请输入月失效数据标识:1有效0失效" />
        </el-form-item>
        <el-form-item label="年失效数据标识:1有效0失效" prop="yearState">
          <el-input v-model="form.yearState" placeholder="请输入年失效数据标识:1有效0失效" />
        </el-form-item>
        <el-form-item label="汇总失效数据标识:1有效0失效" prop="totalState">
          <el-input v-model="form.totalState" placeholder="请输入汇总失效数据标识:1有效0失效" />
        </el-form-item>
        <el-form-item label="全面性修复结果" prop="repairResult">
          <el-select v-model="form.repairResult" placeholder="请选择全面性修复结果">
            <el-option
              v-for="dict in biz_check_result"
              :key="dict.value"
              :label="dict.label"
:value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="招标项目上链时间" prop="tenderProjectUploadTime">
          <el-date-picker clearable
            v-model="form.tenderProjectUploadTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择招标项目上链时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="招标项目块信息" prop="tenderProjectBlockInfo">
          <el-input v-model="form.tenderProjectBlockInfo" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="标段上链时间" prop="sectionUploadTime">
          <el-date-picker clearable
            v-model="form.sectionUploadTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择标段上链时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标段块信息" prop="sectionBlockInfo">
          <el-input v-model="form.sectionBlockInfo" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="建设项目上链时间" prop="projectUploadTime">
          <el-date-picker clearable
            v-model="form.projectUploadTime"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择建设项目上链时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="建设项目块信息" prop="projectBlockInfo">
          <el-input v-model="form.projectBlockInfo" type="textarea" placeholder="请输入内容" />
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

<script setup name="Compre">
import { listCompre, getCompre, delCompre, addCompre, updateCompre, closeCompre } from "@/api/quality/compre";

const { proxy } = getCurrentInstance();
const { biz_check_result, biz_platform_id, biz_business_type } = proxy.useDict('biz_check_result', 'biz_platform_id', 'biz_business_type');

const compreList = ref([]);
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
    noticeType: null,
    noticeName: null,
    noticeTime: null,
    noticeUrl: null,
    noticeTitle: null,
    projectCode: null,
    projectName: null,
    tenderProjectCode: null,
    tenderProjectName: null,
    sectionCode: null,
    sectionName: null,
    compreResult: null,
    dayState: null,
    monthState: null,
    yearState: null,
    totalState: null,
    repairResult: null,
    tenderProjectUploadTime: null,
    tenderProjectBlockInfo: null,
    sectionUploadTime: null,
    sectionBlockInfo: null,
    projectUploadTime: null,
    projectBlockInfo: null,
    mask: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询全面性问题关闭列表 */
function getList() {
  loading.value = true;
  listCompre(queryParams.value).then(response => {
    compreList.value = response.rows;
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
    noticeType: null,
    noticeName: null,
    noticeTime: null,
    noticeUrl: null,
    noticeTitle: null,
    projectCode: null,
    projectName: null,
    tenderProjectCode: null,
    tenderProjectName: null,
    sectionCode: null,
    sectionName: null,
    compreResult: null,
    dayState: null,
    monthState: null,
    yearState: null,
    totalState: null,
    repairResult: null,
    tenderProjectUploadTime: null,
    tenderProjectBlockInfo: null,
    sectionUploadTime: null,
    sectionBlockInfo: null,
    projectUploadTime: null,
    projectBlockInfo: null,
    extention: null,
    mask: null,
    ctime: null,
    mtime: null
  };
  proxy.resetForm("compreRef");
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
  title.value = "添加全面性问题关闭";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const id = row.id || ids.value
  getCompre(id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改全面性问题关闭";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["compreRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateCompre(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addCompre(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除全面性问题关闭编号为"' + ids + '"的数据项？').then(function() {
    return delCompre(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 关闭按钮操作 */
function handleCloseProblem(row) {
  const _ids = row && row.id ? [row.id] : ids.value;
  proxy.$modal.confirm('是否确认关闭当前全面性问题？').then(function() {
    return closeCompre(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("关闭成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('quality/compre/export', {
    ...queryParams.value
  }, `compre_${new Date().getTime()}.xlsx`)
}

getList();
</script>
