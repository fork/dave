module Dav
  class ResourcesController < ApplicationController

    before_filter :assert_exist, :only => [:survey, :delete]

    def survey
      @responses = [ Response::OK.new(resource, mount_point) ]
      render_multistatus
    end

    def store
      # TODO ...
      expire_fragment cache_path(response.content, '*')
    end

    def delete
      resource.remove
      expire_fragment cache_path(response.content, '*')

      render :nothing => true, :status => 204
    end

  end
end
