module CreditCheckStepFormHelper
  def number_field_params
    [
      {
        id: '4',
        name: 'income',
        subtitle: 'Monthly Income',
        title: 'Monthly Income after Tax',
        income_id: 'monthly-income',
        parsley_message: 'Please Enter your Monthly Income',
        parsley_group: 'block-4',
        placeholder: 'Enter Income Here',
        step_no: '5',
        info:'How much do you earn'
      },
      {
        id: '5',
        name: 'rent',
        subtitle: 'Rent Payments',
        title: 'Rent/Mortgage Payments',
        income_id: 'rent-payment',
        parsley_message: 'Please Enter your Rent Payment',
        parsley_group: 'block-5',
        placeholder: 'Enter Payment Here',
        step_no: '6',
        info:'Do you pay any rent or mortgage'
      },
      {
        id: '6',
        name: 'credit-card',
        subtitle: 'Credit Card & Loan Repayments',
        title: 'Credit Card & Loan Repayments',
        income_id: 'creditCard',
        parsley_message: 'Please Enter requested information',
        parsley_group: 'block-6',
        placeholder: 'Enter Here',
        step_no: '7',
        info:'Any credits you have received'
      },
      {
        id: '7',
        name: 'utility-bills',
        subtitle: 'Enter Utility Bills Amount',
        title: 'Utility Bills',
        income_id: 'utilityBills',
        parsley_message: 'Please Enter requested information',
        parsley_group: 'block-7',
        placeholder: 'Enter Here',
        step_no: '8',
        info:'Your utility bills'
      },
      {
        id: '8',
        name: 'transport-costs',
        subtitle: 'Enter Transport Costs',
        title: 'Transport Costs',
        income_id: 'transportCosts',
        parsley_message: 'Please Enter requested information',
        parsley_group: 'block-8',
        placeholder: 'Enter Here',
        step_no: '9',
        info:'How much you expend on transport'
      },
      {
        id: '9',
        name: 'food-costs',
        subtitle: 'Enter Transport Costs',
        title: 'Food Costs',
        income_id: 'foodCosts',
        parsley_message: 'Please Enter requested information',
        parsley_group: 'block-9',
        placeholder: 'Enter Here',
        step_no: '10',
        info:'How much you expend on food'
      },
      {
        id: '10',
        name: 'other-costs',
        subtitle: 'Enter Any other Monthly Costs',
        title: 'Any other Monthly Costs',
        income_id: 'otherCosts',
        parsley_message: 'Please Enter requested information',
        parsley_group: 'block-10',
        placeholder: 'Enter Here',
        step_no: '11',
        info:'Your other interests expenses'
      },
    ]
  end
end
