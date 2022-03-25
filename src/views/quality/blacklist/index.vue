<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">
      <el-form-item label="交易中心" prop="platformId">
        <el-select v-model="queryParams.platformId" placeholder="请选择数据上传交易中心编码" clearable>
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
      <el-form-item label="建设项目编号" prop="projectCode">
        <el-input
          v-model="queryParams.projectCode"
          placeholder="请输入建设项目编号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目编号" prop="tenderProjectCode">
        <el-input
          v-model="queryParams.tenderProjectCode"
          placeholder="请输入招标项目编号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="标段编号" prop="sectionCode">
        <el-input
          v-model="queryParams.sectionCode"
          placeholder="请输入标段编号"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
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
          v-hasPermi="['quality:blacklist:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['quality:blacklist:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['quality:blacklist:remove']"
        >删除</el-button>
      </el-col>
<!--      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['quality:blacklist:export']"
        >导出</el-button>
      </el-col>-->
      <el-col :span="1.5">
        <el-button
            type="warning"
            plain
            icon="Upload"
            @click="handleImport"
            v-hasPermi="['quality:blacklist:import']"
        >导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="DocumentDelete"
          @click="handleExclude"
          v-hasPermi="['quality:blacklist:edit']"
        >屏蔽测试数据</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="blacklistList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
