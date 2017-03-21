# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
languages = [{long_name: "English", short_name: "en"}, {long_name: "German", short_name: "de"},{ long_name: "French", short_name: "fr"}]

languages.each do |lang|
  Language.populate 1 do |language|
      language.long_name = lang[:long_name]
      language.short_name = lang[:short_name]
  end
end

roles = [{name: :admin, description: "Administrator role"},{name: :employee, description: "Employee role"}]

roles.each do |role|
  Role.populate 1 do |rol|
      rol.name = role[:name]
      rol.description = role[:description]
  end
end

ApplicationType.populate 3 do |app|
  app.name = Faker::Name.name
  app.label = Faker::Name.name
end

Industry.populate 3 do |industry|
  industry.name = Faker::Name.name
  industry.label = Faker::Name.name
end

Activity.populate 3 do |activity|
  activity.name = Faker::Name.name
  activity.description = Faker::Lorem.sentence
end

Technology.populate 3 do |tech|
  tech.name = Faker::Name.name
  tech.label = Faker::Name.name
end

Country.populate 4 do |country|
  country.long_name = Faker::Address.country
  country.short_name = Faker::Address.country_code
end

Customer.populate 3 do |customer|
  country = Country.all[Random.new.rand(Country.count)]
  customer.name = Faker::Name.name
  customer.country_id = country.id
end

Project.populate 5 do |project|
  project.name = Faker::Name.name
  project.description = Faker::Lorem.sentence
  project.start_date = Faker::Date.forward(3)
  project.end_date = Faker::Date.forward(20)
  project.deadline = Faker::Date.forward(22)
  project.in_progress = Faker::Boolean.boolean
  project.main_activities = Faker::Lorem.sentence
  project.url = Faker::Internet.url
  project.assist_url = Faker::Internet.url('assist.ro')
end
projects = Project.all
# project = Project.all[Random.new.rand(Project.count)]
projects.each do |project|
  industry = Industry.all[Random.new.rand(Industry.count)]
  project.industries << industry

  application_type = ApplicationType.all[Random.new.rand(ApplicationType.count)]
  project.application_types << application_type

  activity = Activity.all[Random.new.rand(Activity.count)]
  project.activities << activity

  technology = Technology.all[Random.new.rand(Technology.count)]
  project.technologies << technology

  customer = Customer.all[Random.new.rand(Customer.count)]
  project.customers << customer
end

Education.populate 3 do |education|
  education.name = Faker::Name.name
  education.degree = Faker::Lorem.sentence
  education.description = Faker::Lorem.sentence
  education.start_date = Faker::Date.forward(2)
  education.end_date = Faker::Date.forward(5)
end

Position.populate 3 do |position|
  position.name = Faker::Company.profession
  position.job_detail = Faker::Educator.course
end

Device.populate 3 do |device|
  device.name = Faker::Name.name
  device.description = Faker::Lorem.sentence
  device.total = Faker::Number.number(2)
end

Department.populate 3 do |depart|
  depart.name = Faker::Company.name
  depart.description = Faker::Company.catch_phrase
end

User.populate 10 do |user|
  user.first_name = Faker::Name.first_name
  user.last_name = Faker::Name.last_name
  user.address = Faker::Address.street_address
  user.birthday = Faker::Date.birthday
  user.phone = Faker::PhoneNumber.cell_phone
  user.picture = Faker::Avatar.image
  user.observations = Faker::Lorem.sentence
  user.email_other = Faker::Internet.email
  user.urgent_contact = Faker::Name.name_with_middle
  user.car_plate = Faker::Vehicle.vin
  user.assist_start_date = Faker::Date.backward(1000)
  user.courses_and_certifications = Faker::Lorem.sentence
  user.skills_level = Faker::Lorem.word
  user.project_dates =Faker::Date.backward(20)
  user.status = Faker::Number.between(0,2)
  user.email = Faker::Internet.email
  user.encrypted_password = Faker::Internet.password
  user.sign_in_count = Faker::Number.between(0,10)

  Holiday.populate 2 do |holiday|
    holiday.user_id = user.id
    holiday.days = Faker::Number.between(1,3)
    holiday.start_date = Faker::Date.forward(2)
    holiday.end_date = Faker::Date.forward(5)
 end
 UserProject.populate 1+Random.new.rand(2) do |upr|
    project = Project.all[Random.new.rand(Project.count)]
    upr.user_id = user.id
    upr.project_id = project.id
    upr.start_date = Faker::Date.forward(1)
    upr.end_date = Faker::Date.forward(6)
  end
  users_projects = UserProject.all.each do |upr|
    technology = Technology.all[Random.new.rand(Technology.count)]
    upr.technologies << technology
  end

  Upload.populate 1 do |upload|
    upload.file_name = Faker::Name.name
    upload.file_description = Faker::Lorem.sentence
    upload.path = Faker::Internet.url
    upload.user_id = user.id
  end

  Training.populate 1 do |training|
    training.title = Faker::Educator.course
    training.description = Faker::Lorem.sentence
    training.picture = Faker::Avatar.image
    training.start_date = Faker::Date.forward(6)
    training.duration = Faker::Number.number(2)
    training.user_id = user.id
  end

  Schedule.populate 1 do |schedule|
    schedule.name = Faker::Educator.course
    schedule.user_id = user.id
    schedule.timetable = Faker::Number.between(0,1).to_s
  end
end

users = User.all
users.each do |user|
  technology = Technology.all[Random.new.rand(Technology.count)]
  user.technologies << technology

  department = Department.all[Random.new.rand(Department.count)]
  user.departments << department

  position = Position.all[Random.new.rand(Position.count)]
  user.positions << position

  device = Device.all[Random.new.rand(Device.count)]
  user.devices << device

  education = Education.all[Random.new.rand(Education.count)]
  user.educations << education

  language = Language.all[Random.new.rand(Language.count)]
  user.languages << language

  role = Role.all[Random.new.rand(Role.count)]
  user.roles << role
end

Holiday.all.each do |holiday|
  current_user = holiday.user
  user_projects = current_user.projects
  random_user =  (User.all - [current_user])[Random.new.rand(User.count-1)]
  user_projects.each do |user_project|
    HolidayReplacement.populate 1 do |hr|
      hr.replacer_id = random_user.id
      hr.replaced_user_id = current_user.id
      hr.project_id = user_project.id
      hr.holiday_id = holiday.id
    end
  end
end


AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')
AppSetting.create!(key: 'ldap_host' , value: '192.168.200.107')
AppSetting.create!(key: 'ldap_port' , value: '389')
AppSetting.create!(key: 'ldap_account' , value: 'cn=admin,dc=test,dc=com')
AppSetting.create!(key: 'ldap_password' , value: 'TmVkbW1iQUtPOFQ0cUxqUk9MNC9Bdz09LS0rOFg3dUZZNWZDdnVneVRURmtsMlVnPT0=--28e89bc882d8720c1c6f12d4945bb318b4621013')
AppSetting.create!(key: 'ldap_basedn' , value: 'dc=test,dc=com')
AppSetting.create!(key: 'ldap_filter' , value: 'inetOrgPerson')