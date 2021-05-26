class Policies {
  constructor() {
    this.getPolicies();
    $( document ).ajaxSuccess(function() {
      var chk1 = $("input[type='checkbox'][name='agree']");
      if(chk1.length === 0) {
        var check = $("input[type='checkbox'][name='partners-tp']");
        check.prop('checked',true)
      }
    });
  }

  getPolicies(){
    $('.content').each(function(){
      let element = $(this)
      $.ajax({
        type: "GET",
        url: `https://mobilematcher.co.uk/policies/${element.attr('data-page')}?brand=deals.megamobiledeals.com`,
        success: function(res) {
          element.html(res.html)
        }, 
        dataType: "json"
      })
    })
  }
}
export default new Policies();