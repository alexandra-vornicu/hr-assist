module V1
  module Users
    class UserRelationsAPI < Grape::API
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

        get ':user_id/devices' do
          user = find_user(params[:user_id])
          {items: user.devices}
        end

        put ':user_id/devices' do
          user = User.find(params[:user_id])
          devices = Device.where(id: params[:device_ids]) - user.devices
          user.devices << devices if devices.count > 0
          {items: user.devices}
        end

        delete ':user_id/devices' do
          delete_object(User, Device, params[:user_id], params[:device_ids])
        end

        get ':user_id/languages' do
          user = find_user(params[:user_id])
          {items: user.languages}
        end

        put ':user_id/languages' do
          user = User.find(params[:user_id])
          languages = Language.where(id: params[:language_ids]) - user.languages
          user.languages << languages if languages.count > 0
          {items: user.languages}
        end

        delete ':user_id/languages' do
          delete_object(User, Language, params[:user_id], params[:language_ids])
        end

        get ':user_id/position' do
          user = find_user(params[:user_id])
          user.positions.last ? user.positions.last : []
        end

        params do
          requires :position_id, type: Integer
        end
        put ':user_id/position' do
          user = User.find(params[:user_id])
          position = Position.find(params[:position_id])
          user.positions.delete_all
          user.positions << position
          user.positions.last
        end

        params do
          requires :position_id, type: Integer
        end
        delete ':user_id/position' do
          user = find_user(params[:user_id])
          position = user.positions.find(params[:position_id])
          user.positions.delete_all
        end

        get ':user_id/educations' do
          user = find_user(params[:user_id])
          {items: user.educations}
        end

        params do
          requires :name, type: String,  allow_blank: false
          requires :degree, type: String, allow_blank: false
          requires :description, type: String, allow_blank: false
          requires :start_date, type: Date, allow_blank: false
          requires :end_date, type: Date, allow_blank: false
        end
        post ':user_id/educations' do
          education = Education.create(user_education_params)
          user = find_user(params[:user_id])
          user.educations << education
          {items: user.educations}
        end

        put ':user_id/educations' do
          user = User.find(params[:user_id])
          educations = Education.where(id: params[:education_ids]) - user.educations
          user.educations << educations if educations.count > 0
          {items: user.educations}
        end

        delete ':user_id/educations' do
          delete_object(User, Education, params[:user_id], params[:education_ids])
        end

        get ':user_id/schedule' do
          user = find_user(params[:user_id])
          user.schedule
        end

        params do
          optional :name, type: String
          optional :timetable, type: String
        end
        put ':user_id/schedule/:schedule_id' do
          schedule = Schedule.find_or_create_by(id: params[:schedule_id]) do |schedule|
            schedule.name = params[:name]
            schedule.timetable = params[:timetable]
          end
          schedule.update(user_schedule_params)
          user = find_user(params[:user_id])
          user.schedule = schedule
          user.schedule
        end

        get ':user_id/projects' do
          user = find_user(params[:user_id])
          {items: user.projects}
        end

        get ':user_id/projects/:project_id/technologies' do
          User.find(params[:user_id])
          Project.find(params[:project_id])
          user_project = UserProject.find_by_project_id_and_user_id(params[:project_id], params[:user_id])
          user_project ? {items: user_project.technologies} : []
        end

        get ':user_id/projects/:project_id/technologies/:technology_id' do
          User.find(params[:user_id])
          Project.find(params[:project_id])
          Technology.find(params[:technology_id])
          user_project = UserProject.find_by_project_id_and_user_id(params[:project_id], params[:user_id])
          user_project ? user_project.technologies.find(params[:technology_id]) : []
        end

        params do
          optional :start_date, type: Date
          optional :end_date, type: Date
          optional :technology_ids, type: Array[Integer]
        end

        put ':user_id/projects/:project_id' do
          user = find_user(params[:user_id])
          user_project = UserProject.find_by_project_id_and_user_id(params[:project_id], params[:user_id])
          user_project = UserProject.create(user_id: params[:user_id], project_id: params[:project_id]) if user_project.nil?
          user_project.update(user_project_params)
          technologies = Technology.where(id: params[:technology_ids]) - user_project.technologies
          user_project.technologies << technologies if technologies.count > 0
          response = {
            start_date: user_project.start_date,
            end_date: user_project.end_date,
            technologies:
              user_project.technologies.map do |technology|
                {
                  id: technology.id,
                  name: technology.name,
                  label: technology.label
                }
              end
            }
        end

        delete ':user_id/projects/:project_id' do
          user = User.find(params[:user_id])
          user_project = UserProject.find_by_project_id_and_user_id(params[:project_id], params[:user_id])
          user_project.destroy
        end

        params do
          optional :technology_ids, type: Array[Integer]
        end
        delete ':user_id/projects/:project_id/technologies' do
          user = User.find(params[:user_id])
          user_project = UserProject.find_by_project_id_and_user_id(params[:project_id], params[:user_id])
          technologies = Technology.where(id: params[:technology_ids])
          user_project.technologies.delete(technologies)
        end

        get ':user_id/technologies' do
          user = find_user(params[:user_id])
          {items: user.technologies}
        end

        put ':user_id/technologies' do
          user = User.find(params[:user_id])
          technologies = Technology.where(id: params[:technology_ids]) - user.technologies
          user.technologies << technologies if technologies.count > 0
          {items: user.technologies}
        end

        delete ':user_id/technologies' do
          delete_object(User, Technology, params[:user_id], params[:technology_ids])
        end

        get ':user_id/holidays' do
          user = find_user(params[:user_id])
          holidays = user.holidays
          holidays.map do |holiday|
            get_holiday(holiday)
          end
        end

        get ':user_id/holidays/:holiday_id' do
          user = find_user(params[:user_id])
          holiday = user.holidays.find(params[:holiday_id])
          get_holiday(holiday)
        end

        params do
          requires :days, allow_blank: false, type: Integer
          requires :start_date, allow_blank: :false, type: Date
          requires :end_date, allow_blank: :false, type: Date
          requires :signing_day, allow_blank: :false, type: Date
          requires :project_ids, allow_blank: false, type: Array[Integer]
          requires :replacer_ids, allow_blank: false, type: Array[Integer]
        end
        post ':user_id/holidays' do
          user = find_user(params[:user_id])
          holiday = Holiday.create(days: params[:days], start_date: params[:start_date], end_date: params[:end_date], signing_day: params[:signing_day], user_id: params[:user_id])
          params[:project_ids].zip(params[:replacer_ids]).each do |project_id, replacer_id|
            holiday_replacement = HolidayReplacement.create(holiday_id: holiday.id, project_id: project_id, replacer_id:replacer_id)
            holiday.holiday_replacements << holiday_replacement
          end
          get_holiday(holiday)
        end

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
