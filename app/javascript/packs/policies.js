class Policies {
  constructor() {
    this.getPolicies();
  }
  getPolicies(){
    $('.content').each(function(){
      let element = $(this)
      $.ajax({
        type: "GET",
        url: `https://mobilematcher.herokuapp.com/policies/${element.attr('data-page')}?brand=deals.megamobiledeals.com`,
        success: function(res) {
          element.html(res.html)
        }, 
        dataType: "json"
      })
    })
  }
}
export default new Policies();