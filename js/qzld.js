//表格数据
var tabelData = {};
var qzldData = JSON.parse(localStorage.getItem('qzldData'));
var user = localStorage.getItem('user');
//分局数据
var fjData = {
    whfj: {name: '五华分局', data: {}},
    xsfj: {name: '西山分局', data: {}},
    ylxj: {name: '宜良县局', data: {}},
    slxj: {name: '石林县局', data: {}}
};
$(function () {
    //初始化表格
    initTableData(qzldData);
    //判断用户级别
    judgeUser(user);
    //点击事件
    btnHandle();
});

function btnHandle() {
    //新增
    $('#addAjsBtn').off('click').on('click',function () {
        var dataId = 'id_' + (new Date()).getTime();
        var formData = $('#addAsjForm').serializeArray();
        var isFull = true;
        var trHtml = '<tr>';
        var trData = {};
        $.each(formData, function() {
            var val = this.value;
            var name = this.name;
            trData[name] = val;
            if(val){
                if(name == 'rwms'){
                    trHtml += '';
                }else{
                    trHtml += '<td>'+val+'</td>';
                }
            }else{
                $('#tips1').text('请完整填写案事件信息!');
                isFull = false;
                return false;
            }
        });
        trHtml += '<td id="'+dataId+'">\n' +
            '<span><button class="btn btn-primary btn-sm handle view" type="view">查看</button></span>\n' +
            '<span><button class="btn btn-danger btn-sm handle command" type="command">指挥</button></span>\n' +
            '<span><button class="btn btn-danger btn-sm handle feedback" type="feedback">指挥</button></span>\n' +
            '</td>\n' +
            '</tr>';
        if(isFull){
            $('#addAsjModal').modal('hide');
            $('#tips1').text('');
            $('#ajsTbody').append(trHtml);
            tabelData[dataId] = trData;
            localStorage.setItem('qzldData',JSON.stringify({dataId:dataId,trData:trData}));
            console.log(tabelData);
        }
    });
    //查看
    $('#ajsTbody').off('click.handle').on('click.handle', '.handle', function () {
        var $this = $(this);
        var thisType = $this.attr('type');
        var dataId = $this.parent().parent().attr('id');
        var data = tabelData[dataId];
        console.log(data);
        $('#zhRwms').text(data.rwms);
        $('#zhRwbt').text(data.rwbt);
        $('#zhCjsj').text(data.cjsj);
        $('#zhModal').modal('show');
    });
    //选中所有分县局
    $('#allGajgCheck').off('click').on('click', function () {
        var $this = $(this);
        var isCheck = $this.prop('checked');
        $('#qxgajg input:checkbox').prop('checked', isCheck);
    });
    //生成指令
    $('#createCommand').off('click').on('click',function () {
        var qxgajg = [];
        $('#qxgajg input:checked').each(function () {
            var mark = $(this).attr('mark');
            qxgajg.push(fjData[mark].name);
        });
        var qxgajgStr = qxgajg.join('、');
        var xzyq = $('#xzyq').val();
        console.log(qxgajgStr,xzyq);
        $('#zlnr').val('令' + qxgajgStr + "：\n\t" + xzyq);
    });
}

//判断用户级别
function judgeUser(user) {
    if(user == 'user1'){
        $('#userName').text('吕建然');
        $('#levelName').text('昆明市指挥中心');
        $('.feedback').hide();
    }
    else if(user == 'user2'){
        $('#userName').text('刘星宇');
        $('#levelName').text('五华区分局指挥中心');
        $('#addRdjjfz').hide();
        $('#commandLevel').text('下达二级指令');
        $('.feedback').hide();
    }
    else if(user == 'user3'){
        $('#userName').text('张益阳');
        $('#levelName').text('红山派出所');
        $('#addRdjjfz').hide();
        $('#commandLevel').text('下达二级指令');
        $('.command').hide();
    }
}

function initTableData(data) {

    //初始化模态框属性
    $('.modal').modal({backdrop: 'static',show:false, keyboard: false});
    if(data){
        var trHtml = '<tr>';
        var dataId = data.dataId;
        var trData = data.trData;
        tabelData[dataId] = trData;
        for(var k in trData){
            if(k == 'rwms'){
                trHtml += '';
            }else{
                trHtml += '<td>'+trData[k]+'</td>';
            }
        }
        trHtml += '<td id="'+dataId+'">\n' +
            '<span><button class="btn btn-primary btn-sm handle view" type="view">查看</button></span>\n' +
            '<span><button class="btn btn-danger btn-sm handle command" type="command">指挥</button></span>\n' +
            '<span><button class="btn btn-primary btn-sm handle feedback" type="feedback">反馈</button></span>\n' +
            '</td>\n' +
            '</tr>';
        $('#ajsTbody').append(trHtml);
    }
}