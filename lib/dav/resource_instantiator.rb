module Dav

  class ResourceInstantiator < Struct.new(:app)

    def construct_path(env)
      path = env['REQUEST_PATH']
      offset = path.rindex env['PATH_INFO']

      path[ offset.. -1 ]
    end
    def build_resource(env)
      path = construct_path env
      type = path[ -1, 1 ] == '/' ? Collection : Resource

      type.new path
    end

    def call(env)
      env.update 'dav.resource' => build_resource(env)
      app.call env
    end

  end

end