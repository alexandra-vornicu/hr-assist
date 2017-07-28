class Candidate < ApplicationRecord
    has_one :candidate_cv, :class_name => "CandidateCv"
    has_many :candidate_files
    has_many :candidate_technologies
    has_many :technologies, through: :candidate_technologies

    def get_technologies
        candidate_technologies = CandidateTechnology.where(candidate_id: self.id)
        result = []
        candidate_technologies.each do |tech|
            partial_result = {}
            technology = Technology.find(tech.technology_id)
            partial_result[:technology_id] = technology.id
            partial_result[:name] = technology.name
            partial_result[:level] = tech.level
            result << partial_result
        end
        result
    end

end
