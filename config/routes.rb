Rails.application.routes.draw do
	# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
	# AMP
  get '/sitemap' => 'sitemap#index',defaults: {format: "xml"}
  get '/amp' => 'amp#index'
  get '/amp/sim-deal-only' => 'amp#sim_deal_only'
  post '/validate_data' => 'form_validation#valid_data'

  # Autopilot and facebook audience update
  resources :facebook_custom_audience

  # lead quaue resolve
  get '/redirect-webhook' => 'lead#redirect_webhook'
  post '/redirect-webhook' => 'lead#redirect_webhook'
  post '/mmd-exit-lead' => 'lead#mmd_exit_lead'
  post '/mmd-lead' => 'lead#mmd_lead'
  get '/fetch-redirect-url/:id' => 'lead#fetch_redirect_url'

  root 'pages#index'
  get '/:page_name' => 'pages#show'
end
