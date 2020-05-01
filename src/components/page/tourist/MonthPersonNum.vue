<template>
    <div>
        <div class="block">
            年份:&nbsp;&nbsp;<el-select v-model="year" clearable placeholder="请选择" value-key="year" @change="currentYearSel(year)">
                <el-option
                        v-for="item in years"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                </el-option>
            </el-select>
            月份:&nbsp;&nbsp;<el-select v-model="month" clearable placeholder="请选择" value-key="month" @change="currentMonthSel(month)">
                <el-option
                        v-for="item in months"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                </el-option>
            </el-select>
            地点:&nbsp;&nbsp;<el-select v-model="value" clearable placeholder="请选择" value-key="value" @change="currentSel(value)">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                </el-option>
            </el-select>
            <el-button @click="getSeries">查询</el-button>
        </div>
        <div :class="classPrefix" style="top: 20px">
            <div ref = 'myEchart' :class="classPrefix+'_chart'"></div>
        </div>
    </div>
</template>

<script type="text/babel">
    import echarts from 'echarts'
    export default {
        data() {
            return {
                year:'2020',
                month:'1',
                value:'测试1',
                years:[],
                months:[],
                options:[],
                chooseDate:'',
                address:'',
                classPrefix: "qst-tecs-src-teacher-dean-brokenLine_",
                xNum:[],
                yNum:['当日最高', '当日平均'],
                series:[],   // 折线图数据
            }
        },
        methods: {
            // 图表初始化数据
            initChart(){
                let myChart = echarts.init(this.$refs.myEchart);
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: this.yNum,
                    },
                    grid: {
                        left: '3%',
                        right: '6%',
                        bottom: '3%',
                        top:'12%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.xNum,
                        axisLabel: {
                            interval:0,
                            rotate:-60
                        }
                    },
                    yAxis: {
                        type: 'value',
                        min: 0,
                        max: 100,
                        interval: 20,
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    series: this.series,
                })
            },
            getSeries(){
                this.getXNum();
                const that = this
                this.$axios.post('http://localhost:9099/tourist/count/monthCount',{
                    year:this.year,
                    month:this.month,
                    address:this.address
                }).then( successResponse => {
                    that.series = successResponse.data
                    this.initChart();
                    this.$message.success(`查看成功`);
                })
            },
            getXNum(){
                const that = this
                this.$axios.post('http://localhost:9099/tourist/count/getMonthDate',{
                    year:this.year,
                    month:this.month,
                    address:this.address
                }).then(successResponse => {
                    that.xNum = successResponse.data
                })
            },
            getAddressName(){
                const that = this
                this.$axios.get('http://localhost:9099/tourist/count/allAddressName').then(successResponse => {
                    that.options = successResponse.data
                })
            },
            getYear(){
                const that = this
                this.$axios.get("http://localhost:9099/tourist/count/year").then(successResponse => {
                    that.years = successResponse.data
                })
            },
            getMonth(year){
                const that = this
                this.$axios.get("http://localhost:9099/tourist/count/month?year="+year).then(successResponse => {
                    that.months = successResponse.data
                })
            },
            currentSel(selVal) {
                this.address = selVal
            },
            currentYearSel(selVal) {
                this.year = selVal
                this.getMonth(this.year)
            },
            currentMonthSel(selVal) {
                this.month = selVal
            }
        },
        created() {
            this.getYear();
            this.getMonth(this.year);
            this.getXNum();
            this.currentSel(this.value);
            this.getAddressName();
            this.getSeries();
        },
        mounted () {
            let obj = this.$refs.myEchart;
            if(obj){
                this.initChart();
            }
        }
    }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss" scoped>
    .qst-tecs-src-teacher-dean-brokenLine_ {
        &_chart{
            height:500px;
            width:1200px;
            top: 10px;
        }
    }
</style>
