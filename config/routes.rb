Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  resources :users, except: [:new, :edit] do
    resources :reviews, only: [:index, :show, :destroy]
  end
  
  resources :albums, except: [:new, :edit] do
    resources :reviews, only: [:create, :index, :destroy, :update]
  end

  resources :documents, only: [:show, :index, :create, :destroy]
  
  post "/login", to: "api/v1/auth#create"
  get "/auth", to: "users#show"
  post "/register", to: "users#create"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
