<!-- 正则验证 start-->
/**
 * 判空
 *
 * @param obj
 * @returns {boolean}
 */
function isNull(obj) {
    if (obj == null || obj == undefined || obj.trim() == "") {
        return true;
    }
    return false;
}

/**
 * 参数长度验证
 *
 * @param obj
 * @param length
 * @returns {boolean}
 */
function validLength(obj, length) {
    if (obj.trim().length < length) {
        return true;
    }
    return false;
}

/**
 * 用户名称验证 4到16位（字母，数字，下划线，减号）
 *
 *@param userName
 * @returns {boolean}
 */
function validPhone(phone) {
    var pattern = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    if (pattern.test(phone.trim())) {
        return (true);
    } else {
        return (false);
    }
}

function validUserName(userName) {
    var pattern = /^[a-zA-Z0-9_-]{1,20}$/;
    if (pattern.test(userName.trim())) {
        return (true);
    } else {
        return (false);
    }
}


/**
 * 用户密码验证 最少6位，最多20位字母或数字的组合
 *
 * @param password
 * @returns {boolean}
 */
function validPassword(password) {
    var pattern = /^[a-zA-Z0-9]{6,20}$/;
    if (pattern.test(password.trim())) {
        return (true);
    } else {
        return (false);
    }
}

function repeatPassword(password,password_again) {
    if (password == password_again){
        return (true);
    } else {
        return (false);
    }
}
<!-- 正则验证 end-->

function login() {
    var userName = $("#userName").val();
    var password = $("#password").val();
    if (isNull(userName)) {
        showErrorInfo("请输入用户名!");
        return;
    }
    if (!validUserName(userName)) {
        showErrorInfo("请输入正确的用户名!");
        return;
    }
    if (isNull(password)) {
        showErrorInfo("请输入密码!");
        return;
    }
    if (!validPassword(password)) {
        showErrorInfo("请输入正确的密码!");
        return;
    }
    var data = {"userName": userName, "password": password}
    $.ajax({
        type: "POST",//方法类型
        dataType: "json",//预期服务器返回的数据类型
        url: "users/login",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function (result) {
            if (result.resultCode == 200) {
                $('.alert-danger').css("display", "none");
                setCookie("token", result.data.userToken);
                alert("登录成功");
                window.location.href = "/ssm_demo_war/index.html"; //跳转
            }
            ;
            if (result.resultCode == 500) {
                showErrorInfo("登陆失败!请检查账号和密码！");
                return;
            }
        },
        error: function () {
            $('.alert-danger').css("display", "none");
            showErrorInfo("接口异常，请联系管理员！");

            return;
        }
    });
}

function toRegister() {
    window.location.href = "/ssm_demo_war/register.html"; //跳转
}

function register(){
    var phone = $("#phone").val();
    var password = $("#password").val();
    var password_again =$ ("#password_again").val();
    if (isNull(phone)) {
        showErrorInfo("请输入电话号码!");
        return;
    }
    if (!validPhone(phone)) {
        showErrorInfo("请输入正确的电话号码!");
        return;
    }
    if (isNull(password)) {
        showErrorInfo("请输入密码!");
        return;
    }
    if (!validPassword(password)) {
        showErrorInfo("请输入正确的密码!");
        return;
    }
    if(!repeatPassword(password,password_again)){
        showErrorInfo("两次密码输入不一致");
        return;
    }
    var data = {"phone": phone, "password": password}
    if(!phone == "13278880740"||! password == "123456"){
        alert("注册失败");
        return;
    }
    console.log("I AM finish");
    $('.alert-danger').css("display", "none");
    alert("注册成功");
    window.location.href = "/ssm_demo_war/login.html"; //跳转
}

<!-- cookie操作 start-->

/**
 * 写入cookie
 *
 * @param name
 * @param value
 */
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";

}

/**
 * 读取cookie
 * @param name
 * @returns {null}
 */
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

/**
 * 删除cookie
 * @param name
 */
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

/**
 * 检查cookie
 */
function checkCookie() {
    if (getCookie("token") == null) {
        $('#tip').html("正在跳转至登录页面...");
        alert("未登录！");
        window.location.href = "login.html";
    }
    else {
        $('#tip').html("Hello SSM!<br>看到此页面证明你登陆成功，且cookie中已经有合法的用户令牌了！");
    }
}

<!-- cookie操作 end-->

function showErrorInfo(info) {
    $('.alert-danger').css("display", "block");
    $('.alert-danger').html(info);
}