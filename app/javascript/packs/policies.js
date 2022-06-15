class Policies {
  constructor() {
    this.getPolicies();
    $( document ).ajaxSuccess(function() {
      var chk1 = $("input[type='checkbox'][name='agree']");

    });
  }

  getPolicies(){
    $('.content').each(function(){
      var element = $(this)
      $.ajax({
        type: "GET",
        url: `https://mobilematcher.co.uk/policies/${element.attr('data-page')}?brand=deals.megamobiledeals.com`,
        success: function(res) {
          element.html(res.html)
          if(element.attr('data-page') == "tooltip"){
            $('<div class="col-md-6"><div class="custom-control custom-checkbox mr-sm-2"><input type="checkbox" checked name="partners-tp" class="custom-control-input" id="debtReportToday" data-parsley-multiple="partners-tp"><label class="custom-control-label text-left text-secondary label-size" for="debtReportToday">Debt Report Today</label></div></div>').appendTo($(".partner-form").children()[0])
            let inputs  = document.querySelectorAll('.custom-control-input')
            for(let i in inputs){
              inputs[i].checked = true
            } 
          }        
        },
        dataType: "json"
      })
    })
  }
}
export default new Policies();
