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
            Html += '<img src="static/img/o.png" alt="">';
        } else {
            Html += '<li class="NoChoice"  data-id="'+ThisData.Id+'"  data-Awards="'+ThisData.Awards+'">';
            Html += '<img src="static/img/c.png" alt="">';
        }
        if(!ThisData.User) {
            Html += '<div class="UserName FCFC">来呀!</div>';
        } else {
            Html += '<div class="UserName FC99">'+(ThisData.User)+'</div>';
        }
        if(!ThisData.Msg){
            Html += '<div class="UserInfo FCFC">开我</div>';
        } else {
            Html += '<div class="UserInfo FC99">'+(ThisData.Msg)+'</div>';
        }

        Html += '</li>';
    }
    return Html;
}
//获取列表
GetList();
function GetList() {
    $.ajax({
        "type":"get",
        "url":'static/test/list.json?' ,
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
        // alert('奖项'+Awards);
        BoxAnimate($(this));
    });

}
function BoxAnimate(Dom) {
    var Time = null;
    var Time1 = null;
    $('.NoChoice').css('animation-play-state','paused');
    if(Time) {clearTimeout(Time)}
    if(Time1) {clearTimeout(Time1)}
    $('#BoxFade').fadeIn(200);
    $('#ImgBox').removeClass().addClass('ImgBoxOpen');
    Time = setTimeout(function () {
        $('#ImgBox').fadeOut(10);

    },1300);
    Time1 = setTimeout(function () {
        $('#ImgBox').stop().fadeIn(200).removeClass().attr('src','static/img/o.png');
        Dom.removeClass().addClass('Choice');
        Dom.find('img').attr('src','static/img/o.png');
        Dom.find('.UserName').html('me');
        Dom.find('.UserInfo').html('这是结果');
    },1400);

}
$('#CloseBtn').on('click',function(){
    $('#BoxFade').stop().fadeOut(150);
    $('#ImgBox').attr('src','static/img/c.png');
    $('.NoChoice').css('animation-play-state','start');
})