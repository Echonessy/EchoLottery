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
        //6 已开
        if(Type === '7') {
            Html += '<li class="Choice " data-Award="'+ThisData.Award+'"   data-Type="'+ThisData.Type+'" >';
            Html += '<div class="SmBox SmBoxBg7">';
            Html += '<div class="Txt">'+ThisData.AMT+'</div>';
            Html += '</div>';
        }else {
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
        "url":'static/test/test.json?' ,
        "dataType":"json",
        success:function(data){
            CreatAjax(data)
        }
    })
}
//创建列表
function CreatAjax(data) {
    $('#Lottery').html(CreatHtml(data.Lottery));
    $('#Photo').attr("src",data.UserUrl);
    ChoiceEvt()
}
//选择事件
function ChoiceEvt() {
    $('.NoChoice').on('click',function () {
        var Type = $(this).attr('data-Type');
        BoxAnimate($(this),Type);
    });
}
//红包1
function RedPacket(Dom,Type) {
    $('#AnimateImg').fadeIn(50).attr('src','static/img/animate/1.gif');
}
function RedPacketEnd(Dom,Type) {
    var Award = Dom.attr('data-Award');
    Dom.find('.SmBox').removeClass().addClass('SmBox SmBoxBg1');
    Dom.find('.Txt').html(Award);
}
//2节操碎一地
function Moral(Dom,Type) {
    var Award = Dom.attr('data-Award');
    $('#AnimateImg').fadeIn(50).attr('src','static/img/animate/2.gif');
}
function MoralEnd(Dom,Type) {
    Dom.find('.SmBox').removeClass().addClass('SmBox SmBoxBg2');
}
//3屁都没有
function Fart(Dom,Type) {
    var Award = Dom.attr('data-Award');
    $('#AnimateImg').fadeIn(50).attr('src','static/img/animate/3.gif');
}
function FartEnd(Dom,Type) {
    Dom.find('.SmBox').removeClass().addClass('SmBox SmBoxBg3');
}
//4日了狗了
function Dog(Dom,Type) {
    var Award = Dom.attr('data-Award');
    $('#AnimateImg').fadeIn(50).attr('src','static/img/animate/4.gif');
}
function DogEnd(Dom,Type) {
    Dom.find('.SmBox').removeClass().addClass('SmBox SmBoxBg4');
}
//5恶魔说
function Devil(Dom,Type) {
    var Award = Dom.attr('data-Award');
    $('#AnimateImg').fadeIn(50).attr('src','static/img/animate/5.gif');
}
function DevilEnd(Dom,Type) {
    var Award = Dom.attr('data-Award');
    Dom.find('.SmBox').removeClass().addClass('SmBox SmBoxBg5');
}
//6炸弹
function Bomb(Dom,Type) {
    $('#AnimateImg').fadeIn(50).attr('src','static/img/animate/6.gif');
}
function BombEnd(Dom,Type) {
    var Award = Dom.attr('data-Award');
    Dom.find('.SmBox').removeClass().addClass('SmBox SmBoxBg6');
}

function BoxAnimate(Dom,Type) {
    var Time = null,Time1 = null;
    if(Time) {window.clearTimeout(Time)}
    if(Time1) {window.clearTimeout(Time1)}
    $('#Animate').stop().fadeIn(150);
    $('#DontTouch').css('display','block');
    $('#AnimateAmt').removeClass('AnimateAmtOpen').addClass('AnimateAmtOpen').stop().fadeIn(10);
    Time = setTimeout(function () {
        $('#AnimateAmt').stop().fadeOut(10).removeClass('AnimateAmtOpen');
        Dom.removeClass().addClass('Choice');
        AnimateType(Dom,Type)
    },950);
    Time1 = setTimeout(function () {
        $('#Animate').stop().fadeOut(150);
        $('#AnimateAmt').attr('src','static/img/list/hb.png');
        $('#AnimateImg').stop().fadeOut(100).attr('src','');
        $('#DontTouch').css('display','none');
        AnimateResult(Dom,Type)
    },5800);
}



function AnimateResult(Dom,Type) {
    switch (Type) {
        case '1':RedPacketEnd(Dom,Type);break;
        case '2':MoralEnd(Dom,Type);break;
        case '3':FartEnd(Dom,Type);break;
        case '4':DogEnd(Dom,Type);break;
        case '5':DevilEnd(Dom,Type);break;
        case '6':BombEnd(Dom,Type);break;
    }
}


function AnimateType(Dom,Type) {
    switch (Type) {
        case '1':RedPacket(Dom,Type);break;
        case '2':Moral(Dom,Type);break;
        case '3':Fart(Dom,Type);break;
        case '4':Dog(Dom,Type);break;
        case '5':Devil(Dom,Type);break;
        case '6':Bomb(Dom,Type);break;
    }
}






ClickEvt();
function ClickEvt() {
    $('#CloseBtn').on('click',function(){
        $('#Animate').stop().fadeOut(150);
        $('#AnimateAmt').attr('src','static/img/list/hb.png');
        $('#AnimateImg').stop().fadeOut(100).attr('src','');
    });
    $('#CloseFade').on('click',function(){
        $('#MainFade').stop().fadeOut(150);
    });
}

