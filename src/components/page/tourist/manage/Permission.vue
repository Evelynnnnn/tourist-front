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
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column label="用户名" prop="name">
                </el-table-column>
                <el-table-column label="入职日期" prop="entryDate">
                </el-table-column>
                <el-table-column prop="province" label="省"></el-table-column>
                <el-table-column prop="city" label="市"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column prop="mail" label="邮箱"></el-table-column>
                <el-table-column prop="phone" label="电话"></el-table-column>
                <el-table-column prop="job" label="职位"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.state==='在职'?'success':(scope.row.state==='离职'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="dutyAddress" label="负责地点"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                                type="text"
                                icon="el-icon-delete"
                                class="red"
                                @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style=" margin: 20px 0;">
                <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">新增</el-button>
                <el-drawer
                        title="新增人员"
                        :visible.sync="drawer"
                        :direction="direction"
                        :before-close="handleClose">
                    <el-form ref="form" :model="form" label-width="70px">
                        <el-form-item label="用户名">
                            <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="入职日期">
                            <el-input v-model="form.entryDate"></el-input>
                        </el-form-item>
                        <el-form-item label="省">
                            <el-select v-model="province" clearable placeholder="请选择" value-key="province" @change="currentProvinceSel(province)">
                                <el-option
                                        v-for="item in provinces"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="市">
                            <el-select v-model="city" clearable placeholder="请选择" value-key="city" @change="currentCitySel(city)">
                                <el-option
                                        v-for="item in citys"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.label">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="地址">
                            <el-input v-model="form.address"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="form.mail"></el-input>
                        </el-form-item>
                        <el-form-item label="电话">
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="职位">
                            <el-input v-model="form.job"></el-input>
                        </el-form-item>
                        <el-form-item label="负责地点">
                            <el-input v-model="form.dutyAddress"></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button style="float: right;" type="primary" @click="saveStaff(form)">保存</el-button>
                </el-drawer>
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
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="入职日期">
                    <el-input v-model="form.entryDate"></el-input>
                </el-form-item>
                <el-form-item label="省">
                    <el-select v-model="province" clearable placeholder="请选择" value-key="province" @change="currentProvinceSel(province)">
                        <el-option
                                v-for="item in provinces"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="市">
                    <el-select v-model="city" clearable placeholder="请选择" value-key="city" @change="currentCitySel(city)">
                        <el-option
                                v-for="item in citys"
                                :key="item.value"
                                :label="item.label"
                                :value="item.label">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.mail"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="职位">
                    <el-input v-model="form.job"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="form.state"></el-input>
                </el-form-item>
                <el-form-item label="负责地点">
                    <el-input v-model="form.dutyAddress"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定 &nbsp;</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                drawer: false,
                direction: 'rtl',
                query: {
                    address: '',
                    name: '',
                    pageIndex: 1,
                    pageSize: 10
                },
                province:'江苏',
                city:'苏州',
                provinces:[],
                citys:[],
                tableData: [],
                multipleSelection: [],
                delList: [],
                editVisible: false,
                pageTotal: 0,
                form: {},
                idx: -1,
                id: -1
            };
        },
        created() {
            this.getTableData();
            this.getProvinces();
        },
        methods: {
            currentCitySel(selVal) {
                this.city = selVal
            },
            currentProvinceSel(selVal) {
                this.province = selVal
                console.log(this.province)
                this.getCitys(this.province)
            },
            getCitys(province){
                const that = this
                this.$axios.get("http://localhost:9099/tourist/city/getCity?name="+province).then(successResponse => {
                    that.citys = successResponse.data
                })
            },
            getProvinces(){
                const that = this
                this.$axios.get("http://localhost:9099/tourist/city/allProvince").then(successResponse => {
                    that.provinces = successResponse.data
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            getTableData(){
                const that = this
                this.$axios.get('http://localhost:9099/tourist/staff/all').then(
                    successResponse => {
                        that.tableData = successResponse.data
                        that.pageTotal = successResponse.data.length
                    }
                )
            },
            saveStaff(form) {
                if (Object.keys(form).length==0){
                    this.$message.error('请输入值')
                }else{
                    this.$axios.post('http://localhost:9099/tourist/staff/addStaff',{staff:this.form})
                    this.editVisible = false;
                    this.$message.success(`保存成功`);
                    this.$set(this.tableData, this.idx, this.form);
                    location.reload()
                }
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
                        this.$axios.post('http://localhost:9099/tourist/staff/deleteStaff',{staff:row}).then(successResponse => {
                            this.$message.success('删除成功');
                            this.tableData.splice(index, 1);
                        })
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
            // 保存编辑
            saveEdit() {
                this.$axios.post('http://localhost:9099/tourist/staff/updateStaff',{staff:this.form})
                this.editVisible = false;
                this.form.province = this.province
                this.form.city = this.city
                this.$message.success(`修改成功`);
                this.$set(this.tableData, this.idx, this.form);
            },
            // 分页导航
            handlePageChange(val) {
                this.$set(this.query, 'pageIndex', val);
                this.getData();
            }
        }
    };
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
