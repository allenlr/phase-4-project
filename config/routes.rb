Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  resources :users, except: [:new, :edit, :index] do
    resources :reviews, only: [:index, :show]
  end
  
  resources :albums, except: [:new, :edit] do
    resources :reviews, only: [:create, :index, :destroy, :update]
  end
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
