<template>
    <div>
        <el-card style="height: 250px;width:100%;float:left">
            人数预警轮播
            <div class="messege-box">
                <div class="messege-content">
                    <ul :style="{ 'margin-top': marginTop + '%' }">
                        <li v-for="(item, index) in getData" :key="index">
                            <a>
                                <icon :type="'tongzhi1'" :size="'1.5rem'" :color="'#F0FF00'"></icon>
                                {{item.name}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </el-card>
        <el-card style="top: 300px;width:97%;height:400px;position: absolute" >
            <el-select v-model="value" clearable placeholder="请选择" value-key="value" @change="currentSel(value)">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.label">
                </el-option>
            </el-select>
            <el-button @click="sdata">查询</el-button>
            <div id="main" style="width: 100%;height: 300px;"></div>
        </el-card>
        </div>
</template>

<script>
    import echarts from 'echarts'
    import ElementUI from 'element-ui';
    export default {
        name: '',
        props: {
            data: Array
        },
        created() {
            this.getX();
            this.getY();
            this.getAddressName();
            this.sdata();
        },
        data() {
            return {
                address:'1号地点',
                options:[],
                charts: '',
                /*	opinion: ["1", "3", "3", "4", "5"],*/
                xData:[],
                opinionData: [],
                getData:{},
                activeIndex: 0
            };
        },
        computed: {
            marginTop() {
                return -this.activeIndex * 6;
            }
        },
        mounted() {
            setInterval(() => {
                if (this.getData.length - 7 > 0) {
                    let vh = this.getData.length - 7;
                    if (this.activeIndex < vh) {
                        this.activeIndex += 1;
                    } else {
                        this.activeIndex = 0;
                    }
                } else {
                    this.activeIndex = 0;
                }
            }, 2000);
            this.drawLine('main')
        },
        methods: {
            getX(){
                this.$axios.get('http://localhost:9099/tourist/warning/warningLineX'+'?address='+this.address).then(
                    successResponse => {
                        this.xData = successResponse.data
                        this.drawLine('main');
                    }
                )
            },
            getY(){
                this.$axios.get('http://localhost:9099/tourist/warning/warningLineY'+'?address='+this.address).then(
                    successResponse => {
                        this.opinionData = successResponse.data
                        this.drawLine('main')
                    }
                )
            },
            // getSeries(){
            //     const that = this
            //     this.$axios.post('http://localhost:9099/tourist/count/todayCount',{
            //         date:this.param.chooseDate,
            //         address:this.param.address
            //     }).then( successResponse => {
            //         that.series = successResponse.data
            //         this.drawLine('main');
            //     })
            // },
            getAddressName(){
                const that = this
                this.$axios.get('http://localhost:9099/tourist/count/allAddressName').then(successResponse => {
                    that.options = successResponse.data
                })
            },
            currentSel(selVal) {
                this.address = selVal
            },
            sdata() {
                const that = this
                this.$axios.post('http://localhost:9099/tourist/warning/todayWarning',{address:that.address}).then(successResponse => {
                    that.getData = successResponse.data
                    if(successResponse.status === 200){
                        ElementUI.Notification({
                            message: '查询成功',
                            type: 'success'
                        })
                    }else{
                        ElementUI.Notification({
                            message: '查询失败',
                            type: 'error'
                        })
                    }
                })
             },
            drawLine(id) {
                this.charts = echarts.init(document.getElementById(id))
                this.charts.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['人数预警']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '10%',
                        containLabel: true
                    },

                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.xData,
                        axisLabel: {
                            interval:0,
                            rotate:-60
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },

                    series: [{
                        name: '人数预警',
                        type: 'line',
                        stack: '总量',
                        data: this.opinionData
                    }]
                })
            }
        }
    };
</script>

<style lang="scss">
    .messege-box {
        width: 100%;
        height: 100%;
        padding: 15px 15px 25px 15px;
        overflow: hidden;
        .messege-content {
            width: 100%;
            height: 100%;
            overflow: hidden;
            padding-top: 4px;
            ul {
                width: 100%;
                height: 100%;
                position: relative;
                transition: margin-top 0.5s;

                li {
                    width: 100%;
                    height: 1/6 * 100%;
                    padding-bottom: 5px;
                    overflow: hidden;
                    a {
                        width: 100%;
                        height: 100%;
                        display: block;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: #ff5900;
                        text-decoration: none;
                        background: rgba(216, 191, 216, 0.1);
                        border-radius: 5px;
                        padding-left: 30px;
                        position: relative;
                        font-size: 1.4rem;
                        line-height: 2rem;
                        &:before {
                            position: absolute;
                            box-sizing: border-box;
                            margin-left: -22px;
                            display: block;
                            height: 100%;
                            content: "◆";
                            font-size: 1.5rem;
                            color: #ff4d51;
                        }
                        i {
                            padding-right: 8px;
                        }
                    }
                }
            }
        }
    }
</style>
