module Dav
  class Collection < Resource

    def type
      'httpd/unix-directory'
    end

    def length
      0
    end

    def create
      Dir.mkdir absolute_path
    end
    alias_method :save, :create

    def body() nil end
    def body=(str) end

    def remove
      FileUtils.rmtree absolute_path
    end

    def each
      basenames = Dir.entries(absolute_path) - %w[ . .. ]
      basenames.each { |basename| yield child(basename) }
    end

    def parent
      Collection.new "#{ File.dirname relative_path }/"
    end

    def child(basename)
      path = "#{ absolute_path }#{ File::Separator }#{ basename }"
      return nil unless File.exist? path

      (unless File.directory? path then Resource else Collection end).
        new "#{ relative_path }#{ basename }"
    end

  end
end
