class DeployController < ApplicationController

    skip_before_action :verify_authenticity_token

    def index

        config = YAML::load_file(File.join(Rails.root, 'config', 'deploy.yml'))

        PULL_REQUEST    = 'pull_request'
        PUSH            = 'push'

        repo_url        = config['REPO_URL']
        branch_paths    = config['BRANCH_PATHS']
        github_ips      = config['GIT_IPS']
        token           = config['TOKEN']

        commands = [
            'cd app/assets/front-end/ && gulp build',
            'sudo service apache2 reload'
        ]

        if !verify_signature(token, request.raw_post)
            render plain: "Signatures didn't match!", status: 422 and return
        end

        if !github_ips.include? request.remote_ip
            render plain: "Request is not from github", status: 422 and return
        end

        payload = params

        if request.headers["X-GitHub-Event"] == PULL_REQUEST && request.request_parameters['action'] == 'closed'
            payload_branch   = payload['pull_request']['base']['ref']
            payload_url      = payload['pull_request']['head']['repo']['html_url']
        elsif request.headers["X-GitHub-Event"] == PUSH
            payload_branch   = payload['ref'].split("/").last
            payload_url      = payload['repository']['url']
        else
            render plain: "Only push and pull_request events are supported! #{request.request_parameters['action']}", status: 400 and return
        end

        if payload_url != repo_url || !branch_paths.key?(payload_branch)
            render plain: "#{payload_branch} branch does not have any associated folder on server or repo is not correct", status: 400 and return
        end

        Dir.chdir(branch_paths[payload_branch]) do
            system "git pull origin #{payload_branch}"
            commands.each do |command|
                system command
            end
        end
        
        render plain: "Successfully deployed on from branch `#{payload_branch}` into directory `#{branch_paths[payload_branch]}`"
    end

    private
    def verify_signature(token, payload_body)

        if !request.headers['HTTP_X_HUB_SIGNATURE']
            return false
        end

        signature = 'sha1=' + OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha1'), token, payload_body)
        Rack::Utils.secure_compare(signature, request.headers['HTTP_X_HUB_SIGNATURE'])
    end
end
