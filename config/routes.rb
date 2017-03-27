Rails.application.routes.draw do

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  get '/users/sign_in' , to: 'admin/authenticate#index'
  devise_for :users
  mount V1::UserAPI => '/api'
  mount V1::ProjectAPI => '/api'
  mount V1::CustomerAPI => '/api'
  mount V1::TechnologyAPI => '/api'
  mount V1::IndustryAPI => '/api'
  mount V1::ActivityAPI => '/api'
  mount V1::ApplicationTypeAPI => '/api'
  mount V1::TrainingAPI => '/api'
  mount V1::DeviceAPI => '/api'
  mount V1::LanguageAPI => '/api'
  mount V1::PositionAPI => '/api'
  mount V1::EducationAPI => '/api'
  mount V1::CountryAPI => '/api'
  mount V1::DepartmentAPI => '/api'
  mount V1::HolidayAPI => '/api'
  mount V1::HolidayReplacementAPI => '/api'
  mount V1::ScheduleAPI => '/api'

  get '/show' , to: 'admin/authenticate#show'
  post '/show' , to: 'app_settings#create'

  mount GrapeSwaggerRails::Engine => '/swagger'
  mount ApplicationApi, at: "/"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end