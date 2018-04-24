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
        var Type = ThisData.Type;
        if(Type === '2') {
            Html += '<li class="Choice " data-Award="'+ThisData.Award+'"   data-Type="'+ThisData.Type+'" >';
            Html += '<div class="SmBox Bg2">';
            Html += '<div class="Txt">'+ThisData.AMT+'元</div>';
            Html += '</div>';
        } else if(Type === '1') {
            Html += '<li class="Choice" data-Award="'+ThisData.Award+'"  data-Type="'+ThisData.Type+'" >';
            Html += '<div class="SmBox Bg1">';
            Html += '<div class="Txt"></div>';
            Html += '</div>';
        } else {
            Html += '<li class="NoChoice"  data-Award="'+ThisData.Award+'"   data-Type="'+ThisData.Type+'" >';
            Html += '<div class="SmBox Bg0">';
            Html += '<div class="Txt"></div>';
            Html += '</div>';
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
        var Type = $(this).attr('data-Type');
        BoxAnimate($(this),Type);
    });

}
function BoxAnimate(Dom,Type) {
    var Time = null;
    var Time1 = null;
    $('.NoChoice').css('animation-play-state','paused');
    $('.Choice').css('animation-play-state','paused');
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
        TypeAni(Dom,Type)
    },1400);
}
function TypeAni(Dom,Type) {
    var Award = Dom.attr('data-Award');
    //1 炸弹
    if(Award === '0') {
        Dom.find('.SmBox').removeClass().addClass('SmBox Bg2');
        Dom.find('.Txt').html('0.01');
    } else if(Award === '1') {
        Dom.find('.SmBox').removeClass().addClass('SmBox Bg1');
    }
}
$('#CloseBtn').on('click',function(){
    $('#BoxFade').stop().fadeOut(150);
    $('#Hah').stop().fadeOut(150);
    $('#ImgBox').attr('src','static/img/c.png');
    $('.NoChoice').css('animation-play-state','running');
    $('.Choice').css('animation-play-state','running');
});
$('#GoBtn').on('click',function(){
    $('#GoLottery').stop().fadeIn(150);
});
$('#CloseLottery').on('click',function(){
    $('#GoLottery').stop().fadeOut(150);
});