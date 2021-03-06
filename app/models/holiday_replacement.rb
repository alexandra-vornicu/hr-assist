class HolidayReplacement < ApplicationRecord
  belongs_to :holiday, :dependent => :destroy
  belongs_to :project
  belongs_to :replacer, class_name: 'User', foreign_key: 'replacer_id'
  belongs_to :replaced_user, class_name: 'User', foreign_key: 'replaced_user_id'
  belongs_to :team_leader, class_name: "User"
end
