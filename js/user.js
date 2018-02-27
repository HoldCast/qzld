$(function () {
    $('.edit-user').off('click').on('click', function () {
        $('#userInfoModal').modal('show');
        var $this = $(this);
        var $tr = $this.parent().parent().parent();
        var account = $tr.find('td:eq(1)').text();

        var name = $tr.find('td:eq(2)').text();
        $('#yhmc').val(name);
        $('#yhzh').val(account);
        console.log(account);
    }) ;
});