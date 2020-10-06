import Common from "./common.js"
class VoxiTc extends Common {
  constructor() {
    super();
    var CI = this;
    this.validate("#dealform")
    this.getFormDetails('#dealform')
    this.showToolTip()
    this.fillform()
    this.popupTerms()
    this.showTab(this.currentTab);
    $(".postcode").focus();

    $(document).on("click", '.open-form', function() {
      CI.phoneName = $(this).find('input').val()
      $('#deal-form-modal').modal('show')
      $('.clock').hide()
      event.preventDefault();
    });

    $( ".property" ).change(function() {
      $('.towncity').val($(this).find("option:selected").data("city"))
      $('.street1').val($(this).find("option:selected").data("street"))
      $('.county').val($(this).find("option:selected").data("province"))
      $('.houseNumber').val($(this).find("option:selected").data("housenum"))
    });
  }
  urlSelection(){
    window.location = this.details.success_url
  }
}
export default new VoxiTc();
