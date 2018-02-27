var zzjgData = [
    {id: 1, pId: 0, name: "双桥子街道党工委",dzblx: '街道社区党支部', ssgx: '新鸿社区', jlsj: '2003-11-08', open: true,checked: true},
    {id: 11, pId: 1, name: "新鸿社区党委", dzblx: '街道社区党支部', ssgx: '新鸿社区', jlsj: '2003-11-08', open: true},
    {id: 111, pId: 11, name: "居委会党支部", dzblx: '其他党支部', ssgx: '新鸿社区', jlsj: '2003-11-08', iconClose: true},
    {id: 112, pId: 11, name: "电视台党支部", dzblx: '其他党支部', ssgx: '新鸿社区', jlsj: '2003-11-08'},
    {id: 113, pId: 11, name: "印刷公司党支部", dzblx: '企业党支部', ssgx: '新鸿社区', jlsj: '2003-11-08'},
    {id: 12, pId: 1, name: "猛追湾社区党委", dzblx: '社区党支部', ssgx: '猛追湾社区', jlsj: '2001-11-08', open: true},
    {id: 121, pId: 12, name: "居委会党支部", dzblx: '其他党支部', ssgx: '猛追湾社区', jlsj: '2001-11-08'},
    {id: 122, pId: 12, name: "国电党支部", dzblx: '企业党支部', ssgx: '猛追湾社区', jlsj: '2001-11-08',},
    {id: 13, pId: 1, name: "沙河社区党委", dzblx: '社区党支部', ssgx: '沙河社区', jlsj: '2005-11-08'}
];
var nodeData = '';


$(function () {
    zzjgTree(zzjgData);
    zzjgInfo();
});

function zzjgTree(zzjgData) {
    $.ajax({
        url: serverUrl + '/admin/zzjg/getZzjgInfo',
        type: 'post',
        dataType: 'json',
        success: function (json) {
            console.log(json);
            var zzjgData = json.data;
            console.log(zzjgData)
            var setting = {
                view: {
                    showIcon: showIconForTree
                },
                data: {
                    simpleData: {
                        enable: true,
                        txtSelectedEnable: false
                    }
                },
                callback: {
                    onClick: function (event, treeId, treeNode) {
                        nodeData = treeNode;
                        var name = treeNode.name;
                        $('#zzjgTable').empty();
                        $('#zzjgTableName').text(name);
                        var tableData = treeNode.children;
                        nodeId = treeNode.id;
                        if(tableData && tableData.length){
                            for (var i = 0; i < tableData.length; i++) {
                                var tRow = tableData[i];
                                var html = '<tr data-expanded="true">' +
                                    '<td>' + (i + 1) + '</td>' +
                                    '<td>' + tRow.name + '</td>' +
                                    '<td>' + tRow.dzblx + '</td>' +
                                    '<td>' + tRow.ssgx + '</td>' +
                                    '<td>' + tRow.jlsj + '</td>' +
                                    '<td>' +
                                    '<span><button class="btn btn-primary btn-xs edit">编辑</button></span>\n' +
                                    '<span><button class="btn btn-danger btn-xs">删除</button></span>' +
                                    '</td>' +
                                    '</tr>';
                                $('#zzjgTable').append(html);
                            }
                        }
                    }
                }
            };

            function showIconForTree(treeId, treeNode) {
                //return !treeNode.isParent;
            };
            //初始化
            var treeObj = $.fn.zTree.init($("#zzjgTree"), setting, zzjgData);
            $('#zzjgTree_1_a').click(); //选中第一个节点
        }

    });


}
//添加组织机构
function zzjgInfo() {

    //添加组织机构
    $('#addZzjg').click(function () {
        $('#zzjgModal').find('.module-name').text('添加');
        $('#zzjgModal').modal('show');
        $('#zzjgForm')[0].reset();
    });

    //编辑组织机构
    $('#editZzjg').click(function () {
        $('#zzjgModal').find('.module-name').text('修改');
        $('#dzbmc').val(nodeData.name);
        $('#dzblx').val(nodeData.dzblx);
        $('#ssgx').val(nodeData.ssgx);
        $('#jlsj').val(nodeData.jlsj);
        $('#zzjgModal').modal('show');
    });
    //确认添加,编辑
    $('#saveAddzzjg').off('click').on('click',function () {
        var d = {};
        var t = $('#zzjgForm').serializeArray();
        $.each(t, function() {
            d[this.name] = this.value;
        });
        console.log(d);
        $('#zzjgModal').modal('hide');
        $.ajax({
            url: serverUrl + '/admin/zzjg/addZzjg',
            type: 'post',
            dataType: 'json',
            data: {
                name: 'tt',
                jlsj: '2008-08-08',
                pId: '1'
            },
            success: function (json) {
                console.log(json);
            }
        });
    });
}