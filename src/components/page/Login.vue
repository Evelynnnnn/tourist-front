<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                    <el-button type="primary" @click="getCode">获取验证码</el-button>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input
                        type="code"
                        placeholder="code"
                        v-model="param.code"
                        @keyup.enter.native="submitForm">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                    <div class="login-btn">
                        <el-button type="primary" @click="loginCheck">登录</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import ElementUI from 'element-ui';
export default {
    data: function() {
        return {
            param: {
                username: this.username,
                code: this.code,
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        getCode(){
            this.$axios.post('http://localhost:9099/tourist/user/confirm',{username:this.param.username}).then(successResponse => {
                if(successResponse.status == 200){
                    this.$message.success('验证码发送成功，请查收');
                }
            })
        },
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.param.username);
                    this.$router.push('/');
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        loginCheck() {
            this.$axios
                .post('http://localhost:9099/tourist/user/loginCheck', {
                    username: this.param.username,
                    code: this.param.code
                })
                .then(successResponse => {
                    if (successResponse.data === true) {
                        localStorage.setItem('ms_username', this.param.username);
                        ElementUI.Notification({
                            message: '登录成功',
                            type: 'success'
                        });
                        this.$router.push('/')
                        this.ipGet()
                    }else{
                        ElementUI.Notification({
                            title: '警告',
                            message: '验证码错误',
                            type: 'error'
                        });
                    }
                })
                .catch(failResponse => {
                    console.log(failResponse)
            })
        },
        ipGet(){
            const that = this
            this.$axios.get('https://2020.ipchaxun.com/').then(function(response) {
                that.$axios.post('http://localhost:9099/tourist/user/userInfo',{
                    username: that.param.username,
                    map: response.data
                })
            })
        }
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
