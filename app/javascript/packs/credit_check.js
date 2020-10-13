import Common from "./common.js"
class CreditCheck extends Common {
   constructor(){
    super();
    var CI = this;
    this.validate("#cc-form")
    $(document).on("click", '.form-control', function() {
      CI.step(1)
    });
    $(document).on("show.bs.collapse", '.collapse', function(event) {
       $(this).prev(".card-header").find(".accordian-toggle-icon").removeClass("fa-plus-circle").addClass("fa-minus-circle");
    })
    $(document).on("hide.bs.collapse", '.collapse', function(event) {
      $(this).prev(".card-header").find(".accordian-toggle-icon").removeClass("fa-minus-circle").addClass("fa-plus-circle");
    });
  }
  step(n) {
    var CI = this;
    $('#cc-form').parsley().whenValidate({
      group: 'block-' + this.currentTab
    }).done(() =>{
      var tabs = $(".tab");
      $(tabs[CI.currentTab + 1]).find('.collapse').collapse('show');
      $(tabs[CI.currentTab]).find('.collapse').collapse('hide');
      $(tabs[CI.currentTab + 1]).find('.d-none').removeClass('d-none');
      CI.currentTab = CI.currentTab + n;
    })
  }
}
export default new CreditCheck();
