module V1
  module Users
    module Relations
      class UploadAPI < Grape::API
        version 'v1', using: :path
        format :json

        include RescuesAPI

        helpers do
          include Responses
          include APIHelpers
          include Authentication
          include AccessGranted::Rails::ControllerMethods
        end

        resource :users do

          before { authenticate! }

          get ':user_id/uploads' do
            user = find_user(params[:user_id])
            {items: user.uploads}
          end

          put ':user_id/uploads' do
            user = User.find(params[:user_id])
            uploads = Upload.where(id: params[:upload_ids]) - user.uploads
            user.uploads << uploads if uploads.count > 0
            {items: user.uploads}
          end

          delete ':user_id/uploads' do
            delete_object(User, Upload, params[:user_id], params[:upload_ids])
          end
        end
      end
    end
  end
end

