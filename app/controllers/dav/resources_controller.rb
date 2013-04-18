module Dav
  class ResourcesController < ApplicationController

    before_filter :assert_exist, :only => [:show, :survey, :delete]

    def show
      send_file resource.absolute_path, :type => resource.type, :disposition => :inline
    end

    def survey
      @responses = [ Response::OK.new(resource, mount_point) ]
      render_multistatus
    end

    def store
      resource.body = request.body.read
      resource.save

      expire_fragment cache_path(resource, '*')

      render :nothing => true, :status => 201
    end

    def delete
      resource.remove
      expire_fragment cache_path(resource, '*')

      render :nothing => true, :status => 204
    end

  end
end
