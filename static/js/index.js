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
            Html += '<div class="SmBox Bgdk">';
            Html += '<div class="Txt"></div>';
            Html += '</div>';
        } else if(Type === '1') {
            Html += '<li class="Choice" data-Award="'+ThisData.Award+'"  data-Type="'+ThisData.Type+'" >';
            Html += '<div class="SmBox Bgdk">';
            Html += '<div class="Txt"></div>';
            Html += '</div>';
        } else {
            Html += '<li class="NoChoice"  data-Award="'+ThisData.Award+'"   data-Type="'+ThisData.Type+'" >';
            Html += '<div class="SmBox Bghb">';
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
    if(Time) {clearTimeout(Time)}
    if(Time1) {clearTimeout(Time1)}
    $('#Animate').stop().fadeIn(200);
    $('#AnimateAmt').removeClass('AnimateAmtOpen').addClass('AnimateAmtOpen');
    Time = setTimeout(function () {
        $('#AnimateAmt').stop().fadeOut(10);
    },950);
    Time1 = setTimeout(function () {
        $('#AnimateAmt').stop().fadeIn(200).removeClass('AnimateAmtOpen').attr('src','static/img/list/dk.png');
        $('#AnimateAmtBg').stop().fadeIn(100);
        Dom.removeClass().addClass('Choice');
        TypeAni(Dom,Type)
    },1000);
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
    $('#Animate').stop().fadeOut(150);
    $('#AnimateAmt').attr('src','static/img/list/hb.png');
    $('#AnimateAmtBg').stop().fadeOut(100);
});
$('#GoBtn').on('click',function(){
    $('#GoLottery').stop().fadeIn(150);
});
$('#CloseLottery').on('click',function(){
    $('#GoLottery').stop().fadeOut(150);
});
$('#CloseFade').on('click',function(){
    $('#MainFade').stop().fadeOut(150);
});