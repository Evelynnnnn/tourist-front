<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" >
                    <div class="user-info">
                        <img src="../../assets/img/img.jpg" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2019-11-01</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>东莞</span>
                    </div>
                </el-card>
                <el-card shadow="hover" style="height:340px;width: 420px">
                    <div slot="header" class="clearfix">
                        <el-select v-model="value" clearable placeholder="请选择" value-key="value" @change="currentSel(value)">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.label">
                            </el-option>
                        </el-select>
                        <el-button type="primary" style="float: right">查看</el-button>
                        <videoPlayer class="vjs-custom-skin videoPlayer" :options="playerOptions" ></videoPlayer>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card shadow="hover" style="height:240px;margin-bottom: 20px;">
                    <el-alert
                            title="景点一"
                            type="success"
                            description="测试1设置预警人数为80，当前人数59，未超过预警人数"
                            :closable="false">
                    </el-alert>
                    <el-alert
                            title="景点二"
                            type="info"
                            description="测试2设置预警人数为80，当前人数73，未超过预警人数"
                            close-text="知道了">
                    </el-alert>
                    <el-alert
                            title="景点三"
                            type="warning"
                            description="测试2设置预警人数为80，当前人数139，已经超过预警人数！"
                            @close="false">
                    </el-alert>
                    <el-alert
                            title="景点四"
                            type="info"
                            description="测试2设置预警人数为80，当前人数25，未超过预警人数"
                            close-text="知道了">
                    </el-alert>
                    <el-alert
                            title="景点五"
                            type="info"
                            description="测试2设置预警人数为80，当前人数67，未超过预警人数"
                            close-text="知道了">
                    </el-alert>
                </el-card>
                <el-card >
                    <div >
                        <div style="width: 420px;height: 319px;float:left;">
                            <img :src="imgUrl" style="width: 420px;height: 319px">
                        </div>
                        <div style="float: right;width: 360px;height: 319px;">
                            <el-tabs :tab-position="tabPosition" style="height: 319px;">
                                <el-tab-pane label="今日天气" style="white-space: normal">天气状况 小雨 转阴 15℃～22℃ 东风3~4级 </el-tab-pane>
                                <el-tab-pane label="明日天气">天气状况 晴 转多云 16℃～22℃ 东风3~4级</el-tab-pane>
                                <el-tab-pane label="一号景点人数" style="white-space: normal">当前人数:59</el-tab-pane>
                                <el-tab-pane label="二号景点人数">当前人数:73</el-tab-pane>
                                <el-tab-pane label="三号景点人数">当前人数:139</el-tab-pane>
                                <el-tab-pane label="四号景点人数">当前人数:25</el-tab-pane>
                                <el-tab-pane label="五号景点人数">当前人数:67</el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import 'video.js/dist/video-js.css'
import 'videojs-flash'
import { videoPlayer } from 'vue-video-player';
export default {
    name: 'dashboard',
    data() {
        return {
            options:[],
            value:'',
            imgUrl:'',
            picture:'',
            tabPosition: 'left',
            count:
                {
                    personNumber:'',
                    placeName:'',
                    nowTime:''
                },
            name: localStorage.getItem('ms_username'),
            playerOptions: {
                height: '300',
                sources: [{
                    type: "rtmp/mp4",
                    src: "rtmp://192.168.1.109:1935/live/home"
                }],
                techOrder: ['flash'],
                autoplay: false,
                controls: true
            }
        };
    },
    components: {
        videoPlayer,
        Schart
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    created() {
        //this.handleListener();
        //this.changeDate();
        this.getAddressName();
        this.pushVideo(0);
        this.getPicture();
    },
    // activated() {
    //     this.handleListener();
    // },
    // deactivated() {
    //     window.removeEventListener('resize', this.renderChart);
    //     bus.$off('collapse', this.handleBus);
    // },
    methods: {
        getAddressName(){
            const that = this
            this.$axios.get('http://localhost:9099/tourist/count/allAddressName').then(successResponse => {
                that.options = successResponse.data
            })
        },
        currentSel(selVal) {
            this.param.address = selVal
            console.log(this.param.address)
        },
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        },
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
        countPerson(){
            const _this = this
            _this.$axios.get('http://localhost:9099/tourist/count/countPerson').then(function (response) {
                _this.count = response.data
            })
        },
        pushVideo(id){
            const _this = this
            _this.$axios.get('http://192.168.1.109:9099/tourist/video/camera',{params:{cameraId:id}}).then().catch(
                failResponse => {
                    console.log(failResponse)
                }
            )
        },
        getPicture(){
            this.$axios.get('http://localhost:9099/tourist/count/ximage',{params:{pictureId:0},responseType: "arraybuffer"}).then(successResponse => {
                return (
                    "data:image/png;base64," +
                    btoa(
                        new Uint8Array(successResponse.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            ""
                        )
                    )
                );
            })
                .then(data => {
                    this.imgUrl = data; //赋值给img标签的src属性
                });
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
    width: 420px;
    height: 240px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>
