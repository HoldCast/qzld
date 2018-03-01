//表格数据
var tabelData = {};

var qzldData = JSON.parse(localStorage.getItem('qzldData'));
var user = localStorage.getItem('user');
var ZLNR1 = localStorage.getItem('zlnr1');
var ZLNR2 = localStorage.getItem('zlnr2');
//分局数据
var fjData = {
    whfj: {name: '五华分局', data: {}},
    xsfj: {name: '西山分局', data: {}},
    ylxj: {name: '宜良县局', data: {}},
    slxj: {name: '石林县局', data: {}}
};
//派出所数据
var pcsData = {
    hspcs: {name: '红山派出所', data: {}},
    hypcs: {name: '海源派出所', data: {}},
    ckpcs: {name: '厂口派出所', data: {}}

};
$(function () {
    //初始化表格
    initTableData(qzldData);
    //判断用户级别
    judgeUser(user);
    //点击事件
    btnHandle(user);
    //echartsTree
    echartsTree();
});

function echartsTree() {
    // 基于准备好的dom，初始化echarts图表
    var myChart = echarts.init(document.getElementById('echartsTree'));

    option = {
        title : {
            //text: '任务分解图',
            //subtext: '线、节点样式'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}"
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : false,
        series : [
            {
                name:'任务分解图',
                type:'tree',
                orient: 'vertical',  // vertical horizontal
                rootLocation: {x: 'center', y: 60}, // 根节点位置  {x: 'center',y: 10}
                nodePadding: 20,
                symbol: 'rectangle',
                symbolSize: 50,
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'inside',
                            textStyle: {
                                color: '#ffffff',
                                fontSize: 14
                                //fontWeight:  'bolder'
                            }
                        },
                        lineStyle: {
                            color: '#5c5c5c',
                            width: 2,
                            type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                        }
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                },
                data: [
                    {
                        name: '昆明市公安局',
                        symbolSize: [150, 50],
                        symbol: 'rectangle',
                        formatter: "{b}",
                        itemStyle: {
                            normal: {
                                label: {
                                    show: true
                                }
                            }
                        },
                        children: [
                            {
                                name: '五华分局',
                                value: 0,
                                symbolSize: [100, 40],
                                children: [
                                    {
                                        name: '虹山派出所',
                                        value: 4,
                                        symbolSize: [100, 40],
                                    },
                                    {
                                        name: '海源派出所',
                                        value: 0,
                                        symbolSize: [100, 40]
                                    },
                                    {
                                        name: '海源派出所',
                                        value: 14,
                                        symbolSize: [100, 40]
                                    }
                                ]
                            },
                            {
                                name: '西山分局',
                                value: '50人',
                                symbolSize: [100, 40],
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true
                                        }

                                    }
                                },
                                children: [
                                    {
                                        name: '高科派出所',
                                        value: 20,
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    //show: false
                                                }
                                            }
                                        },
                                        symbolSize: [100, 40],
                                    },
                                    {
                                        name: '前卫派出所',
                                        value: 5,
                                        symbolSize: [100, 40],
                                        itemStyle: {
                                            normal: {
                                                label: {
                                                    show: true
                                                }

                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };


    // 为echarts对象加载数据
    myChart.setOption(option);
}

function btnHandle(user) {
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
            '<span><button class="btn btn-primary btn-xs handle view" type="view">查看</button></span>\n' +
            '<span><button class="btn btn-danger btn-xs handle command" type="command">下达指令</button></span>\n' +
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
    //查看,下达指令,反馈
    $('#ajsTbody').off('click.handle').on('click.handle', '.handle', function () {
        var $this = $(this);
        var thisType = $this.attr('type');
        var dataId = $this.parent().parent().attr('id');
        var data = tabelData[dataId];
        $('#zhRwms,#zhRwms2,#zhRwms3').text(data.rwms);
        $('#zhRwbt,#zhRwbt2,#zhRwbt3').text(data.rwbt);
        $('#zhCjsj,#zhCjsj2,#zhCjsj3').text(data.cjsj);
        $('#tips2,#tips23').text('');
        $('#zhXdzl2').text(ZLNR1);
        $('#zhXdzl3').text(ZLNR2);
        $('#zhModal .right-content').hide();
        $('#modalTitle22,#modalTitle222').hide();
        //反馈
        if(thisType == 'feedback'){
            $('#zhModal3').modal('show');
            $('#submitFk').click(function () {
                $('#tips23').text('反馈成功!');
                setTimeout(function () {
                    $('#zhModal3').modal('hide');
                },600);
            })
        }
        //查看
        else if(thisType == 'view'){
            $('#zhModal').modal('show');
            $('#commandView').show();
            $('#dqczdw').hide();
            $('#modalTitle222').show();
        }
        //下达指令
        else if(thisType == 'command'){
            $('#commandHandle,#dqczdw,#modalTitle22').show();
            if(user == 'user1'){
                $('#zhModal').modal('show');
            }else{
                $('#zhModal2').modal('show');
            }
        }
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
        $('#zlnr').val('令' + qxgajgStr + "：\n" + xzyq);
    });
    //生成指令2
    $('#createCommand2').off('click').on('click',function () {
        var qxgajg2 = [];
        $('#qxgajg2 input:checked').each(function () {
            var mark = $(this).attr('mark');
            qxgajg2.push(pcsData[mark].name);
        });
        var qxgajgStr = qxgajg2.join('、');
        var xzyq = $('#xzyq2').val();
        console.log(qxgajgStr,xzyq);
        $('#zlnr2').val('令' + qxgajgStr + "：\n" + xzyq);
    });
    //下达指令
    $('#runCommand').off('click').on('click', function () {
        var zlnr1 = $('#zlnr').val();
        if(zlnr1){
            localStorage.setItem('zlnr1',zlnr1);
            $('#tips2').text('指令下达成功!');
            setTimeout(function () {
                $('#zhModal').modal('hide');
            },600);
        }else{
            $('#tips2').text('请填写指令内容!');
        }
    });
    //下达指令2
    $('#runCommand2').off('click').on('click', function () {
        var zlnr2 = $('#zlnr2').val();
        if(zlnr2){
            localStorage.setItem('zlnr2',zlnr2);
            $('#tips22').text('指令下达成功!');
            setTimeout(function () {
                $('#zhModal2').modal('hide');
            },600);
        }else{
            $('#tips22').text('请填写指令内容!');
        }
    });
    //newMsgModal
    $('#newMsg').off('click').on('click',function () {
        $('#newMsgModal').modal('show');
        $('#msgConfirm').click(function () {
            $('#msgCount').hide();
            $('#newMsgModal').modal('hide');
        })
    })
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
        $('#addRdjjfz,#addJqrw').hide();
        $('#commandLevel').text('下达二级指令');
        //$('.feedback').hide();
    }
    else if(user == 'user3'){
        $('#userName').text('张益阳');
        $('#levelName').text('红山派出所');
        $('#addRdjjfz,#addJqrw').hide();
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
            '<span><button class="btn btn-primary btn-xs handle view" type="view">查看</button></span>\n' +
            '<span><button class="btn btn-primary btn-xs handle feedback" type="feedback">反馈</button></span>\n' +
            '<span><button class="btn btn-danger btn-xs handle command" type="command">下达指令</button></span>\n' +
            '</td>\n' +
            '</tr>';
        $('#ajsTbody').append(trHtml);
    }
}