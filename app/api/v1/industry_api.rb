module V1
  class IndustryAPI < Grape::API
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

    resource :industries do

      desc "Return all industries"
      params do
        use :pagination # aliases: includes, use_scope
      end
      get do
        getPaginatedItemsFor Industry
      end

      desc "Returns a industry"
      params do
        requires :id ,type: Integer , desc: "Industry id"
      end
      get ':id' do
        authorize! :read, Industry.find(params[:id])
      end

      desc "Create new industry"
      params do
        requires :name, allow_blank: false, type: String
        requires :label, allow_blank: false, type: String
      end
      post 'new' do
        authorizeAndCreate(Industry, postParams)
      end

      desc "Update industry"
      params do
        optional :name, allow_blank: false, type: String
        optional :label, allow_blank: false, type: String
      end

      put ':id' do
        industry = Industry.find(params[:id])
        authorize! :update, Industry
        industry.update(postParams)
        success
      end

      desc "Delete industry"
      delete ':id' do
        Industry.find(params[:id]).destroy
      end
    end
  end
end