<!--      <el-table-column label="ID" align="center" prop="id" />-->
      <el-table-column label="交易中心编码" align="center" prop="platformId" />
      <el-table-column label="交易中心名称" align="center" prop="platformName">
        <template #default="scope">
          <dict-tag :options="biz_platform_id" :value="scope.row.platformId"/>
        </template>
      </el-table-column>
      <el-table-column label="业务类型" align="center" prop="businessType">
        <template #default="scope">
          <dict-tag :options="biz_business_type" :value="scope.row.businessType"/>
        </template>
      </el-table-column>
      <el-table-column label="建设项目编号" align="center" prop="projectCode" />
      <el-table-column label="项目编号" align="center" prop="tenderProjectCode" />
      <el-table-column label="标段编号" align="center" prop="sectionCode" :show-overflow-tooltip="true" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="100">
        <template #default="scope">
          <span>{{ parseTime(scope.row.ctime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button
            type="text"
            icon="Edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['quality:blacklist:edit']"
          >修改</el-button>
          <el-button
            type="text"
            icon="Delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['quality:blacklist:remove']"
          >删除</el-button>
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

    <!-- 添加或修改测试数据黑名单对话框 -->
    <el-dialog :title="title" v-model="open" width="500px" append-to-body>
      <el-form ref="blacklistRef" :model="form" :rules="rules" label-width="auto">
        <el-form-item label="交易中心" prop="platformId">
          <el-select v-model="form.platformId" placeholder="请选择交易中心">
            <el-option
              v-for="dict in biz_platform_id"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
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
<!--        <el-form-item label="catalog数据ID" prop="ebidsunDataId">
          <el-input v-model="form.ebidsunDataId" placeholder="请输入catalog数据ID" />
        </el-form-item>
        <el-form-item label="catalog表名" prop="catalogTableName">
          <el-input v-model="form.catalogTableName" placeholder="请输入catalog表名" />
        </el-form-item>-->
        <el-form-item label="建设项目编号" prop="projectCode">
          <el-input v-model="form.projectCode" placeholder="请输入建设项目编号" />
        </el-form-item>
        <el-form-item label="项目编号" prop="tenderProjectCode">
          <el-input v-model="form.tenderProjectCode" placeholder="请输入招标项目编号" />
        </el-form-item>
<!--        <el-form-item label="项目名称" prop="tenderProjectName">
          <el-input v-model="form.tenderProjectName" placeholder="请输入招标项目名称" />
        </el-form-item>-->
        <el-form-item label="标段编号" prop="sectionCode">
          <el-input v-model="form.sectionCode" placeholder="请输入标段编号" />
        </el-form-item>
<!--        <el-form-item label="标段名称" prop="sectionName">
          <el-input v-model="form.sectionName" placeholder="请输入标段名称" />
        </el-form-item>
        <el-form-item label="数据版本" prop="version">
          <el-input v-model="form.version" placeholder="请输入数据版本" />
        </el-form-item>-->
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 导入对话框 -->
    <el-dialog :title="upload.title" v-model="upload.open" width="400px" append-to-body>
      <el-upload
          ref="uploadRef"
          :limit="1"
          accept=".xlsx, .xls"
          :headers="upload.headers"
          :action="upload.url + '?updateSupport=' + upload.updateSupport"
          :disabled="upload.isUploading"
          :on-progress="handleFileUploadProgress"
          :on-success="handleFileSuccess"
          :auto-upload="false"
          drag
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip text-center">
<!--            <div class="el-upload__tip">
              <el-checkbox v-model="upload.updateSupport" />是否更新已经存在的用户数据
            </div>-->
            <span>仅允许导入xls、xlsx格式文件。</span>
            <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;" @click="importTemplate">下载模板</el-link>
          </div>
        </template>
      </el-upload>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitFileForm">确 定</el-button>
          <el-button @click="upload.open = false">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Blacklist">
import { getToken } from "@/utils/auth";
import { listBlacklist, getBlacklist, delBlacklist, addBlacklist, updateBlacklist, excludeBlacklist } from "@/api/quality/blacklist";

const router = useRouter();
const { proxy } = getCurrentInstance();
const { biz_platform_id, biz_business_type } = proxy.useDict('biz_platform_id', 'biz_business_type');

const blacklistList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const upload = reactive({
  // 是否显示弹出层（导入）
  open: false,
  // 弹出层标题（导入）
  title: "",
  // 是否禁用上传
  isUploading: false,
  // 是否更新已经存在的数据
  updateSupport: 0,
  // 设置上传的请求头部
  headers: { Authorization: "Bearer " + getToken() },
  // 上传的地址
  url: import.meta.env.VITE_APP_BASE_API + "/quality/blacklist/importData"
});

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    platformId: null,
    platformName: null,
    businessType: null,
    businessName: null,
    ebidsunDataId: null,
    catalogTableName: null,
    projectCode: null,
    tenderProjectCode: null,
    tenderProjectName: null,
    sectionCode: null,
    sectionName: null,
    version: null,
    mask: null,
  },
  rules: {
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询测试数据黑名单列表 */
function getList() {
  loading.value = true;
  listBlacklist(queryParams.value).then(response => {
    blacklistList.value = response.rows;
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
    businessType: null,
    businessName: null,
    ebidsunDataId: null,
    catalogTableName: null,
    projectCode: null,
    tenderProjectCode: null,
    tenderProjectName: null,
    sectionCode: null,
    sectionName: null,
    version: null,
    extention: null,
    mask: null,
    ctime: null,
    mtime: null
  };
  proxy.resetForm("blacklistRef");
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
  title.value = "添加测试数据黑名单";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const id = row.id || ids.value
  getBlacklist(id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改测试数据黑名单";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["blacklistRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateBlacklist(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addBlacklist(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除？').then(function() {
    return delBlacklist(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('quality/blacklist/export', {
    ...queryParams.value
  }, `blacklist_${new Date().getTime()}.xlsx`)
}

function handleExclude() {
  proxy.$modal.confirm('是否确认执行屏蔽测试数据任务？').then(function() {
    return excludeBlacklist();
  }).then(() => {
    //getList();
    proxy.$modal.msgSuccess("任务执行成功");
  }).catch(() => {});
}

/** 导入按钮操作 */
function handleImport() {
  upload.title = "黑名单导入";
  upload.open = true;
};
/** 下载模板操作 */
function importTemplate() {
  proxy.download("quality/blacklist/importTemplate", {
  }, `blacklist_template_${new Date().getTime()}.xlsx`);
};
/**文件上传中处理 */
const handleFileUploadProgress = (event, file, fileList) => {
  upload.isUploading = true;
};
/** 文件上传成功处理 */
const handleFileSuccess = (response, file, fileList) => {
  upload.open = false;
  upload.isUploading = false;
  proxy.$refs["uploadRef"].clearFiles();
  proxy.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
  getList();
};
/** 提交上传文件 */
function submitFileForm() {
  proxy.$refs["uploadRef"].submit();
};

getList();
</script>
