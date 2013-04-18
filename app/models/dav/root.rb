module Dav
  class Root < Collection

    def self.setup
      instance = new
      instance.make unless instance.exist?
    end

    def self.new
      super ''
    end

    def parent
      nil
    end

  end
end
