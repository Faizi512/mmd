import Common from "./common.js"
class CreditCheck extends Common {
   constructor(){
    super();
    var CI = this;
    this.validate("#cc-form")
    $(document).on("click", '.input-tag-radio', function(event) {
      var card=event.target.closest('.tab')
      CI.step(1,card)
    });
    $(document).on("change", '.select-field', function(event) {
      var card=event.target.closest('.tab')
      CI.step(1,card)
    });
    $(document).on("click", '.back-color', function(event) {
      var card=event.target.closest('.tab')
      CI.step(1,card)
    });
    $(document).on("click", '.accordion-title', function(event) {
      var card=event.target.closest('.tab')
      CI.changeTab(card)
    });
    $(document).on("show.bs.collapse", '.collapse', function(event) {
       $(this).prev(".card-header").find(".accordian-toggle-icon").removeClass("fa-plus-circle").addClass("fa-minus-circle");
    })
    $(document).on("hide.bs.collapse", '.collapse', function(event) {
      $(this).prev(".card-header").find(".accordian-toggle-icon").removeClass("fa-minus-circle").addClass("fa-plus-circle");
    });
  }
  step(n,tab) {
    var CI = this;
    var income=0,food=0,transport=0,others=0,bills=0;
    $('#cc-form').parsley().whenValidate({
      group: 'block-' + this.currentTab
    }).done(() =>{
      var tabs = $(".tab");
      $(tabs[CI.currentTab + 1]).find('.collapse').collapse('show');
      $(tabs[CI.currentTab]).find('.collapse').collapse('hide');
      $(tabs[CI.currentTab + 1]).find('.d-none').removeClass('d-none');
      CI.currentTab = CI.currentTab + n;
    })
    if(($(tab).find(".select-field")).length > 0){
      var inputs=$(tab).find(".select-field");
      var id=inputs[0]
      var data= id.options[id.selectedIndex].text;
      if (data == "more than 1998" || data== "unemployed" || data== "student")
      {
        window.location.href=
          "https://switchuk.uk/no_credit_check_sim_only_deals";
      }
    }
    else{
      var inputs=$(tab).find(".input-tag-radio");
      for (var i=0; i<b.length;i++){
        var id=inputs[i];
        if (id.checked) {
          if(id.value=="EE" || id.value=="income Upto £1000" ||
             id.value=="income Upto £2000" ){
             window.location.href=
              "https://switchuk.uk/no_credit_check_sim_only_deals";
          }else if(id.value == "income Upto £1000" ||
                  id.value == "income Upto £4000" ||
                  id.value == "income above £4000"){
            var income= id.value;
            income=income.split("£");
            income=income[1];
            income=parseInt(income);
          }else if(id.value == "food Upto £500" ||
                  id.value == "food Upto £1000" ||
                  id.value == "food Upto £1500" ||
                  id.value == "food above £2000"){
            food= id.value;
            food=food.split("£");
            food=food[1];
            food=parseInt(food);
          }else if(id.value == "transport Upto £500" ||
                  id.value == "transport Upto £1000" ||
                  id.value == "transport Upto £1500" ||
                  id.value == "transport above £2000"){
            transport= id.value;
            transport=transport.split("£");
            transport=transport[1];
            transport=parseInt(transport);
          }else if(id.value == "bills Upto £500" ||
                  id.value == "bills Upto £1000" ||
                  id.value == "bills Upto £1500" ||
                  id.value == "bills above £2000"){
            bills= id.value;
            bills=bills.split("£");
            bills=bills[1];
            bills=parseInt(bills);
          }else if(id.value == "others Upto £500" ||
                  id.value == "others Upto £1000" ||
                  id.value == "others Upto £1500" ||
                  id.value == "others above £2000"){
            others= id.value;
            others=others.split("£");
            others=others[1];
            others=parseInt(others);
          }
        }
      }
    }
    if((income-(transport+food+bills+others)) <= 500 && others != 0)
    {
      window.location.href=
        "https://switchuk.uk/no_credit_check_sim_only_deals";
    }
  }
  changeTab(tab){
    var CI = this;
    var index=parseInt(tab.id);
    this.currentTab=index;
  }
}
export default new CreditCheck();
