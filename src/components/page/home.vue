<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
            <el-table-column
                    prop="nowTime"
                    label="更新时间"
                    width="180">
            </el-table-column>
            <el-table-column
                prop="personNum"
                label="人数">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地点">
            </el-table-column>
            <el-table-column align="center" prop="video" label="视频" width="160">
                <template slot-scope="scope">
                    <video :src="scope.row.video" width="100" height="100" autoplay loop="true"/>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="image" label="截图" width="160">
                <template slot-scope="scope">
                    <img :src="scope.row.image" width="100" height="100"/>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="ximage" label="渲染" width="160">
                <template slot-scope="scope">
                    <img :src="scope.row.ximage" width="100" height="100"/>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button type="success" round @click="getImgs(scope.$index)">更新数据</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tableData: [],
                imgSrc:''
            }
        },
        methods: {
            getImgs(id){
                let that = this;
                this.$axios.get('http://localhost:9099/tourist/count/image',{params:{pictureId:id}}).then(
                    successResponse => {
                        console.log(successResponse.request.responseURL);
                        // this.tableData[id].image = successResponse.request.responseURL;
                        this.$set(this.tableData[id],'image',successResponse.request.responseURL);
                    }
                ).catch(failResponse => {
                    console.log(failResponse)
                })
            },
            getXImgs(id){
                let that = this;
                this.$axios.get('http://localhost:9099/tourist/count/ximage',{params:{pictureId:id}}).then(
                    successResponse => {
                        console.log(successResponse.request.responseURL);
                        // this.tableData[id].image = successResponse.request.responseURL;
                        this.$set(this.tableData[id],'ximage',successResponse.request.responseURL);
                    }
                ).catch(failResponse => {
                    console.log(failResponse)
                })
            },
            getVideo(id){
                let that = this;
                this.$axios.get('http://localhost:9099/tourist/count/video',{params:{videoId:id}}).then(
                    successResponse => {
                        console.log(successResponse.request.responseURL);
                        // this.tableData[id].image = successResponse.request.responseURL;
                        this.$set(this.tableData[id],'video',successResponse.request.responseURL);
                    }
                ).catch(failResponse => {
                    console.log(failResponse)
                })
            },
            getInfo(){
                let that = this;
              this.$axios.get('http://localhost:9099/tourist/count/info').then(
                  successResponse => {
                      that.tableData = successResponse.data;
                      for(var i=0;i<successResponse.data.length;i++){
                         this.getImgs(i);
                         this.getXImgs(i);
                         this.getVideo(i);
                      }
                  }
              ).catch(failResponse =>{
                  console.log(failResponse)
              })
            }
        },
        created() {
            this.getInfo();
        }
    }
</script>
