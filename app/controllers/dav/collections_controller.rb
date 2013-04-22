module Dav
  class CollectionsController < ApplicationController

    before_filter :assert_exist, :only => [:survey, :delete]

    def survey
      @responses = [ Response::OK.new(resource, mount_point) ]

      resource.each do |entry|
         @responses << Response::OK.new(entry, mount_point)
      end

      render_multistatus
    end

    def create
      if not resource.parent.exists?
        status = 409
      elsif resource.exists?
        status = 405
      else
        resource.save
        status = 201
      end

      render :nothing => true, :status => status
    end

  end
end
