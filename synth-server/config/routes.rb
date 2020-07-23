Rails.application.routes.draw do
  resources :categories
  resources :settings
  get '/test', to: 'application#test'
end
