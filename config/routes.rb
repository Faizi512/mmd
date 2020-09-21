Rails.application.routes.draw do
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
       namespace 'webhooks' do
        resources :google_leads, only:[ :create, :index]
      end
    end
  end
  # lead quaue resolve
  get '/redirect-webhook' => 'lead#redirect_webhook'
  post '/redirect-webhook' => 'lead#redirect_webhook'
  post '/mmd-exit-lead' => 'lead#mmd_exit_lead'
  post '/mmd-lead' => 'lead#mmd_lead'
  get '/fetch-redirect-url/:id' => 'lead#fetch_redirect_url'

  root 'pages#index'
  get '/exclusive_o2_deals_load' => 'pages#exclusive_o2_deals_load'
  get '/exclusive_ee_deals' => 'pages#exclusive_ee_deals'
  get '/exclusive_tribe_deals' => 'pages#exclusive_tribe_deals'
  get '/exclusive_o2_deals' => 'pages#exclusive_o2_deals'
  get '/sweet-mobile' => 'pages#sweet_mobile'
  get '/:page_name' => 'pages#show'
end
