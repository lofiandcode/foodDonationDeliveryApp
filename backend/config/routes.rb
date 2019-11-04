Rails.application.routes.draw do
  resources :driver_food_banks
  resources :donor_drivers
  resources :food_banks
  resources :drivers
  resources :donors
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
