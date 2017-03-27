module V1
  class ApplicationTypeAPI < Grape::API
    version 'v1', using: :path
    format :json

    include RescuesAPI

    helpers do
      include AccessGranted::Rails::ControllerMethods
      include Authentication
      include Responses
      include APIHelpers

      def postParams
        ActionController::Parameters.new(params)
          .permit(:name, :label)
      end

      params :pagination do
        optional :page, type: Integer
        optional :per_page, type: Integer
      end

    end

    before do
      authenticate!
    end

    resource :application_types do

      desc "Return all application types"
      params do
        use :pagination # aliases: includes, use_scope
      end
      get do
        getPaginatedItemsFor ApplicationType
      end

      desc "Returns an application type"
      params do
        requires :id ,type: Integer , desc: "Application type id"
      end
      get ':id' do
        authorize! :read, ApplicationType.find(params[:id])
      end

      desc "Create new application type"
      params do
        requires :name, allow_blank: false, type: String
        requires :label, allow_blank: false, type: String
      end
      post 'new' do
        authorizeAndCreate(ApplicationType, postParams)
      end

      desc "Update application type"
      params do
        optional :name, allow_blank: false, type: String
        optional :label, allow_blank: false, type: String
      end

      put ':id' do
        application_type = ApplicationType.find(params[:id])
        authorize! :update, ApplicationType
        application_type.update(postParams)
        success
      end

      desc "Delete application type"
      delete ':id' do
        ApplicationType.find(params[:id]).destroy
      end
    end
  end
end