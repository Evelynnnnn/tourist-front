<template>
    <div>
        <el-card style="height: 300px;width: 700px;float:left">
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
        <el-card style="height: 300px;width: 530px;float: right">
            实时人数轮播
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

        <el-card style="top: 350px;width: 1248px;height:300px;position: absolute" >
            <div id="main" style="width: 1248px;height: 300px;"></div>
        </el-card>
        </div>
</template>

<script>
    import echarts from 'echarts'
    export default {
        name: '',
        props: {
            data: Array
        },
        created() {
          this.sdata();
          this.drawLine('main');
        },
        data() {
            return {
                charts: '',
                /*	opinion: ["1", "3", "3", "4", "5"],*/
                opinionData: ["3", "2", "4", "4", "5","3", "2", "4", "4", "5","3", "2", "4", "4", "5"],
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
            sdata() {
                this.getData = [{name:'123'},{name:"456"},{name:'123'},{name:"456"},{name:'123'},{name:"456"},{name:'123'},{name:"456"},{name:'123'},{name:"456"}];
            },
            drawLine(id) {
                this.charts = echarts.init(document.getElementById(id))
                this.charts.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['近七日收益']
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
                        data: ["1","2","3","4","5","1","2","3","4","5","1","2","3","4","5"]

                    },
                    yAxis: {
                        type: 'value'
                    },

                    series: [{
                        name: '近七日收益',
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
                        color: #ff4d51;
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
