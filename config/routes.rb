Rails.application.routes.draw do
  devise_for :users
  resources :exit_deliveries
	# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
	# AMP
  get '/amp' => 'amp#index'
  get '/amp/sim-deal-only' => 'amp#sim_deal_only'
  post '/validate_data' => 'form_validation#valid_data'

  # Autopilot and facebook audience update
  resources :facebook_custom_audience

  # WebHooks
  namespace 'api', defaults: { format: :json } do
    namespace 'v1' do
      get '/redirect_url' => 'redirect#redirect_url'
      get '/exit_deliveries' => 'redirect#exit_deliveries'
      namespace 'webhooks' do
        resources :google_leads, only:[ :create, :index]
      end
    end
  end
  # lead quaue resolve
  get '/redirect-webhook' => 'lead#redirect_webhook'
  post '/redirect-webhook' => 'lead#redirect_webhook'
  post '/submit-lead' => 'lead#submitLead'
  get '/accept-leads' => 'lead#accept_leads'
  get '/lead_search' => 'lead#lead_search'
  get '/accept_leads_count' => 'lead#accept_leads_count'
  get '/accepeted_lead_data' => 'lead#accepeted_lead_data'
  get '/accepted_lead_details' => 'lead#accepted_lead_details'

  root 'pages#index'
  get '/ee_deals' => 'pages#ee_deals'
  get '/data_share' => 'pages#data_share'
  get '/exclusive_o2_deals_load' => 'pages#exclusive_o2_deals_load'
  get '/exclusive_ee_deals' => 'pages#exclusive_ee_deals'
  get '/exclusive_tribe_deals' => 'pages#exclusive_tribe_deals'
  get '/exclusive_o2_deals' => 'pages#exclusive_o2_deals'
  get '/sweet-mobile' => 'pages#sweet_mobile'
  get '/:page_name' => 'pages#show'
  post '/submit_lead' => 'pages#submit_lead'

end
