(function ($) {
    var ip = "http://123.207.150.147:8080/platform/";//线上
    var baseUrl = ip + "api";
    $.chan = {
        init: function () {},
/*——————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————*/	

    // datatables 实例
    test: function (obj) {
      var param     = new basjooTalk.data();
      param.map = {
         "recommendChannelId":1,
      };
      param.method = "queryRecommendList";
     
      $("#example").dataTable({
          "sDom": 'rt<"bottom"ilp<"clear">>',// 每页显示多少条 位置
          language: datatables_lang,  //提示信息
          processing: true,//是否显示加载中提示
          autoWidth: false,//是否自动计算表格各列宽度
          info: true,//是否显示页数信息
          pagingType:"full_numbers",//分页样式的类型
          pageLength :10,//默认每页显示多少条记录
          searching: false,//是否显示搜索框
          ordering:false,//是否允许排序
          serverSide: true,//是否从服务器获取数据
          stateSave: false,//页面重载后保持当前页
          lengthChange: true,//是否显示每页大小的下拉框
          lengthMenu: [ 10, 15,25, 50, 75, 100 ],//长度菜单
          responsive: true,
          scrollX: true,//横向滑动
          ajax: function (data, callback, settings){
            //封装请求参数
            param.map.pageSize = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
            //param.start = data.start;//开始的记录序号
            param.map.pageNo = (data.start / data.length)+1;//当前页码
            // 将参数进行签名
            param = basjooTalk.sign(param);
            //console.log(param);
            //ajax请求数据
            $.ajax({
                url: baseUrl,
                data: JSON.stringify(param),
                contentType: 'application/json;charset=UTF-8',
                dataType: "json",
                type: "post",
                async: false,
                success: function (result) {
                  console.log(result);
                  //封装返回数据
                  var returnData = {};
                  returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                  if (jQuery.isEmptyObject(result.data)) {
                      returnData.recordsTotal = 0;//返回数据全部记录
                      returnData.recordsFiltered = 0;//查询返回数据全部记录，记录分页数
                      returnData.data = result.data;//返回的数据列表
                      callback(returnData);
                  }
                  returnData.recordsTotal = result.data.total;//返回数据全部记录
                  returnData.recordsFiltered = result.data.total;//查询返回数据全部记录，记录分页数
                  returnData.data = result.data.list;//返回的数据列表
                  //console.log(returnData);
                  //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                  //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                  callback(returnData);
              }
            });
          },
          //列表表头字段
          columns: [
            {"data": "condition"},
            {"data": "recommendTypeId",  //验证状态
                  "render": function (data, type, row) {
                      //判断是否实名认证
                      if(row.recommendTypeId == 2){
                           return '1';
                      }else{
                        return '1222';
                      }
                  }
              },
            {"data": "createDate"},
            { "data":"condition",
                sortable: false,
                render: function (data, type, row) {
                //alert(row.proportion)
                var skuStr = '<a class="btn btn-default btn-xs bnn sku" href="##" data-id = "'+row.id+'">删除</a>';
                return '<div>'+skuStr+'</div>'
              }
            }
          ]
        });
     },
    }
})(jQuery)