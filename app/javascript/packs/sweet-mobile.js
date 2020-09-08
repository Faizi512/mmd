import Common from "./common.js"

class SweetMobile extends Common {
  constructor() {
    super();
    this.dealNumber = null
    this.price_monthly = null
    var CI = this;
    this.validate("#dealslistform")
    this.showToolTip()
    this.fillform()
    this.showTab(this.currentTab)
    $( ".property" ).change(function() {
      var tabs = $(".tab");
      tabs[CI.currentTab].style.display = "none";
      CI.currentTab = CI.currentTab + 1;
      CI.showTab(CI.currentTab);
      $('.towncity').val($(this).find("option:selected").data("city"))
      $('.street1').val($(this).find("option:selected").data("street"))
      $('.county').val($(this).find("option:selected").data("province"))
    });

    $(".numbertt").change(function() {
      if ($("#numbertt :selected").val() == "yes") {
        var html = `<div class="form-group px-0 col-12 mx-auto">
                  <label class="d-flex justify-content-start font-weight-bold">
                    Number To Transfer
                  </label>
                  <input
                    placeholder="Number"
                    id="NumberstoTransfer"
                    name="NumberstoTransfer"
                    class="NumberstoTransfer form-control h-50 ignoreStep4"
                    data-parsley-group="block-3"
                    type="text"
                    data-parsley-required="true"
                    data-parsley-required-message="Please Enter Your Number">
                  <i class="validate success fa fa-check-circle"></i>
                  <i class="validate error fa fa-times-circle"></i>
                </div>
                <div class="form-group px-0 col-12 mx-auto">
                  <label class="d-flex justify-content-start font-weight-bold">
                    PAC
                  </label>
                  <input
                    placeholder="PAC"
                    id="pac"
                    name="pac"
                    class="pac form-control h-50 ignoreStep4"
                    data-parsley-group="block-3"
                    type="text"
                    data-parsley-required="true"
                    data-parsley-required-message="Please Enter PAC">
                    <i class="validate success fa fa-check-circle"></i>
                    <i class="validate error fa fa-times-circle"></i>
                </div>`
             $('.div-numbr').html(html)
      }else{
        $('.div-numbr').html("");
      }
    });

    $( "#btn-nextstep" ).click(() => {
      CI.nextStep(1)
    });

    $( ".getoffer" ).click(function() {
      CI.dealNumber = this.dataset.dealId
      CI.price_monthly = this.dataset.price
    });

    $( "#btn-backstep" ).click(function() {
      CI.backStep(-1)
    });

  }

  fixStepIndicator(num) {
    var progress = $('.custom-progress-bar');
    if(num >= 0) {
      $('.custom-progress-bar').find("li").eq(num).addClass("is-active")
      $('.custom-progress-bar').find("li").eq(num - 1).addClass("is-complete")
      $('.custom-progress-bar').find("li").eq(num - 1).removeClass("is-active")
      $('.custom-progress-bar').find("li").eq(0 - 1).removeClass("is-complete")
    }
  }
  nextStep(n) {
    var CI = this;
    $('#dealslistform').parsley().whenValidate({
      group: 'block-' + this.currentTab
    }).done(() =>{
      var tabs = $(".tab");
      tabs[CI.currentTab].style.display = "none";
      CI.currentTab = CI.currentTab + n;
      if (CI.currentTab >= tabs.length) {
        var data = CI.getData();
        var params = Object.keys(data).map(key => key + '=' + data[key]).join('&');
       window.location = 'https://sweetmobile.co.uk/pay.php?' +params;
      }
      CI.showTab(CI.currentTab);
    })
  }

  getData() {
    var dayofb = $("#dayOfBirth :selected").val();
    var yearofb = $("#yearOfBirth :selected").val();
    var monthofb = $("#monthOfBirth :selected").val();
    var dateofbirth = dayofb+"/"+monthofb+"/"+yearofb
     return {
      Postcode: this.getUrlParameter('postcode') || $(".postcode").val() || '',
      FirstName: this.getUrlParameter('firstname') || $(".first_name").val() || '',
      LastName: this.getUrlParameter('lastname') || $(".last_name").val() || '',
      Email: this.getUrlParameter('email') || $(".email").val() || '',
      Mobile: this.getUrlParameter('phone1') || $(".phone").val() || '',
      Address1: this.getUrlParameter('street1') || $(".street1").val() || $(".address").val() || '',
      Town: this.getUrlParameter('towncity') || $(".towncity").val() || '',
      County: this.getUrlParameter('county') || $(".county").val() || '',
      NumberstoTransfer: this.getUrlParameter('NumberstoTransfer') ||  $(".NumberstoTransfer").val() || '',
      pay_amount: this.getUrlParameter('pay_amount') ||this.price_monthly || '',
      subid: 1,
      source: 'SMB',
      DealId: this.dealNumber,
      Quantity: 1,
      ClickId: this.getUrlParameter('c2') || '',
      PAC: this.getUrlParameter('pac') || $(".pac").val() || '',
      DOB: this.getUrlParameter('dateofbirth') || dateofbirth || ''
    };
  }

}
export default new SweetMobile();




