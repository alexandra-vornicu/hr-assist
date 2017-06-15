class CandidateFile < ApplicationRecord
    has_attached_file :file,
                    :path => ":rails_root/public/system/:class/:id/:style/:filename",
                    :url  => "/system/:class/:id/:style/:filename"
    validates_attachment :file, presence: true, content_type: { content_type: %w(application/mp3 application/x-mp3 audio/mpeg  ['audio/mpeg'] audio/mp3 application/octet-stream) }

end