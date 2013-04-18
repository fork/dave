module Dav
  class ApplicationController < ActionController::Base; protected

    def resource
      @resource ||= request.env['dav.resource']
    end
    def not_found
      raise ActionController::RoutingError.new('Not Found')
    end
    def assert_exist
      not_found unless resource.exist?
    end

    def render_multistatus
      # TODO remove all properties not in <tt>properties</tt>
      # xml = render_to_string :template => 'dav/multistatus'
      # document = Nokogiri::XML xml
      # ...
      render :template => 'dav/multistatus', :status => 207
    end

    def depth(default = Infinity)
      return default unless request.env.member? 'HTTP_DEPTH'
      request['HTTP_DEPTH'].to_i
    end

    def mount_point
      @mount_point ||= root_path.sub(/\/$/, '')
    end
    helper_method :mount_point

    def cache_path(resource, suffix)
      File.join(mount_point + resource.relative_path, suffix)[ 1.. -1 ]
    end
    helper_method :cache_path

  end
end
