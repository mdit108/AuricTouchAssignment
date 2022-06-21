var operator;
var operatorGameType;
var operatorName;

$(document).ready(function () {
  var table = $('#dtBasicExample').DataTable({
    select: 'single',
  });
  table.on('select',function(e,dt,type,indexes){
    var rowData = table.rows( indexes ).data().toArray();
    $('#playerName').html(rowData[0][0])
    $('#playerPoints').html(rowData[0][4])
  })


  $('.dataTables_length').addClass('bs-select');
});

$(document).ready(function(){
  $("#op").html('');
  $.ajax({
    url: "http://localhost:3000/operator",
    type: "GET",
    dataType: 'json',
    success: function(result){
      $('#op').html('<option value="">Select Operator</option>');
      $.each(result.data, function(key, value) {
           $("#op").append('<option value="' + value + '">' + value + '</option>');
      });
      $('#gt').html('<option value="">Select Operator First</option>');
    }
  })

  $("#op").on('change',function(){
    operator = this.value;
    $("#gt").html('');
    $.ajax({
      url:"http://localhost:3000/operatorGameType/"+operator,
      type: 'GET',
      dataType: 'json',
      success: function(result){
        $('#gt').html('<option value="">Select Game Type</option>');
      $.each(result.result, function(key, value) {
           $("#gt").append('<option value="' + value + '">' + value + '</option>');
      });
      $('#name').html('<option value="">Select Game Type First</option>');
      }
    })
  })

  $("#gt").on('change',function(){
    operatorGameType = this.value;
    $("#name").html('');
    $.ajax({
      url:"http://localhost:3000/operatorName/"+operator+'/'+operatorGameType,
      type: 'GET',
      dataType: 'json',
      success: function(result){
        $('#name').html('<option value="">Select Operator Name</option>');
      $.each(result.result, function(key, value) {
           $("#name").append('<option value="' + value.operatorName + '">' + value.operatorName + '</option>');
      });
      }
    })
  })

  $("#name").on('change',function(){
      operatorName = this.value;
      $.ajax({
        url: "http://localhost:3000/players/"+operator+'/'+operatorGameType+'/'+operatorName,
        type: 'GET',
        dataType: 'json',
        success: function(result){
          var tbl = $("#dtBasicExample").DataTable();

          $.each(result.reducedResult, function(key, value) {
              if (!value.playerPoints){
                value.playerPoints = 0;
              }
              tbl.row.add([value.playerName,value.playerTeam,value.playerPosition,value.playerSalary,value.playerPoints]).draw();
                            // append('<tr class='+classvar+ '> <td>'+value.playerName+'</td> <td>'+value.playerTeam+'</td> <td>'+value.playerPosition+'</td> <td>'+value.playerSalary+'</td> <td>'+value.playerPoints+'</td> </tr>')
          })
        }
      })
  })


})