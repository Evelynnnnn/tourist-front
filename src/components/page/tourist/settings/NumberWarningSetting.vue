<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 员工信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    header-cell-class-name="table-header"
            >

                <el-table-column label="地点" prop="address">
                </el-table-column>
                <el-table-column prop="personNum" label="当前人数"></el-table-column>
                <el-table-column prop="name" label="负责人员"></el-table-column>
                <el-table-column prop="job" label="职位"></el-table-column>
                <el-table-column prop="warningNumber" label="预警人数"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >设置预警人数</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style=" margin: 20px 0;border:5px #00d1b2 ">
                <el-button
                        type="primary"
                        icon="el-icon-edit"
                        @click="handleAllEdit()"
                >一键设置</el-button>
            </div>
            <div class="pagination">
                <el-pagination
                        background
                        layout="total, prev, pager, next"
                        :current-page="query.pageIndex"
                        :page-size="query.pageSize"
                        :total="pageTotal"
                        @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="预警人数">
                    <el-input v-model="input" placeholder="请输入数字"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="settingOne">确 定</el-button>
                </span>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="editVisible2" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="预警人数">
                    <el-input v-model="input" placeholder="请输入数字"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="settingAll">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                input:'',
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                editVisible2: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getTableData();
        },
        methods: {
            getTableData(){
                const that = this
                this.$axios.get('http://localhost:9099/tourist/count/warning').then(
                    successResponse => {
                        that.tableData = successResponse.data
                        that.pageTotal = successResponse.data.length
                    }
                )
            },
            // 获取 easy-mock 的模拟数据
            // getData() {
            //     fetchData(this.query).then(res => {
            //         console.log(res);
            //         this.tableData = res.list;
            //         this.pageTotal = res.pageTotal || 50;
            //     });
            // },
            // 触发搜索按钮
            handleSearch() {
                this.$set(this.query, 'pageIndex', 1);
                this.getData();
            },
            // 删除操作
            handleDelete(index, row) {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$message.success('删除成功');
                        this.tableData.splice(index, 1);
                    })
                    .catch(() => {});
            },
            // 多选操作
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            delAllSelection() {
                const length = this.multipleSelection.length;
                let str = '';
                this.delList = this.delList.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error(`删除了${str}`);
                this.multipleSelection = [];
            },
            // 编辑操作
            handleEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible = true;
            },
            handleAllEdit(index, row) {
                this.idx = index;
                this.form = row;
                this.editVisible2 = true;
            },
            // 保存编辑
            saveEdit() {
                this.editVisible = false;
                this.$message.success(`修改成功`);
                this.$set(this.tableData, this.idx, this.form);
            },
            saveEdit2() {
                this.editVisible2 = false;
                this.$message.success(`修改成功`);
                this.$set(this.tableData, this.idx, this.form);
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            },
            settingOne(){
                this.$axios.post('http://localhost:9099/tourist/warning/settingOne',{text:this.input,address:this.tableData[this.idx]["address"]}).then(
                    successResponse => {
                        console.log(successResponse)
                    }
                )
                location.reload()
                this.saveEdit()
            },
            settingAll(){
                this.$axios.get('http://localhost:9099/tourist/warning/settingAll?number='+this.input).then(
                    successResponse => {
                        console.log(successResponse)
                    }
                )
                location.reload()
                this.saveEdit2()
            }
        }
    }
</script>
<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table {
        width: 100%;
        font-size: 14px;
    }
    .red {
        color: #ff0000;
    }
    .mr10 {
        margin-right: 10px;
    }
    .table-td-thumb {
        display: block;
        margin: auto;
        width: 40px;
        height: 40px;
    }
</style>
