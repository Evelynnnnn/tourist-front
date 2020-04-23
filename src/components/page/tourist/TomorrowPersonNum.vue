<template>
    <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%">
        <el-table-column
                prop="date"
                label="日期"
                sortable
                width="180"
                column-key="date"
        >
        </el-table-column>
        <el-table-column
                prop="address"
                label="地点">
        </el-table-column>
        <el-table-column
                prop="nowNumber"
                label="当前人数">
        </el-table-column>
        <el-table-column
                prop="todayMost"
                label="今日最高">
        </el-table-column>
        <el-table-column
                prop="todayTotal"
                label="今日平均">
        </el-table-column>
        <el-table-column
                prop="tag"
                label="明日类型"
                width="100"
                filter-placement="bottom-end">
            <template slot-scope="scope">
                <el-tag
                        :type="scope.row.tag === '工作日' ? 'success' : 'primary'"
                        disable-transitions>{{scope.row.tag}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
                prop="tomorrowMost"
                label="明日最高预计">
        </el-table-column>
        <el-table-column
                prop="tomorrowTotal"
                label="明日平均预计">
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        data() {
            return {
                tableData: []
            }
        },
        created() {
            this.getTableData()
        },
        methods: {
            resetDateFilter() {
                this.$refs.filterTable.clearFilter('date');
            },
            clearFilter() {
                this.$refs.filterTable.clearFilter();
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            getTableData(){
                this.$axios.get("http://127.0.0.1:9099/tourist/count/tomorrowNumber").then(
                    successResponse => {
                        this.tableData = successResponse.data
                        console.log(successResponse)
                    }
                )
            }
        }
    }
</script>
