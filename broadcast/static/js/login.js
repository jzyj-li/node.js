/*
*
* 登录
* */
(function () {
   var $btn = $('#login'),
       $email = $('#inputEmail'),
       $password = $('#inputPassword');

   $btn.click(function () {
       submit()
   })

   // 提交
   function submit() {
       var param = {
           account: $email.val(),
           password: $password.val()
       }

       $.ajax({
           url: '/api/login',
           type: 'post',
           data: param,
           success: function (res) {
               if (res.success) {
                   location.href = '/index';
               } else {
                   alert(res.data)
               }
           }
       })
   }

    submit()
})()