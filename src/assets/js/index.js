function IndexLoad(){
  $('#indexslider').slides({
    effect: 'fade, fade',
    crossfade: true,
    container:'index-img',
    paginationClass: 'index-pagination',
    preloadImage: '',//loading 图片地址
    play:6000,
    fadeSpeed: 500,
    pause:10,
    generatePagination: false,
    animationStart: function(current){
      $('.index-pagination span').stop().animate({width:0}).hide();
    }	,
    animationComplete: function(current){
      var $back=$('.back');
      var leftw=(current-1)*34;
      $back.animate({left:leftw},1000,'easeOutBack');
      $('.index-pagination li').eq(current-1).find('span').show().animate({width:30},6000);
    },
    slidesLoaded: function() {
      $('.index-pagination li').eq(0).find('span').animate({width:30},6000);
    }
  });
  $('#indexslider').find('img').click(function () {
    if($(this).attr('data-href') == null || $(this).attr('data-href') == " " || $(this).attr('data-href') == undefined)
    {
    }else {
      location.href = $(this).attr('data-href');
    }

  })
}

jQuery.extend({
  verifyCode: null,
  LoginLoad: function () {
    this.verifyCode = new GVerify("v_container");
  },
  Login: function (str) {
    var res = this.verifyCode.validate(str);
    if (res) {
      return true;
    } else {
      return 'false';
    }
  },
  IndexLoad: function () {
    IndexLoad();
  },
});

function IsPC() {
  var userAgentInfo = navigator.userAgent;
  var Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"];
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

window.onload = function () {
  if(location.pathname != '/mobile')
  {
    if(!IsPC())
    {
      location.href = '/mobile';
    }
  }

}
