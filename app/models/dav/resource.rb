module Dav
  class Resource < Struct.new(:relative_path, :absolute_path)

    def self.absolute_path(path)
      path = "#{ Dav.root_path }#{ path.gsub '/', File::Separator }"
      path = File.expand_path path

      raise path unless path.index(Dav.root_path)

      path
    end

    def self.new(relative_path)
      super relative_path, absolute_path(relative_path)
    end

    def save
      File.open(absolute_path, 'w') { |io| io.write @body }
    end

    def body
      @body ||= File.read absolute_path if exist?
    end
    def body=(body)
      @body = body
    end

    def type
      type ||= MIME.check absolute_path
    end

    def length
      File.size absolute_path
    end

    def exist?
      File.exist? absolute_path
    end
    alias_method :exists?, :exist?

    def remove
      File.unlink absolute_path
    end

  end
end
