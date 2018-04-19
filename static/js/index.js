/**
 * Created by Echonessy on 2018/4/19.
 */
//创建奖项
function CreatHtml(data) {
    if(data.length === 0) {
        return
    }
    var Html = '';
    for(var i=0;i<data.length;i++) {
        var ThisData = data[i];
        if(ThisData.IsPrize === true) {
            Html += '<li class="Choice"  data-id="'+ThisData.Id+'"  data-Awards="'+ThisData.Awards+'">';
            Html += '<img src="../static/img/o.png" alt="">';
        } else {
            Html += '<li class="NoChoice"  data-id="'+ThisData.Id+'"  data-Awards="'+ThisData.Awards+'">';
            Html += '<img src="../static/img/c.png" alt="">';
        }
        Html += '<div class="UserName">'+ThisData.User+'</div>';
        Html += '<div class="UserInfo">'+ThisData.Msg+'</div>';
        Html += '</li>';
    }
    return Html;
}
//获取列表
GetList();
function GetList() {
    $.ajax({
        "type":"get",
        "url":'../static/test/list.json?' ,
        "dataType":"json",
        success:function(data){
            CreatAjax(data)
        }
    })
}
function CreatAjax(data) {
    $('#Lottery').html(CreatHtml(data.Lottery));
    $('#Photo').attr("src",data.UserUrl);
    ChoiceEvt()
}
function ChoiceEvt() {
    $('.NoChoice').on('click',function () {
        var Id = $(this).attr('data-id');
        var Awards = $(this).attr('data-Awards');
        $(this).removeClass().addClass('Choice');
        $(this).find('img').attr('src','../static/img/o.png');
        $(this).find('.UserName').html('me');
        $(this).find('.UserInfo').html('这是结果');
        alert('奖项'+Awards);
        BoxAnimate();
    });

}
function BoxAnimate() {
    var Time = null;
    var Time1 = null;
    $('.NoChoice').css('animation-play-state','paused');
    if(Time) {clearTimeout(Time)}
    if(Time1) {clearTimeout(Time1)}
    $('#BoxFade').fadeIn(200);
    $('#ImgBox').removeClass().addClass('ImgBoxOpen');
    Time = setTimeout(function () {
        $('#ImgBox').fadeOut(10)
    },1000);
    Time1 = setTimeout(function () {
        $('#ImgBox').fadeIn(200).removeClass().attr('src','../static/img/o.png');
    },1200);
    $('#CloseBtn').on('click',function(){
        $('#BoxFade').fadeOut(150);
        $('.NoChoice').css('animation-play-state','start');
    })
}